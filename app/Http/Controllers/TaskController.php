<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use App\Enums\DepartmentEnum;
use App\Enums\TaskStatusEnum;
use App\Models\Employee;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
	public function store(Request $request) {
		$request->validate([
			'name' => 'required|string|max:255',
			'department' => 'required',
			'taskType' => 'required',
		]);

		$newTask = Task::create([
			'name' => $request->name,
			'department_id' => $request->department,
			'task_type_id' => $request->taskType,
			'to_date' => $request->toDate,
			'from_date' => $request->fromDate,
			'description' => $request->description,
		]);

		return response()->json(['message' => 'Task saved successfully']);
	}

	public function index(Request $request) {
		$currentUser = auth()->user();
		$tasks = Task::where('user_id', $currentUser->id)
					->paginate(10);
		
		return response()->json($tasks);
	}

	public function allTasks() {
		$user = auth()->user();

		if ($user->role == DepartmentEnum::ADMIN) {
			$tasks = Task::with(['department', 'user', 'taskType'])->paginate(20);
			return response()->json($tasks);
		}
	}

	public function getPending(Request $request) {
		$currentUser = auth()->user();
		$tasksPending = Task::where('user_id', $currentUser->id)
							->where('status', TaskStatusEnum::PENDING)
							->count();

		return response()->json($tasksPending);
	}

	public function tasksByUser(Request $request) {
		$user = User::find($request->user_id);

		if (!$user) {
			abort(404, 'User does not exist');
		}

		$tasks = $user->tasks()->paginate(20);

		return response()->json($tasks);
	}

	public function getUnassignedTasks() {
		$user = auth()->user();

		if ($user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$tasks = Task::where('department_id', $user->department_id)
										->whereNull('user_id')
										->with('taskType')
										->paginate(20);
			return response()->json($tasks);
		}
	}

	public function getAssignedTasks() {
		$user = auth()->user();

		if ($user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$tasks = Task::where('department_id', $user->department_id)
										->whereNotNull('user_id')
										->with('taskType')
										->paginate(20);
			return response()->json($tasks);
		}
	}

	public function update(Request $request) {
		$request->validate([
			'user' => 'required',
			'task' => 'required',
		]);

		$user = auth()->user();

		if ($user && $user->clearance_level == ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$task = Task::find($request->task);

			if ($task) {
				$task->user_id = $request->user;
				$task->save();

				return response()->json(['message' => 'Task assigning successful']);
			}
		}
	}

  public function unassignTask(Request $request, $id) {
    $user = auth()->user();

		if ($user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER) {
      $task = Task::find($id);

      if ($task) {
				$task->user_id = NULL;
				$task->save();

				return response()->json(['message' => 'Task unassigned successfully']);
			}
    }
  }

	public function markTaskReceivedByHOD (Request $request) {
		$task = Task::find($request->taskId);

		if ($task) {
			$task->received_by_department_head = true;
			$task->save();
			
			return response()->json(['message' => 'Task received successfully']);
		}
	}

	public function markTaskReceivedByUser (Request $request) {
		$task = Task::find($request->taskId);

		if ($task) {
			$task->received_by_department_member = true;
			$task->save();

			return response()->json(['message' => 'Task received successfully']);
		}
	}



    // My Task
    public function myTask()
    {
        // $userId = auth()->user()->id;
        // $tasks = Task::where('employee_id', $userId)
        //     ->whereIn('status', ['pending', 'completed on time', 'completed in late'])
        //     ->paginate(5);

        // return view('admin.pages.Task.myTask', compact('tasks'));

        $employee = Auth::user()->employee;

        if (!$employee) {
            abort(403, 'Unauthorized action.');
        }

        $tasks = Task::with(['employee'])
            ->where('employee_id', $employee->id)
            ->get();

        $tasks->each(function ($task) {
            $employee = $task->employee;
            $employee->load('designation', 'department'); // Assuming you have relationships defined in Employee model
            $task->designation = $employee->designation->name;
            $task->department = $employee->department->name;
        });

        return view('admin.pages.Task.myTask', compact('tasks'));
    }



    public function storeTask(Request $request)
    {
        // Check if the employee has an ongoing or completed task
        $employeePendingTask = Task::where('employee_id', $request->employee_id)
            ->where('status', 'pending')
            ->exists();

        // If there's no pending task, allow assignment of a new task
        if (!$employeePendingTask) {
            // Validation for new task assignment
            $validate = Validator::make($request->all(), [
                'from_date' => 'required|date|after_or_equal:today',
                'to_date' => 'required|date|after_or_equal:from_date',
                'task_name' => 'required',
                'employee_id' => 'required|unique:tasks,employee_id,NULL,id,from_date,' . $request->from_date,
                'task_description' => 'nullable|string',
            ]);

            // Check for overlapping dates for the same employee (similar to the previous check)
            $overlappingTasks = Task::where('employee_id', $request->employee_id)
                ->where(function ($query) use ($request) {
                    $query->where(function ($q) use ($request) {
                        $q->where('from_date', '<=', $request->from_date)
                            ->where('to_date', '>=', $request->from_date);
                    })->orWhere(function ($q) use ($request) {
                        $q->where('from_date', '>=', $request->from_date)
                            ->where('from_date', '<=', $request->to_date);
                    });
                })
                ->exists();

            if ($validate->fails() || $overlappingTasks) {
                if ($overlappingTasks) {
                    notify()->error('Overlapping dates for the same employee.');
                } else {
                    notify()->error($validate->getMessageBag());
                }
                return redirect()->back();
            }

            // Task creation logic
            $fromDate = new \DateTime($request->from_date);
            $toDate = new \DateTime($request->to_date);
            $totalDays = $fromDate->diff($toDate)->days + 1;

            Task::create([
                'employee_id' => $request->employee_id,
                'task_name' => $request->task_name,
                'from_date' => $request->from_date,
                'to_date' => $request->to_date,
                'total_days' => $totalDays,
                'task_description' => $request->task_description,
            ]);

            notify()->success('New Task created');
            return redirect()->back();
        } else {
            // If there's a pending task, check if it's completed on time or late
            $completedTask = Task::where('employee_id', $request->employee_id)
                ->whereIn('status', ['completed on time', 'completed in late'])
                ->exists();

            if ($completedTask) {
                // Task creation logic
                $fromDate = new \DateTime($request->from_date);
                $toDate = new \DateTime($request->to_date);
                $totalDays = $fromDate->diff($toDate)->days + 1;

                Task::create([
                    'employee_id' => $request->employee_id,
                    'task_name' => $request->task_name,
                    'from_date' => $request->from_date,
                    'to_date' => $request->to_date,
                    'total_days' => $totalDays,
                    'task_description' => $request->task_description,
                ]);

                notify()->success('New Task created');
                return redirect()->back();
            }
        }

        // If the employee has a pending task and it's not completed on time or late, prevent assignment of a new task
        notify()->error('This employee has a pending task that needs to be completed on time or late before assigning a new task.');
        return redirect()->back();
    }




    // task list
    public function taskList()
    {


        $tasks  =  Task::with(['employee'])->get();
        $tasks->each(function ($task) {
            $employee = $task->employee;
            $employee->load('designation', 'department'); // Assuming you have relationships defined in Employee model
            $task->designation = $employee->designation->name;
            $task->department = $employee->department->name;
        });
        return view('admin.pages.Task.viewTask', compact('tasks'));
    }

    // Task Completed InTime and Late
    public function completeTaskOnTime($id)
    {
        $task = Task::find($id);
        if ($task) {
            $completionDate = now();
            $toDate = \Carbon\Carbon::createFromFormat('Y-m-d', $task->to_date);
            $fromDate = \Carbon\Carbon::createFromFormat('Y-m-d', $task->from_date);

            if ($completionDate->gt($toDate)) {
                $task->status = 'completed in late';
                notify()->success('Completed But in Late');
            } else if ($completionDate->lt($fromDate)) {
                // Error: Attempted completion before the task's start date
                notify()->error('Task completion cannot occur before the designated start date');
            } else {
                $task->status = 'completed on time';
                notify()->success('Completed on Time');
            }

            $task->save();
            return redirect()->back();
        }
    }


    public function completeTaskLate($id)
    {
        $task = Task::find($id);
        if ($task) {
            $task->status = 'completed in late';
            $task->save();
            notify()->success('Completed But in Late');
            return redirect()->back();
        }
    }

    public function deleteTask($id)
    {
        $task = Task::find($id);
        if ($task && $task->status !== 'completed') {
            $task->delete();
            return response()->json(['message' => 'Task deleted successfully']);
        } else {
            return response()->json(['message' => 'Cannot delete a completed task']);
        }
        return redirect()->back();
    }

    public function editTask($id)
    {
        $task = Task::findOrFail($id);


        return view('admin.pages.Task.editTask', compact('task'));
    }
    public function updateTask(Request $request)
    {
        $task = Task::findOrFail($request->id);
        if ($task) {
            $task->update($request->all());
            return response()->json(['message' => 'Task has been updated successfully']);
        }

        abort(400, 'Something wrong happened');
    }


    public function searchTask(Request $request)
    {
        $searchTerm = $request->search;

        $tasks = Task::where(function ($query) use ($searchTerm) {
            $query->where('task_name', 'LIKE', '%' . $searchTerm . '%')
                ->orWhereHas('employee', function ($q) use ($searchTerm) {
                    $q->where('name', 'LIKE', '%' . $searchTerm . '%');
                })
                ->orWhereHas('employee.designation', function ($q) use ($searchTerm) {
                    $q->where('designation_name', 'LIKE', '%' . $searchTerm . '%');
                })
                ->orWhereHas('employee.department', function ($q) use ($searchTerm) {
                    $q->where('department_name', 'LIKE', '%' . $searchTerm . '%');
                });
        })->paginate(10);

        return view('admin.pages.Task.searchTask', compact('tasks'));
    }

    public function updateFeedBack(Request $request, $id){
        $request->validate([
            'feedback' => 'required'
        ]);
        $task = Task::findOrFail($id);

        $task->feedback_if_rejected = $request->feedback;
        $task->save();

        return response()->json(['message' => 'FeedBack has been submitted']);
    }
}

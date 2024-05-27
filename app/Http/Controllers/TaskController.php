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
use AfricasTalking\SDK\AfricasTalking;
use App\Http\Resources\EmployeeTaskResource;
use App\Jobs\TaskReminder;
use App\Mail\TaskAssigned;
use App\Models\Client;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Stevebauman\Hypertext\Transformer;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TaskController extends Controller
{
	public function show($id) {
		$user = auth()->user();

		if ($id) {
			$admin_handler = null;
			$department_handler = null;
			$handler = null;
			$client = null;

			$task = Task::find($id);

			if ($task->admin_handler_id) {
				$admin_handler = User::where('id', $task->admin_handler_id)
															->select('name', 'department_id', 'role', 'department_id', 'clearance_level', 'id')
															->get()[0];
			}

			if ($task->department_handler_id) {
				$department_handler = User::where('id', $task->department_handler_id)
																	->select('name', 'department_id', 'role', 'department_id', 'clearance_level', 'id')
																	->get()[0];
			}

			if ($task->user_id) {
				$handler = User::where('id', $task->user_id)
												->select('name', 'department_id', 'role', 'department_id', 'clearance_level', 'id')
												->get()[0];
			}

			if ($task->client_id) {
				$client = Client::where('id', $task->client_id)
												->get()[0];
			}

			$can_edit = (
				$task->admin_handler_id == $user->id ||
				$task->department_handler_id == $user->id ||
				$task->user_id == $user->id
			);

			return response()->json([
				'admin' => $admin_handler,
				'department_head' => $department_handler,
				'handler' => $handler,
				'task' => $task,
				'client' => $client,
				'can_edit' => $can_edit,
			]);
		}
	}

	public function getTaskMessages($id) {
		if ($id) {
			$task = Task::find($id);
			$messages = $task->taskMessages()->get();

			return response()->json($messages);
		}
	} 

	public function tasksViewPage(Request $request, $task_id) {
		$task = Task::find($task_id);
		      
		if ($task) {
			return Inertia::render('Task/Id');
		}
		abort(404, 'Resource not available');
	}

	public function store(Request $request) {
    $user = auth()->user();
		$request->validate([
			'name' => 'required|string|max:255',
			'department' => 'required',
			'taskType' => 'required',
			'fromDate' => 'required',
			'toDate' => 'required',
		]);
		$newTask = Task::create([
			'name' => $request->name,
			'department_id' => $request->department,
			'task_type_id' => $request->taskType,
			'to_date' => $request->toDate,
			'from_date' => $request->fromDate,
			'description' => $request->description,
      		'admin_handler_id' => $request->adminHandler,
      		'department_handler_id' => $request->departmentHandler,
		]);

    if($request->client){
      $newTask->client_id = intval($request->client);
      $newTask->save();
    }

    $currentDate = Carbon::now();
    $endDate = Carbon::createFromFormat('Y-m-d', $newTask->to_date);

    $delay = $currentDate->diffInHours($endDate);

    if($delay >= 48){
      $nearDue = $delay - 24;
      TaskReminder::dispatch($newTask,$user)->delay($nearDue);
    }

    TaskReminder::dispatch($newTask,$user)->delay(now()->addHours($delay));
    TaskReminder::dispatch($newTask,$user)->delay(now()->addHours($delay + 24));

		return response()->json(['message' => 'Task saved successfully']);
	}

	public function index(Request $request) {
		$currentUser = auth()->user();
		$tasks = Task::where('user_id', $currentUser->id)
					->paginate(20);
		
		return response()->json($tasks);
	}

	public function allTasks() {
		$user = auth()->user();
		if ($user->role == DepartmentEnum::ADMIN) {
			$tasks = Task::with(['department', 'user', 'taskType','client','equipments'])->paginate(20);
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

    public function getTasksByUsers(Request $request)
    {
        $user = auth()->user();
		if ($user->role == DepartmentEnum::ADMIN) {
			$users = User::all();

            $results = [];
            foreach ($users as $user){
                $tasks = $user->tasks;
                
                $results[] = new EmployeeTaskResource($user,$tasks);
            }

            return response()->json($results);
		}
    }

	public function getUnassignedTasks() {
		$user = auth()->user();

		if ($user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$tasks = Task::where('department_id', $user->department_id)
										->whereNull('user_id')
										->select('tasks.from_date', 'tasks.to_date', 'tasks.id', 'tasks.name', 'tasks.task_type_id')
										->with(['taskType','equipments.equipmentType:id,manufacturer_name,spec_model'])
										->paginate(20);
			return response()->json($tasks);
		}
	}

	public function getAssignedTasks() {
		$user = auth()->user();

		if ($user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$tasks = Task::where('department_id', $user->department_id)
										->whereNotNull('user_id')
										->with(['taskType','user','equipments'])
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
                $content = View::make('emails.task_assigned', ['task' => $task, 'user' => $task->user, 'client' => $task->client])->render();
                $text = (new Transformer)
                ->keepLinks() 
                ->keepNewLines()
                ->toText($content);
                $mail = new \App\Mail\TaskAssigned(['task' => $task, 'user' => $task->user, 'client' => $task->client]);
                $this->sendMessage($text,$task->user->phone_number);
                $this->sendMail($task->user,$mail);
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

  public function updateTaskEquipment(Request $request){
	$request->validate([
		'equipments' => 'required',
		'task' => 'required',
	]);
	$task = Task::find($request->task);
	if(!$task){
		throw new NotFoundHttpException('An error occured');
	}
	try{
		foreach($request->equipments as $equipment){
			$task->equipments()->syncWithoutDetaching($equipment);
		}
	}catch(\Exception $e){
		abort(400,$e);
	}
	
	return response()->json(['message' => 'Equipment assigning successful']);
  }

  public function filterTasks(Request $request)
  {
	$user = auth()->user();

	if($request->query('p') === "unassigned"){
		$tasks = Task::filter(request(['type', 'status','departmentId','clientStatus']))
										->where('department_id', $user->department_id)
										->whereNull('user_id')
			 							->with(['department', 'user', 'taskType','client'])
										->paginate(20);
	}else if($request->query('p') === "assigned"){
		$tasks = Task::filter(request(['type', 'status','departmentId','clientStatus']))
										->where('department_id', $user->department_id)
										->whereNotNull('user_id')
			 							->with(['department', 'user', 'taskType','client'])
										->paginate(20);
	}else{
		$tasks = Task::filter(request(['type', 'status','departmentId','clientStatus']))
			 							->with(['department', 'user', 'taskType','client'])
										->paginate(20);
	}
       
       return response()->json($tasks);
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

    private function sendMessage($text,$phone_number)
    {
        $username = config('sms.username'); // use 'sandbox' for development in the test environment
        $apiKey   = config('sms.api_key'); // use your sandbox app API key for development in the test environment
        $AT       = new AfricasTalking($username, $apiKey);

        // Get one of the services
        $sms      = $AT->sms();

        // Use the service
        $result   = $sms->send([
            'to'      => $phone_number,
            'message' => $text,
            'from' => env('AT_SHORTCODE')
        ]);
        return $result;

    }

    private function sendMail($user,$mail)
    {
        Mail::to($user->email)->cc(config()->get('mail.from.address'))->queue($mail);

    }

    public function deleteTask($id)
    {
        $task = Task::find($id);
        if ($task && $task->status !== TaskStatusEnum::DONE) {
            $task->delete();
            return response()->json(['message' => 'Task deleted successfully']);
        } else {
            return response()->json(['message' => 'Cannot delete a completed task']);
        }
        return redirect()->back();
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
      $task = Task::find($id);

			if (!$task) {
				abort(404, 'Task not found');
			}

      $task->feedback_if_rejected = $request->feedback;
      $task->save();

      return response()->json(['message' => 'FeedBack has been submitted']);
    }
}

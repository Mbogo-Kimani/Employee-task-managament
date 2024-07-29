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
use App\Enums\TaskTypeEnum;
use App\Http\Resources\EmployeeTaskResource;
use App\Jobs\TaskReminder;
use App\Mail\TaskAssigned;
use App\Models\Client;
use App\Models\Equipment;
use App\Models\TaskType;
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

			if ($task->users) {
				// $handler = User::where('id', $task->user_id)
				// 								->select('name', 'department_id', 'role', 'department_id', 'clearance_level', 'id')
				// 								->get()[0];
				$handlers = $task->users;
			}

			if ($task->client_id) {
				$client = Client::where('id', $task->client_id)
												->get()[0];
			}

			$can_edit = (
				$task->admin_handler_id == $user->id ||
				$task->department_handler_id == $user->id ||
				// $task->user_id == $user->id
				$task->users()->where('user_id', $user->id)->exists()
			);

			return response()->json([
				'admin' => $admin_handler,
				'department_head' => $department_handler,
				'handler' => $handlers,
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
			'name' => 'nullable|string|max:255',
			'department' => 'required',
			'taskType' => 'required',
			'fromDate' => 'required',
			'toDate' => 'required',
			'paid' => 'nullable',
			'apartment_code' => 'string',
			'hse_no' => 'string',
			'package_id' => 'nullable|exists:internet_packages,id',
		]);

		$client = Client::where('acc_no', 'like', '%' . $request->apartment_code . $request->hse_no . '%')->orWhere('email', $request->client_email)->first();

		if ($request->taskType != TaskTypeEnum::SERVICE_MAINTENANCE) {
			if (!$client && $request->taskType == TaskTypeEnum::INSTALLATION) {
				$client = Client::create([
					'acc_no' => $request->apartment_code . $request->hse_no,
					'apartment_no' => $request->hse_no,
					'email' => $request->client_email,
					'name' => $request->client_name,
					'wifi_name' => $request->wifi_name,
					'wifi_password' => $request->wifi_password,
					'package_id' => $request->package_id,
					'address' => $request->apartment_code,
					'connection_status' => $request->paid,
					'phone_number' => $request->phone_number,
					'billing_day' => now()->format('Y-m-d'),
					'employee_id' => $request->work_number,
				]);
			} else if($client) {
				$client->update([
					'email' => $request->client_email,
					'wifi_name' => $request->wifi_name,
					'wifi_password' => $request->wifi_password,
					'connection_status' => $request->paid,
					'package_id' => $request->package_id,
					'phone_number' => $request->phone_number,
					'employee_id' => $request->work_number,
				]);
			}
		}

		$newTask = Task::create([
			'name' => $request->apartment_code . " " . $request->hse_no . ' ' .  TaskType::where('id', $request->taskType)->pluck('name')->first(),
			'department_id' => $request->department,
			'task_type_id' => $request->taskType,
			'to_date' => $request->toDate,
			'from_date' => $request->fromDate,
			'description' => $request->description,
      'admin_handler_id' => $request->adminHandler,
      'department_handler_id' => $request->departmentHandler,
			'paid' => $request->paid ?? 1,
			'client_id' => $client->id ?? NULL,
		]);

		if($request->subDepartment){
			$newTask->sub_department_id = $request->subDepartment;
			$newTask->save();
		}

		$phone_number = User::where('id',$request->departmentHandler)->pluck('phone_number')->first();
		$text = "New Task has been created: ".$newTask->name. ", ".$newTask->description;
		$this->sendmessage($text,$phone_number);

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
		$loggedInuser = auth()->user();
		$currentUser = User::find($loggedInuser->id);
		$tasks = $currentUser->tasks()->orderBy('created_at', 'DESC')->paginate(20);
		
		return response()->json($tasks);
	}

	public function allTasks() {
		$user = auth()->user();
		if ($user->role == DepartmentEnum::ADMIN) {

			$tasks = Task::with(['department', 'users', 'taskType','equipments', 'client'])
										->orderBy('created_at', 'DESC')
										->paginate(20);
			return response()->json($tasks);
		}

	}

	public function getPending(Request $request) {
		$currentUser = auth()->user();
		$tasksPending = Task::where('user_id', $currentUser->id)
							->where('status', TaskStatusEnum::PENDING)
							->orderBy('created_at', 'DESC')
							->count();

		return response()->json($tasksPending);
	}

	public function tasksByUser(Request $request) {
		$user = User::find($request->user_id);
		if (!$user) {
			abort(404, 'User does not exist');
		}

		$tasks = $user->tasks()->orderBy('created_at', 'DESC')->paginate(20);

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
										->whereDoesntHave('users')
										->orderBy('created_at', 'DESC')
										->select('tasks.from_date', 'tasks.to_date', 'tasks.id', 'tasks.name', 'tasks.task_type_id', 'tasks.received_by_department_head','tasks.department_id')
										->with(['department.subDepartments','taskType','equipments.equipmentType:id,manufacturer_name,spec_model','equipments.equipmentCategory:id,name'])
										->paginate(20);
			return response()->json($tasks);
		}
	}

	public function getAssignedTasks() {
		$user = auth()->user();

		if ($user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$tasks = Task::where('department_id', $user->department_id)
										->whereHas('users')
										->orderBy('created_at', 'DESC')
										->with(['taskType','users','equipments'])
										->paginate(20);
			return response()->json($tasks);
		}
	}

	public function update(Request $request) {
		$request->validate([
			'users' => 'required',
			'task' => 'required',
		]);

		$user = auth()->user();

		if ($user && $user->clearance_level == ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$task = Task::find($request->task);

			if ($task) {
				$task->task_started_at = now();
				$task->users()->syncWithoutDetaching($request->users);
				$task->save();

				foreach($task->users as $user){
					$content = View::make('emails.task_assigned', ['task' => $task, 'user' => $user])->render();
					$text = (new Transformer)
					->keepLinks() 
					->keepNewLines()
					->toText($content);
					$mail = new \App\Mail\TaskAssigned(['task' => $task, 'user' => $user]);

					$this->sendMessage($text,$user->phone_number);
					$this->sendMail($user,$mail);
				}
                
				return response()->json(['message' => 'Task assigning successful']);
			}
		}
	}

  public function unassignTask(Request $request, $id) {
	$request->validate([
		'userId' => 'required',
		'taskId' => 'required'
	]);

    $user = auth()->user();

		if ($user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER) {
      $task = Task::find($request->taskId);
			
      if ($task) {
				$task->users()->detach($request->userId);
				$task->user_id = NULL;
				$task->save();

				return response()->json(['message' => 'Task unassigned successfully']);
			}
    }
  }

  public function updateTaskEquipment(Request $request){
	$request->validate([
		'equipment_category' => 'required',
		'equipment_type' => 'required',
		'quantity' => 'required',
		'task' => 'required',
	]);
	$task = Task::find($request->task);
	if(!$task){
		throw new NotFoundHttpException('An error occured');
	}
	try{
		foreach(range(1,$request->quantity) as $count){
			$equipment = Equipment::where('equipment_type_id', $request->equipment_type)
														->where('is_assigned', false)
														->first();
				
			if($equipment){
				$task->equipments()->syncWithoutDetaching($equipment);
				$equipment->is_assigned = true;
				$equipment->save();
			}										
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
		$tasks = Task::filter(request(['type', 'status','departmentId','clientStatus','subDepartment']))
										->where('department_id', $user->department_id)
										->orderBy('created_at', 'DESC')
										->whereDoesntHave('users')
			 							->with(['equipments.equipmentType:id,manufacturer_name,spec_model','equipments.equipmentCategory:id,name','department.subDepartments', 'users', 'taskType','client'])
										->paginate(20);
	}else if($request->query('p') === "assigned"){
		$tasks = Task::filter(request(['type', 'status','departmentId','clientStatus']))
										->where('department_id', $user->department_id)
										->orderBy('created_at', 'DESC')
										->whereHas('users')
			 							->with(['department', 'users', 'taskType','client'])
										->paginate(20);
	}else{
		$tasks = Task::filter(request(['type', 'status','departmentId','clientStatus']))
										->orderBy('created_at', 'DESC')
			 							->with(['department', 'users', 'taskType','client'])
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
						$client = Client::find($request->client_id);
						$client->employee_id = $request->work_number;
						$client->save();
						
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

<?php

namespace App\Http\Controllers;

use App\Enums\MessageStatusEnum;
use App\Models\Task;
use App\Models\TaskMessage;
use Illuminate\Http\Request;

class TaskMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $task = Task::find($request->taskId);
      $user = auth()->user();
			if ($task && $user) {
				if ($task->admin_handler_id == $user->id || $task->department_handler_id == $user->id || $task->user_id == $user->id) {
					$department = $task->department;
					$new_message = TaskMessage::create([
						'content' => $request->message,
						'task_id' => $task->id,
						'sender_id' => $user->id,
						'sender_department_id' => $user->department_id,
						'user_id' => $user->id,
						'department_id' => $department->id,
						'message_status' => MessageStatusEnum::PENDING,
					]);
					event(new \App\Events\TaskMessageChatEvent($new_message));
		
					return response()->json($new_message);
				}
			} else {
				abort(404, 'Resource not available');
			}

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TaskMessage  $taskMessage
     * @return \Illuminate\Http\Response
     */
    public function show(TaskMessage $taskMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TaskMessage  $taskMessage
     * @return \Illuminate\Http\Response
     */
    public function edit(TaskMessage $taskMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TaskMessage  $taskMessage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TaskMessage $taskMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaskMessage  $taskMessage
     * @return \Illuminate\Http\Response
     */
    public function destroy(TaskMessage $taskMessage)
    {
        //
    }
}

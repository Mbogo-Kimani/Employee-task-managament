<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use App\Models\TaskType;
use Illuminate\Http\Request;

class TaskTypeController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
		return response()->json(TaskType::all());
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
		$request->validate([
			'task_type_name' => 'required|string|max:255',
			'task_type_description' => 'string|max:500',
			'task_type_department' => 'required',
		]);

		$user = auth()->user();

		if ($user && $user->clearance_level == ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$newTaskType = TaskType::create([
				'name' => $request->task_type_name,
				'department_id' => $request->task_type_department,
				'description' => $request->task_type_description,
			]);
	
			return response()->json(['message' => 'Task Type added successfully']);
		}

  }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TaskType  $taskType
     * @return \Illuminate\Http\Response
     */
    public function show(TaskType $taskType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TaskType  $taskType
     * @return \Illuminate\Http\Response
     */
    public function edit(TaskType $taskType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TaskType  $taskType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TaskType $taskType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaskType  $taskType
     * @return \Illuminate\Http\Response
     */
    public function destroy(TaskType $taskType)
    {
        //
    }
}

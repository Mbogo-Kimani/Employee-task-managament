<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use App\Enums\TaskStatusEnum;
use App\Models\Task;
use App\Models\TaskReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskReportController extends Controller
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
      $request->validate([
				'title' => 'required|string|max:255',
				'content' => 'required|string',
			]);

			$currentTask = Task::find($request->taskId);

			// if ($currentTask->taskReports->count()) {
			// 	return response()->json(['title' => 'You have already submitted this report'], 422);
			// }
			
			$taskReport = TaskReport::create([
				'title' => $request->title,
				'content' => $request->content,
				'task_id' => $request->taskId,
			]);

			if ($taskReport && $currentTask) {
				$currentTask->status = TaskStatusEnum::AWAITING_APPROVAL;
				$currentTask->task_finished_at = now();
				$currentTask->save();
				return response()->json(['message' => 'Report saved successfully']);
			}

			return response()->json('');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TaskReport  $taskReport
     * @return \Illuminate\Http\Response
     */
    public function show(TaskReport $taskReport)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TaskReport  $taskReport
     * @return \Illuminate\Http\Response
     */
    public function edit(TaskReport $taskReport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TaskReport  $taskReport
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TaskReport $taskReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaskReport  $taskReport
     * @return \Illuminate\Http\Response
     */
    public function destroy(TaskReport $taskReport)
    {
        //
    }

		public function newReportPage()
		{
			$user = auth()->user();

			if ($user && $user->clearance_level == ClearanceLevelEnum::DEPARTMENT_LEADER) {
				return Inertia::render('Reports/NewReport', compact('user'));
			}
		}
}

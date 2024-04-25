<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use App\Enums\TaskStatusEnum;
use App\Enums\DepartmentEnum;
use App\Models\Task;
use App\Models\TaskReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ReportResourceCollection;

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
    public function show(Request $request, $id)
    {
        $report = TaskReport::where('task_id',$id)->get();
        return response()->json($report);
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
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'status' => 'required|string',
        ]);
        $task_report = TaskReport::findOrFail($request->id);
        
        if($request->get('status') == 'approved'){
            $task_report->is_approved = true;
            $task_report->is_rejected = false;
        }else{
            $task_report->is_rejected = true;
            $task_report->is_approved = false;
        }
        $task_report->save();

		return response()->json(['message' => 'Report updated successfully']);

    }

    public function getReports(){
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::ADMIN){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }

        $reports = TaskReport::where('is_approved', true)->get();

        return new ReportResourceCollection($reports );
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TaskReport  $taskReport
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $report = TaskReport::find($id);
        if (!$report) {
            // TODO multilingualization
            throw new NotFoundHttpException('Not found');
        }
        $report->delete();
    }

		public function newReportPage()
		{
			$user = auth()->user();

			if ($user && $user->clearance_level == ClearanceLevelEnum::DEPARTMENT_LEADER) {
				return Inertia::render('Reports/NewReport', compact('user'));
			}
		}
}

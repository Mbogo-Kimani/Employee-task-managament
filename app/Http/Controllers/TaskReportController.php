<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use App\Enums\TaskStatusEnum;
use App\Enums\DepartmentEnum;
use App\Exports\ReportsExports;
use App\Models\Task;
use App\Models\TaskReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ReportResourceCollection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
		$file = $request->file('file');
        $fileName = '';
        if($file){

			try{
				$fileName = $file->getClientOriginalName();
				Storage::disk('public')->put($fileName, file_get_contents($file));
			}catch(\Exception $e){
				abort(400, $e);
			}			
		}

			$currentTask = Task::find($request->taskId);

			// if ($currentTask->taskReports->count()) {
			// 	return response()->json(['title' => 'You have already submitted this report'], 422);
			// }
			$taskReport = TaskReport::create([
				'title' => $request->title,
				'content' => $request->content,
				'task_id' => $request->taskId,
                'file' => $fileName
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
    public function show(Request $request, $task_id)
    {
        $report = TaskReport::where('task_id',$task_id)->get();
        if(!$report){
            return response()->json(['message' => 'No response found']);
        }
        return response()->json($report);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TaskReport  $taskReport
     * @return \Illuminate\Http\Response
     */
    public function export(TaskReport $taskReport)
    {
        $filename = '/files' . '/report_' . Carbon::now()->format('Y_m_d_H_i_s') . '.xlsx';
        Excel::store(new ReportsExports, $filename, 'public');
        // return Excel::download(new ReportsExports, 'reportse.xlsx');
        return response()->json(['file' => $filename]);
    // $headers = [
    //     'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //     'Content-Disposition' => 'attachment; filename="task.xlsx"',
    // ];
    // return Storage::download('files/'. 'task.xlsx');
    // return Storage::disk('local')->size('files/task.xlsx');
    //    return response()->download(storage_path('/app/files/'. 'task.xlsx'),'task.xlsx',$headers);;
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

			$task_report = TaskReport::find($request->id);
			
			if (!$task_report) {
				abort(404, 'Report not found');
			}

			$task = $task_report->task;

			if (!$task) {
				abort(404, 'Task not found');
			}

			if ($request->status == 'rejected') {
				// if (!$task->feedback_if_rejected) {
				// 	return response()->json(['feedback' => 'Rejected task requires feedback'], 422);
				// }

				$task->status = TaskStatusEnum::REJECTED;
				$task->save();
				return response()->json(['message' => 'Status updated successfully']);
			}

			if ($request->status == 'approved') {
            $task->status = TaskStatusEnum::DONE;
				$task->save();
				return response()->json(['message' => 'Status updated successfully']);
            }
    }

    public function getReports(){
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::ADMIN){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }

        $tasks = Task::where('status', TaskStatusEnum::DONE)->get();

        return new ReportResourceCollection($tasks );
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
            // TODO: multilingualization
            throw new NotFoundHttpException('Not found');
        }
        $report->delete();
    }

		public function newReportPage()
		{
			return Inertia::render('Reports/NewReport');
		}
}

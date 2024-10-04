<?php

namespace App\Exports;

use App\Models\Task;
use App\Models\TaskReport;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings; 

class ReportsExports implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    use Exportable;
    public function headings() : array
    {
        return [
            'Technician',
            'Title',
            'Content',
            'Date',
            'Status'
        ];
    } 
    public function collection()
    {
        $reports = TaskReport::all();
        $data = [];
        foreach($reports as $report){
           
            $task = Task::find($report->task_id);
            
            $task_report = [
                'name' => !empty($task->users) && count($task->users) < 2 ? $task->users[0]->name : $task->users[0]->name . ', ' . $task->users[1]->name,
                'title'=> $report->title,
                'content' => $report->content,
                'date' => Carbon::parse($report->created_at)->format('Y-m-d'),
                'status' => $report->is_approved ? 'Approved' : 'Rejected'
            ];
            $data[] = $task_report;
        }
        // return TaskReport::all();
        return collect($data);
    }
}

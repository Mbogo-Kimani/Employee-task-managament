<?php

namespace App\Exports;

use App\Enums\TaskStatusEnum;
use App\Enums\TaskTypeEnum;
use App\Models\Task;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings; 


class TaskExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    use Exportable;
    public function headings() : array
    {
        return [
            '#',
            'Title',
            'Status',
            'Users',
            'Created At',
            'Finished At',
        ];
    } 
    public function collection()
    {
        $tasks =  Task::all();
        $data = [];
        foreach($tasks as $task){
                $task_data = [
                    'id' => $task->id,
                    'name' => $task->name,
                    'status' => $this->getStatus($task->status),
                    'users' =>  $this->getUsers($task->users),
                    'created_at' => Carbon::parse($task->created_at)->format('Y-m-d-H-i-s'),
                    'finished_at' => Carbon::parse($task->task_finished_at)->format('Y-m-d-H-i-s'),
                ];
                $data[] = $task_data;
            
        }
        return collect($data);
    }

    private function getStatus($status)
    {
        switch ($status) {
            case TaskStatusEnum::PENDING:
                return 'Pending.';
            case TaskStatusEnum::AWAITING_APPROVAL:
                return 'Awaiting approval.';
            case TaskStatusEnum::REJECTED:
                return 'Rejected.';
            case TaskStatusEnum::DONE:
                return 'Done.';
            default:
                return 'Unknown status.';
        }
    }
    private function getType($type)
    {
        switch ($type) {
            case TaskTypeEnum::INSTALLATION:
                return 'Installation';
            case TaskTypeEnum::SERVICE_MAINTENANCE:
                return 'Service and maintenance';
            case TaskTypeEnum::SUPPORT:
                return 'Support';
            default:
                return 'Installation';
        }
    }

    private function getUsers($users)
    {
        $taskers = '';
        foreach($users as $user){
            $taskers .= $user->name;
        }
        return $taskers;
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ReportResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
   
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($report) {
            return [
                'id' => $report->id,
                'title' => $report->title,
                'content' => $report->content,
                'date' => $report->updated_at->format('Y-m-d H:i:s'),
                'task_assignee' => $report->task->user->name,
                'task_name' => $report->task->name,
                'task_type' => $report->task->taskType->name,
                'department' => $report->task->department->name,
            ];
        })->all();
    }
}

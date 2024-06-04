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
   
    public function toArray($request): array
    {
        return $this->collection->map(function ($task) {
            return [
                'id' => $task->taskReport->id,
                'title' => $task->taskReport->title,
                'content' => $task->taskReport->content,
                'date' => $task->taskReport->updated_at->format('Y-m-d H:i:s'),
                'task_assignee' => $task->users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name
                    ];
                }),  
                'task_name' => $task->name,
                'task_type' => $task->taskType->name,
                'department' => $task->department->name,
            ];
        })->all();
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AssignedEquipmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    private $task;
    private $equipment;

    public function __construct( $equipment,$task)
    {
        $this->task = $task;
        $this->equipment = $equipment;
    }

    public function toArray($request)
    {
        return [
            'id' => $this->equipment->id,
            'name' => empty($this->equipment->name) ?  $this->equipment->equipmentType->manufacturer_name : $this->equipment->name,
            'model' => $this->equipment->equipmentType->spec_model,
            'taskId' => $this->task->id,
            'taskName' => $this->task->name,
            'users' =>  $this->task->users->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name
                ];
            }),    
            'department' => $this->task->department->name,
            'is_assigned' => $this->equipment->pivot->confirm_assigned,
            'assigned_date' => $this->equipment->pivot->assigned_date,
        ];
    }
}

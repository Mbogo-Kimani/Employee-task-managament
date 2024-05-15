<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeTaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    private $user;
    private $tasks;

    public function __construct( $user, $tasks)
    {
        $this->user = $user;
        $this->tasks = $tasks;
    }
    public function toArray($request)
    {
        return [
            "id" => $this->user->id,
            "user" => $this->user->name,
            "department" => $this->user->department,
            "tasks" => new EmployeeTasksResourceCollection($this->tasks),
        ];
    }
}

<?php

namespace App\Http\Resources;

use App\Services\HashIdService;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => (new HashIdService())->encode($this->id),
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'clearance_level' => $this->clearance_level,
            'department_id' => $this->department_id,
            'phone_number' => $this->phone_number,
            'image' => $this->image,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}

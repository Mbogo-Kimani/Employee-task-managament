<?php

namespace App\Http\Resources;

use App\Models\Equipment;
use Illuminate\Http\Resources\Json\ResourceCollection;

class EquipmentResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(function ($equipment) {
                return [
                    'name' => $equipment->name,
                    'faulty' => $equipment->faulty,
                    'quantity' => Equipment::where('equipment_type_id',$equipment->equipment_type_id)->count(),
                    'category' => $equipment->equipmentCategory->name,
                    'department' => $equipment->department->name,
                    'specification' => $equipment->equipmentType->spec_model,
                    'purchase_date' => $equipment->purchase_date,
                ];
            }),
        ];
    }
}

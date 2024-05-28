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
                    'id' => $equipment->id,
                    'categoryId' => $equipment->equipmentCategory->id,
                    'name' => $equipment->name,
                    'manufacturer_name' => $equipment->equipmentType->manufacturer_name,
                    "serial_no" => $equipment->serial_no,
                    'status' => $equipment->status,
                    'category' => $equipment->equipmentCategory->name,
                    'model' => $equipment->equipmentType->spec_model,
                    'purchase_date' => $equipment->purchase_date,
                ];
            }),
        ];
    }
}

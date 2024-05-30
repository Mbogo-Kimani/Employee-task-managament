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
            'current_page' => $this->currentPage(),
            'first_page_url' => $this->url(1),
            'from' => $this->firstItem(),
            'last_page' => $this->lastPage(),
            'last_page_url' => $this->url($this->lastPage()),
            'links' => $this->linkCollection(),
            'next_page_url' => $this->nextPageUrl(),
            'path' => $this->path(),
            'per_page' => $this->perPage(),
            'prev_page_url' => $this->previousPageUrl(),
            'to' => $this->lastItem(),
            'total' => $this->total(),
        ];
    }
}

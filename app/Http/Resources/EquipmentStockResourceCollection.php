<?php

namespace App\Http\Resources;

use App\Enums\EquipmentsStatusEnum;
use App\Models\Equipment;
use Illuminate\Http\Resources\Json\ResourceCollection;

class EquipmentStockResourceCollection extends ResourceCollection
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
            'data' => $this->collection->map(function ($equipmentType) {
                return [
                    'type_id' => $equipmentType->id,
                    'category' => $equipmentType->equipmentCategory->name,
                    'model' => $equipmentType->spec_model,
                    'current_stock' => Equipment::where('equipment_type_id', $equipmentType->id)->where('status', EquipmentsStatusEnum::IN_STORAGE)->count(),
                    'stock_in' => Equipment::where('equipment_type_id', $equipmentType->id)->count(),
                    'stock_out' => Equipment::where('equipment_type_id', $equipmentType->id)->where('status', '!=', EquipmentsStatusEnum::IN_STORAGE)->count(),
                    'min_stock' => $equipmentType->min_stock,
                ];
            }),
        ];
    }   
}

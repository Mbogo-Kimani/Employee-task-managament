<?php

namespace App\Imports;

use App\Enums\EquipmentsStatusEnum;
use App\Models\Equipment;
use App\Models\EquipmentCategory;
use App\Models\EquipmentType;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class InventoryImport implements ToCollection, SkipsEmptyRows, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        $data = [];
        $category = '';
        foreach ($collection as $row){
            if($row['items']){
                $category = $row['items'];
            }else{
                $row['items'] = $category;
            }
            if(empty($row['description'])){
                $row['description'] = $category;
            }
            $data[] = $row;
        }
        $this->processData($data);
    }

    // public function rules(): array
    // {
    //     return [
    //         'name' => [
    //             'required',
    //             'string',
    //         ],
    //     ];
    // }
    private function processData($data)
    {
        foreach ($data as $stock)
        {
            $category = strtoupper(trim($stock['items']));
            $type = empty($stock['description']) ? $category : strtoupper(trim($stock['description']));
            $equipmentCategory = EquipmentCategory::where('name', $category)->first();

            if(!$equipmentCategory){
                $equipmentCategory = EquipmentCategory::create([
                    'name' => $category
                ]);
            }

            $equipmentType = EquipmentType::where('spec_model', $type)->first();
            if(!$equipmentType){
                $equipmentType = EquipmentType::create([
                    'spec_model' => $type,
                    'equipment_category_id' => $equipmentCategory->id
                ]);
            }

            foreach (range(1, $stock['stock_in']) as $count){
                Equipment::create([
                    'status' => EquipmentsStatusEnum::IN_STORAGE,
                    'equipment_type_id' => $equipmentType->id,
                    'equipment_category_id' => $equipmentCategory->id,
                    'purchase_date' => Carbon::now()
                ]);
            }
            

            foreach (range(1, $stock['stock_out']) as $count){
                $equipment = Equipment::where('status', EquipmentsStatusEnum::IN_STORAGE)->whereNull('serial_no')->first();
                if($equipment){
                    $equipment->status = EquipmentsStatusEnum::IN_USE;
                    $equipment->save();
                }
            }
                
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Enums\EquipmentsStatusEnum;
use App\Http\Resources\EquipmentStockResourceCollection;
use App\Models\Equipment;
use App\Models\EquipmentStock;
use App\Models\EquipmentType;
use Illuminate\Http\Request;

class EquipmentStockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $equipmentTypes = EquipmentType::all();
        
        $data = new EquipmentStockResourceCollection($equipmentTypes);
        
        return response()->json($data);
    }

    public function updateThreshold(Request $request, EquipmentStock $equipmentStock)
    {
        $request->validate([
            'id' => 'required|exists:equipment_types',
            'count' => 'required|integer'
        ]);

        $equipmentType = EquipmentType::find($request->id);
        $equipmentType->min_stock = $request->count;
        $equipmentType->save();

        return response()->json(['message' => 'Threshold has been set']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EquipmentStock  $equipmentStock
     * @return \Illuminate\Http\Response
     */
    public function destroy(EquipmentStock $equipmentStock)
    {
        //
    }
}

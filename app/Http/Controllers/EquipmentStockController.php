<?php

namespace App\Http\Controllers;

use App\Enums\EquipmentsStatusEnum;
use App\Models\Equipment;
use App\Models\EquipmentStock;
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
        $equipments = Equipment::all();
        // $currentStock = Equipment::where('status', EquipmentsStatusEnum::IN_STORAGE)->get();
        $data = new EquipmentStock
        return response()->json();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\EquipmentStock  $equipmentStock
     * @return \Illuminate\Http\Response
     */
    public function show(EquipmentStock $equipmentStock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\EquipmentStock  $equipmentStock
     * @return \Illuminate\Http\Response
     */
    public function edit(EquipmentStock $equipmentStock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EquipmentStock  $equipmentStock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EquipmentStock $equipmentStock)
    {
        //
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

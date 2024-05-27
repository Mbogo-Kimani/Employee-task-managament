<?php

namespace App\Http\Controllers;

use App\Models\EquipmentType;
use Illuminate\Http\Request;

class EquipmentTypeController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index($id)
  {
    $equipment_types = EquipmentType::where('equipment_category_id', $id)->get();

		return response()->json($equipment_types);
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
     * @param  \App\Models\EquipmentType  $equipmentType
     * @return \Illuminate\Http\Response
     */
    public function show(EquipmentType $equipmentType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\EquipmentType  $equipmentType
     * @return \Illuminate\Http\Response
     */
    public function edit(EquipmentType $equipmentType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EquipmentType  $equipmentType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EquipmentType $equipmentType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EquipmentType  $equipmentType
     * @return \Illuminate\Http\Response
     */
    public function destroy(EquipmentType $equipmentType)
    {
        //
    }
}

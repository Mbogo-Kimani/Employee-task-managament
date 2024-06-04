<?php

namespace App\Http\Controllers;

use App\Models\EquipmentCategory;
use Illuminate\Http\Request;

class EquipmentCategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $categories = EquipmentCategory::all();

		return response()->json($categories);
  }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string'
        ]);
        
        try{
            EquipmentCategory::create($request->all());
            return response()->json(['message' => 'Equipment Category created successfully']);
        }catch(\Exception $e){
            abort(400,$e);
        }
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\EquipmentGeneralCategory  $equipmentGeneralCategory
     * @return \Illuminate\Http\Response
     */
    public function show(EquipmentCategory $equipmentGeneralCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\EquipmentGeneralCategory  $equipmentGeneralCategory
     * @return \Illuminate\Http\Response
     */
    public function edit(EquipmentCategory $equipmentGeneralCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EquipmentGeneralCategory  $equipmentGeneralCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EquipmentCategory $equipmentGeneralCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EquipmentGeneralCategory  $equipmentGeneralCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy(EquipmentCategory $equipmentGeneralCategory)
    {
        //
    }
}

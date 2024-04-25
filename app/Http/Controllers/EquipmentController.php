<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipment;

class EquipmentController extends Controller
{
    public function store(Request $request){
        $request->validate([
			'name' => 'required|string|max:255',
			'department' => 'required',
			'status' => 'required',
            'quantity' => 'required|integer',
            'model' => 'required|string',
            'purchase_date' => 'required'
		]);
        
		$newEquipment = Equipment::create([
			'name' => $request->name,
			'department_id' => $request->department,
			'status' => intval($request->status),
			'model' => $request->model,
			'purchase_date' => $request->purchase_date,
			'quantity' => $request->quantity,
		]);

		return response()->json(['message' => 'Equipment saved successfully']);
    }
}

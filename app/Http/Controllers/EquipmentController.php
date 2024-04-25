<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipment;
use App\Enums\DepartmentEnum;


class EquipmentController extends Controller
{
	public function index(Request $request){
		$user = auth()->user();
        if($user->department_id == DepartmentEnum::ADMIN || $user->department_id == DepartmentEnum::INVENTORY ){
			$equipments = Equipment::all();
			return response()->json($equipments);
        }

		abort(401, 'Unauthorized action');

	}
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

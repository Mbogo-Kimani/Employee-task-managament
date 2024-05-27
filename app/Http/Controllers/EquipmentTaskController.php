<?php

namespace App\Http\Controllers;

use App\Enums\EquipmentsStatusEnum;
use App\Models\Equipment;
use App\Models\Task;
use Illuminate\Http\Request;

class EquipmentTaskController extends Controller
{
  public function store(Request $request) {
		$request->validate([
			'equipment_category' => 'required',
			'equipment_type' => 'required',
			'quantity' => 'required',
			'task' => 'required',
		]);

		$task = Task::find($request->task);
		$equipment = null;

		for ($i=0; $i < intval($request->quantity); $i++) { 
			$equipment = Equipment::where('equipment_type_id', $request->equipment_type)
														->where('equipment_category_id', $request->equipment_category)
														->where('status', EquipmentsStatusEnum::IN_STORAGE)
														->first();

			if ($task && $equipment) {
				$task->equipments()->attach($equipment->id);
				$equipment->status = EquipmentsStatusEnum::IN_USE;
				$equipment->save();	
			}
		}
		
		if (!$equipment || !$task) {
			return response()->json(['message' => 'Missing task or low stock error'], 422);
		} else {
			return response()->json(['message' => 'Assignment successful']);
		}
	}
}

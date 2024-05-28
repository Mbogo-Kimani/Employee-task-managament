<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use Illuminate\Http\Request;
use App\Models\Equipment;
use App\Enums\DepartmentEnum;
use App\Http\Resources\AssignedEquipmentResource;
use App\Http\Resources\EquipmentResourceCollection;
use App\Models\EquipmentType;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EquipmentController extends Controller
{
	public function index(Request $request){
		$user = auth()->user();
		if($user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER){
			try{
				$equipments = Equipment::paginate(20);
				$data = new EquipmentResourceCollection($equipments);
				return response()->json($data);
			}catch(\Exception $e){
				abort(400,$e);
			}
		}
        abort(401, 'Unauthorized');
	}
    public function store(Request $request){
        $request->validate([
			'name' => 'required|string|max:255',
			'equipment_type_id' => 'required',
			'equipment_category_id' => 'required',
            'quantity' => 'required|integer',
            'purchase_date' => 'required'
		]);

		foreach(range(1,$request->quality) as $count){
			Equipment::create([
				'name' => $request->name,
				'equipment_type_id' => $request->equipment_type_id,
				'equipment_category_id' => $request->equipment_category_id,
				'purchase_date' => $request->purchase_date
			]);
		};

		return response()->json(['message' => 'Equipment saved successfully']);
    }

	public function getAssignedEquipments(Request $request)
	{
		$tasksWithEquipments = Task::whereNotNull('user_id')->whereHas('equipments')->get();
		$result = [];
		foreach ($tasksWithEquipments as $task){
			foreach ($task->equipments as $equipment){
				$result[] = new AssignedEquipmentResource($equipment,$task);
			}	
		}
		return response()->json($result);
	}

	public function updateAssignment(Request $request)
	{
		$request->validate([
			'type' => 'required|string',
			'equipment_id' => 'required',
			'task_id' => 'required'
		]);
		$task = Task::find($request->task_id);
		if(!$task){
			throw new NotFoundHttpException('Task does not exist');
		}

		if($request->type === "assign"){
			$task->equipments()->updateExistingPivot($request->equipment_id, ['confirm_assigned' => true,'assigned_date' => Carbon::now()]);
		}else if($request->type === 'return'){
			$task->equipments()->detach($request->equipment_id);
		}

		return response()->json(['message' => 'Equipment updated succesfully']);
	}

	public function upload(Request $request)
	{
		$file = $request->file('file');

		if($file){
			$fileName = $file->getClientOriginalName();
			Storage::disk('public')->put($fileName, file_get_contents($file));
		}
	}

	public function update(Request $request)
	{
		$request->validate([
			'id' =>' required|exists:equipment',
            'name' => 'nullable|string|max:255',
			'serial_no' => 'nullable|string',
			'status' => 'integer',
            'purchase_date' => 'date',
			'equipment_type_id' => 'integer'
		]);

		try{
			if($request->equipment_type_id){
				$equipmentType = EquipmentType::find($request->equipment_type_id);
				$request['equipment_category_id'] = $equipmentType->equipment_category_id;
			}
			$values = $request->except(['model','manufacturer_name','category','categoryId']);
			Equipment::find($request->id)->update($values);
		}catch(\Exception $e){
			abort(400,'An error occurred');
		}

		return response()->json(['message' => 'Equipment updated successfully']);
		
	}
}

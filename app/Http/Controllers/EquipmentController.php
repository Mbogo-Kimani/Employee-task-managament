<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use Illuminate\Http\Request;
use App\Models\Equipment;
use App\Enums\DepartmentEnum;
use App\Enums\EquipmentsStatusEnum;
use App\Http\Resources\AssignedEquipmentResource;
use App\Http\Resources\EquipmentResourceCollection;
use App\Imports\InventoryImport;
use App\Mail\StockDepleted;
use App\Models\EquipmentType;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
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
		$tasksWithEquipments = Task::whereHas('users')->whereHas('equipments')->get();
		
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
			'task_id' => 'required',
			'serial_no' => 'nullable|string',
			'condition' => 'nullable|integer',
			'description' => 'nullable|string'
		]);

		$task = Task::find($request->task_id);

		$equipment = Equipment::find($request->equipment_id);
		if(!$task || !$equipment){
			throw new NotFoundHttpException('Item does not exist');
		}

		if($request->type === "assign"){
			$task->equipments()->updateExistingPivot($request->equipment_id, ['confirm_assigned' => true,'assigned_date' => Carbon::now()]);
			$equipment->status =  EquipmentsStatusEnum::IN_USE;
			if(!empty($request->serial_no)){
				$equipment->serial_no = $request->serial_no;
			}
			$this->checkStock($equipment);
			$equipment->save();
		}else if($request->type === 'return'){
			$task->equipments()->detach($request->equipment_id);
			if($request->condition){
				$equipment->status =  EquipmentsStatusEnum::IN_STORAGE;
			}else{
				$equipment->status =  EquipmentsStatusEnum::IN_MAINTENANCE;
			}
			$equipment->is_assigned = false;
			$equipment->description = $request->description;
			$equipment->save();
		}

		return response()->json(['message' => 'Equipment updated succesfully']);
	}

	public function upload(Request $request)
	{
		$file = $request->file('file');

		if($file){
			try{
				$fileName = $file->getClientOriginalName();
				Storage::disk('public')->put($fileName, file_get_contents($file));
				Excel::import(new InventoryImport, $file);
			}catch(\Exception $e){
				abort(400, $e);
			}			
		}else{
			return response()->json(['error' => 'Please upload file']);
		}

		return response()->json(['message' => 'File uploaded successfully']);
	}

	private function checkStock($equipment)
	{
		$equipmentsCount = Equipment::where('equipment_type_id', $equipment->equipment_type_id)->where('status', EquipmentsStatusEnum::IN_STORAGE)->count();
		$admin = User::where('department_id', DepartmentEnum::ADMIN)->first();
		$departmentLeader = User::where('department_id',DepartmentEnum::TECHNICIANS)->where('clearance_level',ClearanceLevelEnum::DEPARTMENT_LEADER)->first();

		$threshold = $equipment->equipmentType->min_stock;

		if($equipmentsCount <= $threshold){
           Mail::to($admin->email)->send(new StockDepleted(['category' => $equipment->equipmentCategory->name, 'model' => $equipment->equipmentType->spec_model, 'name' => $admin->name, 'count' => $equipmentsCount]));
           Mail::to($departmentLeader->email)->send(new StockDepleted(['category' => $equipment->equipmentCategory->name, 'model' => $equipment->equipmentType->spec_model, 'name' => $admin->name, 'count' => $equipmentsCount]));
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

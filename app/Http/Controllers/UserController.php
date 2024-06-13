<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use App\Enums\DepartmentEnum;
use App\Enums\TaskStatusEnum;
use App\Helpers\ApiLib;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserController extends Controller
{
	public function fetchUserNumbers() {
		$user = auth()->user();
		$totalTasks = 0;

		if ($user) {
			$totalTasks = Task::where('user_id', $user->id)
													->where('status', TaskStatusEnum::PENDING)
													->count();

			if ($user->role == DepartmentEnum::ADMIN) {
				// return response()->json(['users' => User::count()]);
			}
			else if ($user->clearance_level == ClearanceLevelEnum::DEPARTMENT_LEADER) {
				$tasksNotAssigned = Task::where('department_id', $user->department_id)
																->whereNull('user_id')
																->count();

				return response()->json(['totalTasks' => $totalTasks, 'tasksNotAssigned' => $tasksNotAssigned]);
			}
			else {
				return response()->json(['totalTasks' => $totalTasks]);
			}
		}
	}

	public function show(Request $request, $id) {
    $user = auth()->user();

		if (!$user || $user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->with(['message' => 'Does not exist']);
		}

		$user_to_send = User::find($id);

		if (!$user_to_send) {
			abort(404, 'User does not exist');
		}

		return response()->json($user_to_send);
	}

	public function updateUserDetails(Request $request) {
		$user = auth()->user();

		if (!$user || $user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->with(['message' => 'Action does not exist']);
		}

		$request->validate([
			'clearance_level' => 'required',
			'email' => 'required|string|email|max:255',
			'name' => 'required|string|max:255',
			'role' => 'required',
		]);

		$user_to_edit = User::find($request->id);
		$user_to_edit->name = $request->name;
		$user_to_edit->email = $request->email;
		$user_to_edit->role = $request->role;
		$user_to_edit->image = $request->image;
		$user_to_edit->department_id = $request->role;
		$user_to_edit->clearance_level = $request->clearance_level;
		$user_to_edit->save();

		return response()->json(['message' => 'Employee edit successful']);
	}

	public function deleteUser(Request $request, $id) {
		$user = auth()->user();

		if (!$user || $user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->with(['message' => 'Action does not exist']);
		}

		$user_to_delete = User::find($id);
		$user_to_delete->delete();
		return response()->json(['message' => 'Employee deleted successfully']);
	}

  public function adminEmployeesPage() {
    
    return Inertia::render('Admin/Employees');
    
  }

	public function index() {
		$users = User::paginate(20);
		return response()->json($users);
	}

	public function setPassword(Request $request){
		$request->validate([
			'password' => ['required', 'confirmed', Rules\Password::defaults()],
			'token' => 'required|string'
		]);

		$user = User::where('verification_token',$request->token)->first();

		if(!$user){
			throw new NotFoundHttpException('User not found');
		}
		$user->password = Hash::make($request->password);
		$user->save();

		return response()->json(['message' => 'Password has been set succesfully']);
	}

	public function clearanceLevels() {
		return response()->json([
			[
				'name' => 'Department Leader',
				'enum_key' => 'DEPARTMENT_LEADER',
				'enum_id' => ClearanceLevelEnum::DEPARTMENT_LEADER,
			],
			[
				'name' => 'Normal Employee',
				'enum_key' => 'REGULAR_EMPLOYEE',
				'enum_id' => ClearanceLevelEnum::REGULAR_EMPLOYEE,
			],
		]);
	}

	public function store(Request $request)
  {
		$request->validate([
			'clearance_level' => 'required',
			'email' => 'required|string|email|max:255|unique:'.User::class,
			'name' => 'required|string|max:255',
			'password' => ['required', 'confirmed', Rules\Password::defaults()],
			'role' => 'required',
			'phone_number' => 'required|string'
		]);
		$user = User::create([
			'clearance_level' => $request->clearance_level,
			'email' => $request->email,
			'name' => $request->name,
			'password' => Hash::make($request->password),
			'verification_token' => ApiLib::createVerificationToken(24),
			'role' => $request->role,
			'department_id' => $request->role,
			'phone_number' => $request->phone_number,
		]);
		Mail::to($user->email)->send(new \App\Mail\EmailVerification($user));
		return response()->json($user);
  }

	public function update(Request $request)
	{
		$request->validate([
			'email' => 'required|string|email|max:255',
			'name' => 'required|string|max:255',
		]);

		$auth_user = auth()->user();
		
		if ($auth_user) {
			$user = User::find($auth_user->id);
			$user->name = $request->name;
			$user->email = $request->email;

			if ($request->password) {
				$request->validate(['password' => ['confirmed', Rules\Password::defaults()]]);
				$user->password = Hash::make($request->password);
			}
			$user->save();

			return response()->json(['message' => 'User updated successfully']);
		}
		abort(400, 'User not found');
	}

	public function navigateToAdminUserTasks() {
		return Inertia::render('Admin/Employees/UserId/Tasks');
	}

	public function navigateToProfile() {
		$user = auth()->user();
		return Inertia::render('Profile', compact('user'));
	}

	public function allTasksPage() {
		return Inertia::render('Admin/Tasks');
	}

	public function showReports() {
		return Inertia::render('Admin/Reports');
	}

	public function newTaskPage() {

		return Inertia::render('Admin/NewTask');
	}

	public function newEquipmentsPage() 
  	{

		return Inertia::render('Inventory/NewEquipment');
	}

	public function equipmentsPage() {

		return Inertia::render('Inventory/Equipments');
	}

	public function assignedEquipmentsPage() 
	{
		return Inertia::render('Inventory/AssignedEquipments');
	}

	public function unassignedTasksPage() {

		return Inertia::render('UnassignedTasks');
	}

	public function assignedTasksPage() {

		return Inertia::render('AssignedTasks');
	}

	public function getUsersByDepartment() {
		$user = auth()->user();

		if ($user && $user->clearance_level === ClearanceLevelEnum::DEPARTMENT_LEADER) {
			$users = User::where('department_id', $user->department_id)
										->select('name', 'id')
										->get();

			return response()->json($users);
		}
	}

	public function authLoginPage () {
		return Inertia::render('Auth/Login');
	}

	public function changePasswordPage () {
		return Inertia::render('Auth/ChangePassword');
	}

	public function mapsPage(){

		return Inertia::render('Admin/Maps');
	}

	public function employeesStatsPage(){
		return Inertia::render('Admin/Employees/Stats');
	}


	public function dashboard(Request $request) {
    return Inertia::render('Dashboard');
  }

	public function tasksPage () {
		return Inertia::render('Tasks');
	}

	public function stocksPage () {
		return Inertia::render('Inventory/Stock');
	}
  
  
  /**
   *  @unauthenticated
   */
	public function login(Request $request)
  {
		$request->validate([
			'email' => 'required|email',
			'password' => 'required|string|min:6',
		]);
        
		$credentials = $request->except('_token');

    $login = auth()->attempt($credentials);
    if ($login) {
      $user = auth()->user();
      $user = new UserResource($user);
      $token = $request->user()->createToken('token_auth')->plainTextToken;;
      return response()->json(['message' => 'Login Successful','token' => $token, 'user' => $user]);
    }

		return response()->json(['email' => 'Invalid user email or password'], 401);
    // return redirect()->back()->withErrors();
  }

	public function logout(Request $request)
  {
    $request->user()->tokens()->delete();
    // auth()->user()->tokens()->delete();
		return response()->json(['message' => 'Logout was successful']);
  }

	public function getAdmins() {
		$admins = User::where('department_id', DepartmentEnum::ADMIN)->get();
		return response()->json($admins);
	}

	public function getDepartmentHeads($department_id) {
		if ($department_id) {
			$department_heads = User::where('department_id', $department_id)
															->where('clearance_level', ClearanceLevelEnum::DEPARTMENT_LEADER)
															->get();
			return response()->json($department_heads);
		}
	}

	public function getAllHandlers($department_id) {
		if ($department_id) {
			$admins = User::where('department_id', DepartmentEnum::ADMIN)->get();
			$department_heads = User::where('department_id', $department_id)
															->where('clearance_level', ClearanceLevelEnum::DEPARTMENT_LEADER)
															->get();

			return response()->json(['admins' => $admins, 'departmentHeads' => $department_heads]);
		}
	}
}

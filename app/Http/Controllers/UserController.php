<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use App\Enums\DepartmentEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
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

	public function delete(Request $request, $id) {
		$user = auth()->user();

		if (!$user || $user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->with(['message' => 'Action does not exist']);
		}

		$user_to_delete = User::find($id);
		$user_to_delete->delete();
		return response()->json(['message' => 'Employee deleted successfully']);
	}

  public function adminEmployeesPage() {
    $user = auth()->user();

		if ($user && $user->role == DepartmentEnum::ADMIN) {
			return Inertia::render('Admin/Employees', compact('user'));
		}
    
		return redirect('/dashboard')->with(['error' => 'Page does not exist']);
  }

	public function index() {
		$users = User::paginate(20);
		return response()->json($users);
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
		]);

		$user = User::create([
			'clearance_level' => $request->clearance_level,
			'email' => $request->email,
			'name' => $request->name,
			'password' => Hash::make($request->password),
			'role' => $request->role,
			'department_id' => $request->role,
		]);
		Mail::to($user->email)->send(new \App\Mail\EmailVerification());
		return response()->json($user);
  }

	public function update(Request $request)
	{
		$request->validate([
			'email' => 'required|string|email|max:255',
			'name' => 'required|string|max:255',
			'password' => ['confirmed', Rules\Password::defaults()],
		]);
		$user = auth()->user();
		
		if ($user) {
			// Update the user's attributes
			$user->update([
				'name' => $request->name,
				'email' => $request->email,
				'password' => Hash::make($request->password)
			]);
		
			// Return a response indicating success
			return response()->json(['message' => 'User updated successfully']);
		}
		abort(400, 'User not found');
	}
	public function navigateToAdminUserTasks() {
		$user = auth()->user();
		return Inertia::render('Admin/Employees/UserId/Tasks', compact('user'));
	}

	public function navigateToProfile() {
		$user = auth()->user();
		return Inertia::render('Profile', compact('user'));
	}

	public function allTasksPage() {
		$user = auth()->user();
		
		if ($user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}
		return Inertia::render('Admin/Tasks', compact('user'));
	}

	public function showReports() {
		$user = auth()->user();
		
		if ($user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}
		return Inertia::render('Admin/Reports', compact('user'));
	}

	public function newTaskPage() {
		$user = auth()->user();
		
		if ($user->role !== DepartmentEnum::ADMIN || $user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}

		return Inertia::render('Admin/NewTask', compact('user'));
	}

	public function newEquipmentsPage() {
		$user = auth()->user();
		
		if ($user->role !== DepartmentEnum::INVENTORY || $user->clearance_level !== ClearanceLevelEnum::DEPARTMENT_LEADER) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}

		return Inertia::render('Inventory/NewEquipment', compact('user'));
	}

	public function equipmentsPage() {
		$user = auth()->user();
		
		if ($user->role !== DepartmentEnum::INVENTORY || $user->clearance_level !== ClearanceLevelEnum::DEPARTMENT_LEADER) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}

		return Inertia::render('Inventory/Equipments', compact('user'));
	}

	public function unassignedTasksPage() {
		$user = auth()->user();

		if ($user && $user->clearance_level !== ClearanceLevelEnum::DEPARTMENT_LEADER) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}

		return Inertia::render('UnassignedTasks', compact('user'));
	}

	public function assignedTasksPage() {
		$user = auth()->user();

		if ($user && $user->clearance_level !== ClearanceLevelEnum::DEPARTMENT_LEADER) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}

		return Inertia::render('AssignedTasks', compact('user'));
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

	public function login(Request $request)
  {
		$request->validate([
			'email' => 'required|email',
			'password' => 'required|string|min:6',
		]);
        
		$credentials = $request->except('_token');

    $login = auth()->attempt($credentials);
    if ($login) {
      return response()->json(['message' => 'Login Successful']);
    }

		abort(401, 'Invalid user email or password');
    // return redirect()->back()->withErrors();
  }

	public function logout()
  {
    auth()->logout();
		return response()->json(['message' => 'Logout was successful']);
  }
}

<?php

namespace App\Http\Controllers\Backend;

use App\Enums\ClearanceLevelEnum;
use App\Enums\DepartmentEnum;
use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\Designation;
use App\Models\Employee;
use App\Models\SalaryStructure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function loginPage()
    {
        return view('admin.pages.AdminLogin.adminLogin');
    }

    public function logout()
    {

        auth()->logout();
        // notify()->success('Successfully Logged Out');
        return redirect('/auth/login');
    }


    public function list()
    {
        $users = User::all();
        $employee = Employee::first(); // Fetches the first employee
        return view('admin.pages.Users.list', compact('users', 'employee'));
    }


    public function createForm($employeeId)
    {
        $employee = Employee::find($employeeId);

        if (!$employee) {
            return redirect()->back()->withErrors('Employee not found');
        }

        return view('admin.pages.Users.createForm', compact('employee'));
    }


    public function userProfile($id)
    {
        $user = User::with('employee')->find($id);
        $employee = $user->employee ?? null;
        $departments = Department::all();
        $designations = Designation::all();
        $salaries = SalaryStructure::all();
        return view('admin.pages.Users.userProfile', compact('user', 'employee', 'departments', 'designations', 'salaries'));
    }

    // single  profile

    public function myProfile()
    {
        $user = Auth::user();
        if ($user->employee) {
            $employee = $user->employee;
            $departments = Department::all();
            $designations = Designation::all();
            $salaries = SalaryStructure::all();
            return view('admin.pages.Users.employeeProfile', compact('user', 'employee', 'departments', 'designations', 'salaries'));
        } else {
            return view('admin.pages.Users.nonEmployeeProfile', compact('user'));
        }
    }

    // user delete

    public function userDelete($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
        }

        notify()->success('User Deleted Successfully.');
        return redirect()->back();
    }

    // User edit, update

    public function userEdit($id)
    {
        $user = User::find($id);
        $employee = Employee::find($id);
        return view('admin.pages.Users.editUser', compact('user', 'employee'));
    }


    public function userUpdate(Request $request, $id)
    {


        $user = User::find($id);

        if ($user) {

            $fileName = $user->image;
            if ($request->hasFile('user_image')) {
                $file = $request->file('user_image');
                $fileName = date('Ymdhis') . '.' . $file->getClientOriginalExtension();

                $file->storeAs('/uploads', $fileName);
            }

            $user->update([
                'name' => $request->name,
                'role' => $request->role,
                'image' => $fileName,
                'email' => $request->email,
                'password' => bcrypt($request->password),

            ]);
            // Find associated employee using the email and assign user_id to employee
            $employee = Employee::where('email', $request->email)->first();
            if ($employee) {
                $employee->user_id = $user->id;
                $employee->save();
            }

            notify()->success('User updated successfully.');
            return redirect()->route('users.list');
        }
    }

    // Search User
    public function searchUser(Request $request)
    {
        $searchTerm = $request->search;
        if ($searchTerm) {
            $users = User::where('name', 'LIKE', '%' . $searchTerm . '%')
                ->orWhere('email', 'LIKE', '%' . $searchTerm . '%')
                ->orWhere('role', 'LIKE', '%' . $searchTerm . '%')
                ->get();
        } else {
            $users = User::all();
        }

        return view('admin.pages.Users.searchUserList', compact('users'));
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
      
		return response()->json($user);
  }

	public function navigateToAdminUserTasks() {
		$user = auth()->user();
		return Inertia::render('Admin/Employees/User/Tasks', compact('user'));
	}

	public function allTasksPage() {
		$user = auth()->user();
		
		if ($user->role !== DepartmentEnum::ADMIN || $user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}
		return Inertia::render('Admin/Tasks', compact('user'));
	}

	public function newTaskPage() {
		$user = auth()->user();
		
		if ($user->role !== DepartmentEnum::ADMIN || $user->role !== DepartmentEnum::ADMIN) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}

		return Inertia::render('Admin/NewTask', compact('user'));
	}

	public function unassignedTasksPage() {
		$user = auth()->user();

		if ($user && $user->clearance_level !== ClearanceLevelEnum::DEPARTMENT_LEADER) {
			return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
		}

		return Inertia::render('UnassignedTasks', compact('user'));
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
}

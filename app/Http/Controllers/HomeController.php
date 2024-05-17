<?php

namespace App\Http\Controllers;

use App\Enums\ClearanceLevelEnum;
use App\Enums\DepartmentEnum;
use App\Enums\TaskStatusEnum;
use App\Models\Contact;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{

  public function home(Request $request,$id)
  {
    $users = User::count();

    $pendingLeaves = 0; // Default value for pending leaves

		$tasks = 0;
		$totalTasks = 0;
    $user = User::find($id);

    if (!$user) {
			return redirect('/auth/login');
    }

    if ($user && $user->role == DepartmentEnum::ADMIN) {

		} else if ($user && $user->clearance_level == ClearanceLevelEnum::DEPARTMENT_LEADER) {
      $totalTasks = Task::where('user_id', $user->id)
                    ->where('status', TaskStatusEnum::PENDING)
                    ->count();

      $tasksNotAssigned = Task::where('department_id', $user->department_id)
                              ->whereNull('user_id')
                              ->count();

			return Inertia::render('Dashboard', compact('user', 'totalTasks', 'tasksNotAssigned'));
    }
    
    else {
      $totalTasks = Task::where('user_id', $user->id)
                  ->where('status', TaskStatusEnum::PENDING)
                  ->count();

			return Inertia::render('Dashboard', compact('user', 'totalTasks'));
    }

   
    return Inertia::render('Dashboard', compact('user', 'users', 'totalTasks'));
  }

	public function tasksPage () {
		return Inertia::render('Tasks');
	}



    public function showHeader()
    {

        // Fetch the logged-in user
        $user = auth()->user();

        return view('admin.partials.header', compact('user'));
    }
}

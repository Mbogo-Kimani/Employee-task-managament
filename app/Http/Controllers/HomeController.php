<?php

namespace App\Http\Controllers;

use App\Enums\DepartmentEnum;
use App\Enums\TaskStatusEnum;
use App\Models\Contact;

use App\Models\Task;
use Inertia\Inertia;

class HomeController extends Controller
{

  public function home()
  {
    // $employees = User::count();
    // $departments = Department::count();

    $pendingLeaves = 0; // Default value for pending leaves

		$tasks = 0;
		$totalTasks = 0;
    $user = auth()->user();

    if (!$user) {
			return redirect('/login');
    }

    if ($user && $user->role === DepartmentEnum::ADMIN) {

		} else {
      $tasks = Task::where('user_id', $user->id)
                  ->where('status', TaskStatusEnum::PENDING)
                  ->paginate(10);

			$totalTasks = $tasks->count();

			return Inertia::render('Dashboard', compact('user', 'tasks', 'totalTasks'));
    }

    // $users = User::count();
    // $completedOnTimeTasks = Task::where('status', 'completed on time')->count();
    // $completedInLateTasks = Task::where('status', 'completed in late')->count();
    // $totalCompletedTasks = $completedOnTimeTasks + $completedInLateTasks;

    // $totalTasks = Task::count() - $totalCompletedTasks;

    // Now you can use $totalTasks in your view or wherever needed
    // return view('admin.dashboard', compact('user', 'employees', 'departments', 'pendingLeaves', 'users', 'totalTasks'));
    return Inertia::render('Dashboard', compact('user', 'employees', 'departments', 'pendingLeaves', 'users', 'totalTasks'));
  }

	public function tasksPage () {
		$user = auth()->user();
		return Inertia::render('Tasks', compact('user'));
	}



    public function showHeader()
    {

        // Fetch the logged-in user
        $user = auth()->user();

        return view('admin.partials.header', compact('user'));
    }


    // contact message
    public function message()
    {
        $messages = Contact::all();
        return view('admin.pages.contactMessage.contactMessage', compact('messages'));
    }
}

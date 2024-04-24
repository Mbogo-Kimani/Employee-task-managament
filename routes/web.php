<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskReportController;
use App\Http\Controllers\TaskTypeController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Website or Frontend
Route::get('/', function () {
    return view('welcome');
});

Route::get('/products', function () {
    return view('products');
});
Route::get('/blogs', function () {
    return view('blog');
});
Route::get('/about-us', function () {
    return view('aboutus');
});
Route::get('/index', function () {
    return view('welcome');
});
Route::get('/contact', function () {
    return view('contact');
});

Route::post('/login', [UserController::class, 'login'])->name('admin.login.post');
// Route::get('/login', [UserController::class, 'loginPage'])->name('admin.login');
Route::get('/auth/login', [UserController::class, 'authLoginPage'])->name('login');

Route::group(['middleware' => 'auth'], function () {
  
	Route::group(['middleware' => ['auth', 'IsEmployee']], function () {
    Route::get('/myProfile', [UserController::class, 'myProfile'])->name('profile');
  });

  Route::post('/logout', [UserController::class, 'logout'])->name('admin.logout');
  Route::get('/dashboard', [HomeController::class, 'home'])->name('dashboard');
  Route::get('/notifications', function () {
    return Inertia::render('Notification');
})->name('dashboard');

  Route::get('/tasks', [HomeController::class, 'tasksPage']);
  Route::get('/api/tasks', [TaskController::class, 'index']);
  Route::get('/api/pending_tasks', [TaskController::class, 'getPending']);

  Route::post('/api/task_reports', [TaskReportController::class, 'store']);

  Route::get('/admin/employees', [UserController::class, 'adminEmployeesPage']);
  Route::get('/api/employees', [UserController::class, 'index']);
  Route::get('/api/departments', [DepartmentController::class, 'index']);
  Route::get('/api/clearance_levels', [UserController::class, 'clearanceLevels']);

  Route::post('/api/user', [UserController::class, 'store']);

  Route::get('/admin/employees/{user_id}/tasks', [UserController::class, 'navigateToAdminUserTasks']);
  Route::get('/admin/tasks', [UserController::class, 'allTasksPage']);
  Route::get('/admin/new_task', [UserController::class, 'newTaskPage']);
  Route::get('/api/admin/reports', [TaskReportController::class, 'getReports']);

  Route::get('/api/tasks/{user_id}', [TaskController::class, 'tasksByUser']);
  Route::post('/api/tasks', [TaskController::class, 'store']);
  Route::get('/api/all_tasks', [TaskController::class, 'allTasks']);
  Route::delete('/api/task/{id}', [TaskController::class, 'deleteTask']);
  Route::put('/api/task/', [TaskController::class, 'updateTask']);
  Route::patch('/api/task/{id}', [TaskController::class, 'updateFeedBack']);

  Route::get('/api/task_types', [TaskTypeController::class, 'index']);
  Route::post('/api/task_types', [TaskTypeController::class, 'store']);

  Route::get('/unassigned_tasks', [UserController::class, 'unassignedTasksPage']);
  Route::get('/assigned_tasks', [UserController::class, 'assignedTasksPage']);
  Route::get('/api/unassigned_tasks', [TaskController::class, 'getUnassignedTasks']);
  Route::get('/api/assigned_tasks', [TaskController::class, 'getAssignedTasks']);
  Route::get('/api/department_users', [UserController::class, 'getUsersByDepartment']);
  Route::patch('/api/tasks', [TaskController::class, 'update']);

  Route::get('/api/report/{id}', [TaskReportController::class, 'show']);
  Route::patch('/api/report', [TaskReportController::class, 'update']);
});


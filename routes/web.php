<?php

use App\Http\Controllers\CircularController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\NotificationController;
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
Route::post('/auth/change_password', [UserController::class, 'setPassword']);
Route::get('/change_password', [UserController::class, 'changePasswordPage'])->name('change_password');
Route::get('/token', function () {
    return csrf_token(); 
});
Route::group(['middleware' => 'auth'], function () {
  
	Route::group(['middleware' => ['auth', 'IsEmployee']], function () {
    Route::get('/myProfile', [UserController::class, 'myProfile'])->name('profile');
  });

  Route::post('/logout', [UserController::class, 'logout'])->name('admin.logout');
  Route::get('/dashboard', [HomeController::class, 'home'])->name('dashboard');

  Route::get('/tasks', [HomeController::class, 'tasksPage']);
  Route::get('/api/tasks', [TaskController::class, 'index']);
  Route::get('/api/pending_tasks', [TaskController::class, 'getPending']);

  Route::post('/api/task_reports', [TaskReportController::class, 'store']);
  Route::get('/reports/new', [TaskReportController::class, 'newReportPage']);

  Route::get('/admin/employees', [UserController::class, 'adminEmployeesPage']);
  Route::get('/api/employees', [UserController::class, 'index']);
  Route::get('/api/departments', [DepartmentController::class, 'index']);
  Route::get('/api/clearance_levels', [UserController::class, 'clearanceLevels']);

  Route::get('/profile', [UserController::class, 'navigateToProfile']);
  Route::post('/api/user', [UserController::class, 'store']);
	Route::get('/api/user/{id}', [UserController::class, 'show']);
	Route::patch('/api/user', [UserController::class, 'updateUserDetails']);
	Route::delete('/api/user/{id}', [UserController::class, 'delete']);
  Route::put('/api/user', [UserController::class, 'update']);
	Route::get('/api/admins', [UserController::class, 'getAdmins']);
	Route::get('/api/department_heads/{department_id}', [UserController::class, 'getDepartmentHeads']);
	Route::get('/api/admin_department_handlers/{department_id}', [UserController::class, 'getAllHandlers']);

  Route::get('/admin/employees/{user_id}/tasks', [UserController::class, 'navigateToAdminUserTasks']);
  Route::get('/admin/tasks', [UserController::class, 'allTasksPage']);
  Route::get('/admin/new_task', [UserController::class, 'newTaskPage']);
  Route::get('/admin/reports', [UserController::class, 'showReports']);
  Route::get('/api/admin/reports', [TaskReportController::class, 'getReports']);
  Route::get('/api/admin/tasks', [TaskController::class, 'getTasksByUsers']);
  Route::get('/admin/employees/stats', [UserController::class, 'employeesStatsPage']);

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
  Route::post('/api/filter/tasks', [TaskController::class, 'filterTasks']);
  Route::patch('/api/tasks/{id}', [TaskController::class, 'unassignTask']);

  Route::get('/api/report/{id}', [TaskReportController::class, 'show']);
  Route::patch('/api/report', [TaskReportController::class, 'update']);

  Route::post('/api/received_by_department_head', [TaskController::class, 'markTaskReceivedByHOD']);
  Route::post('/api/received_by_department_member', [TaskController::class, 'markTaskReceivedByUser']);

  Route::get('/new_equipment',[UserController::class, 'newEquipmentsPage']);
  Route::get('/equipments',[UserController::class, 'equipmentsPage']);
  Route::post('/api/equipments', [EquipmentController::class, 'store']);
  Route::get('/api/equipments', [EquipmentController::class, 'index']);


  Route::get('/admin/circulars/new_circular', [CircularController::class, 'create']);
  Route::post('/api/circular', [CircularController::class, 'store']);
	Route::get('/notifications', [CircularController::class, 'notificationsPage']);
	Route::get('/api/circulars', [CircularController::class, 'index']);

	Route::get('/api/notifications', [NotificationController::class, 'index']);
	Route::get('/api/unread_notifications_count', [NotificationController::class, 'unreadNotificationsCount']);
	Route::post('/api/mark_as_read', [NotificationController::class, 'markAsRead']);

  Route::get('api/clients',[ClientController::class, 'index']);
  Route::post('api/client',[ClientController::class, 'store']);
  Route::patch('api/client',[ClientController::class, 'update']);
  Route::delete('api/client/{id}',[ClientController::class, 'deleteClient']);
  Route::get('admin/clients',[ClientController::class, 'clientsPage']);

  Route::get('/admin/maps',[UserController::class, 'mapsPage']);
});


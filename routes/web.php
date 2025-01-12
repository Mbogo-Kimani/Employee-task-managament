<?php

use App\Http\Controllers\CircularController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskReportController;
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
  return redirect('/auth/login');
});

Route::get('/products', function () {
  return Inertia::render('home/Products');
});

Route::get('/blogs', function () {
  return view('blog');
});
Route::get('/client/signup', [UserController::class, 'clientSignupPage'])->name('signup');
Route::get('/about-us', function () {
  return view('aboutus');
});
Route::get('/index', function () {
  return view('welcome');
});
Route::get('/contact', function () {
  return view('contact');
});

// Route::post('/api/login', [UserController::class, 'login'])->name('admin.login.post');
// Route::get('/login', [UserController::class, 'loginPage'])->name('admin.login');
Route::get('/auth/login', [UserController::class, 'authLoginPage'])->name('login');
Route::post('/auth/change_password', [UserController::class, 'setPassword']);
Route::get('/change_password', [UserController::class, 'changePasswordPage'])->name('change_password');


Route::middleware('auth:sanctum')->group(function () {
  Route::get('/myProfile', [UserController::class, 'myProfile'])->name('profile');
});
Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');


Route::get('/tasks', [UserController::class, 'tasksPage']);
Route::get('/reports/new', [TaskReportController::class, 'newReportPage']);

Route::get('/admin/employees', [UserController::class, 'adminEmployeesPage']);
// Route::get('/api/employees', [UserController::class, 'index']);
// Route::get('/api/departments', [DepartmentController::class, 'index']);
// Route::get('/api/clearance_levels', [UserController::class, 'clearanceLevels']);

Route::get('/profile', [UserController::class, 'navigateToProfile']);

Route::get('/admin/employees/{user_id}/tasks', [UserController::class, 'navigateToAdminUserTasks']);
Route::get('/admin/tasks', [UserController::class, 'allTasksPage']);
Route::get('/admin/new_task', [UserController::class, 'newTaskPage']);
Route::get('/admin/reports', [UserController::class, 'showReports']);
// Route::get('/api/admin/reports', [TaskReportController::class, 'getReports']);
Route::get('/admin/employees/stats', [UserController::class, 'employeesStatsPage']);

// Route::get('/api/tasks/{user_id}', [TaskController::class, 'tasksByUser']);
// Route::post('/api/tasks', [TaskController::class, 'store']);
// Route::get('/api/all_tasks', [TaskController::class, 'allTasks']);
// Route::delete('/api/task/{id}', [TaskController::class, 'deleteTask']);
// Route::put('/api/task/', [TaskController::class, 'updateTask']);
// Route::patch('/api/task/{id}', [TaskController::class, 'updateFeedBack']);
Route::get('/task/{task_id}', [TaskController::class, 'tasksViewPage']);

// Route::get('/api/task_types', [TaskTypeController::class, 'index']);
// Route::post('/api/task_types', [TaskTypeController::class, 'store']);

Route::get('/unassigned_tasks', [UserController::class, 'unassignedTasksPage']);
Route::get('/assigned_tasks', [UserController::class, 'assignedTasksPage']);

Route::get('/new_equipment', [UserController::class, 'newEquipmentsPage']);
Route::get('/equipments', [UserController::class, 'equipmentsPage']);
Route::get('/assigned-equipments', [UserController::class, 'assignedEquipmentsPage']);
Route::get('/equipments/stocks', [UserController::class, 'stocksPage']);

Route::get('/admin/circulars/new_circular', [CircularController::class, 'create']);
Route::get('/notifications', [CircularController::class, 'notificationsPage']);

Route::get('/admin/clients', [ClientController::class, 'clientsPage']);
Route::get('/clients', [ClientController::class, 'salesClientsPage']);
Route::get('/clients/verify', function () {
  return Inertia::render('Auth/ClientOTP');
});
Route::get('/client/checkout', function () {
  return Inertia::render('Client/Checkout');
});
Route::get('/feedback/new', [ClientController::class, 'clientFeedbackPage']);

Route::get('/admin/maps', [UserController::class, 'mapsPage']);

Route::get('/finance/accounts', [UserController::class, 'accountsPage']);
Route::get('/finance/transactions', [UserController::class, 'transactionsPage']);

Route::get('/client/connected', function () {
  return Inertia::render('Client/Connected');
});

/**
 * Hotspot Management Routes
 */

Route::get('/hotspot/dashboard', function () {
  return Inertia::render('Hotspot/dashboard');
});
Route::get('/sessions/active', function () {
  return Inertia::render('Hotspot/sessions');
});
Route::get('/hotspot/clients', function () {
  return Inertia::render('Hotspot/clients');
});
Route::get('/hotspot/plans', function () {
  return Inertia::render('Hotspot/packages');
});
Route::get('/hotspot/transactions', function () {
  return Inertia::render('Hotspot/transactions');
});
Route::get('/hotspot/client/new', function () {
  return Inertia::render('Hotspot/new_client');
});
Route::get('/hotspot/plan/new', function () {
  return Inertia::render('Hotspot/new_package');
});
Route::get('/hotspot/tickets', function () {
  return Inertia::render('Hotspot/tickets');
});

<?php

use App\Http\Controllers\CircularController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskReportController;
use App\Http\Controllers\TaskTypeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});
Route::get('/token', function () {
  return response()->json('Token exposed'); 
});
Route::post('/login', [UserController::class, 'login'])->name('admin.login.post');

// Route::post('/tasks', [TaskController::class, '']);
Route::middleware('auth:sanctum')->group( function () {
  /**
   * Tasks controller
   */
  Route::get('/all_tasks', [TaskController::class, 'allTasks']);
  Route::post('/filter/tasks', [TaskController::class, 'filterTasks']);
  Route::patch('/tasks/{id}', [TaskController::class, 'unassignTask']);
  Route::get('/tasks', [TaskController::class, 'index']);
  Route::get('/pending_tasks', [TaskController::class, 'getPending']);
  Route::get('/unassigned_tasks', [TaskController::class, 'getUnassignedTasks']);
  Route::get('/assigned_tasks', [TaskController::class, 'getAssignedTasks']);
  Route::get('/department_users', [UserController::class, 'getUsersByDepartment']);
  Route::patch('/tasks', [TaskController::class, 'update']);
  Route::get('/task_types', [TaskTypeController::class, 'index']);
  Route::post('/task_types', [TaskTypeController::class, 'store']);
  Route::delete('/task/{id}', [TaskController::class, 'deleteTask']);
  Route::put('/task', [TaskController::class, 'updateTask']);
  Route::patch('/task/{id}', [TaskController::class, 'updateFeedBack']);
  Route::get('/tasks/{user_id}', [TaskController::class, 'tasksByUser']);
  Route::post('/tasks', [TaskController::class, 'store']);
  
  /**
   * Employees Controllers
   */
  Route::get('/employees', [UserController::class, 'index']);
  Route::put('/user', [UserController::class, 'update']);
	Route::delete('/user/{id}', [UserController::class, 'delete']);
  Route::post('/user', [UserController::class, 'store']);
	Route::get('/user/{id}', [UserController::class, 'show']);
	Route::patch('/user', [UserController::class, 'updateUserDetails']);
  Route::post('/received_by_department_head', [TaskController::class, 'markTaskReceivedByHOD']);
  Route::post('/received_by_department_member', [TaskController::class, 'markTaskReceivedByUser']);
  /**
   * Clients Controllers
  */
  Route::get('/clients',[ClientController::class, 'index']);
  Route::post('/client',[ClientController::class, 'store']);
  Route::patch('/client',[ClientController::class, 'update']);
  Route::delete('/client/{id}',[ClientController::class, 'deleteClient']);
  
  /**
   * Enums Controllers
   */
  Route::get('/departments', [DepartmentController::class, 'index']);
  Route::get('/clearance_levels', [UserController::class, 'clearanceLevels']);

  /**
   * Admin Controllers
   */
  Route::get('/admins', [UserController::class, 'getAdmins']);
	Route::get('/department_heads/{department_id}', [UserController::class, 'getDepartmentHeads']);
	Route::get('/admin_department_handlers/{department_id}', [UserController::class, 'getAllHandlers']);
  Route::get('/admin/reports', [TaskReportController::class, 'getReports']);
  Route::get('/admin/tasks', [TaskController::class, 'getTasksByUsers']);

  /**
   * Equipments Controllers
   */
  Route::post('/equipments', [EquipmentController::class, 'store']);
  Route::get('/equipments', [EquipmentController::class, 'index']);
  
  /**
   * Circulars Controllers
   */
  Route::post('/circular', [CircularController::class, 'store']);
	Route::get('/circulars', [CircularController::class, 'index']);

  /**
   * Notiifcations Controller
   */
  Route::get('/notifications', [NotificationController::class, 'index']);
	Route::get('/unread_notifications_count', [NotificationController::class, 'unreadNotificationsCount']);
	Route::post('/mark_as_read', [NotificationController::class, 'markAsRead']);
  
  /**
   * Task Reports Controllers
   */
  Route::post('/task_reports', [TaskReportController::class, 'store']);
  Route::get('/report/{id}', [TaskReportController::class, 'show']);
  Route::patch('/report', [TaskReportController::class, 'update']);
  
  /**
   * Logout Controller
   */
  Route::post('/logout', [UserController::class, 'logout'])->name('admin.logout');
  

});

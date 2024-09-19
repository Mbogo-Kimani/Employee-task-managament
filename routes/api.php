<?php

use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\CircularController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EquipmentCategoryController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EquipmentStockController;
use App\Http\Controllers\EquipmentTaskController;
use App\Http\Controllers\EquipmentTypeController;
use App\Http\Controllers\InternetPackageController;
use App\Http\Controllers\MapLineController;
use App\Http\Controllers\MapPointController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\StreetPackageController;
use App\Http\Controllers\StreetPlanController;
use App\Http\Controllers\RouterController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskMessageController;
use App\Http\Controllers\TaskReportController;
use App\Http\Controllers\TaskTypeController;
use App\Http\Controllers\UserController;
use App\Models\EquipmentType;
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
Route::post('/payment-callback', [PaymentController::class, 'paymentCallback']);

// Route::post('/tasks', [TaskController::class, '']);
Route::middleware('auth:sanctum')->group( function () {
  /**
   * Tasks controller
   */
  Route::get('/all_tasks', [TaskController::class, 'allTasks']);
  Route::post('/filter/tasks', [TaskController::class, 'filterTasks']);
  Route::patch('/tasks/{task_id}', [TaskController::class, 'unassignTask']);
  Route::get('/tasks', [TaskController::class, 'index']);
  Route::get('/pending_tasks', [TaskController::class, 'getPending']);
  Route::get('/unassigned_tasks', [TaskController::class, 'getUnassignedTasks']);
  Route::get('/assigned_tasks', [TaskController::class, 'getAssignedTasks']);
  Route::get('/department_users', [UserController::class, 'getUsersByDepartment']);
  Route::patch('/tasks', [TaskController::class, 'update']);
  Route::patch('/tasks-equipments', [TaskController::class, 'updateTaskEquipment']);
  Route::get('/task_types', [TaskTypeController::class, 'index']);
  Route::post('/task_types', [TaskTypeController::class, 'store']);
  Route::delete('/task/{task_id}', [TaskController::class, 'deleteTask']);
  Route::put('/task', [TaskController::class, 'updateTask']);
  Route::patch('/task/{task_id}', [TaskController::class, 'updateFeedBack']);
  Route::get('/tasks/{user_id}', [TaskController::class, 'tasksByUser']);
  Route::post('/tasks', [TaskController::class, 'store']);
  
  /**
   * Employees Controllers
   */
  Route::get('/employees', [UserController::class, 'index']);
  Route::put('/user', [UserController::class, 'update']);
	Route::delete('/user/{user_id}', [UserController::class, 'deleteUser']);
  Route::post('/user', [UserController::class, 'store']);
	Route::get('/user/{user_id}', [UserController::class, 'show']);
	Route::patch('/user', [UserController::class, 'updateUserDetails']);
  Route::post('/received_by_department_head', [TaskController::class, 'markTaskReceivedByHOD']);
  Route::post('/received_by_department_member', [TaskController::class, 'markTaskReceivedByUser']);
  Route::get('/user_info', [UserController::class, 'fetchUserNumbers']);
  Route::get('/work_numbers', [UserController::class, 'salesPersonWorkNumbers']);
  /**
   * Clients Controllers
  */
  Route::get('/clients',[ClientController::class, 'index']);
  Route::post('/client',[ClientController::class, 'store']);
  Route::patch('/client',[ClientController::class, 'update']);
  Route::delete('/client/{client_id}',[ClientController::class, 'deleteClient']);
  Route::get('/sales_clients',[ClientController::class, 'salesClients']);
  Route::get('/unassigned_clients',[ClientController::class, 'getUnassignedClients']);
  Route::patch('/assign_clients',[ClientController::class, 'assignClients']);
  Route::post('clients/upload',[ClientController::class, 'uploadClients']);
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
  Route::get('/equipments/assigned',[EquipmentController::class, 'getAssignedEquipments']);
  Route::patch('/equipment/update',[EquipmentController::class, 'updateAssignment']);
  Route::patch('/equipment/edit',[EquipmentController::class, 'update']);
  Route::post('/equipments/upload', [EquipmentController::class, 'upload']);
  Route::get('/equipments/stocks',[EquipmentStockController::class, 'index']);
  Route::patch('/equipments/stocks/update',[EquipmentStockController::class, 'updateThreshold']);

  Route::post('/equipment_categories/new', [EquipmentCategoryController::class, 'store']);
  Route::get('/equipment_categories', [EquipmentCategoryController::class, 'index']);
  Route::get('/equipment_types/{equipment_category_id}', [EquipmentTypeController::class, 'index']);
  Route::post('equipment_types/new', [EquipmentTypeController::class, 'store']);
  Route::post('/equipment_assignment', [EquipmentTaskController::class, 'store']);
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
  Route::get('/report/{task_id}', [TaskReportController::class, 'show']);
  Route::patch('/report', [TaskReportController::class, 'update']);
  
  /**
   * Messages
   */
  Route::get('/get_task/{task_id}', [TaskController::class, 'show']);
  Route::get('/task_messages/{task_id}', [TaskController::class, 'getTaskMessages']);
  Route::post('/messages', [TaskMessageController::class, 'store']);


  /**
   * Logout Controller
   */
  Route::post('/logout', [UserController::class, 'logout'])->name('admin.logout');
  
  /**
   * Maps Controller
   */
  Route::get('/map_points', [MapPointController::class, 'index']);
  Route::post('/map_points', [MapPointController::class, 'store']);

  Route::get('/map_lines', [MapLineController::class, 'index']);
  Route::post('/map_lines', [MapLineController::class, 'store']);

  /**
   * 
   */
  Route::get('/internet_packages', [InternetPackageController::class, 'index']);
  Route::get('/apartment_codes', [ApartmentController::class, 'index']);
  Route::post('/apartment_codes', [ApartmentController::class, 'store']);

  
});
Route::get('/get-client', [ClientController::class, 'getClientCookie']);
Route::post('clients/signup',[ClientController::class, 'clientSignup']);
Route::post('clients/login',[ClientController::class, 'clientLogin']);
Route::post('clients/verify',[ClientController::class, 'verifyPhoneNumber']);
Route::get('client/subscriptions',[ClientController::class, 'getClientSubscriptions']);
/**
 * Payment Controller
 */
Route::post('/mpesa/payment', [PaymentController::class, 'stkPush']);
Route::get('/generate_token', [PaymentController::class, 'get_token']);
Route::get('transaction',[PaymentController::class, 'getTransaction']);
Route::get('transactions',[PaymentController::class, 'getTransactions']);

Route::post('/get_active_packages', [StreetPlanController::class, 'getActivePackages']);

Route::get('/street_packages', [StreetPackageController::class, 'index']);

/**
 * Router Controller
 */
Route::get('/connect', [RouterController::class, 'connect']);
Route::post('/subscribe', [RouterController::class, 'subscribe']);
Route::get('/hotspot/users', [RouterController::class, 'subscribe']);
Route::post('/register/client',[RouterController::class, 'registerUser']);
Route::post('/hotspot/login',[RouterController::class, 'hotspotLogin']);


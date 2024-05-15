<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\TaskController;
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
  Route::get('/all_tasks', [TaskController::class, 'allTasks']);
  Route::get('/clients',[ClientController::class, 'index']);
  Route::get('/employees', [UserController::class, 'index']);
  Route::get('/departments', [DepartmentController::class, 'index']);
  Route::get('/clearance_levels', [UserController::class, 'clearanceLevels']);
  Route::post('/logout', [UserController::class, 'logout'])->name('admin.logout');
  Route::post('/filter/tasks', [TaskController::class, 'filterTasks']);

});

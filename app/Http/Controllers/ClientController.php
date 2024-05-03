<?php

namespace App\Http\Controllers;

use App\Enums\DepartmentEnum;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::ADMIN){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }
        $clients = Client::all();
        return response()->json($clients);
    }

    public function clientsPage(Request $request)
    {
        $user = auth()->user();
		return Inertia::render('Admin/Employees/UserId/Tasks', compact('user'));
    }
}

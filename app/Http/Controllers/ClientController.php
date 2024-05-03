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
		return Inertia::render('Admin/Clients', compact('user'));
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::ADMIN){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }

        $request->validate([
            'id' =>' required|exists:clients',
            'name' => 'string|max:255',
            'email' => 'email|unique',
            'phone_number' => 'string|max:255',
            'address' => 'string',
            'resident_building' => 'string',
            'resident_hse_no' => 'string',
            'payment_date' => 'date',
            'payment_method' => 'required_if_accepted:payment_date',
            'payment_plan' => 'required_if_accepted:payment_date',
        ]);

        try{
            $client =  Client::find($request->id);
            $client->update($request->all());
            return response()->json(['message' => 'Client has been updated successfully']);
        }catch(\Exception $e){
            abort(400, $e);
        }
        
    }

    public function deleteClient(Request $request, $id)
    {
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::ADMIN){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }

        try{
            $client = Client::findOrFail($id);
            $client->delete();
            return response()->json(['message' => 'Client has been deleted']);
        }catch( \Exception $e){
            abort(400, $e);
        }
    }
}


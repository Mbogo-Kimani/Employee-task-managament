<?php

namespace App\Http\Controllers;

use App\Enums\DepartmentEnum;
use App\Helpers\ApiLib;
use App\Imports\ClientImport;
use App\Imports\InventoryImport;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ClientController extends Controller
{
    public function clientSignup(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients',
            'phone_number' => 'required|string|max:15',
		]);
        $client = Client::where('phone_number',$request->phone_number)->first();
        if($client){
            return response()->json(['success' => false, 'message' => 'User already exists.']);
        }
        try{
             Client::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'verification_code' => ApiLib::createOTPVerificationCode(4)
            ]);
        } catch(\Exception $e){
            abort(400, $e->getMessage());
        }
        return response()->json(['success' => true, 'message' => 'Verification code sent'], 200);

    }

    public function clientLogin(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|string|max:15',
		]);
        $client = Client::where('phone_number',$request->phone_number)->first();
        if(!$client){
            return response()->json(['success' => false, 'message' => 'User does not exist.']);
        }

        $client->update([
            'verification_code' => ApiLib::createOTPVerificationCode(4)
        ]);
        
        return response()->json(['success' => true, 'message' => 'Verification code sent'], 200);

    }

    public function verifyPhoneNumber(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|string|max:15',
            'otp' => 'required|string'
        ]);

        $client = Client::where('phone_number', $request->phone_number)->first();
        if(!$client || $client->verification_code != $request->otp){
            return response()->json(['error' => 'Invalid verification code'], 400);
        }
        $client->verified = true;
        $client->save();
        return response()->json(['success' => 'Phone number verified successfully'], 200);
    }
    public function clientFeedbackPage() {
		return Inertia::render('Feedback/New');
    }

    public function index(Request $request)
    {
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::ADMIN && $user->department_id !== DepartmentEnum::ACCOUNTING_AND_FINANCE && $user->department_id !== DepartmentEnum::SALES){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }
        if($user->department_id == DepartmentEnum::SALES){
            return response()->json(Client::latest()->get());
        }
        $clients = Client::latest()->paginate(10);
        return response()->json($clients);
    }

    public function assignClients(Request $request)
    {
        $request->validate([
            'user' => 'required',
        ]);

        foreach ($request->clients as $client) {
            Client::where('id', $client)->update(['employee_id' => $request->user]);
        }
		return response()->json(['message' => 'Clients assigned successfuly']);
    }

    public function getUnassignedClients() {
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::SALES){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }
        $clients = Client::where('employee_id', null)->get();
        return response()->json($clients);
    }

    public function salesClients() {
        $user = auth()->user();
        if ($user->department_id == DepartmentEnum::SALES) {
            $clients = Client::where('employee_id', $user->employee_id)->paginate(10);
            return response()->json($clients);
        }
    }

    public function clientsPage(Request $request)
    {
		return Inertia::render('Admin/Clients');
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::ADMIN && $user->department_id !== DepartmentEnum::ACCOUNTING_AND_FINANCE){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }

        $request->validate([
            'acc_no' => 'required',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients',
            'phone_number' => 'required|string|max:255',
            'address' => 'required|string',
            'apartment_no' => 'required|string',
            'connection_status' => 'required',
            'billing_day' => 'required|required_if_accepted:status',
            'employee_id' => 'required|string',
		]);

		$client = Client::create($request->all());
      
		return response()->json(['message' => 'Client created successfuly','client' => $client]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        if($user->department_id !== DepartmentEnum::ADMIN && $user->department_id !== DepartmentEnum::ACCOUNTING_AND_FINANCE){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }

        $request->validate([
            'id' =>' required|exists:clients',
            'acc_no' => 'required',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone_number' => 'required|string|max:255',
            'address' => 'required|string',
            'apartment_no' => 'required|string',
            'connection_status' => 'required',
            'billing_day' => 'required|required_if_accepted:status',
            'employee_id' => 'required|string',
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
        if($user->department_id !== DepartmentEnum::ADMIN && $user->department_id !== DepartmentEnum::ACCOUNTING_AND_FINANCE){
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

    public function salesClientsPage() {
        return Inertia::render('Clients');
    }

    public function uploadClients(Request $request)
	{
		$file = $request->file('file');
		if($file){
			try{
				$fileName = $file->getClientOriginalName();
				Storage::disk('public')->put($fileName, file_get_contents($file));
                Excel::import(new ClientImport, $file);

			}catch(\Exception $e){
				abort(400, $e);
			}			
		}else{
			return response()->json(['error' => 'Please upload file']);
		}

		return response()->json(['message' => 'File uploaded successfully']);
	}
}


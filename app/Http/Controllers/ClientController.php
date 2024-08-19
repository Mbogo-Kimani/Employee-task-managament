<?php

namespace App\Http\Controllers;

use AfricasTalking\SDK\AfricasTalking;
use App\Enums\DepartmentEnum;
use App\Helpers\ApiLib;
use App\Imports\ClientImport;
use App\Imports\InventoryImport;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Stevebauman\Hypertext\Transformer;

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
        $verification_code = ApiLib::createOTPVerificationCode(4);
        try{
            Client::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'verification_code' => $verification_code
            ]);
            $this->sendOTP($request->phone_number,$verification_code);
            
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
        $phone_number = '+254' . $request->phone_number;
        $client = Client::where('phone_number','+254' . $request->phone_number)->first();
        if(!$client){
            return response()->json(['success' => false, 'message' => 'User does not exist.']);
        }
        $verification_code = ApiLib::createOTPVerificationCode(4);
        $client->update([
            'verification_code' => $verification_code
        ]);
        $this->sendOTP($phone_number,$verification_code);

        return response()->json(['success' => true, 'message' => 'Verification code sent'], 200);

    }

    public function verifyPhoneNumber(Request $request)
    {
        $request->validate([
            'phoneNumber' => 'required|string|max:15',
            'otp' => 'required|string'
        ]);

        $client = Client::where('phone_number', $request->phoneNumber)->first();
        if(!$client || $client->verification_code != $request->otp){
            return response()->json(['error' => 'Invalid verification code'], 400);
        }
        $client->is_verified = true;
        $client->save();

        $clientDetails = [
                'id' => $client->id,
                'name' => $client->name,
                'email' => $client->email,
                'phone_number' => $client->phone_number,
                'is_registered_hotspot' => $client->is_registered_hotspot
        ];
        $cookie = cookie('client_details', json_encode($clientDetails), 60);

        return response()->json(['success' => true,'client' => $client], 200)->cookie($cookie);
    }

    public function getClientCookie(Request $request)
    {
        return response()->json(['client' => json_decode(request()->cookie('client_details'))]);
    }
    private function sendOTP($phone_number,$verification_code)
    {
        $content = View::make('emails.otp_verification', ['otp' => $verification_code])->render();
        $text = (new Transformer)
        ->keepLinks() 
        ->keepNewLines()
        ->toText($content);

        $username = config('sms.username'); // use 'sandbox' for development in the test environment
        $apiKey   = config('sms.api_key'); // use your sandbox app API key for development in the test environment
        $AT       = new AfricasTalking($username, $apiKey);

        // Get one of the services
        $sms      = $AT->sms();

        // Use the service
        $result   = $sms->send([
            'to'      => $phone_number,
            'message' => $text,
            'from' => env('AT_SHORTCODE')
        ]);
        return $result;

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


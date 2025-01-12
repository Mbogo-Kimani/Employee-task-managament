<?php

namespace App\Http\Controllers;

use App\Enums\DepartmentEnum;
use App\Models\Client as ModelsClient;
use App\Models\InternetPackage;
use App\Models\StreetPackage;
use App\Models\Subscription;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PEAR2\Net\RouterOS\Client;
use PEAR2\Net\RouterOS\Response;
use PEAR2\Net\RouterOS\Util;
use PEAR2\Net\RouterOS\Query;
use PEAR2\Net\RouterOS\Request as RouterOsRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RouterController extends Controller
{
    public function connect()
    {
        $client = [];
        try{
            $client = new Client(config('router.ip'), config('router.user'), config('router.password'));
            echo "Connection successfull";
            
            $responses = $client->sendSync(new RouterOsRequest('/ip/arp/print'));
            
            foreach ($responses as $response) {
                if ($response->getType() === Response::TYPE_DATA) {
                    echo 'IP: ', $response->getProperty('address'),
                    ' MAC: ', str_replace(':', '-',$response->getProperty('mac-address')),
                    "\n";
                }
            }
        }catch (\Exception $e){
            abort(400,$e);
        }
        
    }
    
    public function subscribe(Request $request)
    {
        $request->validate([ 
            'transaction_id' => 'required_without:subscription_id|exists:subscriptions,transaction_id',
            'subscription_id' => 'required_without:transaction_id'
        ]);

        $client = [];
        if($request->transaction_id){
            $subscription = Subscription::where('transaction_id', $request->transaction_id)->first();
        }else{
            $subscription = Subscription::find($request->subscription_id);
        }
        
       if(!$subscription->profile_assigned){
        try{
            $client = new Client(config('router.ip'), config('router.user'), config('router.password'));
            
            $activate_profile = new RouterOsRequest('/user-manager/user-profile/add');
            $activate_profile
            ->setArgument('profile', $subscription->streetPackage->profile_name)
            ->setArgument('user', $subscription->client->name);
            $response = $client->sendSync($activate_profile);
            if ($response->getType() == Response::TYPE_ERROR){
                return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
            }
            $user_login =  new RouterOsRequest('/ip/hotspot/active/login');
            $user_login
            ->setArgument('user', $subscription->client->name)
            ->setArgument('password', $subscription->client->phone_number)
            ->setArgument('mac-address', $request->mac ?? $this->getMac())
            ->setArgument('ip', $request->ip);
            $loginResponse = $client->sendSync($user_login);
            if ($loginResponse->getType() == Response::TYPE_ERROR){
                return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
            }
            // dd($user_login);
            $subscription->profile_assigned = true;
            $subscription->devices = [$request->mac];
            $subscription->expires_at = Carbon::now()->addSeconds($subscription->streetPackage->duration);
            $subscription->save();

            return response()->json(['success' => true, 'message' => 'User subscribed successfully.']);
        }catch (\Exception $e){
            abort(400,$e);

        }
        }
        
    }

    public function registerUser(Request $request)
    {
        $userData = $request->validate([
            'client_id' => 'required',
            'devices' => 'required',
        ]);
        
        $mac = exec('getmac');
        $userData['mac_address'] = explode(" ", $mac)[0];
        $userData['ip_address'] = $request->ip();
        

        $customer = ModelsClient::find($request->client_id);
        $password = str_replace('+254', '0', $customer->phone_number);
        $password = str_replace(' ', '', $password);

        try{
            $client = new Client(config('router.ip'), config('router.user'), config('router.password'));

            $addRequest = new RouterOSRequest('/user-manager/user/add');
                $addRequest
                ->setArgument('disabled', 'no')
                ->setArgument('name', $customer->name)
                ->setArgument('password', $customer->phone_number)
                ->setArgument('shared-users', $request->devices);
    
            $response = $client->sendSync($addRequest);
            if ($response->getType() == Response::TYPE_ERROR){
                return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
            }
            $customer->is_registered_hotspot = true;
            $customer->save();
            return response()->json(['success' => true]);
        }catch(Exception $e){
            abort(400, $e);
        }

    }

    public function updateUser(Request $request)
    {
        $request->validate([
            'new_name' => 'required',
            'old_name' => 'required',
            'phone_number' => 'required'
        ]);

        $client = new Util(new Client(config('router.ip'), config('router.user'), config('router.password')));
        $client->setMenu('/user-manager/user');

        $updateResponse = $client->set(
            $client->find(
                function ($response) use ($request){
                    return $response->getProperty('name') == $request->old_name;
                }
            ),
            array(
                'name' => $request->new_name,
                'password' => $request->phone_number
            )
        );
        if ($updateResponse->getType() == Response::TYPE_ERROR){
            return response()->json(['success' => false, 'message' => $updateResponse->getProperty('message')]);
        }

        return response()->json(['success' => true]);
    }

    public function hotspotLogin(Request $request)
    {
        $request->validate([
            'mac' => 'required',
            'subscription_id' => 'required|exists:subscriptions,id'
        ]);
        
        $subscription = Subscription::find($request->subscription_id);
        try{
            $client = new Client(config('router.ip'), config('router.user'), config('router.password'));
           
            $user_login =  new RouterOsRequest('/ip/hotspot/active/login');
            $user_login
            ->setArgument('user', $subscription->client->name)
            ->setArgument('password', $subscription->client->phone_number)
            ->setArgument('mac-address', $request->mac ?? $this->getMac())
            ->setArgument('ip', $this->getIP($client,$request->mac));
            $response = $client->sendSync($user_login);
            // dd($response->getProperty('message'));
            if ($response->getType() == Response::TYPE_ERROR){
                return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
            }
            $devices = json_decode($subscription->devices);
            
            if(is_array($devices)){
                if(!in_array($request->mac, $devices)){
                    $devices[] = $request->mac;
                }
            }else{
                $devices = [$request->mac];
            }
            
            $subscription->devices = $devices;
            $subscription->save();

            return response()->json(['success' => true, 'message' => 'You are now connected ']);

        }catch(Exception $e){
            abort(400, $e);
            
        }
    }

    public function freeTrial(Request $request)
    {
        $request->validate([
            'client_id' => 'required',
            'mac' => 'required'
        ]);
       
        $customer =  ModelsClient::find($request->client_id);
        if(!$customer->is_free_trial){
        try{
            $client = new Client(config('router.ip'), config('router.user'), config('router.password'));
            $subscription = Subscription::create([
                'client_id' => $customer->id,
                'street_package_id' => 16,
                'username' => $customer->name,
                'password' => $customer->phone_number,
                'status' => 1,
                'expires_at' => Carbon::now()->addSeconds(16),
                // 'profile_assigned' => true,
                // 'devices' => [$request->mac]
                ]);
                
            $activate_profile = new RouterOsRequest('/user-manager/user-profile/add');
            $activate_profile
            ->setArgument('profile', 'TRIAL')
            ->setArgument('user', $customer->name);
            
            $response = $client->sendSync($activate_profile);
            if ($response->getType() == Response::TYPE_ERROR){
                return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
            }
            $user_login =  new RouterOsRequest('/ip/hotspot/active/login');
            $user_login
            ->setArgument('user', $customer->name)
            ->setArgument('password', $customer->phone_number)
            ->setArgument('mac-address', $request->mac ?? $this->getMac())
            ->setArgument('ip', $this->getIP($client,$request->mac));
            $loginResponse = $client->sendSync($user_login);
            if ($loginResponse->getType() == Response::TYPE_ERROR){
                return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
            }
            // dd($user_login);
            $subscription->profile_assigned = true;
            $subscription->devices = [$request->mac];
            $subscription->save();

            $customer->is_free_trial = true;
            $customer->save();
            return response()->json(['success' => true , 'message' => 'User subscribed successfully.']);
        }catch (\Exception $e){
            abort(400,$e);

        }
        }else{
            return response()->json(['success' => false , 'message' => 'Your Free Trial is already used']);
        }
    }

    private function getIP($client, $mac_address)
    {
        
          //  $mac_address = $this->getMac();
            $responses = $client->sendSync(new RouterOsRequest('/ip/arp/print'));
            
            foreach ($responses as $response) {
              
                if ($response->getType() === Response::TYPE_DATA) {
                    if($response->getProperty('mac-address') == $mac_address){
                        return $response->getProperty('address');
                    }
                }
            }
    }

    private function getMac()
    {
        $mac = shell_exec('getmac');
        // Regular expression to match MAC addresses
        $pattern = '/([A-F0-9]{2}-){5}[A-F0-9]{2}/i';

        
        preg_match_all($pattern, $mac, $matches);

        if (!empty($matches[0])) {
           return $matches[0][0];
        }
    }

    public function getActiveSessions()
    {
        
        try{
            // $client = new Util(new Client(config('router.ip'), config('router.user'), config('router.password')));
            $client = new Client(config('router.ip'), config('router.user'), config('router.password'));
        
            $request = new RouterOsRequest('/user-manager/session/print');
           
            $sessions = $client->sendSync($request);
            $data = [];
            
            foreach($sessions as $session)
            {
                if($session->getProperty('active') == "true"){

                    $sessionObj['user'] = $session->getProperty('user'); 
                    $sessionObj['ip'] = $session->getProperty('user-address'); 
                    $sessionObj['mac'] = $session->getProperty('calling-station-id');
                    $sessionObj['started_at'] = $session->getProperty('started'); 
                   
                    $data[] = $sessionObj;
                }
            }
            return response()->json($data);
        }catch(Exception $e){
            abort(400,$e);
        }
    }

    public function getUserActiveSessions(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $client = new Util(new Client(config('router.ip'), config('router.user'), config('router.password')));
        $client->setMenu('/user-manager/session');
        $count = $client->count(Query::where('status', 'start')->andWhere('user',$request->name));
        
        return response()->json(['count' => $count]);
    }

    public function getHotspotUsers()
    {
        $client = new Client(config('router.ip'), config('router.user'), config('router.password'));        
        $request = new RouterOsRequest('/user-manager/user/print');
        $users = $client->sendSync($request);
        $data = [];
        foreach($users as $user){
            $response['id'] = $user->getProperty('.id');
            $response['name'] = $user->getProperty('name');
            $data[] = $response;
        }
        
        return response()->json($data);
    }

    public function getHotspotClients(Request $request)
    {
        $user = $request->user();
        if($user->department_id !== DepartmentEnum::ADMIN){
            return redirect('/dashboard')->withErrors(['message' => 'You are not allowed to view this page']);
        }
        $clients = ModelsClient::where('is_registered_hotspot', true)->with(['streetPackage','subscriptions'])->latest()->paginate(10);

        // foreach($clients as $user){
        //     $client = new Util(new Client(config('router.ip'), config('router.user'), config('router.password')));
        //     $client->setMenu('/user-manager/session');
        //     $count = $client->count(Query::where('status', 'start')->andWhere('user',$user->name));
        //     $user['sessions'] = $count;
        // }
        return response()->json($clients);
    }

    public function getActiveProfiles()
    {
        $client = new Util(new Client(config('router.ip'), config('router.user'), config('router.password')));
        $client->setMenu('/user-manager/user-profile');
        $count = $client->count(Query::where('state', 'running-active'));
        return response()->json(['count' => $count]);
    }

    public function removeSession(Request $request,$mac)
    {
        $client = new Util(new Client(config('router.ip'), config('router.user'), config('router.password')));
        $client->setMenu('/user-manager/session');
        $response = $client->remove(Query::where('calling-station-id', $mac));
        if($response->getType() !== Response::TYPE_FINAL){
            return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
        }
        return response()->json(['success' => true, 'message' => 'Sessions deleted successfully']);
    }

    public function addHotspotUser(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone_number' => 'required',
            'street_package_id' => 'required'
        ]);
        
        $customer = ModelsClient::where('phone_number',$request->phone_number)->orWhere('email', $request->email)->first();
	        
        if($customer){
            return response()->json(['success' => false, 'message' => 'User already exists.']);
        }
        $customer = ModelsClient::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'street_package_id' => $request->street_package_id
        ]);

        Subscription::create([
            'client_id' => $customer->id,
            'street_package_id' => $request->street_package_id,
            'username'  => $customer->name,
            'password' => $customer->phone_number,
            'status' => 1,
            'expires_at' => Carbon::now()->addSeconds(16)
        ]);

        try{
            $client = new Client(config('router.ip'), config('router.user'), config('router.password'));

            $addRequest = new RouterOSRequest('/user-manager/user/add');
                $addRequest
                ->setArgument('disabled', 'no')
                ->setArgument('name', $customer->name)
                ->setArgument('password', $customer->phone_number)
                ->setArgument('shared-users', $customer->streetPackage->devices);
    
            $response = $client->sendSync($addRequest);
            if ($response->getType() == Response::TYPE_ERROR){
                return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
            }
            $customer->is_registered_hotspot = true;
            $customer->save();
            return response()->json(['success' => true]);
        }catch(Exception $e){
            abort(400, $e);
        }

    }

    public function deleteUser(Request $request, $client_id)
    {
        $customer = ModelsClient::find($client_id);
        if(!$customer){
            return response()->json(['error' => 'Client does not exist']);
        }
        try{
            $client = new Util(new Client(config('router.ip'), config('router.user'), config('router.password')));
            $client->setMenu('/user-manager/user');
            $response = $client->remove(Query::where('name', $customer->name));
            if($response->getType() !== Response::TYPE_FINAL){
                return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
            }
            $customer->delete();
            return response()->json(['success' => true, 'message' => 'User deleted successfully']);
        }catch(Exception $e){
            abort(400,$e);
        }
    }

    
}

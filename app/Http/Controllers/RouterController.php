<?php

namespace App\Http\Controllers;

use App\Models\Client as ModelsClient;
use App\Models\InternetPackage;
use App\Models\StreetPackage;
use App\Models\Subscription;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PEAR2\Net\RouterOS\Client;
use PEAR2\Net\RouterOS\Response;
use PEAR2\Net\RouterOS\Request as RouterOsRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RouterController extends Controller
{
    public function connect()
    {
        $client = [];
        try{
            $client = new Client('10.244.251.62', 'admin', 'pass');
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
            'transaction_id' => 'required|exists:subscriptions,transaction_id',
        ]);

        $client = [];
        $subscription = Subscription::where('transaction_id', $request->transaction_id)->first();
        
       if(!$subscription->profile_assigned){
        try{
            $client = new Client('10.244.251.62', 'admin', 'pass');
            
            $activate_profile = new RouterOsRequest('/user-manager/user-profile/add');
            $activate_profile
            ->setArgument('profile', $subscription->streetPackage->profile_name)
            ->setArgument('user', $subscription->client->name);
            $client->sendSync($activate_profile);
            $user_login =  new RouterOsRequest('/ip/hotspot/active/login');
            $user_login
            ->setArgument('user', $subscription->client->name)
            ->setArgument('password', $subscription->client->phone_number)
            ->setArgument('mac-address', $request->mac ?? $this->getMac())
            ->setArgument('ip', $request->ip);
            $client->sendSync($user_login);
            // dd($user_login);
            $subscription->profile_assigned = true;
            $subscription->devices = [$request->mac];
            $subscription->expires_at = Carbon::now()->addSeconds($subscription->streetPackage->duration);
            $subscription->save();

            return response()->json(['message' => 'User subscribed successfully.']);
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
//	dd($customer);
        try{
            $client = new Client('10.244.251.62', 'admin', 'pass');

            $addRequest = new RouterOSRequest('/user-manager/user/add');
                $addRequest
                ->setArgument('disabled', 'no')
                ->setArgument('name', $customer->name)
                ->setArgument('password', $customer->phone_number)
                ->setArgument('shared-users', $request->devices);
    
            $client->sendSync($addRequest);
            $customer->is_registered_hotspot = true;
            $customer->save();
            return response()->json(['success' => true]);
        }catch(Exception $e){
            abort(400, $e);
        }

    }

    public function hotspotLogin(Request $request)
    {
        $request->validate([
            'mac' => 'required',
            'subscription_id' => 'required|exists:subscriptions,id'
        ]);
        
        $subscription = Subscription::find($request->subscription_id);
        try{
            $client = new Client('10.244.251.62', 'admin', 'pass');

            $user_login =  new RouterOsRequest('/ip/hotspot/active/login');
            $user_login
            ->setArgument('user', $subscription->client->name)
            ->setArgument('password', $subscription->client->phone_number)
            ->setArgument('mac-address', $request->mac ?? $this->getMac())
            ->setArgument('ip', $this->getIP($client,$request->mac));
            $client->sendSync($user_login);

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
            
            return response()->json(['success' => true]);

        }catch(Exception $e){
            abort(400, $e);
            
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
    
}

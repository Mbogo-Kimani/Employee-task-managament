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
            $client = new Client('192.168.88.1', 'admin', '1234');
            echo "Connection successfull";
            
            $responses = $client->sendSync(new RouterOsRequest('/ip/arp/print'));
            
            foreach ($responses as $response) {
                if ($response->getType() === Response::TYPE_DATA) {
                    
                    echo 'IP: ', $response->getProperty('address'),
                    ' MAC: ', $response->getProperty('mac-address'),
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
            'subscription_id' => 'required|exists:subscriptions,id',
        ]);

        $client = [];
        $subscription = Subscription::find($request->subscription_id);
       

        try{
            $client = new Client('192.168.88.1', 'admin', '1234');

            
            $activate_profile = new RouterOsRequest('/user-manager/user-profile/add');
            $activate_profile
            ->setArgument('profile', $subscription->streetPackage->profile_name)
            ->setArgument('user', $subscription->client->name);
            $client->sendSync($activate_profile);
            
            
            $subscription->profile_assigned = true;
            $subscription->expires_at = Carbon::now()->addSeconds($subscription->streetPackage->duration);
            $subscription->save();

            return response()->json(['message' => 'User subscribed successfully.']);
        }catch (\Exception $e){
            abort(400,$e);
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
            $client = new Client('192.168.88.1', 'admin', '1234');

            
            $addRequest = new RouterOSRequest('/user-manager/user/add');
                $addRequest
                ->setArgument('disabled', 'no')
                ->setArgument('name', $customer->name)
                ->setArgument('password', $password)
                ->setArgument('shared-users', $request->devices);
    
            $client->sendSync($addRequest);
            $customer->is_registered_hotspot = true;
            $customer->save();
            return response()->json(['success' => true]);
        }catch(Exception $e){
            abort(400, $e);
        }

    }
    
}

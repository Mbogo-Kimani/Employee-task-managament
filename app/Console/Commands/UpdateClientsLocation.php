<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class UpdateClientsLocation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:customer-location';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update clients location to Meteor Gardens';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Splynx API credentials
        $apiUrl = env('SPLYNX_API_URL'); 
        $apiKey = env('SPLYNX_API_TOKEN'); 

        $params = [
            'main_attributes' => [
                'login' => ['LIKE', 'NG001'],
            ],
        ];
        $this->info(http_build_query($params));

        // Fetch clients
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . $apiKey,
        ])->get($apiUrl . '/admin/customers/customer'. "?" . http_build_query($params));
        // $this->info($response);
        if ($response->successful()) {
            $clients = $response->json();
            $thirdOctet = 131;
            $fourthOctet = 246;
            foreach ($clients as $client) {
                //Update client location_id
                $clientId = $client['id'];
                // $clientId = 217;
                $this->info("Client ID {$clientId}");
                $updateClientLocation = Http::withHeaders([
                    'Authorization' => 'Basic ' . $apiKey,
                ])->put($apiUrl . "/admin/customers/customer/" . $clientId, [
                    'location_id' => 1,
                ]);
                $updateClientLocation = Http::withHeaders([
                    'Authorization' => 'Basic ' . $apiKey,
                ])->put($apiUrl . "/admin/customers/customer/" . $clientId, [
                    'partner_id' => 1,
                ]);

                if ($updateClientLocation->successful()){
                    $this->info("Client ID {$clientId} updated successfully.");
                }else{
                    $this->error('Failed to update Client Location.');
                }
                
                $clientServices = Http::withHeaders([
                    'Authorization' => 'Basic ' . $apiKey,
                ])->get("{$apiUrl}/admin/customers/customer/{$clientId}/internet-services");
                
                
                if ($clientServices->successful()) {
                    $clientServices = $clientServices->json();
                    foreach($clientServices as $clientService){
                        if($fourthOctet > 249){
                            $fourthOctet = 5;
                            $thirdOctet++;
                        }
                        if($clientService['status'] == 'active'){
                            $ip = "192.168.". $thirdOctet . ".". $fourthOctet++;
                            $this->info("Client service: {$clientService['id']}.");
                            $this->info("Client service IP: {$ip}.");
                            $updateClientService = Http::withHeaders([
                                'Authorization' => 'Basic ' . $apiKey,
                            ])->put("{$apiUrl}/admin/customers/customer/{$clientId}/internet-services--{$clientService['id']}", [
                                'router_id' => 7,
                                'ipv4' => $ip,
                            ]);
                            $this->info($updateClientService);
                            if($updateClientService->successful()){
                                $this->info("Client Service ID {$clientService['id']} updated successfully.");
                            }else{

                                $this->error('Failed to update Client Service.'); 
                            }
                        }
                        
                    }
                        
                    
                } else {
                    $this->error("Failed to fetch Services for Client ID {$clientId}.");
                }
            }
        } else {
            $this->error('Failed to fetch clients from Splynx API.');
        }
    }
}

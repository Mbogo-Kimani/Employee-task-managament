<?php

namespace App\Console\Commands;

use App\Enums\ClientStatusEnum;
use App\Models\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class UpdateClients extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:clients';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update the status of clients from splynx';

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

        // Fetch clients
        $response = Http::withHeaders([
            'Authorization' => 'Basic ' . $apiKey,
        ])->get($apiUrl . '/admin/customers/customer');

        $this->info(count($response->json()));

        if($response->successful()){
            $clients = $response->json();
            // $this->info($response);
            foreach($clients as $client){
                $phoneNumber = ltrim($client['phone'], '0');
                $matchingClient = Client::where('acc_no', $client['login'])
                ->orWhere('email', $client['email'])
                ->orWhere('phone_number', 'LIKE', "%$phoneNumber%")
                ->first();
                if($matchingClient){
                    if($client['status'] ==  'active'){
                        $matchingClient->connection_status = ClientStatusEnum::ONLINE;
                    }else if($client['status'] ==  'blocked'){
                        $matchingClient->connection_status = ClientStatusEnum::BLOCKED;
                    }else{
                        $matchingClient->connection_status = ClientStatusEnum::ONLINE_LAST_24_HOURS;
                    }
                    $matchingClient->save();
                }
                // $this->info($matchingClient);
                // $this->info($client['name']);
            }
        }
        
        return Command::SUCCESS;
    }
}

<?php

namespace App\Imports;

use App\Models\Client;
use App\Models\InternetPackage;
use DateTime;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\WithHeadingRow;


class ClientImport implements ToCollection, SkipsEmptyRows, WithHeadingRow
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        $data = [];

            foreach ($collection as $row){
                $data[] = [
                    'splynx_id' => $row['id'],
                    'connection_status' => $row['status'],
                    'phone_number' => $row['phone_number'],
                    'package_id' => $row['internet_plans'],
                    'IP' => $row['ips'],
                    'full_name' => $row['full_name'],
                    'acc_no' => $row['portal_login'],
                    'billing_day' => $row['billing_day_automatic_document_date'],
                ];
            }
        $this->processData($data);
    }

    public function processData($data)
    {
        foreach($data as $client){
            $client['connection_status'] = $client['connection_status'] = "Online" ? 1 : 3;
            $client['package_id'] = InternetPackage::where('capacity' ,strtolower(str_replace(' ', '', $client['package_id'])))->pluck('id')->first();
            $client['billing_day'] = $this->convertDate($client['billing_day']);

            $existingClient = Client::where('splynx_id',$client['splynx_id'])->first();
            
            if(!$existingClient){
                Client::create([
                    'name' => $client['full_name'],
                    'splynx_id' => $client['splynx_id'],
                    'phone_number' => $client['phone_number'] || '+254',
                    'connection_status' => $client['connection_status'],
                    'billing_day' => $client['billing_day'],
                    'package_id' => $client['package_id'] || 1,
                    'IP' => $client['IP'],
                    'acc_no' => $client['acc_no'],
                    'email' => $client['full_name'] . '@mail.net',
                    'address' => $client['acc_no'],
                    'apartment_no' => $client['acc_no'],
                ]);
            } else {
                $existingClient->update([
                    'IP' => $client['IP'],
                    'connection_status' => $client['connection_status'],
                    'billing_day' => $client['billing_day'],
                    'package_id' => $client['package_id'] || 1,
                    'phone_number' => $client['phone_number'] ?? '+254',
                ]);
            }

        }
    }

    function convertDate($date) {
        $inputDate = new DateTime();
        $currentYear = date('Y');
        $currentMonth = date('m');
        $inputDate->setDate($currentYear, $currentMonth, $date);
        return $inputDate->format('Y-m-d');
    }
}

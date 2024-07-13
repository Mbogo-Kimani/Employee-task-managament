<?php

namespace App\Imports;

use App\Models\Client;
use App\Models\InternetPackage;
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
                    'id' => $row['id'],
                    'status' => $row['status'],
                    'phone_number' => $row['phone_number'],
                    'package' => $row['internet_plans'],
                    'ips' => $row['ips'],
                    'billing_day' => $row['billing_day_automatic_document_date'],
                ];
            }
        $this->processData($data);
    }

    public function processData($data)
    {
        foreach($data as $client){
            $client['status'] = $client['status'] = "Online" ? 1 : 0;
            // $client['package'] = InternetPackage::where('capacity' ,strtolower(str_replace(' ', '', $client['package'])))->get();
            dd(strtolower(str_replace(' ', '', $client['package'])));
            Client::updateOrCreate(['splynx_id' => $client['id']], [
                'IP' => $client['ips'],
                'phone_number' => $client['phone_number'],
                'connection_status' => $client['status'],
                'billing_day' => $client['billing_day'],
            ]);

        }
    }
}

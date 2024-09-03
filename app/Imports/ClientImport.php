<?php

namespace App\Imports;

use App\Enums\ClientStatusEnum;
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
        'splynx_id' => $row[2], // ID
        'connection_status' => $row[1], // Status
        'phone_number' => $row[5], //Phone number
        'package_id' => $row[6], // Internet plans
        'IP' => $row[7], // IPs
        'full_name' => $row[4], //Full name
        'acc_no' => $row[3], // Portal login
        'billing_day' => $row[8], // Prepaid expiration date
      ];
    }
    $this->processData($data);
  }

  public function processData($data)
  {
    foreach($data as $client){
      $client['connection_status'] = $this->parseConnectionStatus($client['connection_status']);
      $client['package_id'] = InternetPackage::where('capacity' ,strtolower(str_replace(' ', '', $client['package_id'])))->pluck('id')->first();
      $client['billing_day'] = $client['billing_day'] ? $this->convertDate($client['billing_day']) : $client['billing_day'];

      $existingClient = Client::where('splynx_id',$client['splynx_id'])->first();
        
      if (!$existingClient) {
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
          'employee_id' => null,
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
    $new_date = DateTime::createFromFormat('d/m/Y', $date);
    if ($new_date) return $new_date->format('Y-m-d');
    return (new DateTime())->format('Y-m-d');
  }

  function parseConnectionStatus($status) {
    if ($status == 'Online') return ClientStatusEnum::ONLINE;
    else if ($status == 'Active') return ClientStatusEnum::ACTIVE;
    else if ($status == 'Online last 24 hours') return ClientStatusEnum::ONLINE_LAST_24_HOURS;
    else return ClientStatusEnum::BLOCKED;
  }
}

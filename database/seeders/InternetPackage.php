<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InternetPackage extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $bandwidths = [
			'10mbps', 
			'20mbps', 
			'40mbps', 
			'60mbps',
			'100mbps',
			'200mbps',
		];

    for ($i=0; $i < count($bandwidths); $i++) { 
      \App\Models\InternetPackage::create([
        'validity' => \App\Enums\ValidityEnum::MONTHLY,
        'capacity' => $bandwidths[$i],
				'installation_cost' => 'free',
				'router_cost' => 'free',
      ]);
    }
  }
}

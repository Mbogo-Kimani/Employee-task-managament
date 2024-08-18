<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StreetPackageSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $street_packages = [
			[
				"id" => 1,
				"name" => "Street Kumi",
				"description" => "40-Minute Unlimited Access",
				"duration" => 40,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::MINUTES,
				"access" => "unlimited",
				"cost" => 10,
				"devices" => 1,
			],
			[
				"id" => 2,
				"name" => "Street Mbao",
				"description" => "2-Hour Unlimited Access",
				"duration" => 2,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::HOURS,
				"access" => "unlimited",
				"cost" => 20,
				"devices" => 1,
			],
			[
				"id" => 3,
				"name" => "Street 8",
				"description" => "8-Hour Unlimited Access",
				"duration" => 8,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::HOURS,
				"access" => "unlimited",
				"cost" => 50,
				"devices" => 1,
			],
			[
				"id" => 4,
				"name" => "Street Daily",
				"description" => "24-Hour Unlimited Access",
				"duration" => 24,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::HOURS,
				"access" => "unlimited",
				"cost" => 80,
				"devices" => 1,
			],
			[
				"id" => 5,
				"name" => "Street Daily x2",
				"description" => "24-Hour Unlimited Access, 2 Devices",
				"duration" => 24,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::HOURS,
				"access" => "unlimited",
				"cost" => 140,
				"devices" => 2,
			],
			[
				"id" => 6,
				"name" => "Street Weekly",
				"description" => "7-Day Unlimited Access, 2 Devices",
				"duration" => 7,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"access" => "unlimited",
				"cost" => 380,
				"devices" => 2,
			],
			[
				"id" => 7,
				"name" => "Street Monthly",
				"description" => "30-Day Unlimited Access, 2 Devices",
				"duration" => 30,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"access" => "unlimited",
				"cost" => 1000,
				"devices" => 2,
			],
			[
				"id" => 8,
				"name" => "Family Package x3",
				"description" => "30-Day Unlimited Access, 3 Devices",
				"duration" => 30,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"access" => "unlimited",
				"cost" => 1300,
				"devices" => 3,
			],
			[
				"id" => 9,
				"name" => "Family Package x4",
				"description" => "30-Day Unlimited Access, 4 Devices",
				"duration" => 30,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"access" => "unlimited",
				"cost" => 1600,
				"devices" => 4,
			],
			[
				"id" => 10,
				"name" => "Family Package x5",
				"description" => "30-Day Unlimited Access, 5 Devices",
				"duration" => 30,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"cost" => 1800,
				"access" => "unlimited",
				"devices" => 5,
			],
			[
				"id" => 11,
				"name" => "Family Package x6",
				"description" => "30-Day Unlimited Access, 6 Devices",
				"duration" => 30,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"access" => "unlimited",
				"cost" => 2000,
				"devices" => 6,
			],
			[
				"id" => 12,
				"name" => "Family Package x3 (Quarterly)",
				"description" => "90-Day Unlimited Access, 3 Devices",
				"duration" => 90,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"cost" => 3500,
				"access" => "unlimited",
				"devices" => 3,
			],
			[
				"id" => 13,
				"name" => "Family Package x4 (Quarterly)",
				"description" => "90-Day Unlimited Access, 4 Devices",
				"duration" => 90,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"cost" => 4200,
				"access" => "unlimited",
				"devices" => 4,
			],
			[
				"id" => 14,
				"name" => "Family Package x5 (Quarterly)",
				"description" => "90-Day Unlimited Access, 5 Devices",
				"duration" => 90,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"access" => "unlimited",
				"cost" => 4800,
				"devices" => 5,
			],
			[
				"id" => 15,
				"name" => "Family Package x6 (Quarterly)",
				"description" => "90-Day Unlimited Access",
				"duration" => 90,
				"duration_unit" => \App\Enums\StreetPackageValidityEnum::DAYS,
				"access" => "unlimited",
				"cost" => 5300,
				"devices" => 6,
			]
		];

		echo("Seeding street packages\n");

		for ($i = 0; $i < count($street_packages); $i++) {
			\App\Models\StreetPackage::create([
				'name' => $street_packages[$i]['name'],
				'description' => $street_packages[$i]['description'],
				'duration' => $street_packages[$i]['duration'],
				'duration_unit' => $street_packages[$i]['duration_unit'],
				'cost' => $street_packages[$i]['cost'],
				'devices' => $street_packages[$i]['devices'],
			]);
		}

		echo("Street packages seeding complete\n");
  }
}

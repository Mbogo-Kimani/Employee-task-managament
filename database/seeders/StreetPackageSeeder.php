<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class StreetPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $packages = [
            [
                "id"=> 1,
                "name"=> "Kumi Net",
                "profile_name" => "10SH",
                "description"=> "40-Minute Unlimited Access",
                "duration"=> 2400,
                "access"=> "unlimited",
                "cost"=> 1,
                "devices"=> 1,
            ],
            [
                "id"=> 2,
                "name"=> "Mbao Net",
                "profile_name" => "20SH",
                "description"=> "2-Hour Unlimited Access",
                "duration"=> 7200,
                "access"=> "unlimited",
                "cost"=> 20,
                "devices"=> 1,
            ],
            [
                "id"=> 3,
                "name"=> "8-Hour Net",
                "profile_name" => "50SH",
                "description"=> "8-Hour Unlimited Access",
                "duration"=> 28800,
                "access"=> "unlimited",
                "cost"=> 50,
                "devices"=> 1,
            ],
            [
                "id"=> 4,
                "name"=> "Daily Net",
                "profile_name" => "80SH",
                "description"=> "24-Hour Unlimited Access",
                "duration"=> 86400,
                "access"=> "unlimited",
                "cost"=> 80,
                "devices"=> 1,
            ],
            [
                "id"=> 5,
                "name"=> "Daily Net x2",
                "profile_name" => "140SH",
                "description"=> "24-Hour Unlimited Access, 2 Devices",
                "duration"=> 86400,
                "access"=> "unlimited",
                "cost"=> 140,
                "devices"=> 2,
            ],
            [
                "id"=> 6,
                "name"=> "Weekly Net",
                "profile_name" => "380SH",
                "description"=> "7-Day Unlimited Access, 2 Devices",
                "duration"=> 604800,
                "access"=> "unlimited",
                "cost"=> 380,
                "devices"=> 2,
            ],
            [
                "id"=> 7,
                "name"=> "Monthly Net",
                "profile_name" => "1000SH",
                "description"=> "30-Day Unlimited Access, 2 Devices",
                "duration"=> 2592000,
                "access"=> "unlimited",
                "cost"=> 1000,
                "devices"=> 2,
            ],
            [
                "id"=> 8,
                "name"=> "Family Net x3",
                "profile_name" => "1300SH",
                "description"=> "30-Day Unlimited Access, 3 Devices",
                "duration"=> 2592000,
                "access"=> "unlimited",
                "cost"=> 1300,
                "devices"=> 3,
            ],
            [
                "id"=> 9,
                "name"=> "Family Net x4",
                "profile_name" => "1600SH",
                "description"=> "30-Day Unlimited Access, 4 Devices",
                "duration"=> 2592000,
                "access"=> "unlimited",
                "cost"=> 1600,
                "devices"=> 4,
            ],
            [
                "id"=> 10,
                "name"=> "Family Net x5",
                "profile_name" => "1800SH",
                "description"=> "30-Day Unlimited Access, 5 Devices",
                "duration"=> 2592000,
                "cost"=> 1800,
                "access"=> "unlimited",
                "devices"=> 5,
            ],
            [
                "id"=> 11,
                "name"=> "Family Net x6",
                "profile_name" => "2000SH",
                "description"=> "30-Day Unlimited Access, 6 Devices",
                "duration"=> 2592000,
                "access"=> "unlimited",
                "cost"=> 2000,
                "devices"=> 6,
            ],
            [
                "id"=> 12,
                "name"=> "Family Net x3 (Quarterly)",
                "profile_name" => "3500SH",
                "description"=> "90-Day Unlimited Access, 3 Devices",
                "duration"=> 7776000,
                "cost"=> 3500,
                "access"=> "unlimited",
                "devices"=> 3,
            ],
            [
                "id"=> 13,
                "name"=> "Family Net x4 (Quarterly)",
                "profile_name" => "4200SH",
                "description"=> "90-Day Unlimited Access, 4 Devices",
                "duration"=> 7776000,
                "cost"=> 4200,
                "access"=> "unlimited",
                "devices"=> 4,
            ],
            [
                "id"=> 14,
                "name"=> "Family Net x5 (Quarterly)",
                "profile_name" => "4800SH",
                "description"=> "90-Day Unlimited Access, 5 Devices",
                "duration"=> 7776000,
                "access"=> "unlimited",
                "cost"=> 4800,
                "devices"=> 5,
            ],
            [
                "id"=> 15,
                "name"=> "Family Net x6 (Quarterly)",
                "profile_name" => "5300SH",
                "description"=> "90-Day Unlimited Access",
                "duration"=> 7776000,
                "access"=> "unlimited",
                "cost"=> 5300,
                "devices"=> 6,
            ]
        ];
        DB::table('street_packages')->insert($packages);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApartmentCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        {
            $apartments = [
                ['code' => 'SM', 'name' => 'Shujaa Mall'],
                ['code' => 'SH', 'name' => 'Smart Homes'],
                ['code' => 'GP', 'name' => 'GoldPark Homes'],
                ['code' => 'AH', 'name' => 'Alina Harbour'],
                ['code' => 'SC', 'name' => 'SkyCity'],
                ['code' => 'HH', 'name' => 'Himalaya Heights'],
                ['code' => 'RL', 'name' => 'Royal Legend'],
                ['code' => 'SP', 'name' => 'Siaya Park'],
                ['code' => 'DG', 'name' => 'Dennis Garden'],
                ['code' => 'NG', 'name' => 'Ndemi Gardens'],
                ['code' => 'CO', 'name' => 'City Oasis'],
                ['code' => 'LH', 'name' => 'Leshwa House'],
                ['code' => 'NI', 'name' => 'Nandwa Ivy'],
                ['code' => 'CT', 'name' => 'China Town'],
                ['code' => 'CC', 'name' => 'China Centre'],
                ['code' => 'CCI', 'name' => 'China City'],
                ['code' => 'RSC', 'name' => 'Remax Shopping Centre'],
                ['code' => 'AL', 'name' => 'Adlife Plaza'],
                ['code' => 'YY', 'name' => 'Zarafa'],
                ['code' => 'SO', 'name' => 'Silver Oak'],
                ['code' => 'WO', 'name' => 'White Oak'],
                ['code' => 'DH', 'name' => 'Diamond Home'],
                ['code' => 'PO', 'name' => 'Platinum Oak'],
                ['code' => 'BH', 'name' => 'Bahari Home'],
                ['code' => 'SB', 'name' => 'Silver Harbor'],
                ['code' => 'KH', 'name' => 'Kindaruma Homes'],
                ['code' => 'PC', 'name' => 'Pinecrest'],
                ['code' => 'PL', 'name' => 'Poralis'],
                ['code' => 'DT', 'name' => 'Danaaf Towers'],
                ['code' => 'SL', 'name' => 'Savannah Land'],
                ['code' => 'CP', 'name' => 'Crest Park'],
                ['code' => 'SR', 'name' => 'Sophia Residence'],
                ['code' => 'EK', 'name' => 'Enkasara'],
                ['code' => 'CF', 'name' => 'Comfy'],
                ['code' => 'YC', 'name' => 'Yaya Court'],
                ['code' => 'MG', 'name' => 'Meteor Garden'],
                ['code' => 'PM', 'name' => 'Pandmor'],
                ['code' => 'DO', 'name' => 'Diamond Oak'],
                ['code' => 'BA', 'name' => 'Brick Apartment']
            ];
    
            DB::table('apartment_codes')->insert($apartments);
        }
    }
}

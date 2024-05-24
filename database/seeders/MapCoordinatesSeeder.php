<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MapCoordinatesSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    \App\Models\MapLine::create([
			'point_a_long' => '36.787758',
			'point_a_lat' => '-1.293053',
			'point_b_long' => '36.798140',
			'point_b_lat' => '-1.289100',
		]);

		\App\Models\MapLine::create([
			'point_a_long' => '36.785719',
			'point_a_lat' => '-1.289928',
			'point_b_long' => '36.804718',
			'point_b_lat' => '-1.296115',
		]);

		\App\Models\MapPoint::create([
			'point_long' => '36.785719',
			'point_lat' => '-1.289928',
		]);

		\App\Models\MapPoint::create([
			'point_long' => '36.798140',
			'point_lat' => '-1.289100',
		]);
  }
}

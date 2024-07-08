<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubDepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
			['name' => 'CCTV', 'department_id' => 3],
			['name' => 'INTERNET', 'department_id' => 3],
		];

		for ($i=0; $i < count($departments); $i++) { 
			\App\Models\SubDepartment::create([
				'name' => $departments[$i]['name'],
				'department_id' => $departments[$i]['department_id'],
			]);
		}
    }
}

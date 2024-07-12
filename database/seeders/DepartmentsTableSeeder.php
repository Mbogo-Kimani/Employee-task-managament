<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartmentsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
		$departments = [
			['name' => 'Admin', 'enum_key' => 'ADMIN'],
			['name' => 'Sales', 'enum_key' => 'SALES'],
			['name' => 'Technicians', 'enum_key' => 'TECHNICIANS'],
			['name' => 'Accounting and Finance', 'enum_key' => 'ACCOUNTING_AND_FINANCE'],
			['name' => 'Inventory', 'enum_key' => 'INVENTORY'],
			['name' => 'Customer Service', 'enum_key' => 'CUSTOMER_SERVICE'],
			['name' => 'Project Management', 'enum_key' => 'PROJECT_MANAGEMENT'],
		];

		for ($i=0; $i < count($departments); $i++) { 
			\App\Models\Department::create([
				'name' => $departments[$i]['name'],
				'enum_key' => $departments[$i]['enum_key'],
			]);
		}
		
  }
}

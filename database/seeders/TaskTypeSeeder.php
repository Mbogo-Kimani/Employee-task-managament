<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskTypeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    \App\Models\TaskType::create([
			'department_id' => \App\Enums\DepartmentEnum::TECHNICIANS,
			'name' => 'Installations',
			'description' => 'Everything to do with installations',
		]);

		\App\Models\TaskType::create([
			'department_id' => \App\Enums\DepartmentEnum::TECHNICIANS,
			'name' => 'Service and Maintenance',
			'description' => 'Servicing and maintenance of networking equipment',
		]);
  }
}

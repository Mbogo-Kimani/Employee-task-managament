<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserstableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $imagePath = 'https://i.ibb.co/1sspJdY/Akik-Hossain.jpg';

		$departments = \App\Models\Department::all();
		$keys = [
			'ADMIN' => \App\Enums\DepartmentEnum::ADMIN,
			'MARKETING' => \App\Enums\DepartmentEnum::MARKETING,
			'NETWORKING' => \App\Enums\DepartmentEnum::NETWORKING,
			'ACCOUNTING_AND_FINANCE' => \App\Enums\DepartmentEnum::ACCOUNTING_AND_FINANCE,
			'INVENTORY' => \App\Enums\DepartmentEnum::INVENTORY,
			'CUSTOMER_SERVICE' => \App\Enums\DepartmentEnum::CUSTOMER_SERVICE,
			'PROJECT_MANAGEMENT' => \App\Enums\DepartmentEnum::PROJECT_MANAGEMENT,
		];

		\App\Models\User::create([
				'name' => 'Hyben Langat',
				'role' => \App\Enums\DepartmentEnum::INVENTORY,
				'email' => 'hyben@mail.com',
				'password' => bcrypt('kip2582'),
				'image' => $imagePath,
				'department_id'=> 5
		]);

		for ($i=0; $i < count($departments); $i++) { 
			\App\Models\User::create([
				'name' => fake()->name(),
				'email' => fake()->unique()->safeEmail(),
				'email_verified_at' => now(),
				'password' => Hash::make('12345678'),
				'remember_token' => Str::random(10),
				'role' => $keys[$departments[$i]->enum_key],
				'image' => $imagePath,
				'department_id' => $departments[$i]->id,
				'clearance_level' => \App\Enums\ClearanceLevelEnum::DEPARTMENT_LEADER,
			]);

			\App\Models\User::create([
				'name' => fake()->name(),
				'email' => fake()->unique()->safeEmail(),
				'email_verified_at' => now(),
				'password' => Hash::make('12345678'),
				'remember_token' => Str::random(10),
				'role' => $keys[$departments[$i]->enum_key],
				'image' => $imagePath,
				'department_id' => $departments[$i]->id,
				'clearance_level' => \App\Enums\ClearanceLevelEnum::REGULAR_EMPLOYEE,
			]);
		}
  }
}

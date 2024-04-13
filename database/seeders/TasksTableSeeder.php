<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TasksTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $users = \App\Models\User::all();

		for ($i=0; $i < count($users); $i++) { 
			\App\Models\Task::create([
				'name' => 'Tools enumeration',
				'description' => 'Enumerate all you\'re using in your work station',
				'from_date' => now(),
				'to_date' => now()->addDay(),
				'user_id' => $users[$i]->id,
				'department_id' => $users[$i]->department_id,
			]);
		}
  }
}

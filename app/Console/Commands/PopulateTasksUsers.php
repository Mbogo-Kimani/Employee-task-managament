<?php

namespace App\Console\Commands;

use App\Models\Task;
use Illuminate\Console\Command;

class PopulateTasksUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'insert:task-users';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $tasks = Task::all();
        foreach ($tasks as $task){
            if($task->user_id){
                $task->users()->attach($task->user_id);
            }
        }
    }
}

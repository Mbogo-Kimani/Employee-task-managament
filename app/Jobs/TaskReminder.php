<?php

namespace App\Jobs;

use App\Enums\TaskStatusEnum;
use App\Models\Department;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class TaskReminder implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    protected $admin;
    protected $department;
    protected $handler;
    protected $task;
    
    public function __construct($task,$admin)
    {
        $this->admin = $admin;
        $this->task = $task;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // dd($this->task);
        if($this->task->status === TaskStatusEnum::DONE){
            return;
        }
        $handler = null;
        $department = Department::find($this->task->department_id);

        if($this->task->user_id){
            $handler = User::find($this->task->user_id);
            Mail::to($handler->email)->send(new \App\Mail\TaskReminder($this->task,$this->admin,$handler, $department));
        }
        $department_leader = User::where('department_id', $this->task->department_id)->where('clearance_level',1)->first();
        Mail::to($this->admin->email)->send(new \App\Mail\TaskReminder($this->task,$this->admin,$handler, $department));
        Mail::to($department_leader->email)->send(new \App\Mail\TaskReminder($this->task,$this->admin,$handler, $department));
        
    }
}

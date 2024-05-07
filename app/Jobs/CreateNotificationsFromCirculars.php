<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateNotificationsFromCirculars implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	protected $circular;
  /**
   * Create a new job instance.
   *
   * @return void
   */
  public function __construct($circular)
  {
    $this->circular = $circular;
  }

  /**
   * Execute the job.
   *
   * @return void
   */
  public function handle()
  {
		$to_whom = json_decode($this->circular->to_whom);

    for ($i=0; $i < count($to_whom); $i++) { 
			$department_id = $to_whom[$i];

			$users = \App\Models\User::where('department_id', $department_id)->get();

			for ($j=0; $j < $users->count(); $j++) { 
				$new_notification = new \App\Models\Notification();
				$new_notification->user_id = $users[$j]->id;
				$new_notification->circular_id = $this->circular->id;

				$new_notification->save();
			}
		}
  }
}

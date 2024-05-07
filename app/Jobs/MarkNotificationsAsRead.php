<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class MarkNotificationsAsRead implements ShouldQueue
{
  use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

  protected $user_id;
  /**
   * Create a new job instance.
   *
   * @return void
   */
  public function __construct($id)
  {
    $this->user_id = $id;
  }

  /**
   * Execute the job.
   *
   * @return void
   */
  public function handle()
  {
    $notifications = \App\Models\Notification::where('user_id', $this->user_id)
											->where('read', 0)
											->pluck('id')
											->all();

		if (count($notifications)) {
			for ($i=0; $i < count($notifications); $i++) { 
				$notification = \App\Models\Notification::find($notifications[$i]);
				$notification->read = true;
				$notification->save();
			}
		}
  }
}

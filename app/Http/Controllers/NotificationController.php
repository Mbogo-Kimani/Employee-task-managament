<?php

namespace App\Http\Controllers;

use App\Jobs\MarkNotificationsAsRead;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $user = auth()->user();

		if ($user) {
			$notifications = Notification::where('user_id', $user->id)
											->orderBy('created_at', 'DESC')
											->with('circular')
											->paginate(20);

			return response()->json($notifications);
		}
  }

	public function unreadNotificationsCount() {
		$user = auth()->user();

		if ($user) {
			$notifications_count = Notification::where('user_id', $user->id)
											->where('read', 0)
											->count();

			return response()->json($notifications_count);
		}
	}

	public function markAsRead() {
		$user = auth()->user();

		if ($user) {
			$unread_notifications = Notification::where('user_id', $user->id)
											->where('read', 0)
											->count();

			if ($unread_notifications) {
				MarkNotificationsAsRead::dispatch($user->id);
			}
		}
	}

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
      //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
      //
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Notification  $notification
   * @return \Illuminate\Http\Response
   */
  public function show(Notification $notification)
  {
      //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Notification  $notification
   * @return \Illuminate\Http\Response
   */
  public function edit(Notification $notification)
  {
      //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Notification  $notification
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Notification $notification)
  {
      //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Notification  $notification
   * @return \Illuminate\Http\Response
   */
  public function destroy(Notification $notification)
  {
      //
  }
}

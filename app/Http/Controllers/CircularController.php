<?php

namespace App\Http\Controllers;

use App\Enums\DepartmentEnum;
use App\Jobs\CreateNotificationsFromCirculars;
use App\Models\Circular;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CircularController extends Controller
{
	public function notificationsPage() {
		$user = auth()->user();
		return Inertia::render('Notification', compact('user'));
	}

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $user = auth()->user();
		$circulars = Circular::where('to_whom', 'like', "%$user->department_id%")
												->paginate(20);
		return response()->json($circulars);
  }

  /**
    * Show the form for creating a new resource.
    *
    * @return \Illuminate\Http\Response
    */
  public function create()
  {
    $user = auth()->user();

		if ($user->role == DepartmentEnum::ADMIN && $user->department_id == DepartmentEnum::ADMIN) {
			return Inertia::render('Admin/Circulars/NewCircular', compact('user'));
		} else {
			abort(401, 'You do not have permission to view this page');
		}
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $request->validate([
			'title' => 'required|string|max:255',
			'content' => 'required|string|max:1000',
		]);

		if (count($request->to_whom) == 0) {
			return response()->json(['errors' => ['to_whom' => ['The to whom field is required']]], 422);
		}

		$newCircular = Circular::create([
			'title' => $request->title,
			'content' => $request->content,
			'to_whom' => json_encode($request->to_whom),
		]);

		$newCircular->save();
    CreateNotificationsFromCirculars::dispatch($newCircular);

		return response()->json(['message' => 'Circular saved successfully']);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Circular  $circular
   * @return \Illuminate\Http\Response
   */
  public function show(Circular $circular)
  {
      //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Circular  $circular
   * @return \Illuminate\Http\Response
   */
  public function edit(Circular $circular)
  {
      //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Circular  $circular
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Circular $circular)
  {
      //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Circular  $circular
   * @return \Illuminate\Http\Response
   */
  public function destroy(Circular $circular)
  {
      //
  }
}

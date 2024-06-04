<?php

namespace App\Http\Controllers;

use App\Models\MapPoint;
use Illuminate\Http\Request;

class MapPointController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $map_points = MapPoint::all();
		return response()->json($map_points);
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
		$request->validate([
			'longitude' => 'required',
			'latitude' => 'required',
		]);

    $new_map_point = MapPoint::create([
			'point_long' => $request->longitude,
			'point_lat' => $request->latitude,
		]);

		return response()->json(['message' => 'Point added successfully']);
  }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MapPoint  $mapPoint
     * @return \Illuminate\Http\Response
     */
    public function show(MapPoint $mapPoint)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MapPoint  $mapPoint
     * @return \Illuminate\Http\Response
     */
    public function edit(MapPoint $mapPoint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MapPoint  $mapPoint
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MapPoint $mapPoint)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MapPoint  $mapPoint
     * @return \Illuminate\Http\Response
     */
    public function destroy(MapPoint $mapPoint)
    {
        //
    }
}

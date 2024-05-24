<?php

namespace App\Http\Controllers;

use App\Models\MapLine;
use Illuminate\Http\Request;

class MapLineController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $map_lines = MapLine::all();
		return response()->json($map_lines);
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
			'pointALongitude' => 'required',
			'pointALatitude' => 'required',
			'pointBLongitude' => 'required',
			'pointBLatitude' => 'required',
		]);

		$new_map_line = MapLine::create([
			'point_a_long' => $request->pointALongitude,
			'point_a_lat' => $request->pointALatitude,
			'point_b_long' => $request->pointBLongitude,
			'point_b_lat' => $request->pointBLatitude,
		]);

		return response()->json(['message' => 'Map line created successfully']);
  }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MapLine  $mapLine
     * @return \Illuminate\Http\Response
     */
    public function show(MapLine $mapLine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MapLine  $mapLine
     * @return \Illuminate\Http\Response
     */
    public function edit(MapLine $mapLine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MapLine  $mapLine
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MapLine $mapLine)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MapLine  $mapLine
     * @return \Illuminate\Http\Response
     */
    public function destroy(MapLine $mapLine)
    {
        //
    }
}

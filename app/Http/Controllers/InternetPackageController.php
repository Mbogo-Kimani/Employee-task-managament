<?php

namespace App\Http\Controllers;

use App\Models\InternetPackage;
use Illuminate\Http\Request;

class InternetPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(InternetPackage::all());
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
     * @param  \App\Models\InternetPackage  $internetPackage
     * @return \Illuminate\Http\Response
     */
    public function show(InternetPackage $internetPackage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\InternetPackage  $internetPackage
     * @return \Illuminate\Http\Response
     */
    public function edit(InternetPackage $internetPackage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\InternetPackage  $internetPackage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InternetPackage $internetPackage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\InternetPackage  $internetPackage
     * @return \Illuminate\Http\Response
     */
    public function destroy(InternetPackage $internetPackage)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\PackageType;
use Illuminate\Http\Request;

class PackageTypeController extends Controller
{
    public function goToPackages(){
        return view('package');
    }

    public function savePackageType(Request $request){
        $package = new PackageType;
        $package->name = $request->input('distribution_type');
        if ($package->save()) {
            return redirect('/package')->with('msg', 'Distribution Type Saved successfully');
        }
        else{
            return redirect('/package')->with('msg', 'Failed To Save Package Type');
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Models\PackageType  $packageType
     * @return \Illuminate\Http\Response
     */
    public function show(PackageType $packageType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\PackageType  $packageType
     * @return \Illuminate\Http\Response
     */
    public function edit(PackageType $packageType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PackageType  $packageType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PackageType $packageType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PackageType  $packageType
     * @return \Illuminate\Http\Response
     */
    public function destroy(PackageType $packageType)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\StreetPackage;
use Illuminate\Http\Request;

class StreetPackageController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $street_packages = StreetPackage::all()->filter(function ($package) {
      return $package->name !== 'Free Trial';
    });
    return response()->json($street_packages);
  }
}

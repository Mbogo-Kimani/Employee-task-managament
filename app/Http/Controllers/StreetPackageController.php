<?php

namespace App\Http\Controllers;

use App\Models\StreetPackage;
use Exception;
use Illuminate\Http\Request;
use PEAR2\Net\RouterOS\Client;
use PEAR2\Net\RouterOS\Response;
use PEAR2\Net\RouterOS\Request as RouterOsRequest;
use PEAR2\Net\RouterOS\Util;

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
      return $package->name !== 'Free Trial' && $package->profile_name != '80SH' && $package->profile_name !== '140SH';
    })->values();
    return response()->json($street_packages);
  }

  public function create(Request $request)
  {
    $request->validate([
      'name' => 'required|string',
      'duration' => 'required',
      'cost' => 'required|numeric',
      'devices' => 'required|integer',
      'description' => 'nullable|string'
    ]);
    $request['profile_name'] = "SH" . $request->cost;
    try{
      StreetPackage::create($request->all());

      $client = new Client(config('router.ip'), config('router.user'), config('router.password'));

      $addRequest = new RouterOSRequest('/user-manager/profile/add');
          $addRequest
          ->setArgument('name', $request->name)
          ->setArgument('name-for-users', $request->name)
          ->setArgument('validity', $this->formatTime($request->duration))
          ->setArgument('override-shared-users', $request->devices);

      $response = $client->sendSync($addRequest);
      if ($response->getType() == Response::TYPE_ERROR){
          return response()->json(['success' => false, 'message' => $response->getProperty('message')]);
      }
      return response()->json(['success' => true, 'message' => 'Plan created successfully']);
      
    }catch(Exception $e){
      abort(400,$e);
    }

  }

  public function delete(Request $request, $street_package_id)
  {
    $streetPackage = StreetPackage::find($street_package_id);
    if($streetPackage){
      $client = new Util(new Client(config('router.ip'), config('router.user'), config('router.password')));
     
      $profiles = $client->setMenu('/user-manager/profile');

      $profileList = $profiles->getAll();

      foreach ($profileList as $profile) {
          if ($profile('name') === 'Test') {
              $client->remove($profile('.id'));
          }
      }
      $streetPackage->delete();
      return response()->json(['success' => true, 'message' => 'Package deleted successfully']);
    }else{
      response()->json(['success' => false, 'message' => 'An error occurred']);
    }
  }

  private function formatTime($seconds) {
    $days = floor($seconds / 86400);
    $hours = floor(($seconds % 86400) / 3600);
    $minutes = floor(($seconds % 3600) / 60);
    $secs = $seconds % 60;

    // Format the time string with leading zeros for hours, minutes, and seconds
    return "{$days}d " . sprintf("%02d:%02d:%02d", $hours, $minutes, $secs);
  }
}

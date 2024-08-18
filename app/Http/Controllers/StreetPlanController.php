<?php

namespace App\Http\Controllers;

use App\Models\StreetPlan;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StreetPlanController extends Controller
{
  public function getActivePackages(Request $request)
  {
    if ($request->clientId) {
      $unpaid_plans = StreetPlan::where('client_id', $request->clientId)
																			->whereNull('transaction_id')
																			->get();
      $untaken_transactions = Transaction::where('client_id', $request->clientId)
                                          ->where('taken', false)
                                          ->count();

      if (count($unpaid_plans) > 0 && $untaken_transactions > 0) {
        for ($i = 0; $i < count($unpaid_plans); $i++) {
          $plan = $unpaid_plans[$i];
          $street_package = $plan->streetPackage()->first();
          $transaction = Transaction::where('client_id', $request->clientId)
                                    ->where('taken', false)
                                    ->where('amount', $street_package->cost)
                                    ->first();
  
          if ($transaction) {
            $plan->transaction_id = $transaction->id;
            $transaction->taken = true;
            $plan->save();
            $transaction->save();
          }
        }
      }

      // $now = Carbon::now();

      // $plans = StreetPlan::where(function ($query) use ($now) {
      //     $query->whereRaw('DATE_ADD(created_at, INTERVAL validity MINUTE)', [$now])
      //           ->whereRaw('DATE_ADD(created_at, INTERVAL validity MINUTE)', [$now]);
      // })
      // ->orWhere(function ($query) use ($now) {
      //     $query->whereRaw('DATE_ADD(created_at, INTERVAL validity HOUR)', [$now])
      //           ->whereRaw('DATE_ADD(created_at, INTERVAL validity HOUR)', [$now]);
      // })
      // ->orWhere(function ($query) use ($now) {
      //     $query->whereRaw('DATE_ADD(created_at, INTERVAL validity DAY)', [$now])
      //           ->whereRaw('DATE_ADD(created_at, INTERVAL validity DAY)', [$now]);
      // })
      // ->get();

      $active_plans = StreetPlan::with('streetPackage')
                                ->where('client_id', $request->clientId)
                                ->orderBy('updated_at', 'desc')
                                ->paginate(20);

      return response()->json($active_plans);
    }
  }
}

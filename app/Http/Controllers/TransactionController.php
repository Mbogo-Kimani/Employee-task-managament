<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        return Transaction::with(['client'])->get();
    }

    public function  statistics(Request $request)
    {
        $request->validate([
            'period' => 'required'
        ]);
        if($request->period == "daily"){
            $transactions = Transaction::whereDate('created_at', Carbon::today())->sum('amount');
        }else if($request->period == "monthly"){
            $transactions = Transaction::whereMonth('created_at', Carbon::now()->month)
                           ->whereYear('created_at', Carbon::now()->year)
                           ->sum('amount');
        }
        return response()->json(['amount' => $transactions]);
    }

    public function sortTransactions(Request $request)
    {
        $startDate = Carbon::now()->subDays(7);
        $endDate = Carbon::now();
        $incomeByDay = Transaction::selectRaw('DAYOFWEEK(created_at) as day, SUM(amount) as total_income')
        ->whereBetween('created_at', [$startDate, $endDate])
        ->groupBy('day')
        ->orderBy('day')
        ->get();
        return response()->json(['data' => $incomeByDay]);
    }
}

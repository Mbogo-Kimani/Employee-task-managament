<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Exception;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $tickets = Ticket::all()->paginate(20);
        return response()->json(['data' => $tickets]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'client_id' => 'required|exists:clients,id',
            'date' => 'required',
            'priority' => 'string'
        ]);
        try{
            Ticket::create($request->all());
            return response()->json(['success' => true, 'message' => 'Ticket has been created']);
        }catch(Exception $e){
            abort(400,$e);
        }
    }
}

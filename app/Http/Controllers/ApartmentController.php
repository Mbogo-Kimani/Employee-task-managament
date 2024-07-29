<?php

namespace App\Http\Controllers;

use App\Models\ApartmentCode;
use Illuminate\Http\Request;

class ApartmentController extends Controller
{
    public function index() 
    {
        return response()->json(ApartmentCode::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'apartment_code' => 'required|unique:apartment_codes,code',
            'apartment_name' => 'required',
            'location' => 'required'
        ]);

        try{
            ApartmentCode::create([
            'code' => $request->apartment_code,
            'name' => $request->apartment_name,
            'location' => $request->location
            ]);
        } catch (\Exception $e) {
            abort(400, $e);
        }
        return response()->json(['message' => 'Apartment code created successfully']);
        
    }
}

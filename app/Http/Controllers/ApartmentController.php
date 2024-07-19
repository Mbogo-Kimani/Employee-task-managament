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
}

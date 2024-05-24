<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapLine extends Model
{
  use HasFactory;

  protected $fillable = [
    'point_a_long',
		'point_a_lat',
		'point_b_long',
		'point_b_lat',
  ];
}

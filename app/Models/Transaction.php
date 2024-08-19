<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
  use HasFactory;

  public function streetPlan(): HasOne {
    return $this->hasOne(StreetPlan::class);
  }

  protected $guarded = [];
}

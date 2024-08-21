<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
  use HasFactory;

  public function streetPlan(): HasOne {
    return $this->hasOne(StreetPlan::class);
  }

  public function client(): BelongsTo {
    return $this->belongsTo(Client::class);
  }

  protected $guarded = [];
}

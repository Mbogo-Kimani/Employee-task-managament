<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StreetPackage extends Model
{
  use HasFactory;

	public function streetPlans(): HasMany {
		return $this->hasMany(StreetPlan::class);
	}

	protected $guarded = [];
}

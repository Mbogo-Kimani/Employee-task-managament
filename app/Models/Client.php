<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{
  use HasFactory;

  protected $guarded = [];

  public function tasks():HasMany
  {
    return $this->hasMany(Task::class);
  }

	public function salesPerson(): BelongsTo
	{
		return $this->belongsTo(User::class, 'sales_person_id');
	}

	public function streetPackage(): BelongsTo
	{
		return $this->belongsTo(StreetPackage::class, 'street_package_id');
	}

	public function subscriptions(): HasMany {
		return $this->hasMany(Subscription::class);
	}
}

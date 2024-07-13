<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InternetPackage extends Model
{
  use HasFactory;

	public function clients(): HasMany
	{
		return $this->hasMany(Client::class);
	}

	protected $fillable = [
		'capacity',
		'validity',
		'other_properties',
		'installation_cost',
		'router_cost',
	];
}

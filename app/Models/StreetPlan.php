<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StreetPlan extends Model
{
  use HasFactory;

	public function transaction() {
		return $this->belongsTo(Transaction::class);
	}

	public function client() {
		return $this->belongsTo(Client::class);
	}

	public function streetPackage() {
		return $this->belongsTo(StreetPackage::class);
	}

  protected $guarded = [];
}

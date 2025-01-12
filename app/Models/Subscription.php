<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function streetPackage() {
		return $this->belongsTo(StreetPackage::class, 'street_package_id');
	}

    public function client() {
		return $this->belongsTo(Client::class);
	}
}

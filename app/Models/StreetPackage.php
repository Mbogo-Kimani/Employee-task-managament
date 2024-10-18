<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;



class StreetPackage extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function clients(): BelongsTo
    {
		return $this->belongsTo(StreetPackage::class, 'street_package_id');

    }

}

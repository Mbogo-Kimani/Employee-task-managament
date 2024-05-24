<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EquipmentType extends Model
{
  use HasFactory;

	public function equipments(): HasMany {
		return $this->hasMany(Equipment::class);
	}

	public function equipmentCategory(): BelongsTo {
		return $this->belongsTo(EquipmentCategory::class);
	}

	protected $fillable = [
		'manufacturer_name',
		'spec_model',
		'description',
		'equipment_category_id',
	];
}

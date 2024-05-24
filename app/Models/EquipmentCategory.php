<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EquipmentCategory extends Model
{
  use HasFactory;

	public function equipmentTypes(): HasMany {
		return $this->hasMany(EquipmentType::class);
	}

	public function equipments(): HasMany {
		return $this->hasMany(Equipment::class);
	}

	protected $fillable = [
		'name',
	];
}

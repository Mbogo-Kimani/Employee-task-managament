<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Circular extends Model
{
  use HasFactory;

  public function notifications(): HasMany
  {
		return $this->hasMany(Notification::class);
  }

	protected $fillable = [
		'title',
		'content',
		'to_whom',
	];
}

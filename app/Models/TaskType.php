<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskType extends Model
{
  use HasFactory;

  protected $fillable = [
    'department_id',
		'name',
		'description',
  ];

	public function departments(): HasMany
	{
		return $this->hasMany(Department::class);
	}

	public function tasks(): HasMany
	{
		return $this->hasMany(Task::class);
	}
}

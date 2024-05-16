<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
  use HasFactory;
  protected $guarded = [];

	protected $fillable = [
		'name',
		'enum_key',
	];

  public function tasks(): HasMany
  {
    return $this->hasMany(Task::class);
  }

  public function users(): HasMany
  {
		return $this->hasMany(User::class);
	}

  public function taskTypes(): BelongsTo
  {
    return $this->belongsTo(TaskType::class);
  }

  public function taskMessages()
  {
    return $this->hasMany(TaskMessage::class);
  }
}

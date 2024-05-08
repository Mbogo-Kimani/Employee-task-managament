<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
  use HasFactory;

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}

	public function circular(): BelongsTo
	{
		return $this->belongsTo(Circular::class);
	}

  protected $fillable = [
		'user_id',
		'circular_id',
		'title',
		'content',
		'read',
  ];
}

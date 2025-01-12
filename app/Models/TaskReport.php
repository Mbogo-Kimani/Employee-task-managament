<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskReport extends Model
{
  use HasFactory;

  protected $fillable = [
		'title',
		'content',
		'task_id',
		'file'
  ];

	public function task(): BelongsTo
	{
		return $this->belongsTo(Task::class);
	}
}

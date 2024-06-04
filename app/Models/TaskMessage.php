<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskMessage extends Model
{
  use HasFactory;

	protected $fillable = [
		'content',
		'task_id',
		'sender_id',
		'sender_department_id',
		'user_id',
		'department_id',
		'message_status',
	];

  public function task(): BelongsTo
	{
		return $this->belongsTo(Task::class);
	}

	public function department(): BelongsTo
	{
		return $this->belongsTo(Department::class);
	}

	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class);
	}
}

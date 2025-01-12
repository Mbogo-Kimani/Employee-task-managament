<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\TaskStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  protected $guarded = [];

  public function department(): BelongsTo
  {
    return $this->belongsTo(Department::class);
  }

	public function tasks(): BelongsToMany
	{
		return $this->belongsToMany(Task::class);
	}

  public function unfinishedTasks()
  {
    return $this->tasks()->where('status', TaskStatusEnum::PENDING)->get();
  }

  public function notifications(): HasMany
  {
    return $this->hasMany(Notification::class);
  }

  public function taskMessages()
  {
    return $this->hasMany(TaskMessage::class);
  }

  public function clients(): HasMany {
    return $this->hasMany(Client::class, 'sales_person_id');
  }

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected $casts = [
    'email_verified_at' => 'datetime',
  ];


  public function hasAnyRole($roles)
  {
    return $this->employee && in_array($this->employee->role, $roles);
  }

  // User.php (or your User model)

  public function isAdmin()
  {
    return $this->role === \App\Enums\DepartmentEnum::ADMIN;
  }
}

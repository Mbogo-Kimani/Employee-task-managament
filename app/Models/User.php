<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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

	public function tasks(): HasMany
	{
		return $this->hasMany(Task::class);
	}

	protected $fillable = [
		'name',
		'email',
		'role',
		'image',
		'department_id',
		'clearance_level',
	];

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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  use HasFactory;
  protected $guarded = [];

  protected $fillable = [
		'name',
		'from_date',
		'to_date',
		'description',
		'status',
		'user_id',
		'department_id',
		'task_finished_at',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function designation()
  {
    return $this->belongsTo(Designation::class);
  }
    
  public function department()
  {
    return $this->belongsTo(Department::class);
  }
}

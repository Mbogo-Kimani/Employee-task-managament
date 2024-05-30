<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;


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
    'task_type_id',
    'received_by_department_head',
    'received_by_department_member',
    'admin_handler_id',
    'department_handler_id',
  ];

  public function users()
  {
    return $this->belongsToMany(User::class);
  }
  public function client()
  {
    return $this->belongsTo(Client::class);
  }
    
  public function department()
  {
    return $this->belongsTo(Department::class);
  }

  public function taskReport(): HasOne
  {
    return $this->hasOne(TaskReport::class);
  }

  public function equipments(): BelongsToMany
  {
    return $this->belongsToMany(Equipment::class)->withTimestamps()->withPivot('confirm_assigned','assigned_date');
  }

  public function taskType(): BelongsTo
  {
    return $this->belongsTo(TaskType::class);
  }

  public function scopeFilter(Builder $query, array $filters)
  {
    foreach ($filters as $key => $value) {
      // Check if the filter method exists and call it
      if (method_exists($this, $key)) {
          $this->$key($query, $value);
      }
    }
  }

  public function status($query, $status)
  {
      return $query->where('status', intval($status));
  }

  public function type($query, $type)
  {
      return $query->where('task_type_id', (int)$type);
  }

  public function departmentId($query, $type)
  {
      return $query->where('department_id', (int)$type);
  }

  public function clientStatus($query,$type){
    $operator = $type ? '<' : '>';
    $query->whereHas('client', function ($query) use($operator){
      $query->whereRaw(DB::raw("DATE_ADD(payment_date, INTERVAL payment_plan MONTH) $operator NOW()"));
    });
  }

  public function taskMessages() {
    return $this->hasMany(TaskMessage::class);
  }
}

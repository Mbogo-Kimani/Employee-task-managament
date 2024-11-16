<?php

namespace App\Models;

use App\Enums\TaskStatusEnum;
use Carbon\Carbon;
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
    'feedback_if_rejected',
    'client_id',
    'paid',
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
      if($status != TaskStatusEnum::LATE){
        return $query->where('status', intval($status));
      }else{
        return $query->where('to_date','<',Carbon::now())->where('status', '!=' , TaskStatusEnum::DONE);
      }
  }

  public function type($query, $type)
  {
      return $query->where('task_type_id', (int)$type);
  }

  public function departmentId($query, $type)
  {
      return $query->where('department_id', (int)$type);
  }
  public function subDepartment($query, $type)
  {
      return $query->where('sub_department_id', (int)$type);
  }

  public function clientStatus($query, $type) {
    return $query->where('paid', $type);
  }

  public function taskMessages() {
    return $this->hasMany(TaskMessage::class);
  }
}

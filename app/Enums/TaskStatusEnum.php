<?php

namespace App\Enums;

use Illuminate\Mail\PendingMail;

class TaskStatusEnum {
  const PENDING = 1;
  const AWAITING_APPROVAL_BY_DEPARTMENT_HEAD = 2;
  const AWAITING_APPROVAL_BY_ADMIN = 3;
  const REJECTED = 4;
  const DONE = 5;
}

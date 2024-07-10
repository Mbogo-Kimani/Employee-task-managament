<?php

namespace App\Enums;

use Illuminate\Mail\PendingMail;

class TaskStatusEnum {
  const PENDING = 1;
  const AWAITING_APPROVAL = 2;
  const REJECTED = 3;
  const DONE = 4;
}

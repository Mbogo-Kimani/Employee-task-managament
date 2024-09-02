<?php

namespace App\Enums;


enum ClientStatusEnum {
  const ONLINE = 1;
  const ACTIVE = 2;
  const BLOCKED = 3;
  const ONLINE_LAST_24_HOURS = 4;
}

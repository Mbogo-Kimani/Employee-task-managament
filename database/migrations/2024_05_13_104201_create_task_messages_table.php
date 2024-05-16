<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('task_messages', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
			$table->text('content');
			$table->foreignId('task_id');
			$table->bigInteger('sender_id');
			$table->integer('sender_department_id');
			$table->foreignId('user_id');
			$table->foreignId('department_id');
			$table->integer('message_status')->default(1);
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('task_messages');
  }
};

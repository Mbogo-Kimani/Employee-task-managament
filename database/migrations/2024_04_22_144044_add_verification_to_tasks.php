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
    Schema::table('tasks', function (Blueprint $table) {
      $table->boolean('received_by_department_head')->default(false);
      $table->boolean('received_by_department_member')->default(false);
			$table->text('feedback_if_rejected')->nullable();
    });

    Schema::table('task_reports', function (Blueprint $table) {
      $table->foreignId('task_id')->nullable()->change();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('tasks', function (Blueprint $table) {
      $table->dropColumn('received_by_department_head');
      $table->dropColumn('received_by_department_member');
			$table->dropColumn('feedback_if_rejected');
    });

    Schema::table('task_reports', function (Blueprint $table) {
      $table->foreignId('task_id')->change();
    });
  }
};

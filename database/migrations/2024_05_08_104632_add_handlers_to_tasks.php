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
      $table->bigInteger('admin_handler_id')->nullable();
			$table->bigInteger('department_handler_id')->nullable();
			$table->date('from_date')->change();
			$table->date('to_date')->change();
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
      $table->dropColumn('admin_handler_id');
			$table->dropColumn('department_handler_id');
			$table->date('from_date')->nullable()->change();
      $table->date('to_date')->nullable()->change();
    });
  }
};

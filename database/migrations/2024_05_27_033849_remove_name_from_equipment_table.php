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
    Schema::table('equipment', function (Blueprint $table) {
      $table->dropColumn('name');
			$table->dropColumn('department_id');
			$table->dropColumn('quantity');
			$table->dropColumn('model');
      $table->integer('status')->default(\App\Enums\EquipmentsStatusEnum::IN_STORAGE)->change();
      $table->dropColumn('faulty');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('equipment', function (Blueprint $table) {
      $table->string('name');
      $table->foreignId('department_id');
      $table->integer('quantity');
			$table->string('model');
      $table->integer('status')->change();
      $table->integer('faulty')->nullable();
    });
  }
};

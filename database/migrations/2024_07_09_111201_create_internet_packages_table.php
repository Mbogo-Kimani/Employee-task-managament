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
    Schema::create('internet_packages', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
      $table->string('capacity');
			$table->integer('validity');
			$table->integer('bandwidth_capacity');
			$table->string('installation_cost');
			$table->string('router_cost');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('internet_packages');
  }
};

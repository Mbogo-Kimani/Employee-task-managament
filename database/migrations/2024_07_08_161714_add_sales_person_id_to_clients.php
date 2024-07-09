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
    Schema::table('clients', function (Blueprint $table) {
      $table->string('location');
			$table->string('wifi_name');
			$table->string('wifi_password');
			$table->foreignId('internet_package_id');
			$table->string('apartment_no');
			$table->bigInteger('sales_person_id');
			
			$table->dropColumn('address');
			$table->dropColumn('resident_building');
			$table->dropColumn('resident_hse_no');
			$table->dropColumn('payment_date');
			$table->dropColumn('payment_plan');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('clients', function (Blueprint $table) {
      $table->dropColumn('location');
			$table->dropColumn('wifi_name');
			$table->dropColumn('wifi_password');
			$table->dropColumn('internet_package_id');
			$table->dropColumn('apartment_no');
			$table->dropColumn('sales_person_id');
			
			$table->string('address');
			$table->string('resident_building');
			$table->string('resident_hse_no');
			$table->date('payment_date')->nullable();
			$table->integer('payment_plan')->nullable();
    });
  }
};

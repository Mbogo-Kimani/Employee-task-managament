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
            $table->string('acc_no')->after('name'); 
            $table->string('IP')->nullable();
            $table->date('billing_day')->nullable();
            $table->string('employee_id')->nullable();
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
           $table->dropColumn('acc_no');
           $table->dropColumn('IP');
           $table->dropColumn('billing_day');
           $table->dropColumn('employee_id');
        });
    }
};

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
            $table->string('address')->nullable();
            $table->string('acc_no')->nullable()->change();
			$table->string('apartment_no')->nullable()->change();
            $table->unsignedBigInteger('package_id')->nullable()->change();
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
            $table->string('address')->change();
            $table->string('acc_no')->change();
			$table->string('apartment_no')->change();
            $table->unsignedBigInteger('package_id')->change();
        });
    }
};

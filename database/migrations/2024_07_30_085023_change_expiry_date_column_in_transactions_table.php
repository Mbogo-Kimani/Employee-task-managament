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
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('room_number');
            $table->dropColumn('expiry_date');
            $table->dropColumn('package_id');
            $table->string('amount');
            $table->string('phone_number');
            $table->unsignedBigInteger('client_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('amount');
            $table->dropColumn('phone_number');
            $table->unsignedBigInteger('client_id')->change();
        });
    }
};

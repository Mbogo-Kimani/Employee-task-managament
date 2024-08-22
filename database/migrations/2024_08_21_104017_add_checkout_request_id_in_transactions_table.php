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
            $table->string('checkout_request_id');
            $table->date('paid_date')->nullable()->change();
            $table->string('payment_confirmation')->nullable()->change();
            $table->string('amount')->nullable()->change();
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
            $table->dropColumn('checkout_request_id');
            $table->date('paid_date')->nullable(false)->change();
            $table->string('payment_confirmation')->nullable(false)->change();
            $table->string('amount')->change();
        });
    }
};

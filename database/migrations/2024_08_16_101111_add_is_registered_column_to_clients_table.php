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
            $table->boolean('is_registered_hotspot')->default(false);
            $table->string('mpesa_number')->nullable();
            $table->foreignId('street_package_id')->nullable()->constrained()->onDelete('cascade');
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
            $table->dropColumn('is_registered_hotspot');
            $table->dropColumn('mpesa_number');
            $table->dropColumn('street_package_id');
            $table->dropForeign(['street_package_id']);
        });
    }
};

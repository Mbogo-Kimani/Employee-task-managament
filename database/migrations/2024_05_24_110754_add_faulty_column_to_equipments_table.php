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
            $table->integer('faulty')->nullable();
            $table->string('serial_no')->nullable();
            $table->foreignId('equipment_type_id');
            $table->foreignId('equipment_category_id');
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
            $table->dropForeign('equipment_equipment_type_id');
            $table->dropForeign('equipment_equipment_category_id');

            $table->dropColumn('faulty');
            $table->dropColumn('serial_no');
            $table->dropColumn('equipment_type_id');
            $table->dropColumn('equipment_category_id');
        });
    }
};

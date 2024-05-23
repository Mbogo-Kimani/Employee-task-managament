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
        Schema::table('equipment_task', function (Blueprint $table) {
            $table->boolean('confirm_assigned')->default(false)->after('equipment_id');
            $table->date('assigned_date')->after('confirm_assigned')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('equipment_task', function (Blueprint $table) {
            $table->dropColumn('confirm_assigned');
            $table->dropColumn('assigned_date');
        });
    }
};

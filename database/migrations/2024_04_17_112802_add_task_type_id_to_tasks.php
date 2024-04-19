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
        Schema::table('tasks', function (Blueprint $table) {
            $table->foreignId('task_type_id')->nullable();
            $table->foreignId('user_id')->nullable()->change();
            $table->date('from_date')->nullable()->change();
            $table->date('to_date')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('task_type_id');
            $table->foreignId('user_id')->change();
            $table->date('from_date')->change();
            $table->date('to_date')->change();
        });
    }
};

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
        Schema::create('map_lines', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('point_a_long');
            $table->string('point_a_lat');
            $table->string('point_b_long');
            $table->string('point_b_lat');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('map_lines');
    }
};

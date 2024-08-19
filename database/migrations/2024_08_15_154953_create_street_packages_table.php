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
        Schema::create('street_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('duration');
            $table->string('access')->default("unlimited");
            $table->integer('devices');
            $table->float('cost');
            $table->longText('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('street_packages');
    }
};

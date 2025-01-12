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
        Schema::create('equipment_stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_category_id');
            $table->foreignId('equipment_type_id');
            $table->integer('quantity');
            $table->integer('min_stock')->nullable();
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
        Schema::dropIfExists('equipment_stocks');
    }
};

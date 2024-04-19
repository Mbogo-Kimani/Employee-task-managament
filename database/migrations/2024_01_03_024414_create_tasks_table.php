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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('from_date')->nullable();
            $table->date('to_date')->nullable();
            $table->integer('status')->default(\App\Enums\TaskStatusEnum::PENDING);
            $table->text('description')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('department_id');
            $table->date('task_finished_at')->nullable();
            $table->foreignId('task_type_id')->nullable();
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
        Schema::dropIfExists('tasks');
    }
};

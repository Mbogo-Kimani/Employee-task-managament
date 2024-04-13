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
		Schema::table('payrolls', function (Blueprint $table) {
			$table->dropForeign('payrolls_employee_id_foreign');
			$table->dropColumn('employee_id');
		});
		
    Schema::dropIfExists('employees');

    Schema::table('departments', function (Blueprint $table) {
      $table->dropColumn('department_id');
      $table->renameColumn('department_name', 'name');
			$table->string('enum_key');
    });

    Schema::table('tasks', function (Blueprint $table) {
      $table->dropColumn('total_days');
			$table->integer('status')->default(1)->change();
			$table->dropColumn('employee_id');
			$table->foreignId('user_id');
			$table->foreignId('department_id');
			$table->renameColumn('task_name', 'name');
			$table->renameColumn('task_description', 'description');
			$table->date('task_finished_at')->nullable();
    });

		Schema::dropIfExists('networking_devices');

		Schema::table('users', function (Blueprint $table) {
			$table->dropColumn('employee_id');
			$table->foreignId('department_id');
			$table->integer('clearance_level')->default(2);
		});
  }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
			Schema::create('employees', function (Blueprint $table) {
				$table->id();
				$table->string('name', 20);
				$table->string('employee_id', 12)->unique();
				$table->unsignedBigInteger('department_id');
				$table->unsignedBigInteger('designation_id');
				$table->unsignedBigInteger('salary_structure_id');
				$table->date('date_of_birth')->nullable();
				$table->date('hire_date');
				$table->string('email', 30);
				$table->string('phone', 15);
				$table->string('location', 30);
				$table->string('employee_image')->nullable();
				$table->string('joining_mode', 30)->nullable();
				$table->unsignedBigInteger('user_id')->nullable();
				$table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
				$table->timestamps();
			});

			Schema::table('payrolls', function (Blueprint $table) {
				$table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
				$table->unsignedBigInteger('employee_id');
			});

			Schema::table('departments', function (Blueprint $table) {
				$table->string('department_id', 10);
				$table->renameColumn('name', 'department_name');
				$table->dropColumn('enum_key');
			});

			Schema::table('tasks', function (Blueprint $table) {
				$table->integer('total_days')->nullable();
				$table->string('status')->default('pending')->change();
				$table->unsignedBigInteger('employee_id');
				$table->dropColumn('user_id');
				$table->dropColumn('department_id');
				$table->renameColumn('name', 'task_name');
				$table->renameColumn('description', 'task_description');
				$table->dropColumn('task_finished_at');
			});

			Schema::create('networking_devices', function (Blueprint $table) {
				$table->id();
				$table->timestamps();
			});

			Schema::table('users', function (Blueprint $table) {
				$table->dropColumn('department_id');
				$table->unsignedBigInteger('employee_id')->nullable();
				$table->dropColumn('clearance_level');
			});
    }
};

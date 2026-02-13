<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('attendance_configs', function (Blueprint $table) {
            $table->id();
            $table->time('office_start_time')->default('08:00:00'); 
            $table->time('office_end_time')->default('17:00:00');   
            $table->integer('late_tolerance_minutes')->default(15); 
            $table->string('office_latitude')->nullable();          
            $table->string('office_longitude')->nullable();         
            $table->integer('allowed_radius_meters')->default(50);  
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_configs');
    }
};
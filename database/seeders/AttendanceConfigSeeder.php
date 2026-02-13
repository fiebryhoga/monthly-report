<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AttendanceConfig;

class AttendanceConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        AttendanceConfig::truncate();

        AttendanceConfig::create([
            'office_start_time' => '08:00:00',      
            'office_end_time' => '17:00:00',        
            'late_tolerance_minutes' => 15,         
            'allowed_radius_meters' => 50,          
            'office_latitude' => '-7.946692', 
            'office_longitude' => '112.603995',
        ]);
    }
}
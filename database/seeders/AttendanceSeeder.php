<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $employees = User::where('role', 'employee')->get();

        if ($employees->isEmpty()) {
            $this->command->info('Tidak ada user dengan role employee. Pastikan EmployeeSeeder sudah dijalankan.');
            return;
        }
        $start = Carbon::create(2026, 1, 1); 
        $end   = Carbon::create(2026, 2, 28); 
        $period = CarbonPeriod::create($start, $end);
        foreach ($employees as $employee) {
            foreach ($period as $date) {
                if ($date->isWeekend()) continue;
                $exists = Attendance::where('user_id', $employee->id)
                    ->whereDate('date', $date)
                    ->exists();
                if ($exists) continue;
                $chance = rand(1, 100);
                if ($chance <= 75) {
                    $this->createPresent($employee, $date, false); 
                } elseif ($chance <= 85) {
                    $this->createPresent($employee, $date, true);  
                } elseif ($chance <= 90) {
                    $this->createLeave($employee, $date, 'sick');  
                } elseif ($chance <= 95) {
                    $this->createLeave($employee, $date, 'permit'); 
                } else {
                    $this->createAlpha($employee, $date);          
                }
            }
        }
    }

    /**
     * Helper: Generate Hadir (Tepat Waktu / Telat)
     */
    private function createPresent($user, $date, $isLate)
    {
        $officeStart = Carbon::parse('08:00:00');
        if ($isLate) {
            $lateMinutes = rand(1, 45);
            $timeIn = $officeStart->copy()->addMinutes($lateMinutes);
            $status = 'late';
        } else {
            $lateMinutes = 0;
            $timeIn = $officeStart->copy()->subMinutes(rand(5, 30));
            $status = 'present';
        }
        $timeOut = Carbon::parse('17:00:00')->addMinutes(rand(0, 90));

        Attendance::create([
            'user_id' => $user->id,
            'date' => $date->format('Y-m-d'),
            'time_in' => $timeIn->format('H:i:s'),
            'time_out' => $timeOut->format('H:i:s'),
            'status' => $status,
            'late_minutes' => $lateMinutes,
            'lat' => '-7.250445', 
            'long' => '112.768845', 
        ]);
    }

    /**
     * Helper: Generate Izin / Sakit
     */
    private function createLeave($user, $date, $type)
    {
        $reasons = [
            'sick' => ['Demam', 'Flu', 'Radang Tenggorokan', 'Sakit Kepala', 'Check-up'],
            'permit' => ['Urusan Keluarga', 'Ban Bocor', 'Perpanjang SIM', 'Pindahan', 'Anak Sakit']
        ];
        
        Attendance::create([
            'user_id' => $user->id,
            'date' => $date->format('Y-m-d'),
            'time_in' => '00:00:00', 
            'time_out' => '00:00:00',
            'status' => $type, 
            'late_minutes' => 0,
            'note' => $reasons[$type][array_rand($reasons[$type])], 
        ]);
    }

    /**
     * Helper: Generate Alpha (Bolos)
     * Kita buat record explicit status 'alpha' agar langsung muncul di rekap/grafik
     */
    private function createAlpha($user, $date)
    {
        Attendance::create([
            'user_id' => $user->id,
            'date' => $date->format('Y-m-d'),
            'time_in' => '00:00:00',
            'time_out' => '00:00:00',
            'status' => 'alpha',
            'late_minutes' => 0,
            'note' => 'Tanpa Keterangan',
        ]);
    }
}
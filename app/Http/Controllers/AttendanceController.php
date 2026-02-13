<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\AttendanceConfig;
use App\Models\Holiday;
use App\Models\LeaveRequest;
use Carbon\Carbon;
use Carbon\CarbonPeriod; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    
    public function index(Request $request)
    {
        if (auth()->user()->role !== 'admin') abort(403);
    
        $date = $request->input('date', Carbon::today()->toDateString());
    
        $employees = \App\Models\User::query() 
            ->with(['attendances' => function ($query) use ($date) {
                $query->whereDate('date', $date);
            }])
            ->orderBy('role', 'asc')
            ->orderBy('name', 'asc')
            ->get()
            ->map(function ($user) {
                $log = $user->attendances->first();
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'nip' => $user->nip ?? '-',
                    'role' => $user->role,
                    'time_in' => $log ? $log->time_in : '-',
                    'time_out' => $log ? $log->time_out : '-',
                    'status' => $log ? $log->status : 'alpha',
                    'late_minutes' => $log ? $log->late_minutes : 0,
                ];
            });

        $allUsers = \App\Models\User::orderBy('name')->get(['id', 'name', 'nip']);
    
        return Inertia::render('Admin/Attendance/Index', [
            'employees' => $employees,
            'date' => $date,
            'users_list' => $allUsers
        ]);
    }

    
    
    public function myAttendance()
    {
        $user = Auth::user();
        $config = AttendanceConfig::first();
        $today = Carbon::today();
        $startOfMonth = Carbon::now()->startOfMonth();

        
        $isHoliday = false;
        $holidayReason = '';

        if ($today->isWeekend()) {
            $isHoliday = true;
            $holidayReason = 'Libur Akhir Pekan';
        } else {
            $holidayDb = Holiday::whereDate('date', $today)->first();
            if ($holidayDb) {
                $isHoliday = true;
                $holidayReason = $holidayDb->description;
            }
        }

        
        $pendingLeave = LeaveRequest::where('user_id', $user->id)
            ->where('status', 'pending')
            ->whereDate('start_date', '<=', $today)
            ->whereDate('end_date', '>=', $today)
            ->first();

        
        
        $attendanceDB = Attendance::where('user_id', $user->id)
            ->whereBetween('date', [$startOfMonth->format('Y-m-d'), $today->format('Y-m-d')])
            ->get()
            ->keyBy('date'); 

        $history = collect();
        $period = CarbonPeriod::create($startOfMonth, $today);

        foreach ($period as $dt) {
            $dateStr = $dt->format('Y-m-d');

            
            if ($attendanceDB->has($dateStr)) {
                
                $history->push($attendanceDB[$dateStr]);
            } else {
                
                
                if ($dt->isWeekend()) {
                    continue; 
                }

                
                
                

                
                
                $history->push((object) [
                    'id' => 'virtual-' . $dateStr, 
                    'user_id' => $user->id,
                    'date' => $dateStr,
                    'time_in' => '-',
                    'time_out' => '-',
                    'status' => 'alpha', 
                    'late_minutes' => 0,
                    'lat' => null,
                    'long' => null,
                ]);
            }
        }

        
        $historySorted = $history->sortByDesc('date')->values();

        
        $todayLog = Attendance::where('user_id', $user->id)
            ->whereDate('date', $today)
            ->first();

        return Inertia::render('Employee/Attendance/Index', [
            'history' => $historySorted, 
            'today_log' => $todayLog,
            'office_config' => $config,
            'holiday_info' => [
                'is_holiday' => $isHoliday,
                'reason' => $holidayReason
            ],
            'pending_leave' => $pendingLeave
        ]);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        $user = Auth::user();
        $today = Carbon::today();
        
        
        $hasPending = LeaveRequest::where('user_id', $user->id)
            ->where('status', 'pending')
            ->whereDate('start_date', '<=', $today)
            ->whereDate('end_date', '>=', $today)
            ->exists();

        if ($hasPending) {
            return back()->with('error', 'Anda memiliki pengajuan izin/sakit yang sedang diproses.');
        }

        
        if ($today->isWeekend()) return back()->with('error', 'Hari ini libur akhir pekan.');
        $holiday = Holiday::whereDate('date', $today)->first();
        if ($holiday) return back()->with('error', 'Hari ini libur nasional: ' . $holiday->description);

        $now = Carbon::now();
        $config = AttendanceConfig::first();

        
        if ($config && $config->office_latitude && $config->office_longitude) {
            $distance = $this->calculateDistance(
                $request->latitude, $request->longitude,
                $config->office_latitude, $config->office_longitude
            );
            if ($distance > $config->allowed_radius_meters) {
                return back()->with('error', 'Anda berada di luar radius kantor (' . round($distance) . 'm).');
            }
        }

        $attendance = Attendance::where('user_id', $user->id)
            ->whereDate('date', $today)
            ->first();

        
        if (!$attendance) {
            $status = 'present';
            $lateMinutes = 0;


        if ($config) {
            
            $officeStart = Carbon::parse($config->office_start_time)->setDateFrom($today);
            $officeEnd = Carbon::parse($config->office_end_time)->setDateFrom($today);
            
            
            if ($now->greaterThan($officeEnd)) return back()->with('error', 'Presensi ditutup!');
            $openTime = $officeStart->copy()->subHour();
            if ($now->lessThan($openTime)) return back()->with('error', 'Presensi belum dibuka.');
            
            
            $lateThreshold = $officeStart->copy()->addMinutes($config->late_tolerance_minutes);

            
            if ($now->greaterThan($lateThreshold)) {
                $status = 'late';
                
                
                
                $lateMinutes = abs($now->diffInMinutes($officeStart)); 
            }
        }

            Attendance::create([
                'user_id' => $user->id,
                'date' => $today,
                'time_in' => $now->toTimeString(),
                'status' => $status,
                'late_minutes' => $lateMinutes,
                'lat' => $request->latitude,
                'long' => $request->longitude,
            ]);

            return back()->with('success', 'Absen masuk berhasil.');
        }

        
        if ($attendance && is_null($attendance->time_out)) {
            $attendance->update(['time_out' => $now->toTimeString()]);
            return back()->with('success', 'Absen pulang berhasil.');
        }

        return back()->with('error', 'Anda sudah menyelesaikan presensi hari ini.');
    }

    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371000;
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        return $earthRadius * $c;
    }
}
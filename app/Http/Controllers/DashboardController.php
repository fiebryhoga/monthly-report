<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        
        
        
        if ($user->role === 'employee') {
            $currentMonth = Carbon::now()->month;
            $currentYear = Carbon::now()->year;

            
            $stats = [
                'present' => Attendance::where('user_id', $user->id)
                    ->whereMonth('date', $currentMonth)
                    ->whereYear('date', $currentYear)
                    ->where('status', 'present')
                    ->count(),
                
                'late' => Attendance::where('user_id', $user->id)
                    ->whereMonth('date', $currentMonth)
                    ->whereYear('date', $currentYear)
                    ->where('status', 'late')
                    ->count(),
                
                'leave' => Attendance::where('user_id', $user->id)
                    ->whereMonth('date', $currentMonth)
                    ->whereYear('date', $currentYear)
                    ->whereIn('status', ['sick', 'permit'])
                    ->count(),
                
                'alpha' => Attendance::where('user_id', $user->id)
                    ->whereMonth('date', $currentMonth)
                    ->whereYear('date', $currentYear)
                    ->where('status', 'alpha')
                    ->count(),
            ];

            
            $todayLog = Attendance::where('user_id', $user->id)
                ->whereDate('date', Carbon::today())
                ->first();

            
            $recentLogs = Attendance::where('user_id', $user->id)
                ->whereDate('date', '!=', Carbon::today())
                ->orderBy('date', 'desc')
                ->limit(5)
                ->get();

            
            return Inertia::render('Dashboard', [
                'stats' => $stats,
                'today_log' => $todayLog,
                'recent_logs' => $recentLogs,
                'current_date' => Carbon::now()->translatedFormat('l, d F Y')
            ]);
        }

        
        
        
        
        $today = Carbon::today();
        
        
        $stats = [
            'total_employees' => User::where('role', 'employee')->count(),
            'present_today'   => Attendance::whereDate('date', $today)->whereIn('status', ['present', 'late'])->count(),
            'late_today'      => Attendance::whereDate('date', $today)->where('status', 'late')->count(),
            'on_leave'        => Attendance::whereDate('date', $today)->whereIn('status', ['sick', 'permit'])->count(),
        ];

        
        $dates = collect(range(6, 0))->map(function($days) {
            return Carbon::today()->subDays($days)->format('Y-m-d');
        });
        
        $chartTrend = [
            'labels' => $dates->map(function($d) {
                return Carbon::parse($d)->format('d M');
            }),
            'data' => $dates->map(function($date) {
                return Attendance::whereDate('date', $date)->whereIn('status', ['present', 'late'])->count();
            })
        ];

        
        $chartStatus = [
            'present' => Attendance::whereDate('date', $today)->where('status', 'present')->count(),
            'late'    => Attendance::whereDate('date', $today)->where('status', 'late')->count(),
            'sick'    => Attendance::whereDate('date', $today)->where('status', 'sick')->count(),
            'permit'  => Attendance::whereDate('date', $today)->where('status', 'permit')->count(),
            'alpha'   => Attendance::whereDate('date', $today)->where('status', 'alpha')->count(),
        ];

        
        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        $radarLabels = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
        
        $presentData = [];
        $lateData = [];
        $checkDate = Carbon::now()->subDays(30);

        foreach ($days as $day) {
            $presentData[] = Attendance::where('date', '>=', $checkDate)
                ->whereRaw("DAYNAME(date) = ?", [$day])
                ->where('status', 'present')
                ->count();

            $lateData[] = Attendance::where('date', '>=', $checkDate)
                ->whereRaw("DAYNAME(date) = ?", [$day])
                ->where('status', 'late')
                ->count();
        }

        $radarData = [
            'labels' => $radarLabels,
            'datasets' => [
                [
                    'label' => 'Tepat Waktu',
                    'data' => $presentData,
                    'borderColor' => '#10b981', 
                    'backgroundColor' => 'rgba(16, 185, 129, 0.2)',
                    'pointBackgroundColor' => '#10b981',
                ],
                [
                    'label' => 'Terlambat',
                    'data' => $lateData,
                    'borderColor' => '#f59e0b', 
                    'backgroundColor' => 'rgba(245, 158, 11, 0.2)',
                    'pointBackgroundColor' => '#f59e0b',
                ]
            ]
        ];

        
        $recentActivity = Attendance::with('user')
            ->whereDate('date', $today)
            ->orderBy('updated_at', 'desc')
            ->take(5)
            ->get();

        
        
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'chartTrend' => $chartTrend,
            'chartStatus' => $chartStatus,
            'radarData' => $radarData,
            'recentActivity' => $recentActivity,
            'date' => $today->translatedFormat('l, d F Y')
        ]);
    }
}
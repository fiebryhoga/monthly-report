<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AttendanceExport;

class ReportController extends Controller
{
    public function export(Request $request)
    {
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);
        $format = $request->format; 
        $userId = $request->user_id;

        
        $usersQuery = User::orderBy('name', 'asc');
        
        
        if ($userId && $userId !== 'all') {
            $usersQuery->where('id', $userId);
            $filterName = User::find($userId)->name;
        } else {
            
            
            $filterName = "Semua Pegawai";
        }
        
        
        $users = $usersQuery->with(['attendances' => function($q) use ($startDate, $endDate) {
            $q->whereBetween('date', [$startDate->format('Y-m-d'), $endDate->format('Y-m-d')]);
        }])->get();

        
        $reportData = [];
        $totals = ['present' => 0, 'late' => 0, 'sick' => 0, 'permit' => 0, 'alpha' => 0];

        $period = CarbonPeriod::create($startDate, $endDate);

        foreach ($period as $date) {
            
            if ($date->isWeekend()) continue;

            foreach ($users as $user) {
                
                $log = $user->attendances->firstWhere('date', $date->format('Y-m-d'));

                if ($log) {
                    
                    $status = $log->status;
                    $timeIn = $log->time_in;
                    $timeOut = $log->time_out;
                    $note = $log->note;
                    $late = $log->late_minutes;
                } else {
                    
                    $status = 'alpha';
                    $timeIn = '-';
                    $timeOut = '-';
                    $note = '-';
                    $late = 0;
                }

                
                if (isset($totals[$status])) {
                    $totals[$status]++;
                }

                
                $reportData[] = (object) [
                    'date' => $date->format('Y-m-d'),
                    'user_name' => $user->name,
                    'user_nip' => $user->nip,
                    'department' => $user->department, 
                    'status' => $status,
                    'time_in' => $timeIn,
                    'time_out' => $timeOut,
                    'late_minutes' => $late,
                    'note' => $note
                ];
            }
        }

        
        usort($reportData, function($a, $b) {
            return strcmp($a->date, $b->date) ?: strcmp($a->user_name, $b->user_name);
        });

        
        $viewData = [
            'reports' => collect($reportData), 
            'start_date' => $startDate->translatedFormat('d F Y'),
            'end_date' => $endDate->translatedFormat('d F Y'),
            'filter_name' => $filterName,
            'totals' => $totals 
        ];

        $fileName = "Laporan-Presensi-" . $startDate->format('dM') . '-sd-' . $endDate->format('dM') . '.' . ($format === 'excel' ? 'xlsx' : 'pdf');

        
        if ($format === 'pdf') {
            $pdf = Pdf::loadView('reports.attendance_pdf', $viewData)
                ->setPaper('a4', 'landscape');
            return $pdf->download($fileName);
        }

        
        if ($format === 'excel') {
            return Excel::download(new AttendanceExport($viewData['reports'], $startDate, $endDate, $totals), $fileName);
        }
    }
}
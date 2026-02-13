<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Carbon\CarbonPeriod;
use Inertia\Inertia;

class AdminLeaveController extends Controller
{
    public function index()
    {
        $leaves = LeaveRequest::with('user')
            ->orderByRaw("FIELD(status, 'pending', 'approved', 'rejected')")
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Leave/Index', [
            'leaves' => $leaves
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $leave = LeaveRequest::findOrFail($id);
        
        
        $leave->update(['status' => $request->status]);

        
        if ($request->status === 'approved') {
            
            
            
            $startDate = \Carbon\Carbon::parse($leave->start_date);
            $endDate = \Carbon\Carbon::parse($leave->end_date);

            $period = CarbonPeriod::create($startDate, $endDate);

            foreach ($period as $date) {
                
                

                
                
                Attendance::updateOrCreate(
                    [
                        'user_id' => $leave->user_id,
                        'date'    => $date->format('Y-m-d'),
                    ],
                    [
                        'status'       => $leave->type, 
                        'time_in'      => '00:00:00',   
                        'time_out'     => '00:00:00',
                        'late_minutes' => 0,
                        'lat'          => null,
                        'long'         => null,
                        'note'         => $leave->reason,
                    ]
                );
            }
        }

        
        
        if ($request->status === 'rejected') {
            $startDate = \Carbon\Carbon::parse($leave->start_date);
            $endDate = \Carbon\Carbon::parse($leave->end_date);
            
            $period = CarbonPeriod::create($startDate, $endDate);
            
            foreach ($period as $date) {
                Attendance::where('user_id', $leave->user_id)
                    ->where('date', $date->format('Y-m-d'))
                    ->whereIn('status', ['sick', 'permit']) 
                    ->delete();
            }
        }

        return back()->with('success', 'Status pengajuan berhasil diperbarui.');
    }
}
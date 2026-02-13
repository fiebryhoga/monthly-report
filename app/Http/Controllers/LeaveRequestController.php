<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LeaveRequestController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $leaves = LeaveRequest::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Employee/Leave/Index', [
            'leaves' => $leaves
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:sick,permit',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string|max:255',
            'attachment' => 'required_if:type,sick|nullable|mimes:pdf|max:2048',
        ], [
            'attachment.required_if' => 'Bukti surat dokter wajib diupload jika sakit.',
            'attachment.mimes' => 'Format file harus PDF.',
            'attachment.max' => 'Ukuran file maksimal 2MB.',
        ]);

        $data = $request->all();
        $data['user_id'] = Auth::id();
        $data['status'] = 'pending'; 

        
        if ($request->hasFile('attachment')) {
            
            $path = $request->file('attachment')->store('leaves', 'public');
            $data['attachment'] = $path;
        }

        LeaveRequest::create($data);

        return back()->with('success', 'Pengajuan berhasil dikirim. Menunggu persetujuan Admin.');
    }
}
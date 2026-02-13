<?php

namespace App\Http\Controllers;

use App\Models\AttendanceConfig;
use App\Models\Holiday;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfigController extends Controller
{
    public function index()
    {
        
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('Admin/Config/Index', [
            
            'config' => AttendanceConfig::first() ?? new AttendanceConfig(),
            
            'holidays' => Holiday::orderBy('date', 'desc')->get()
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'office_start_time' => 'required',
            'office_end_time' => 'required',
            'late_tolerance_minutes' => 'required|integer|min:0',
            'allowed_radius_meters' => 'required|integer|min:1',
            'office_latitude' => 'nullable|string',
            'office_longitude' => 'nullable|string',
        ]);

        
        AttendanceConfig::updateOrCreate(
            ['id' => 1],
            $request->all()
        );

        return back()->with('success', 'Pengaturan sistem berhasil diperbarui.');
    }

    public function storeHoliday(Request $request)
    {
        $request->validate([
            'date' => 'required|date|unique:holidays,date',
            'description' => 'required|string|max:255',
        ]);

        Holiday::create($request->all());

        return back()->with('success', 'Hari libur berhasil ditambahkan.');
    }

    public function destroyHoliday(Holiday $holiday)
    {
        $holiday->delete();
        return back()->with('success', 'Hari libur dihapus.');
    }
}
<?php

use App\Http\Controllers\AdminLeaveController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::resource('users', UserController::class)->except(['create', 'edit']);
    Route::patch('/users/{user}/role', [UserController::class, 'switchRole'])->name('users.role');

    Route::get('/config', [ConfigController::class, 'index'])->name('config.index');
    Route::put('/config', [ConfigController::class, 'update'])->name('config.update');
    Route::post('/holidays', [ConfigController::class, 'storeHoliday'])->name('holidays.store');
    Route::delete('/holidays/{holiday}', [ConfigController::class, 'destroyHoliday'])->name('holidays.destroy');

    Route::get('/admin/attendance', [AttendanceController::class, 'index'])->name('admin.attendance.index');
    Route::get('/my-attendance', [AttendanceController::class, 'myAttendance'])->name('attendance.my');
    Route::post('/attendance', [AttendanceController::class, 'store'])->name('attendance.store');

    Route::get('/leaves', [LeaveRequestController::class, 'index'])->name('leaves.index');
    Route::post('/leaves', [LeaveRequestController::class, 'store'])->name('leaves.store');

    Route::get('/admin/leaves', [AdminLeaveController::class, 'index'])->name('admin.leaves.index');
    Route::patch('/admin/leaves/{id}', [AdminLeaveController::class, 'updateStatus'])->name('admin.leaves.update');

    Route::get('/reports/export', [ReportController::class, 'export'])->name('reports.export');
});

require __DIR__.'/auth.php';
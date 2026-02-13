<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendanceConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'office_start_time',
        'office_end_time',
        'late_tolerance_minutes',
        'require_photo',
        'office_latitude',
        'office_longitude',
        'allowed_radius_meters',
    ];
}
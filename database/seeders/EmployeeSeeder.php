<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'nip' => 'EMP001',
            'name' => 'Andi Pratama',
            'email' => 'andi@sawitco.com',
            'phone' => '085711112221',
            'position' => 'Field Coordinator',
            'department' => 'Plantation',
            'role' => 'employee',
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'nip' => 'EMP002',
            'name' => 'Siti Aminah',
            'email' => 'siti@sawitco.com',
            'phone' => '085711112222',
            'position' => 'Quality Control',
            'department' => 'Production',
            'role' => 'employee',
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        
        User::create([
            'nip' => 'EMP003',
            'name' => 'Rudi Hartono',
            'email' => 'rudi@sawitco.com',
            'phone' => '085711112223',
            'position' => 'General Affair Staff',
            'department' => 'General Affair',
            'role' => 'employee',
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
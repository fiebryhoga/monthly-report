<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Dummy Admin 1
        User::create([
            'nip' => 'ADM001',
                'name' => 'Fiebry Prayhoga',
                'email' => 'admin.it@sawitco.com',
                'phone' => '081299990001',
                'position' => 'Head of IT',
                'department' => 'Information Technology',
                'role' => 'admin',
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
        ]);

        // Dummy Admin 2
        User::create([
            'nip' => 'ADM002',
            'name' => 'Sarah Savian',
            'email' => 'hrd@sawitco.com',
            'phone' => '081299990002',
            'position' => 'HR Manager',
            'department' => 'Human Resources',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Dummy Admin 3
        User::create([
            'nip' => 'ADM003',
            'name' => 'Budi Operasional',
            'email' => 'ops@sawitco.com',
            'phone' => '081299990003',
            'position' => 'Operational Director',
            'department' => 'Operations',
            'role' => 'admin',
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
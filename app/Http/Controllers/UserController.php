<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    
    public function index()
    {
        
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }

        
        return Inertia::render('Admin/Users/Index', [
            'users' => User::orderBy('name')->get() 
        ]);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'nip' => 'required|unique:users',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'position' => 'required|string',
            'department' => 'required|string',
            'phone' => 'nullable|string',
        ]);

        User::create([
            'nip' => $request->nip,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'position' => $request->position,
            'department' => $request->department,
            'phone' => $request->phone,
            'role' => 'employee', 
        ]);

        return redirect()->back()->with('success', 'Pegawai berhasil ditambahkan.');
    }

    
    public function update(Request $request, User $user)
    {
        $request->validate([
            'nip' => ['required', Rule::unique('users')->ignore($user->id)],
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'position' => 'required|string',
            'department' => 'required|string',
        ]);

        $data = $request->except(['password']);
        
        
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->back()->with('success', 'Data pegawai berhasil diperbarui.');
    }

    

    public function show(User $user)
    {


        return Inertia::render('Admin/Users/Show', [
            'user' => $user
        ]);
    }

    
    public function destroy(User $user)
    {
        if ($user->role === 'admin' && User::where('role', 'admin')->count() <= 1) {
            return redirect()->back()->with('error', 'Tidak bisa menghapus Admin terakhir!');
        }
        
        $user->delete();
        return redirect()->back()->with('success', 'User berhasil dihapus.');
    }

    
    public function switchRole(User $user)
    {
        
        $newRole = $user->role === 'admin' ? 'employee' : 'admin';

        
        if ($user->role === 'admin' && User::where('role', 'admin')->count() <= 1) {
            return redirect()->back()->with('error', 'Sistem harus menyisakan minimal 1 Admin.');
        }

        $user->update(['role' => $newRole]);

        $message = $newRole === 'admin' 
            ? "Pegawai $user->name berhasil diangkat menjadi Admin." 
            : "Admin $user->name berhasil diturunkan menjadi Pegawai.";

        return redirect()->back()->with('success', $message);
    }
}
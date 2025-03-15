<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->input('status');
        $search = $request->input('search');

        $users = User::when($status === 'verified', function ($query) {
            $query->whereNotNull('email_verified_at');
        })
            ->when($status === 'unverified', function ($query) {
                $query->whereNull('email_verified_at');
            })
            ->when(empty($status), function ($query) {
                $query->get();
            })->when(
                $search,
                fn($query) =>
                $query->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
            )
            ->get();

        return Inertia::render('Users', [
            'users' => $users,
            'status' => $status,
            'search' => $search ?? ''
        ]);
    }
}

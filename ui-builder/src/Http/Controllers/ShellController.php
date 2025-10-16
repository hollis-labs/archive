<?php

namespace HollisLabs\UiBuilder\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Contracts\View\View;

class ShellController extends Controller
{
    public function show(string $key): View
    {
        return view('ui-builder::shell', [
            'pageKey' => $key,
            'isAuthenticated' => auth()->check(),
            'hasUsers' => \App\Models\User::exists(),
            'user' => auth()->user()?->only(['id', 'name', 'email']),
        ]);
    }
}

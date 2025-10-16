<?php

use Illuminate\Support\Facades\Route;
use HollisLabs\UiBuilder\Http\Controllers\V2\V2ShellController;

Route::middleware(['web'])->group(function () {
    Route::prefix('v2')->group(function () {
        Route::get('/pages/{key}', [V2ShellController::class, 'show'])->name('ui-builder.pages.show');
    });
});

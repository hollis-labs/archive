<?php

use Illuminate\Support\Facades\Route;
use HollisLabs\UiBuilder\Http\Controllers\ShellController;

Route::middleware(['web'])->group(function () {
    // TODO: Remove the  Prefix once migration is complete.
    // Route::prefix('')->group(function () {
        Route::get('/pages/{key}', [ShellController::class, 'show'])->name('ui-builder.pages.show');
    // });
});

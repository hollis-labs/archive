<?php

use Illuminate\Support\Facades\Route;
use HollisLabs\UiBuilder\Http\Controllers\DataSourceController;
use HollisLabs\UiBuilder\Http\Controllers\UiPageController;

Route::prefix('api')->middleware('api')->group(function () {
    // UI DataSource routes (standard REST)
    Route::prefix('/ui/datasources')->group(function () {
        Route::get('{alias}', [DataSourceController::class, 'query']);
        Route::post('{alias}', [DataSourceController::class, 'store']);
        Route::get('{alias}/capabilities', [DataSourceController::class, 'capabilities']);
    });
    
    // UI Page API routes
    Route::prefix('/ui')->group(function () {
        Route::get('/pages/{key}', [UiPageController::class, 'show']);
    });
});

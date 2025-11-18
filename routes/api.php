<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OutletController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Register dan Login
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:api'])->group(function() {
    // logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Role Admin
    Route::middleware(['role:admin'])->group(function () {
        Route::apiResource('/users', UserController::class);
    });

    // Role User
    Route::middleware(['role:user'])->group(function() {
        Route::apiResource('/category', CategoryController::class);
        Route::apiResource('/outlet', OutletController::class);
        Route::apiResource('/transaction', TransactionController::class);

        // Report Export PDF
        Route::get('/report/export-all-pdf', [ReportController::class, 'exportAllPdf']);
        Route::get('/report/{id}/export-pdf', [ReportController::class, 'exportPdf']);

        Route::apiResource('/report', ReportController::class);
    });
});

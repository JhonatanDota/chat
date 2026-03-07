<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FriendshipController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// =========================================================================
// Auth
// =========================================================================

Route::post('/auth', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::prefix('password')->group(function () {
    Route::post('/forgot', [AuthController::class, 'sendPasswordResetLink']);
    Route::post('/reset', [AuthController::class, 'resetPassword']);
});

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// =========================================================================
// Users
// =========================================================================

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::prefix('users')->group(function () {
        Route::get('/{identifier}', [UserController::class, 'show']);
    });
});

// =========================================================================
// Friendship
// =========================================================================

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::prefix('friendships')->group(function () {
        Route::get('/check/{user}', [FriendshipController::class, 'check']);
        Route::post('/request', [FriendshipController::class, 'request']);
        Route::post('{friendshipRequest}/respond', [FriendshipController::class, 'respond']);
    });
});

<?php

use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;

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


Route::get('/', [ApiController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/login-with-token', [AuthController::class, 'loginWithToken']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/resend-verify-email', [AuthController::class, 'resendVerifyEmail'])->middleware('apiThrottle:3,60');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->middleware('apiThrottle:3,60');
Route::post('/change-password', [AuthController::class, 'changePassword']);

Route::get('products', [ProductController::class, 'searchProducts']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::post('/user', [UserController::class, 'updateUser']);
    Route::post('/logout', [UserController::class, 'logout']);

    Route::group(['prefix' => 'category'], function () {
        Route::get('/list', [CategoryController::class, 'list']);
        Route::post('/add', [CategoryController::class, 'addCategory']);
        Route::put('/edit/{id}', [CategoryController::class, 'editCategory']);
        Route::delete('/delete/{id}', [CategoryController::class, 'deleteCategory']);
    });

    Route::group(['prefix' => 'product'], function () {
        Route::get('/list', [\App\Http\Controllers\Api\ProductController::class, 'list']);
        Route::get('/{id}', [\App\Http\Controllers\Api\ProductController::class, 'getById']);
        Route::post('/add', [\App\Http\Controllers\Api\ProductController::class, 'addProduct']);
        Route::post('/{id}/images', [\App\Http\Controllers\Api\ProductController::class, 'saveProductImages']);
        Route::get('/{id}/images', [\App\Http\Controllers\Api\ProductController::class, 'getProductImages']);
        Route::delete('/delete-image/{id}',  [\App\Http\Controllers\Api\ProductController::class, 'deleteImage']);
        Route::put('/edit/{id}', [\App\Http\Controllers\Api\ProductController::class, 'editProduct']);
        Route::delete('/delete/{id}', [\App\Http\Controllers\Api\ProductController::class, 'deleteProduct']);
    });
});

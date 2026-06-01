<?php

declare(strict_types=1);

use App\Http\Controllers\Api\AmenityController;
use App\Http\Controllers\Api\ContactSettingController;
use App\Http\Controllers\Api\ClusterController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\NavigationController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\VirtualTourController;
use Illuminate\Support\Facades\Route;

Route::get('/virtual-tours', [VirtualTourController::class, 'index']);
Route::get('/virtual-tours/default', [VirtualTourController::class, 'default']);
Route::get('/virtual-tours/by-cluster/{clusterSlug}', [VirtualTourController::class, 'byCluster']);
Route::get('/virtual-tours/{slug}', [VirtualTourController::class, 'show']);

Route::get('/clusters', [ClusterController::class, 'index']);
Route::get('/clusters/{slug}', [ClusterController::class, 'show']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::get('/navigation', [NavigationController::class, 'index']);
Route::get('/amenities', [AmenityController::class, 'index']);
Route::get('/contact-settings', [ContactSettingController::class, 'show']);

Route::post('/leads', [LeadController::class, 'store'])->middleware('throttle:12,1');

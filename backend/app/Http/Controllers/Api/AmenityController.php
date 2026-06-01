<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AmenityLocationResource;
use App\Services\AmenityService;
use Illuminate\Http\JsonResponse;

final class AmenityController extends Controller
{
    public function index(AmenityService $amenities): JsonResponse
    {
        return AmenityLocationResource::collection($amenities->listPublished())
            ->response()
            ->header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    }
}

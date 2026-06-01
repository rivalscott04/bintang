<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NavigationLinkResource;
use App\Services\NavigationService;
use Illuminate\Http\JsonResponse;

final class NavigationController extends Controller
{
    public function index(NavigationService $navigation): JsonResponse
    {
        return NavigationLinkResource::collection($navigation->activeLinks())
            ->response()
            ->header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    }
}

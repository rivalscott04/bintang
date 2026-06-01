<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VirtualTourResource;
use App\Services\VirtualTourService;
use Illuminate\Http\JsonResponse;

final class VirtualTourController extends Controller
{
    public function index(VirtualTourService $tours): JsonResponse
    {
        return VirtualTourResource::collection($tours->listPublished())
            ->response()
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    public function default(VirtualTourService $tours): JsonResponse
    {
        $tour = $tours->findPublishedDefault();

        if ($tour === null) {
            return response()->json(['message' => 'Tur virtual tidak tersedia'], 404);
        }

        return (new VirtualTourResource($tour))
            ->response()
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    public function show(string $slug, VirtualTourService $tours): JsonResponse
    {
        $tour = $tours->findPublishedBySlug($slug);

        if ($tour === null) {
            return response()->json(['message' => 'Tur virtual tidak ditemukan'], 404);
        }

        return (new VirtualTourResource($tour))
            ->response()
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    public function byCluster(string $clusterSlug, VirtualTourService $tours): JsonResponse
    {
        $tour = $tours->findPublishedByClusterSlug($clusterSlug);

        if ($tour === null) {
            return response()->json(['message' => 'Tur virtual untuk klaster ini tidak tersedia'], 404);
        }

        return (new VirtualTourResource($tour))
            ->response()
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }
}

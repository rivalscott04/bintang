<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClusterResource;
use App\Services\ClusterService;
use Illuminate\Http\JsonResponse;

final class ClusterController extends Controller
{
    public function index(ClusterService $clusters): JsonResponse
    {
        return ClusterResource::collection($clusters->listPublished())
            ->response()
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    public function show(string $slug, ClusterService $clusters): JsonResponse
    {
        $cluster = $clusters->findPublishedBySlug($slug);

        if ($cluster === null) {
            return response()->json(['message' => 'Klaster tidak ditemukan'], 404);
        }

        return (new ClusterResource($cluster))
            ->response()
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;

final class ProjectController extends Controller
{
    public function index(ProjectService $projects): JsonResponse
    {
        return ProjectResource::collection($projects->listPublished())
            ->response()
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }

    public function show(string $slug, ProjectService $projects): JsonResponse
    {
        $project = $projects->findPublishedBySlug($slug);

        if ($project === null) {
            return response()->json(['message' => 'Proyek tidak ditemukan'], 404);
        }

        return (new ProjectResource($project))
            ->response()
            ->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    }
}

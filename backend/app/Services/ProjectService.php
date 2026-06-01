<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

final class ProjectService
{
    /** @return Collection<int, Project> */
    public function listPublished(): Collection
    {
        return Project::query()
            ->with('clusterRecord')
            ->published()
            ->ordered()
            ->get();
    }

    public function findPublishedBySlug(string $slug): ?Project
    {
        return Project::query()
            ->with('clusterRecord')
            ->published()
            ->where('slug', $slug)
            ->first();
    }
}

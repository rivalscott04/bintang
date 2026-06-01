<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Cluster;
use Illuminate\Database\Eloquent\Collection;

final class ClusterService
{
    /** @return Collection<int, Cluster> */
    public function listPublished(): Collection
    {
        return Cluster::query()
            ->published()
            ->ordered()
            ->get();
    }

    public function findPublishedBySlug(string $slug): ?Cluster
    {
        return Cluster::query()
            ->published()
            ->with([
                'projects' => fn ($query) => $query->published()->ordered()->with('clusterRecord'),
            ])
            ->where('slug', $slug)
            ->first();
    }
}

<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\VirtualTour;
use Illuminate\Database\Eloquent\Collection;

final class VirtualTourService
{
    public function findPublishedDefault(): ?VirtualTour
    {
        $tour = VirtualTour::query()
            ->published()
            ->default()
            ->first();

        if ($tour !== null) {
            return $this->loadFull($tour);
        }

        $tour = VirtualTour::query()
            ->published()
            ->orderBy('sort_order')
            ->first();

        return $tour ? $this->loadFull($tour) : null;
    }

    public function findPublishedBySlug(string $slug): ?VirtualTour
    {
        $tour = VirtualTour::query()
            ->published()
            ->where('slug', $slug)
            ->first();

        return $tour ? $this->loadFull($tour) : null;
    }

    public function findPublishedByClusterSlug(string $clusterSlug): ?VirtualTour
    {
        $tour = VirtualTour::query()
            ->published()
            ->whereHas('cluster', fn ($q) => $q->where('slug', $clusterSlug))
            ->orderByDesc('is_default')
            ->orderBy('sort_order')
            ->first();

        return $tour ? $this->loadFull($tour) : null;
    }

    /** @return Collection<int, VirtualTour> */
    public function listPublished(): Collection
    {
        return VirtualTour::query()
            ->published()
            ->with('cluster')
            ->orderByDesc('is_default')
            ->orderBy('sort_order')
            ->get();
    }

    private function loadFull(VirtualTour $tour): VirtualTour
    {
        return $tour->load([
            'cluster',
            'rooms',
            'hotspots.fromRoom',
            'hotspots.toRoom',
            'waypoints.room',
        ]);
    }
}

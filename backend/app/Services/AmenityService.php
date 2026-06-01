<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\AmenityLocation;
use Illuminate\Database\Eloquent\Collection;

final class AmenityService
{
    /** @return Collection<int, AmenityLocation> */
    public function listPublished(): Collection
    {
        return AmenityLocation::query()
            ->published()
            ->ordered()
            ->get();
    }
}

<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\NavigationItem;
use Illuminate\Database\Eloquent\Collection;

final class NavigationService
{
    /** @return Collection<int, NavigationItem> */
    public function activeLinks(): Collection
    {
        return NavigationItem::query()
            ->active()
            ->ordered()
            ->get();
    }
}

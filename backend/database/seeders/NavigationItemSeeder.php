<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\NavigationItem;
use Illuminate\Database\Seeder;

class NavigationItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['to' => '/klaster', 'label' => 'Klaster Hunian', 'sort_order' => 1],
            ['to' => '/projek', 'label' => 'Semua Unit', 'sort_order' => 2],
            ['to' => '/lokasi', 'label' => 'Lokasi', 'sort_order' => 3],
        ];

        NavigationItem::query()
            ->whereIn('to', ['/#virtual-tour', '/#clusters', '/#amenities'])
            ->update(['is_active' => false]);

        foreach ($items as $item) {
            NavigationItem::query()->updateOrCreate(
                ['to' => $item['to']],
                [...$item, 'is_active' => true],
            );
        }
    }
}

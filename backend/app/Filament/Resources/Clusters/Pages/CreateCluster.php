<?php

declare(strict_types=1);

namespace App\Filament\Resources\Clusters\Pages;

use App\Filament\Resources\Clusters\ClusterResource;
use App\Models\Cluster;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;

class CreateCluster extends CreateRecord
{
    protected static string $resource = ClusterResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (! isset($data['sort_order']) || $data['sort_order'] === '' || $data['sort_order'] === null) {
            $data['sort_order'] = ((int) Cluster::query()->max('sort_order')) + 1;
        }

        if (blank($data['slug'] ?? null) && filled($data['title'] ?? null)) {
            $data['slug'] = Str::slug($data['title']);
        }

        $data['hover_cta'] = self::normalizeCta($data['hover_cta'] ?? []);
        $data['cta'] = self::normalizeCta($data['cta'] ?? [], requireIcon: false);

        return $data;
    }

    /**
     * @param  array<string, mixed>  $cta
     * @return array<string, string>
     */
    public static function normalizeCta(array $cta, bool $requireIcon = true): array
    {
        $normalized = array_filter([
            'icon' => $cta['icon'] ?? null,
            'label' => $cta['label'] ?? null,
            'href' => $cta['href'] ?? null,
        ], fn ($value) => filled($value));

        if ($requireIcon && ! isset($normalized['icon'])) {
            $normalized['icon'] = 'fa-solid fa-arrow-right';
        }

        return $normalized;
    }
}

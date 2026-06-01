<?php

declare(strict_types=1);

namespace App\Filament\Resources\Clusters\Pages;

use App\Filament\Resources\Clusters\ClusterResource;
use Filament\Resources\Pages\EditRecord;

class EditCluster extends EditRecord
{
    protected static string $resource = ClusterResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['hover_cta'] = CreateCluster::normalizeCta($data['hover_cta'] ?? []);
        $data['cta'] = CreateCluster::normalizeCta($data['cta'] ?? [], requireIcon: false);

        return $data;
    }
}

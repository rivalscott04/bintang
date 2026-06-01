<?php

declare(strict_types=1);

namespace App\Filament\Resources\Projects\Pages;

use App\Filament\Resources\Projects\ProjectResource;
use App\Models\Cluster;
use App\Models\Project;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;

class CreateProject extends CreateRecord
{
    protected static string $resource = ProjectResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (! isset($data['sort_order']) || $data['sort_order'] === '' || $data['sort_order'] === null) {
            $data['sort_order'] = ((int) Project::query()->max('sort_order')) + 1;
        }

        if (blank($data['slug'] ?? null) && filled($data['name'] ?? null)) {
            $data['slug'] = Str::slug($data['name']);
        }

        $data = self::syncClusterName($data);

        return $data;
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    public static function syncClusterName(array $data): array
    {
        if (filled($data['cluster_id'] ?? null)) {
            $cluster = Cluster::query()->find($data['cluster_id']);
            if ($cluster !== null) {
                $data['cluster'] = $cluster->name;
            }
        }

        return $data;
    }
}

<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\Pages;

use App\Filament\Resources\VirtualTours\VirtualTourResource;
use App\Models\VirtualTour;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;

class CreateVirtualTour extends CreateRecord
{
    protected static string $resource = VirtualTourResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (blank($data['slug'] ?? null) && filled($data['name'] ?? null)) {
            $data['slug'] = Str::slug($data['name']);
        }

        if (($data['is_default'] ?? false) === true) {
            VirtualTour::query()->update(['is_default' => false]);
        }

        return $data;
    }
}

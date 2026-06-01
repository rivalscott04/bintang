<?php

declare(strict_types=1);

namespace App\Filament\Resources\AmenityLocations\Pages;

use App\Filament\Resources\AmenityLocations\AmenityLocationResource;
use App\Models\AmenityLocation;
use Filament\Resources\Pages\CreateRecord;

class CreateAmenityLocation extends CreateRecord
{
    protected static string $resource = AmenityLocationResource::class;

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (! isset($data['sort_order']) || $data['sort_order'] === '' || $data['sort_order'] === null) {
            $data['sort_order'] = ((int) AmenityLocation::query()->max('sort_order')) + 1;
        }

        return $data;
    }
}

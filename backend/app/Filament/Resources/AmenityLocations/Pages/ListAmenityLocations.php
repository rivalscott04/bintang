<?php

declare(strict_types=1);

namespace App\Filament\Resources\AmenityLocations\Pages;

use App\Filament\Resources\AmenityLocations\AmenityLocationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAmenityLocations extends ListRecords
{
    protected static string $resource = AmenityLocationResource::class;

    public function getSubheading(): ?string
    {
        return 'Pin lokasi strategis di peta /lokasi. Seret baris untuk mengubah urutan tampil.';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

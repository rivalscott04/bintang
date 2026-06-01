<?php

declare(strict_types=1);

namespace App\Filament\Resources\AmenityLocations\Pages;

use App\Filament\Resources\AmenityLocations\AmenityLocationResource;
use Filament\Resources\Pages\EditRecord;

class EditAmenityLocation extends EditRecord
{
    protected static string $resource = AmenityLocationResource::class;
}

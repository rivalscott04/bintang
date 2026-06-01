<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\Pages;

use App\Filament\Resources\VirtualTours\VirtualTourResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListVirtualTours extends ListRecords
{
    protected static string $resource = VirtualTourResource::class;

    public function getSubheading(): ?string
    {
        return 'Atur teks section beranda dan ruangan 3D. Edit tur → tab Ruangan / Hotspot / Waypoint sinematik.';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

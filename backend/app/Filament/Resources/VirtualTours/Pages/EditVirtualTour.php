<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\Pages;

use App\Filament\Resources\VirtualTours\VirtualTourResource;
use App\Models\VirtualTour;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditVirtualTour extends EditRecord
{
    protected static string $resource = VirtualTourResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (($data['is_default'] ?? false) === true) {
            VirtualTour::query()
                ->where('id', '!=', $this->record->getKey())
                ->update(['is_default' => false]);
        }

        return $data;
    }
}

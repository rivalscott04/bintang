<?php

declare(strict_types=1);

namespace App\Filament\Resources\Projects\Pages;

use App\Filament\Resources\Projects\ProjectResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListProjects extends ListRecords
{
    protected static string $resource = ProjectResource::class;

    public function getSubheading(): ?string
    {
        return 'Klik "Atur urutan tampil", lalu seret baris proyek untuk mengubah urutan di website.';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function isTablePaginationEnabledWhileReordering(): bool
    {
        return false;
    }
}

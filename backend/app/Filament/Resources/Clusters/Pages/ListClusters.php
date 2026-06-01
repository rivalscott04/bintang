<?php

declare(strict_types=1);

namespace App\Filament\Resources\Clusters\Pages;

use App\Filament\Resources\Clusters\ClusterResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListClusters extends ListRecords
{
    protected static string $resource = ClusterResource::class;

    public function getSubheading(): ?string
    {
        return 'Kelola klaster beranda dan halaman /klaster/{slug}. Urutan kartu: seret baris di mode "Atur urutan tampil".';
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

<?php

declare(strict_types=1);

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListUsers extends ListRecords
{
    protected static string $resource = UserResource::class;

    public function getSubheading(): ?string
    {
        return 'Akun sales muncul di dropdown distribusi lead (CRM → Lead Prospek).';
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()->label('Tambah sales'),
        ];
    }
}

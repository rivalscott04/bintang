<?php

declare(strict_types=1);

namespace App\Filament\Resources\Leads\Pages;

use App\Filament\Resources\Leads\LeadResource;
use Filament\Resources\Pages\ListRecords;

class ListLeads extends ListRecords
{
    protected static string $resource = LeadResource::class;

    public function getSubheading(): ?string
    {
        return 'Lead dari form brosur website. Buka baris untuk distribusikan ke sales dan update status.';
    }
}

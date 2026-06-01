<?php

declare(strict_types=1);

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum LeadStatus: string implements HasColor, HasLabel
{
    case New = 'new';
    case Assigned = 'assigned';
    case Contacted = 'contacted';
    case Won = 'won';
    case Lost = 'lost';

    public function getLabel(): string
    {
        return match ($this) {
            self::New => 'Baru',
            self::Assigned => 'Didistribusikan',
            self::Contacted => 'Sudah dihubungi',
            self::Won => 'Deal',
            self::Lost => 'Tidak lanjut',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::New => 'info',
            self::Assigned => 'warning',
            self::Contacted => 'primary',
            self::Won => 'success',
            self::Lost => 'gray',
        };
    }
}

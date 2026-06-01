<?php

declare(strict_types=1);

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum ProjectStatus: string implements HasLabel
{
    case Live = 'live';
    case Developing = 'developing';
    case Planned = 'planned';

    public function label(): string
    {
        return match ($this) {
            self::Live => 'Sudah Dikembangkan',
            self::Developing => 'Dalam Pengembangan',
            self::Planned => 'Akan Datang',
        };
    }

    public function getLabel(): string
    {
        return $this->label();
    }
}

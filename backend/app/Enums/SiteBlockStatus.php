<?php

declare(strict_types=1);

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum SiteBlockStatus: string implements HasLabel
{
    case Available = 'available';
    case Reserved = 'reserved';
    case Sold = 'sold';

    public function label(): string
    {
        return match ($this) {
            self::Available => 'Tersedia',
            self::Reserved => 'Reserved',
            self::Sold => 'Terjual',
        };
    }

    public function getLabel(): string
    {
        return $this->label();
    }
}

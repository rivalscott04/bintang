<?php

declare(strict_types=1);

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum AmenityCategory: string implements HasLabel
{
    case Dining = 'dining';
    case Lifestyle = 'lifestyle';
    case Hotel = 'hotel';
    case Edu = 'edu';
    case Tol = 'tol';
    case Trans = 'trans';
    case Mall = 'mall';
    case Med = 'med';

    public function getLabel(): string
    {
        return match ($this) {
            self::Dining => 'Kuliner',
            self::Lifestyle => 'Lifestyle',
            self::Hotel => 'Hotel',
            self::Edu => 'Pendidikan',
            self::Tol => 'Tol',
            self::Trans => 'Transportasi',
            self::Mall => 'Mall',
            self::Med => 'Kesehatan',
        };
    }
}

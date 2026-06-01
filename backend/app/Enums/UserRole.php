<?php

declare(strict_types=1);

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum UserRole: string implements HasLabel
{
    case Admin = 'admin';
    case Sales = 'sales';

    public function getLabel(): string
    {
        return match ($this) {
            self::Admin => 'Administrator',
            self::Sales => 'Sales',
        };
    }
}

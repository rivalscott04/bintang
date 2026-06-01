<?php

declare(strict_types=1);

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum DoorSide: string implements HasLabel
{
    case North = 'north';
    case South = 'south';
    case East = 'east';
    case West = 'west';

    public function getLabel(): string
    {
        return match ($this) {
            self::North => 'Utara (dinding atas denah)',
            self::South => 'Selatan (dinding bawah denah)',
            self::East => 'Timur (kanan)',
            self::West => 'Barat (kiri)',
        };
    }
}

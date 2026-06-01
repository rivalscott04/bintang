<?php

declare(strict_types=1);

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;

enum FurnitureType: string implements HasLabel
{
    case Box = 'box';
    case Sphere = 'sphere';
    case Cylinder = 'cylinder';
    case Cone = 'cone';

    public function getLabel(): string
    {
        return match ($this) {
            self::Box => 'Kotak / balok (sofa, meja, TV)',
            self::Sphere => 'Bola (lampu bulat)',
            self::Cylinder => 'Silinder (tiang, vas)',
            self::Cone => 'Kerucut (tanaman)',
        };
    }
}

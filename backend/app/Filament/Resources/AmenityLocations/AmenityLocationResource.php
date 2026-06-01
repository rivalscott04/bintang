<?php

declare(strict_types=1);

namespace App\Filament\Resources\AmenityLocations;

use App\Filament\Resources\AmenityLocations\Pages\CreateAmenityLocation;
use App\Filament\Resources\AmenityLocations\Pages\EditAmenityLocation;
use App\Filament\Resources\AmenityLocations\Pages\ListAmenityLocations;
use App\Filament\Resources\AmenityLocations\Schemas\AmenityLocationForm;
use App\Filament\Resources\AmenityLocations\Tables\AmenityLocationsTable;
use App\Models\AmenityLocation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class AmenityLocationResource extends Resource
{
    protected static ?string $model = AmenityLocation::class;

    protected static ?string $modelLabel = 'Lokasi amenitas';

    protected static ?string $pluralModelLabel = 'Lokasi amenitas';

    protected static ?string $navigationLabel = 'Peta lokasi';

    protected static ?string $recordTitleAttribute = 'name';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMapPin;

    protected static string|\UnitEnum|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 5;

    public static function form(Schema $schema): Schema
    {
        return AmenityLocationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AmenityLocationsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListAmenityLocations::route('/'),
            'create' => CreateAmenityLocation::route('/create'),
            'edit' => EditAmenityLocation::route('/{record}/edit'),
        ];
    }
}

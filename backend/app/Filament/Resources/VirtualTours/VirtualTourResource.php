<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours;

use App\Filament\Resources\VirtualTours\Pages\CreateVirtualTour;
use App\Filament\Resources\VirtualTours\Pages\EditVirtualTour;
use App\Filament\Resources\VirtualTours\Pages\ListVirtualTours;
use App\Filament\Resources\VirtualTours\RelationManagers\HotspotsRelationManager;
use App\Filament\Resources\VirtualTours\RelationManagers\RoomsRelationManager;
use App\Filament\Resources\VirtualTours\RelationManagers\WaypointsRelationManager;
use App\Filament\Resources\VirtualTours\Schemas\VirtualTourForm;
use App\Filament\Resources\VirtualTours\Tables\VirtualToursTable;
use App\Models\VirtualTour;
use BackedEnum;
use Filament\Resources\Resource;
use Illuminate\Database\Eloquent\Builder;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class VirtualTourResource extends Resource
{
    protected static ?string $model = VirtualTour::class;

    protected static ?string $modelLabel = 'Tur Virtual 3D';

    protected static ?string $pluralModelLabel = 'Tur Virtual 3D';

    protected static ?string $navigationLabel = 'Tur Virtual 3D';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCube;

    protected static string|\UnitEnum|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return VirtualTourForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VirtualToursTable::configure($table);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->with('cluster')
            ->withCount('rooms');
    }

    public static function getRelations(): array
    {
        return [
            RoomsRelationManager::class,
            HotspotsRelationManager::class,
            WaypointsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListVirtualTours::route('/'),
            'create' => CreateVirtualTour::route('/create'),
            'edit' => EditVirtualTour::route('/{record}/edit'),
        ];
    }
}

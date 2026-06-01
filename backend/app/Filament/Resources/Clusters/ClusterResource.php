<?php

declare(strict_types=1);

namespace App\Filament\Resources\Clusters;

use App\Filament\Resources\Clusters\Pages\CreateCluster;
use App\Filament\Resources\Clusters\Pages\EditCluster;
use App\Filament\Resources\Clusters\Pages\ListClusters;
use App\Filament\Resources\Clusters\Schemas\ClusterForm;
use App\Filament\Resources\Clusters\Tables\ClustersTable;
use App\Models\Cluster;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ClusterResource extends Resource
{
    protected static ?string $model = Cluster::class;

    protected static ?string $modelLabel = 'Klaster';

    protected static ?string $pluralModelLabel = 'Klaster';

    protected static ?string $navigationLabel = 'Klaster';

    protected static ?string $recordTitleAttribute = 'title';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingOffice2;

    protected static string|\UnitEnum|null $navigationGroup = 'Konten Website';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return ClusterForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ClustersTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListClusters::route('/'),
            'create' => CreateCluster::route('/create'),
            'edit' => EditCluster::route('/{record}/edit'),
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\RelationManagers;

use App\Filament\Resources\VirtualTours\Schemas\VirtualTourRoomForm;
use App\Filament\Resources\VirtualTours\Support\VirtualTourRoomFormMapper;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class RoomsRelationManager extends RelationManager
{
    protected static string $relationship = 'rooms';

    protected static ?string $title = 'Ruangan 3D';

    protected static ?string $recordTitleAttribute = 'name';

    public function form(Schema $schema): Schema
    {
        return VirtualTourRoomForm::configure($schema);
    }

    public function table(Table $table): Table
    {
        return $table
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('name')->label('Ruangan'),
                TextColumn::make('slug')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('spec_area')->label('Luas'),
                TextColumn::make('model_glb')
                    ->label('GLB')
                    ->formatStateUsing(fn (?string $state): string => filled($state) ? 'Ya' : 'Primitif')
                    ->badge()
                    ->color(fn (?string $state): string => filled($state) ? 'success' : 'gray'),
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('Tambah ruangan')
                    ->mutateFormDataUsing(fn (array $data): array => VirtualTourRoomFormMapper::toModel($data)),
            ])
            ->recordActions([
                EditAction::make()
                    ->mutateRecordDataUsing(fn (array $data): array => VirtualTourRoomFormMapper::toForm($data))
                    ->mutateFormDataUsing(fn (array $data): array => VirtualTourRoomFormMapper::toModel($data)),
                DeleteAction::make(),
            ]);
    }
}

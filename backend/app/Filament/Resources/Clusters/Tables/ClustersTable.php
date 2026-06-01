<?php

declare(strict_types=1);

namespace App\Filament\Resources\Clusters\Tables;

use App\Models\Cluster;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ClustersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->reorderRecordsTriggerAction(
                fn (Action $action, bool $isReordering): Action => $action->label(
                    $isReordering ? 'Selesai mengurutkan' : 'Atur urutan tampil',
                ),
            )
            ->columns([
                ImageColumn::make('image')
                    ->label('Foto')
                    ->disk('public')
                    ->getStateUsing(fn (Cluster $record): ?string => str_starts_with($record->image ?? '', 'clusters/')
                        ? $record->image
                        : null)
                    ->toggleable(),
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('badge')
                    ->label('Tipe'),
                TextColumn::make('price_label')
                    ->label('Harga'),
                IconColumn::make('featured')
                    ->boolean()
                    ->label('Unggulan'),
                IconColumn::make('is_published')
                    ->boolean()
                    ->label('Publik'),
            ])
            ->filters([
                TernaryFilter::make('featured')
                    ->label('Unggulan beranda'),
                TernaryFilter::make('is_published')
                    ->label('Publikasi'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}

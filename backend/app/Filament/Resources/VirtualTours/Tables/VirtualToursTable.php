<?php

declare(strict_types=1);

namespace App\Filament\Resources\VirtualTours\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class VirtualToursTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('cluster.title')
                    ->label('Klaster')
                    ->toggleable(),
                IconColumn::make('is_default')
                    ->boolean()
                    ->label('Default'),
                IconColumn::make('is_published')
                    ->boolean()
                    ->label('Publik'),
                TextColumn::make('rooms_count')
                    ->counts('rooms')
                    ->label('Ruangan'),
            ])
            ->filters([
                TernaryFilter::make('is_published')
                    ->label('Publikasi'),
            ])
            ->recordActions([
                EditAction::make(),
            ]);
    }
}

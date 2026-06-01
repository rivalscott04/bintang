<?php

declare(strict_types=1);

namespace App\Filament\Resources\Projects\Tables;

use App\Enums\ProjectStatus;
use App\Models\Project;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ProjectsTable
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
                    ->visibility('public')
                    ->getStateUsing(fn (Project $record): ?string => str_starts_with($record->image ?? '', 'projects/')
                        ? $record->image
                        : null)
                    ->toggleable(),
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('cluster')
                    ->label('Klaster')
                    ->sortable(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->sortable(),
                IconColumn::make('featured')
                    ->boolean()
                    ->label('Beranda'),
                IconColumn::make('is_published')
                    ->boolean()
                    ->label('Publik'),
                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options(ProjectStatus::class),
                TernaryFilter::make('featured')
                    ->label('Preview beranda'),
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

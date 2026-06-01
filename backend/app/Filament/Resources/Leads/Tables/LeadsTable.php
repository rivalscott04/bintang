<?php

declare(strict_types=1);

namespace App\Filament\Resources\Leads\Tables;

use App\Enums\LeadStatus;
use App\Models\Lead;
use App\Services\LeadFollowUpService;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

final class LeadsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('created_at')
                    ->label('Masuk')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('phone')
                    ->label('WhatsApp')
                    ->searchable()
                    ->copyable(),
                TextColumn::make('project_name')
                    ->label('Proyek')
                    ->searchable()
                    ->description(fn (Lead $record): ?string => $record->cluster_name
                        ? "Klaster {$record->cluster_name}"
                        : null),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->sortable(),
                TextColumn::make('assignee.name')
                    ->label('Sales')
                    ->placeholder('—')
                    ->sortable(),
                TextColumn::make('last_contacted_at')
                    ->label('Follow-up')
                    ->placeholder('Belum')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->description(fn (Lead $record): ?string => $record->contact_count > 0
                        ? "{$record->contact_count}× kontak WA"
                        : null),
            ])
            ->filters([
                TernaryFilter::make('followed_up')
                    ->label('Sudah follow-up')
                    ->queries(
                        true: fn ($query) => $query->whereNotNull('first_contacted_at'),
                        false: fn ($query) => $query->whereNull('first_contacted_at'),
                    ),
                SelectFilter::make('status')
                    ->label('Status')
                    ->options(LeadStatus::class),
                SelectFilter::make('assigned_to')
                    ->label('Sales')
                    ->relationship('assignee', 'name'),
            ])
            ->recordActions([
                Action::make('whatsappOutreach')
                    ->label('WA')
                    ->icon(Heroicon::OutlinedChatBubbleLeftRight)
                    ->color('success')
                    ->tooltip('WhatsApp + catat follow-up')
                    ->url(fn (Lead $record): string => app(LeadFollowUpService::class)->trackedOutreachUrl($record))
                    ->openUrlInNewTab(),
                EditAction::make(),
            ]);
    }
}

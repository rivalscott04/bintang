<?php

declare(strict_types=1);

namespace App\Filament\Resources\Leads\Schemas;

use App\Enums\LeadStatus;
use App\Enums\UserRole;
use App\Services\LeadWhatsAppService;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

final class LeadForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->label('Nama')
                ->disabled(),
            TextInput::make('phone')
                ->label('WhatsApp')
                ->disabled(),
            Placeholder::make('project_summary')
                ->label('Proyek')
                ->content(fn ($record): string => $record
                    ? trim("{$record->project_name}".($record->cluster_name ? " · Klaster {$record->cluster_name}" : ''))
                    : '—'),
            Placeholder::make('source')
                ->label('Sumber')
                ->content(fn ($record): string => $record?->source ?? '—'),
            Placeholder::make('visitor_message')
                ->label('Pesan pengunjung')
                ->content(fn ($record): string => filled($record?->visitor_message)
                    ? $record->visitor_message
                    : '—')
                ->columnSpanFull(),
            Select::make('status')
                ->label('Status')
                ->options(LeadStatus::class)
                ->required()
                ->native(false),
            Select::make('assigned_to')
                ->label('Sales penanggung jawab')
                ->relationship(
                    name: 'assignee',
                    titleAttribute: 'name',
                    modifyQueryUsing: fn ($query) => $query->where('role', UserRole::Sales),
                )
                ->searchable()
                ->preload()
                ->placeholder('Belum didistribusikan'),
            Placeholder::make('follow_up_summary')
                ->label('Riwayat follow-up')
                ->content(function ($record): string {
                    if (! $record) {
                        return '—';
                    }

                    if (! $record->first_contacted_at) {
                        return 'Belum ada follow-up. Klik «Hubungi via WhatsApp» untuk mencatat otomatis.';
                    }

                    $lines = [
                        'Pertama: '.$record->first_contacted_at->format('d M Y H:i'),
                        'Terakhir: '.$record->last_contacted_at?->format('d M Y H:i') ?? '—',
                        "Total kontak WA: {$record->contact_count}×",
                    ];

                    $record->loadMissing('contactLogs.user');
                    foreach ($record->contactLogs->take(5) as $log) {
                        $lines[] = '· '.$log->created_at->format('d M Y H:i')
                            .' — '.($log->user?->name ?? 'User')
                            .' ('.$log->channel.')';
                    }

                    return implode("\n", $lines);
                })
                ->columnSpanFull(),
            Placeholder::make('whatsapp_outreach_preview')
                ->label('Preview template outreach')
                ->content(fn ($record): string => $record
                    ? app(LeadWhatsAppService::class)->previewMessageForLead($record, auth()->user())
                    : '—')
                ->columnSpanFull(),
            Textarea::make('manager_notes')
                ->label('Catatan internal')
                ->rows(4)
                ->columnSpanFull(),
        ]);
    }
}

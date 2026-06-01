<?php

declare(strict_types=1);

namespace App\Filament\Resources\Leads\Pages;

use App\Enums\LeadStatus;
use App\Filament\Resources\Leads\LeadResource;
use App\Services\LeadFollowUpService;
use Filament\Actions\Action;
use Filament\Resources\Pages\EditRecord;
use Filament\Support\Icons\Heroicon;

class EditLead extends EditRecord
{
    protected static string $resource = LeadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('whatsappOutreach')
                ->label('Hubungi via WhatsApp')
                ->icon(Heroicon::OutlinedChatBubbleLeftRight)
                ->color('success')
                ->url(fn (): string => app(LeadFollowUpService::class)->trackedOutreachUrl($this->getRecord()))
                ->openUrlInNewTab()
                ->tooltip('Membuka WhatsApp & mencatat follow-up otomatis'),
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        $record = $this->getRecord();
        $newAssignee = $data['assigned_to'] ?? null;
        $previousAssignee = $record->assigned_to;

        if ($newAssignee && (int) $newAssignee !== (int) $previousAssignee) {
            $data['assigned_at'] = now();

            $status = $data['status'] ?? $record->status?->value ?? LeadStatus::New->value;
            if ($status === LeadStatus::New->value) {
                $data['status'] = LeadStatus::Assigned->value;
            }
        }

        if (! $newAssignee) {
            $data['assigned_at'] = null;
        }

        return $data;
    }
}

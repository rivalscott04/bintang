<?php

declare(strict_types=1);

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use App\Filament\Support\WhatsAppOutreachTemplateForm;
use App\Models\ContactSetting;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Icons\Heroicon;

class ListUsers extends ListRecords
{
    protected static string $resource = UserResource::class;

    public function getSubheading(): ?string
    {
        return 'Kelola nomor WhatsApp sales dan akun distribusi lead (CRM → Lead Prospek).';
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('globalOutreachTemplate')
                ->label('Template outreach global')
                ->icon(Heroicon::OutlinedChatBubbleLeftEllipsis)
                ->modalHeading('Template outreach global')
                ->modalDescription('Satu template untuk semua sales. Placeholder lead & proyek terkunci; yang bisa diubah hanya teks narasi.')
                ->form(WhatsAppOutreachTemplateForm::sections())
                ->fillForm(fn (): array => WhatsAppOutreachTemplateForm::formStateFromTemplate(
                    ContactSetting::current()->sales_whatsapp_outreach_template,
                ))
                ->action(function (array $data): void {
                    ContactSetting::current()->update([
                        'sales_whatsapp_outreach_template' => WhatsAppOutreachTemplateForm::buildTemplateFromFormState($data),
                    ]);
                    ContactSetting::forgetCache();

                    Notification::make()
                        ->title('Template outreach global disimpan')
                        ->success()
                        ->send();
                }),
            CreateAction::make()->label('Tambah sales'),
        ];
    }
}

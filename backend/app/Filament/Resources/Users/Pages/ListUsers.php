<?php

declare(strict_types=1);

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use App\Models\ContactSetting;
use App\Support\WhatsAppOutreachTemplate;
use Filament\Actions\Action;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\Textarea;
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
            Action::make('defaultOutreachTemplate')
                ->label('Template outreach default')
                ->icon(Heroicon::OutlinedChatBubbleLeftEllipsis)
                ->modalHeading('Template outreach default')
                ->modalDescription('Dipakai saat sales follow-up lead via WhatsApp jika sales belum punya template kustom.')
                ->form([
                    Textarea::make('sales_whatsapp_outreach_template')
                        ->label('Template WhatsApp outreach (default)')
                        ->rows(8)
                        ->helperText(WhatsAppOutreachTemplate::placeholderHelp()),
                ])
                ->fillForm(fn (): array => [
                    'sales_whatsapp_outreach_template' => ContactSetting::current()->sales_whatsapp_outreach_template,
                ])
                ->action(function (array $data): void {
                    ContactSetting::current()->update([
                        'sales_whatsapp_outreach_template' => $data['sales_whatsapp_outreach_template'],
                    ]);
                    ContactSetting::forgetCache();

                    Notification::make()
                        ->title('Template outreach default disimpan')
                        ->success()
                        ->send();
                }),
            CreateAction::make()->label('Tambah sales'),
        ];
    }
}

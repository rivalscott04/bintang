<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactSettings\Pages;

use App\Filament\Resources\ContactSettings\ContactSettingResource;
use App\Models\ContactSetting;
use Filament\Resources\Pages\EditRecord;

class EditContactSetting extends EditRecord
{
    protected static string $resource = ContactSettingResource::class;

    protected static ?string $title = 'Kontak & WhatsApp';

    public function mount(int|string|null $record = null): void
    {
        parent::mount(ContactSetting::current()->getKey());
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['whatsapp_number'] = ContactSetting::normalizeWhatsAppNumber($data['whatsapp_number'] ?? '');

        return $data;
    }

    protected function afterSave(): void
    {
        ContactSetting::forgetCache();
    }
}

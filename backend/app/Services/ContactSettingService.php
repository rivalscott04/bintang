<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ContactSetting;

final class ContactSettingService
{
    /** @return array{whatsappNumber: string, whatsappUrl: string, whatsappDefaultMessage: ?string} */
    public function publicPayload(): array
    {
        $setting = ContactSetting::current();

        return [
            'whatsappNumber' => $setting->whatsapp_number,
            'whatsappUrl' => $setting->waMeUrl(),
            'whatsappDefaultMessage' => $setting->whatsapp_default_message,
        ];
    }
}

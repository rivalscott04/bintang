<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\ContactSetting;
use App\Support\WhatsAppOutreachTemplate;
use Illuminate\Database\Seeder;

class ContactSettingSeeder extends Seeder
{
    public function run(): void
    {
        ContactSetting::query()->updateOrCreate(
            ['id' => 1],
            [
                'whatsapp_number' => '6281234567890',
                'whatsapp_default_message' => 'Halo Sales Grand Kota Bintang, saya tertarik dengan unit perumahan. Boleh minta brosur terbaru dan price list-nya?',
                'sales_whatsapp_outreach_template' => WhatsAppOutreachTemplate::DEFAULT,
            ],
        );

        ContactSetting::forgetCache();
    }
}

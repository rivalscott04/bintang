<?php

declare(strict_types=1);

namespace App\Models;

use App\Support\WhatsAppOutreachTemplate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class ContactSetting extends Model
{
    private const CACHE_KEY = 'contact_setting.current';

    protected $fillable = [
        'whatsapp_number',
        'whatsapp_default_message',
        'sales_whatsapp_outreach_template',
    ];

    public static function current(): self
    {
        /** @var self $setting */
        $setting = Cache::remember(self::CACHE_KEY, 300, function (): self {
            return self::query()->firstOrCreate(
                [],
                [
                    'whatsapp_number' => '6281234567890',
                    'whatsapp_default_message' => 'Halo GM Grand Kota Bintang, saya tertarik dengan unit perumahan. Boleh minta brosur terbaru dan price list-nya?',
                    'sales_whatsapp_outreach_template' => WhatsAppOutreachTemplate::DEFAULT,
                ],
            );
        });

        return $setting;
    }

    public static function forgetCache(): void
    {
        Cache::forget(self::CACHE_KEY);
    }

    public static function normalizeWhatsAppNumber(string $number): string
    {
        $digits = preg_replace('/\D+/', '', $number) ?? '';

        if (str_starts_with($digits, '0')) {
            $digits = '62'.substr($digits, 1);
        }

        return $digits;
    }

    public function waMeUrl(?string $text = null): string
    {
        $message = $text ?? $this->whatsapp_default_message;
        $base = 'https://wa.me/'.$this->whatsapp_number;

        if (blank($message)) {
            return $base;
        }

        return $base.'?text='.rawurlencode($message);
    }
}

<?php

declare(strict_types=1);

namespace App\Models;

use App\Support\WhatsAppOutreachTemplate;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class ContactSetting extends Model
{
    /** Cache ID saja — hindari serialize model yang bisa jadi __PHP_Incomplete_Class. */
    private const CACHE_KEY = 'contact_setting.current_id';

    protected $fillable = [
        'whatsapp_number',
        'whatsapp_default_message',
        'sales_whatsapp_outreach_template',
    ];

    public static function current(): self
    {
        $cachedId = Cache::get(self::CACHE_KEY);

        if (is_int($cachedId) || (is_string($cachedId) && ctype_digit($cachedId))) {
            $setting = self::query()->find((int) $cachedId);

            if ($setting instanceof self) {
                return $setting;
            }
        }

        $setting = self::resolveCurrent();

        Cache::put(self::CACHE_KEY, (int) $setting->getKey(), 300);

        return $setting;
    }

    public static function forgetCache(): void
    {
        Cache::forget(self::CACHE_KEY);
        Cache::forget('contact_setting.current');
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

    private static function resolveCurrent(): self
    {
        return self::query()->firstOrCreate(
            [],
            [
                'whatsapp_number' => '6281234567890',
                'whatsapp_default_message' => 'Halo GM Grand Kota Bintang, saya tertarik dengan unit perumahan. Boleh minta brosur terbaru dan price list-nya?',
                'sales_whatsapp_outreach_template' => WhatsAppOutreachTemplate::DEFAULT,
            ],
        );
    }
}

<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactSettings\Schemas;

use App\Support\WhatsAppOutreachTemplate;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

final class ContactSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('whatsapp_number')
                ->label('Nomor WhatsApp sales')
                ->required()
                ->maxLength(20)
                ->helperText('Format internasional tanpa + atau spasi. Contoh: 6281212345678'),
            Textarea::make('whatsapp_default_message')
                ->label('Pesan default (tombol WhatsApp umum di situs)')
                ->rows(4),
            Textarea::make('sales_whatsapp_outreach_template')
                ->label('Template WhatsApp sales (default)')
                ->rows(8)
                ->helperText(WhatsAppOutreachTemplate::placeholderHelp())
                ->columnSpanFull(),
        ]);
    }
}

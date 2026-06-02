<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContactSettings\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

final class ContactSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Kontak GM')
                ->description('Nomor ini dipakai semua form dan tombol WhatsApp di website. Lead masuk ke GM dulu, lalu didistribusikan ke tim sales.')
                ->schema([
                    TextInput::make('whatsapp_number')
                        ->label('Nomor WhatsApp GM')
                        ->required()
                        ->maxLength(20)
                        ->helperText('Format internasional tanpa + atau spasi. Contoh: 6281212345678'),
                    Textarea::make('whatsapp_default_message')
                        ->label('Pesan default (tombol WhatsApp umum di situs)')
                        ->rows(4)
                        ->helperText('Pesan otomatis saat visitor membuka WhatsApp dari header, floating button, atau form kontak.'),
                ])
                ->columnSpanFull(),
        ]);
    }
}

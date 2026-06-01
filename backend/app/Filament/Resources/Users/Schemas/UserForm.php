<?php

declare(strict_types=1);

namespace App\Filament\Resources\Users\Schemas;

use App\Support\WhatsAppOutreachTemplate;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

final class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->label('Nama')
                ->required()
                ->maxLength(255),
            TextInput::make('email')
                ->label('Email login')
                ->email()
                ->required()
                ->maxLength(255)
                ->unique(ignoreRecord: true),
            TextInput::make('password')
                ->label('Password')
                ->password()
                ->revealable()
                ->minLength(8)
                ->required(fn (string $operation): bool => $operation === 'create')
                ->dehydrated(fn (?string $state): bool => filled($state))
                ->helperText(fn (string $operation): string => $operation === 'edit'
                    ? 'Kosongkan jika password tidak diubah.'
                    : 'Minimal 8 karakter. Dibagikan ke sales untuk login admin panel jika diperlukan.'),
            Textarea::make('whatsapp_outreach_template')
                ->label('Template WhatsApp outreach')
                ->rows(8)
                ->helperText(WhatsAppOutreachTemplate::placeholderHelp().' Kosongkan untuk memakai template default global.')
                ->columnSpanFull(),
        ]);
    }
}

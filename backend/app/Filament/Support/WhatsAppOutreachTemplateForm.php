<?php

declare(strict_types=1);

namespace App\Filament\Support;

use App\Filament\Forms\Components\WhatsAppOutreachTemplateEditor;
use App\Support\WhatsAppOutreachTemplate;
use Closure;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Illuminate\Support\HtmlString;

final class WhatsAppOutreachTemplateForm
{
    /** @return list<Section> */
    public static function sections(): array
    {
        return [
            Section::make('Isi pesan WhatsApp')
                ->description('Tulis narasi bebas di sekitar tag abu-abu. Tag {nama}, {sales}, {proyek}, dan {klaster_line} tidak bisa dihapus atau diseleksi.')
                ->schema([
                    WhatsAppOutreachTemplateEditor::make('sales_whatsapp_outreach_template')
                        ->label('Template pesan')
                        ->required()
                        ->live(debounce: 400)
                        ->helperText(WhatsAppOutreachTemplate::placeholderHelp())
                        ->rules([
                            fn (): Closure => function (string $attribute, mixed $value, Closure $fail): void {
                                if (! WhatsAppOutreachTemplate::containsAllPlaceholders(trim((string) ($value ?? '')))) {
                                    $fail('Pesan harus tetap memuat {nama}, {sales}, {proyek}, dan {klaster_line}.');
                                }
                            },
                        ]),
                    Placeholder::make('template_preview')
                        ->label('Preview')
                        ->content(function (Get $get): HtmlString {
                            $template = (string) ($get('sales_whatsapp_outreach_template') ?? '');
                            $preview = WhatsAppOutreachTemplate::previewSample($template);
                            $isValid = WhatsAppOutreachTemplate::containsAllPlaceholders(trim($template));

                            return new HtmlString(
                                '<div class="fi-wa-template-preview'.($isValid ? '' : ' fi-wa-template-preview--warn').'">'
                                .nl2br(e($preview), false)
                                .'</div>'
                            );
                        })
                        ->dehydrated(false),
                ])
                ->columnSpanFull(),
        ];
    }

    /** @return array<string, string> */
    public static function formStateFromTemplate(?string $template): array
    {
        $template = trim($template ?? '');

        if ($template === '' || ! WhatsAppOutreachTemplate::containsAllPlaceholders($template)) {
            $template = WhatsAppOutreachTemplate::DEFAULT;
        }

        return [
            'sales_whatsapp_outreach_template' => $template,
        ];
    }

    public static function templateFromFormState(array $data): string
    {
        return trim((string) ($data['sales_whatsapp_outreach_template'] ?? ''));
    }
}

<?php

declare(strict_types=1);

namespace App\Filament\Support;

use App\Support\WhatsAppOutreachTemplate;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Illuminate\Support\HtmlString;

final class WhatsAppOutreachTemplateForm
{
    /** @return list<Section> */
    public static function sections(): array
    {
        return [
            Section::make('Template WhatsApp outreach global')
                ->description(WhatsAppOutreachTemplate::placeholderHelp())
                ->schema([
                    self::row(
                        label: 'Salam & nama lead',
                        textField: 'template_text_before_nama',
                        badges: ['{nama}'],
                    ),
                    self::row(
                        label: 'Perkenalan sales',
                        textField: 'template_text_before_sales',
                        badges: ['{sales}'],
                    ),
                    self::row(
                        label: 'Minat proyek',
                        textField: 'template_text_before_proyek',
                        badges: ['{proyek}', '{klaster_line}'],
                        helperText: '{klaster_line} otomatis menjadi " (Klaster X)" jika lead punya klaster.',
                    ),
                    Textarea::make('template_text_after_klaster')
                        ->label('Penutup & ajakan')
                        ->rows(4)
                        ->required()
                        ->helperText('Teks setelah data proyek & klaster lead.'),
                ])
                ->columnSpanFull(),
        ];
    }

    /** @return array<string, string> */
    public static function partsFromFormState(array $data): array
    {
        return WhatsAppOutreachTemplate::normalizeParts([
            'text_before_nama' => $data['template_text_before_nama'] ?? '',
            'text_before_sales' => $data['template_text_before_sales'] ?? '',
            'text_before_proyek' => $data['template_text_before_proyek'] ?? '',
            'text_after_klaster' => $data['template_text_after_klaster'] ?? '',
        ]);
    }

    /** @return array<string, string> */
    public static function formStateFromTemplate(?string $template): array
    {
        $parts = WhatsAppOutreachTemplate::parseToParts($template);

        return [
            'template_text_before_nama' => $parts['text_before_nama'],
            'template_text_before_sales' => $parts['text_before_sales'],
            'template_text_before_proyek' => $parts['text_before_proyek'],
            'template_text_after_klaster' => $parts['text_after_klaster'],
        ];
    }

    public static function buildTemplateFromFormState(array $data): string
    {
        return WhatsAppOutreachTemplate::buildFromParts(self::partsFromFormState($data));
    }

    /**
     * @param  list<string>  $badges
     */
    private static function row(
        string $label,
        string $textField,
        array $badges,
        ?string $helperText = null,
    ): Group {
        $badgeHtml = collect($badges)
            ->map(fn (string $badge): string => '<span class="fi-wa-template-badge">'.$badge.'</span>')
            ->implode('');

        $field = TextInput::make($textField)
            ->label($label)
            ->required();

        if ($helperText !== null) {
            $field->helperText($helperText);
        }

        return Group::make([
            $field,
            Placeholder::make('template_locked_'.$textField)
                ->label('Placeholder terkunci')
                ->content(new HtmlString('<div class="fi-wa-template-locks">'.$badgeHtml.'</div>'))
                ->dehydrated(false),
        ])->columnSpanFull();
    }
}

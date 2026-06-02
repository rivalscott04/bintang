<?php

declare(strict_types=1);

namespace App\Support;

use App\Models\Lead;
use App\Models\User;
use InvalidArgumentException;

final class WhatsAppOutreachTemplate
{
    public const DEFAULT = <<<'TEXT'
Halo {nama},

Perkenalkan, saya {sales} dari Grand Kota Bintang.
Terima kasih sudah tertarik proyek {proyek}{klaster_line}.

Boleh saya bantu kirim brosur & jadwalkan kunjungan? Terima kasih.
TEXT;

    /** @var list<string> */
    public const LOCKED_PLACEHOLDERS = ['{nama}', '{sales}', '{proyek}', '{klaster_line}'];

    /** @var list<string> */
    public const PLACEHOLDERS = ['{nama}', '{proyek}', '{klaster}', '{klaster_line}', '{sales}'];

    /** @var list<string> */
    public const PART_KEYS = [
        'text_before_nama',
        'text_before_sales',
        'text_before_proyek',
        'text_after_klaster',
    ];

    /** @var array<string, string> */
    private const DEFAULT_PARTS = [
        'text_before_nama' => 'Halo ',
        'text_before_sales' => ",\n\nPerkenalkan, saya ",
        'text_before_proyek' => " dari Grand Kota Bintang.\nTerima kasih sudah tertarik proyek ",
        'text_after_klaster' => ".\n\nBoleh saya bantu kirim brosur & jadwalkan kunjungan? Terima kasih.",
    ];

    /** @var list<array{marker: string, part_key: string}> */
    private const PARSE_STEPS = [
        ['marker' => '{nama}', 'part_key' => 'text_before_nama'],
        ['marker' => '{sales}', 'part_key' => 'text_before_sales'],
        ['marker' => '{proyek}', 'part_key' => 'text_before_proyek'],
    ];

    /** @return array<string, string> */
    public static function defaultParts(): array
    {
        return self::DEFAULT_PARTS;
    }

    /** @return array<string, string> */
    public static function parseToParts(?string $template): array
    {
        $template = trim($template ?? '');

        if ($template === '' || ! self::containsAllPlaceholders($template)) {
            return self::defaultParts();
        }

        $remainder = $template;
        $parts = [];

        foreach (self::PARSE_STEPS as $step) {
            $marker = $step['marker'];
            $position = strpos($remainder, $marker);

            if ($position === false) {
                return self::defaultParts();
            }

            $parts[$step['part_key']] = substr($remainder, 0, $position);
            $remainder = substr($remainder, $position + strlen($marker));
        }

        if (! str_starts_with($remainder, '{klaster_line}')) {
            return self::defaultParts();
        }

        $parts['text_after_klaster'] = substr($remainder, strlen('{klaster_line}'));

        return self::normalizeParts($parts);
    }

    /**
     * @param  array<string, mixed>  $parts
     */
    public static function buildFromParts(array $parts): string
    {
        $normalized = self::normalizeParts($parts);

        return $normalized['text_before_nama']
            .'{nama}'
            .$normalized['text_before_sales']
            .'{sales}'
            .$normalized['text_before_proyek']
            .'{proyek}{klaster_line}'
            .$normalized['text_after_klaster'];
    }

    /**
     * @param  array<string, mixed>  $parts
     * @return array<string, string>
     */
    public static function normalizeParts(array $parts): array
    {
        $normalized = self::defaultParts();

        foreach (self::PART_KEYS as $key) {
            if (! array_key_exists($key, $parts)) {
                continue;
            }

            $normalized[$key] = is_string($parts[$key]) ? $parts[$key] : (string) $parts[$key];
        }

        return $normalized;
    }

    public static function containsAllPlaceholders(string $template): bool
    {
        foreach (self::PLACEHOLDERS as $placeholder) {
            if ($placeholder === '{klaster}') {
                continue;
            }

            if (! str_contains($template, $placeholder)) {
                return false;
            }
        }

        return true;
    }

    public static function render(string $template, Lead $lead, ?User $actingUser = null): string
    {
        if (! self::containsAllPlaceholders($template)) {
            throw new InvalidArgumentException('Template outreach harus memuat semua placeholder wajib.');
        }

        $salesName = $lead->assignee?->name
            ?? $actingUser?->name
            ?? 'Grand Kota Bintang';

        $clusterLine = filled($lead->cluster_name)
            ? ' (Klaster '.$lead->cluster_name.')'
            : '';

        $message = str_replace(
            [
                '{nama}',
                '{proyek}',
                '{klaster}',
                '{klaster_line}',
                '{sales}',
            ],
            [
                $lead->name,
                $lead->project_name,
                $lead->cluster_name ?? '',
                $clusterLine,
                $salesName,
            ],
            $template,
        );

        return trim(preg_replace("/\n{3,}/", "\n\n", $message) ?? $message);
    }

    public static function placeholderHelp(): string
    {
        return 'Tag abu-abu terkunci. Edit teks di sekitarnya saja.';
    }

    public static function previewSample(?string $template): string
    {
        $template = trim($template ?? '');

        if ($template === '' || ! self::containsAllPlaceholders($template)) {
            return 'Template belum lengkap. Pastikan {nama}, {sales}, {proyek}, dan {klaster_line} masih ada di pesan.';
        }

        $lead = new Lead([
            'name' => 'Budi Santoso',
            'project_name' => 'Stellar Avenue',
            'cluster_name' => 'Marocco',
        ]);

        return self::render($template, $lead, new User(['name' => 'Rina Sales']));
    }
}

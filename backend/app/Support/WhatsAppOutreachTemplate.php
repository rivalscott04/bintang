<?php

declare(strict_types=1);

namespace App\Support;

use App\Models\Lead;
use App\Models\User;

final class WhatsAppOutreachTemplate
{
    public const DEFAULT = <<<'TEXT'
Halo {nama},

Perkenalkan, saya {sales} dari Grand Kota Bintang.
Terima kasih sudah tertarik proyek {proyek}{klaster_line}.

Boleh saya bantu kirim brosur & jadwalkan kunjungan? Terima kasih.
TEXT;

    /** @var list<string> */
    public const PLACEHOLDERS = ['{nama}', '{proyek}', '{klaster}', '{klaster_line}', '{sales}'];

    public static function render(string $template, Lead $lead, ?User $actingUser = null): string
    {
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
        return 'Placeholder: {nama}, {proyek}, {klaster}, {klaster_line} (otomatis “ (Klaster X)” jika ada), {sales}';
    }
}

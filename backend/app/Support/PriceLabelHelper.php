<?php

declare(strict_types=1);

namespace App\Support;

final class PriceLabelHelper
{
    /**
     * Format angka di dalam input (langsung saat mengetik). Returns null jika tidak perlu diubah.
     */
    public static function formatDigitsInPlace(?string $state): ?string
    {
        if (blank($state) || self::isStatusText($state)) {
            return null;
        }

        $trimmed = trim($state);

        if (preg_match('/^\d+$/', $trimmed) === 1) {
            $formatted = self::formatThousands((int) $trimmed);

            return $formatted !== $trimmed ? $formatted : null;
        }

        if (preg_match('/^[\d.]+$/', $trimmed) === 1) {
            $formatted = self::formatThousands(self::unformatThousands($trimmed));

            return $formatted !== $trimmed ? $formatted : null;
        }

        if (preg_match('/^(.*?)(\d+)$/us', $trimmed, $matches) === 1) {
            $formatted = $matches[1].self::formatThousands((int) $matches[2]);

            return $formatted !== $trimmed ? $formatted : null;
        }

        if (preg_match('/^(.*?)([\d.]+)$/us', $trimmed, $matches) === 1 && preg_match('/^[\d.]+$/', $matches[2]) === 1) {
            $formatted = $matches[1].self::formatThousands(self::unformatThousands($matches[2]));

            return $formatted !== $trimmed ? $formatted : null;
        }

        return null;
    }

    public static function helperText(?string $state): string
    {
        $amount = self::parseAmount($state);

        if ($amount !== null && $amount > 0) {
            $readable = self::humanReadable($amount);
            $formatted = self::formatThousands($amount);

            return "Terbaca {$readable} (Rp {$formatted})";
        }

        if (blank($state)) {
            return 'Ketik angka, titik ribuan otomatis. Contoh: 2.000.000. Atau teks bebas seperti Segera Hadir.';
        }

        if (self::isStatusText($state)) {
            return 'Teks status, tampil apa adanya di kartu klaster.';
        }

        return 'Boleh tambah awalan, misalnya Mulai Rp di depan angka.';
    }

    public static function parseAmount(?string $state): ?int
    {
        if (blank($state) || self::isStatusText($state)) {
            return null;
        }

        if (preg_match('/(\d+(?:[.,]\d+)?)\s*miliar/iu', $state, $matches) === 1) {
            $value = (float) str_replace(',', '.', $matches[1]);

            return (int) round($value * 1_000_000_000);
        }

        if (preg_match('/(\d+(?:[.,]\d+)?)\s*juta/iu', $state, $matches) === 1) {
            $value = (float) str_replace(',', '.', $matches[1]);

            return (int) round($value * 1_000_000);
        }

        if (preg_match('/(\d+(?:[.,]\d+)?)\s*(?:ribu|rb)\b/iu', $state, $matches) === 1) {
            $value = (float) str_replace(',', '.', $matches[1]);

            return (int) round($value * 1_000);
        }

        if (preg_match('/Rp\s*([\d.]+)/iu', $state, $matches) === 1) {
            return self::unformatThousands($matches[1]);
        }

        if (preg_match('/(\d{1,3}(?:\.\d{3})+|\d{4,})/u', $state, $matches) === 1) {
            return self::unformatThousands($matches[1]);
        }

        return null;
    }

    public static function formatThousands(int $amount): string
    {
        return number_format($amount, 0, ',', '.');
    }

    public static function humanReadable(int $amount): string
    {
        if ($amount >= 1_000_000_000) {
            return self::formatDecimalId($amount / 1_000_000_000).' miliar rupiah';
        }

        if ($amount >= 1_000_000) {
            return self::formatDecimalId($amount / 1_000_000).' juta rupiah';
        }

        if ($amount >= 1_000) {
            return self::formatDecimalId($amount / 1_000).' ribu rupiah';
        }

        return self::formatThousands($amount).' rupiah';
    }

    private static function unformatThousands(string $digits): int
    {
        return (int) str_replace('.', '', $digits);
    }

    private static function formatDecimalId(float $value): string
    {
        if (fmod($value, 1.0) === 0.0) {
            return (string) (int) $value;
        }

        return rtrim(rtrim(number_format($value, 1, ',', ''), '0'), ',');
    }

    private static function isStatusText(string $state): bool
    {
        return (bool) preg_match(
            '/segera|akan datang|sold|habis|coming soon|hubungi|price list/i',
            $state,
        );
    }
}

<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Support\PriceLabelHelper;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class PriceLabelHelperTest extends TestCase
{
    public function test_formats_pure_digits_while_typing(): void
    {
        $this->assertSame('1.000.000', PriceLabelHelper::formatDigitsInPlace('1000000'));
        $this->assertSame('2.000.000', PriceLabelHelper::formatDigitsInPlace('2000000'));
        $this->assertSame('1.800.000.000', PriceLabelHelper::formatDigitsInPlace('1800000000'));
    }

    public function test_formats_prefixed_amount(): void
    {
        $this->assertSame('Mulai Rp 2.500.000', PriceLabelHelper::formatDigitsInPlace('Mulai Rp 2500000'));
    }

    public function test_helper_text_for_million(): void
    {
        $text = PriceLabelHelper::helperText('1.000.000');

        $this->assertStringContainsString('1 juta rupiah', $text);
        $this->assertStringContainsString('(Rp 1.000.000)', $text);
    }

    #[DataProvider('humanReadableProvider')]
    public function test_human_readable(int $amount, string $expected): void
    {
        $this->assertSame($expected, PriceLabelHelper::humanReadable($amount));
    }

    public static function humanReadableProvider(): array
    {
        return [
            [1_000_000, '1 juta rupiah'],
            [2_500_000, '2,5 juta rupiah'],
            [1_800_000_000, '1,8 miliar rupiah'],
            [500_000, '500 ribu rupiah'],
        ];
    }
}

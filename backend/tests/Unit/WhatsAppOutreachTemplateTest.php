<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\Lead;
use App\Models\User;
use App\Support\WhatsAppOutreachTemplate;
use Tests\TestCase;

final class WhatsAppOutreachTemplateTest extends TestCase
{
    public function test_replaces_placeholders(): void
    {
        $lead = new Lead([
            'name' => 'Budi',
            'project_name' => 'Stellar Avenue',
            'cluster_name' => 'Marocco',
        ]);

        $message = WhatsAppOutreachTemplate::render(
            'Halo {nama}, proyek {proyek}{klaster_line}. — {sales}',
            $lead,
            new User(['name' => 'Rina']),
        );

        $this->assertStringContainsString('Halo Budi', $message);
        $this->assertStringContainsString('Stellar Avenue', $message);
        $this->assertStringContainsString('(Klaster Marocco)', $message);
        $this->assertStringContainsString('— Rina', $message);
    }

    public function test_klaster_line_empty_when_no_cluster(): void
    {
        $lead = new Lead([
            'name' => 'Ani',
            'project_name' => 'Unit A',
            'cluster_name' => null,
        ]);

        $message = WhatsAppOutreachTemplate::render(
            'Minat {nama} untuk {proyek}{klaster_line}. Sales: {sales}',
            $lead,
        );

        $this->assertSame('Minat Ani untuk Unit A. Sales: Grand Kota Bintang', $message);
    }

    public function test_build_and_parse_roundtrip_preserves_placeholders(): void
    {
        $parts = [
            'text_before_nama' => 'Halo ',
            'text_before_sales' => ",\n\nPerkenalkan, saya ",
            'text_before_proyek' => ' dari GKB terkait ',
            'text_after_klaster' => ".\n\nBoleh dibantu?",
        ];

        $template = WhatsAppOutreachTemplate::buildFromParts($parts);

        $this->assertSame($parts, WhatsAppOutreachTemplate::parseToParts($template));
        $this->assertTrue(WhatsAppOutreachTemplate::containsAllPlaceholders($template));
    }

    public function test_parse_falls_back_when_placeholder_missing(): void
    {
        $parts = WhatsAppOutreachTemplate::parseToParts('Halo Budi, tanpa token wajib');

        $this->assertSame(WhatsAppOutreachTemplate::defaultParts(), $parts);
    }

    public function test_preview_sample_renders_example_lead(): void
    {
        $preview = WhatsAppOutreachTemplate::previewSample(
            'Halo {nama}, saya {sales} dari GKB soal {proyek}{klaster_line}.',
        );

        $this->assertStringContainsString('Budi Santoso', $preview);
        $this->assertStringContainsString('Rina Sales', $preview);
        $this->assertStringContainsString('Stellar Avenue', $preview);
        $this->assertStringContainsString('(Klaster Marocco)', $preview);
    }

    public function test_preview_sample_warns_when_template_incomplete(): void
    {
        $preview = WhatsAppOutreachTemplate::previewSample('Halo tanpa tag');

        $this->assertStringContainsString('Template belum lengkap', $preview);
    }
}

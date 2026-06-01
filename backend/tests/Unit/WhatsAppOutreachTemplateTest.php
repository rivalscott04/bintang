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
            'Minat {proyek}{klaster_line}.',
            $lead,
        );

        $this->assertSame('Minat Unit A.', $message);
    }
}

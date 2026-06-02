<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Models\ContactSetting;
use App\Models\Lead;
use App\Models\User;
use App\Services\LeadService;
use App\Services\LeadWhatsAppService;
use App\Support\WhatsAppOutreachTemplate;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class LeadWhatsAppServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_uses_global_template_for_outreach_message(): void
    {
        ContactSetting::query()->create([
            'whatsapp_number' => '6281111111111',
            'sales_whatsapp_outreach_template' => WhatsAppOutreachTemplate::buildFromParts([
                'text_before_nama' => 'Hai ',
                'text_before_sales' => ",\n\nSaya ",
                'text_before_proyek' => ' dari GKB soal ',
                'text_after_klaster' => '.',
            ]),
        ]);
        ContactSetting::forgetCache();

        $sales = User::factory()->create([
            'role' => 'sales',
            'name' => 'Rina',
        ]);

        $lead = Lead::query()->create([
            'name' => 'Budi',
            'phone' => '081234567890',
            'project_name' => 'Stellar',
            'status' => 'new',
            'assigned_to' => $sales->id,
        ]);

        $url = app(LeadWhatsAppService::class)->outreachUrlForLead($lead);

        $this->assertStringStartsWith('https://wa.me/6281234567890?', $url);
        $this->assertStringContainsString(rawurlencode("Hai Budi,\n\nSaya Rina dari GKB soal Stellar."), $url);
    }

    public function test_falls_back_to_default_when_global_template_is_invalid(): void
    {
        ContactSetting::query()->create([
            'whatsapp_number' => '6281111111111',
            'sales_whatsapp_outreach_template' => 'Template tanpa placeholder',
        ]);
        ContactSetting::forgetCache();

        $sales = User::factory()->create(['role' => 'sales']);

        $lead = Lead::query()->create([
            'name' => 'Ani',
            'phone' => '0812999888777',
            'project_name' => 'Unit B',
            'status' => 'new',
            'assigned_to' => $sales->id,
        ]);

        $message = app(LeadWhatsAppService::class)->previewMessageForLead($lead);

        $this->assertStringContainsString('Halo Ani', $message);
        $this->assertStringContainsString('Unit B', $message);
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->app->instance(LeadService::class, new LeadService);
    }
}

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

    public function test_prefers_sales_template_over_global(): void
    {
        ContactSetting::query()->create([
            'whatsapp_number' => '6281111111111',
            'sales_whatsapp_outreach_template' => 'Global ke {nama}',
        ]);
        ContactSetting::forgetCache();

        $sales = User::factory()->create([
            'role' => 'sales',
            'whatsapp_outreach_template' => 'Hai {nama} dari {sales}',
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
        $this->assertStringContainsString(rawurlencode('Hai Budi dari '.$sales->name), $url);
    }

    public function test_uses_global_when_sales_has_no_custom_template(): void
    {
        ContactSetting::query()->create([
            'whatsapp_number' => '6281111111111',
            'sales_whatsapp_outreach_template' => 'Global untuk {nama}',
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

        $this->assertSame('Global untuk Ani', $message);
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->app->instance(LeadService::class, new LeadService);
    }
}

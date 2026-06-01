<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Enums\LeadStatus;
use App\Enums\UserRole;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class LeadWhatsAppOutreachTest extends TestCase
{
    use RefreshDatabase;

    public function test_tracked_link_records_follow_up_and_redirects(): void
    {
        $sales = User::factory()->create(['role' => UserRole::Sales]);
        $lead = Lead::query()->create([
            'name' => 'Budi',
            'phone' => '081234567890',
            'project_name' => 'Stellar',
            'status' => LeadStatus::Assigned,
            'assigned_to' => $sales->id,
        ]);

        $response = $this->actingAs($sales)->get(route('admin.leads.whatsapp-outreach', $lead));

        $response->assertRedirect();
        $this->assertStringStartsWith('https://wa.me/', $response->headers->get('Location'));

        $lead->refresh();
        $this->assertSame(LeadStatus::Contacted, $lead->status);
        $this->assertNotNull($lead->first_contacted_at);
        $this->assertNotNull($lead->last_contacted_at);
        $this->assertSame(1, $lead->contact_count);
        $this->assertDatabaseCount('lead_contact_logs', 1);
    }

    public function test_second_contact_keeps_won_status_but_increments_count(): void
    {
        $admin = User::factory()->create(['role' => UserRole::Admin]);
        $lead = Lead::query()->create([
            'name' => 'Ani',
            'phone' => '0812999888777',
            'project_name' => 'Unit B',
            'status' => LeadStatus::Won,
            'contact_count' => 1,
            'first_contacted_at' => now()->subDay(),
        ]);

        $this->actingAs($admin)->get(route('admin.leads.whatsapp-outreach', $lead));

        $lead->refresh();
        $this->assertSame(LeadStatus::Won, $lead->status);
        $this->assertSame(2, $lead->contact_count);
    }

    public function test_sales_cannot_contact_unassigned_lead(): void
    {
        $sales = User::factory()->create(['role' => UserRole::Sales]);
        $lead = Lead::query()->create([
            'name' => 'Citra',
            'phone' => '0812111222333',
            'project_name' => 'Unit C',
            'status' => LeadStatus::Assigned,
        ]);

        $this->actingAs($sales)
            ->get(route('admin.leads.whatsapp-outreach', $lead))
            ->assertForbidden();
    }
}

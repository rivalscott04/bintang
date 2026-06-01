<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class StoreLeadTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_lead_from_website(): void
    {
        $response = $this->postJson('/api/leads', [
            'name' => 'Budi Santoso',
            'phone' => '081234567890',
            'project_slug' => 'stellar-avenue',
            'project_name' => 'Stellar Avenue',
            'cluster_name' => 'Marocco',
            'source' => 'project_detail',
        ]);

        $response->assertCreated()
            ->assertJsonPath('message', 'Lead berhasil disimpan');

        $this->assertDatabaseHas('leads', [
            'name' => 'Budi Santoso',
            'phone' => '6281234567890',
            'project_name' => 'Stellar Avenue',
            'status' => 'new',
        ]);

        $this->assertSame(1, Lead::query()->count());
    }

    public function test_store_lead_from_contact_form_with_message(): void
    {
        $this->postJson('/api/leads', [
            'name' => 'Siti Aminah',
            'phone' => '081298765432',
            'project_name' => 'Konsultasi · Klaster Marocco',
            'cluster_name' => 'Marocco',
            'visitor_message' => 'Ingin survei besok pagi',
            'source' => 'contact_form',
        ])->assertCreated();

        $this->assertDatabaseHas('leads', [
            'name' => 'Siti Aminah',
            'source' => 'contact_form',
            'visitor_message' => 'Ingin survei besok pagi',
        ]);
    }

    public function test_store_lead_requires_name_and_phone(): void
    {
        $this->postJson('/api/leads', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'phone', 'project_name']);
    }
}

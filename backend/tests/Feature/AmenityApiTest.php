<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\AmenityLocation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class AmenityApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_amenities_index_returns_published_locations(): void
    {
        AmenityLocation::query()->create([
            'name' => 'Test POI',
            'lat' => -6.25,
            'lng' => 106.95,
            'category' => 'dining',
            'time_label' => '5 menit',
            'description' => 'Deskripsi uji.',
            'sort_order' => 1,
            'is_published' => true,
        ]);

        AmenityLocation::query()->create([
            'name' => 'Hidden POI',
            'lat' => -6.26,
            'lng' => 106.96,
            'category' => 'mall',
            'time_label' => '10 menit',
            'description' => 'Tidak tampil.',
            'sort_order' => 2,
            'is_published' => false,
        ]);

        $response = $this->getJson('/api/amenities');

        $response->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.name', 'Test POI')
            ->assertJsonPath('0.category', 'dining')
            ->assertJsonPath('0.time', '5 menit')
            ->assertJsonPath('0.desc', 'Deskripsi uji.');
    }
}

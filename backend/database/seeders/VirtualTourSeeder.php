<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Cluster;
use App\Models\VirtualTour;
use App\Models\VirtualTourHotspot;
use App\Models\VirtualTourRoom;
use App\Models\VirtualTourWaypoint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class VirtualTourSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('data/default-virtual-tour.json');

        if (! File::exists($path)) {
            return;
        }

        /** @var array<string, mixed> $data */
        $data = json_decode(File::get($path), true, 512, JSON_THROW_ON_ERROR);

        $cluster = Cluster::query()->where('slug', 'marocco')->first();

        $tour = VirtualTour::query()->updateOrCreate(
            ['slug' => 'marocco-default'],
            [
                'name' => 'Tur 3D Cluster Marocco',
                'cluster_id' => $cluster?->id,
                'section_label' => 'TUR VIRTUAL',
                'section_title' => 'Tur Virtual 3D',
                'section_description' => '',
                'preview_image' => '/assets/cluster_marocco-828.webp',
                'preview_image_alt' => 'Preview Cluster Marocco Virtual Tour 3D',
                'card_headline' => 'Cluster Marocco',
                'card_headline_accent' => '',
                'card_description' => '',
                'button_label' => 'Tur 3D',
                'modal_subtitle' => 'Cluster Marocco',
                'room_height' => $data['ROOM_HEIGHT'] ?? 3.2,
                'eye_height' => $data['EYE_HEIGHT'] ?? 1.7,
                'is_published' => true,
                'is_default' => true,
                'sort_order' => 1,
            ],
        );

        $tour->hotspots()->delete();
        $tour->waypoints()->delete();
        $tour->rooms()->delete();

        $roomIdsBySlug = [];
        $openings = $data['ROOM_OPENINGS'] ?? [];

        foreach ($data['ROOMS'] as $index => $room) {
            $record = VirtualTourRoom::query()->create([
                'virtual_tour_id' => $tour->id,
                'slug' => $room['id'],
                'name' => $room['name'],
                'icon' => $room['icon'],
                'description' => $room['description'],
                'spec_area' => $room['specs']['area'] ?? null,
                'spec_highlight' => $room['specs']['highlight'] ?? null,
                'bounds' => $room['bounds'],
                'floor_color' => $room['floorColor'],
                'wall_color' => $room['wallColor'],
                'accent_color' => $room['accentColor'],
                'camera_position' => $room['cameraView']['position'],
                'camera_target' => $room['cameraView']['target'],
                'door_openings' => $openings[$room['id']] ?? [],
                'furniture' => $room['furniture'] ?? [],
                'sort_order' => $index + 1,
            ]);

            $roomIdsBySlug[$room['id']] = $record->id;
        }

        foreach ($data['HOTSPOTS'] as $index => $hotspot) {
            VirtualTourHotspot::query()->create([
                'virtual_tour_id' => $tour->id,
                'from_room_id' => $roomIdsBySlug[$hotspot['from']],
                'to_room_id' => $roomIdsBySlug[$hotspot['to']],
                'position_x' => $hotspot['position'][0],
                'position_y' => $hotspot['position'][1],
                'position_z' => $hotspot['position'][2],
                'label' => $hotspot['label'],
                'sort_order' => $index + 1,
            ]);
        }

        foreach ($data['CINEMATIC_WAYPOINTS'] as $index => $waypoint) {
            VirtualTourWaypoint::query()->create([
                'virtual_tour_id' => $tour->id,
                'room_id' => filled($waypoint['roomId'] ?? null)
                    ? ($roomIdsBySlug[$waypoint['roomId']] ?? null)
                    : null,
                'position' => $waypoint['position'],
                'target' => $waypoint['target'],
                'duration' => $waypoint['duration'],
                'hold' => $waypoint['hold'],
                'sort_order' => $index + 1,
            ]);
        }
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\VirtualTour;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin VirtualTour */
final class VirtualTourResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $rooms = $this->whenLoaded('rooms');
        $roomSlugById = $this->relationLoaded('rooms')
            ? $this->rooms->pluck('slug', 'id')
            : collect();

        return [
            'id' => $this->slug,
            'slug' => $this->slug,
            'name' => $this->name,
            'clusterSlug' => $this->cluster?->slug,
            'section' => [
                'label' => $this->section_label,
                'title' => $this->section_title,
                'description' => $this->section_description,
            ],
            'preview' => [
                'image' => $this->previewImageUrl(),
                'imageAlt' => $this->preview_image_alt,
            ],
            'card' => [
                'headline' => $this->card_headline,
                'headlineAccent' => $this->card_headline_accent,
                'description' => $this->card_description,
                'buttonLabel' => $this->button_label,
            ],
            'modal' => [
                'subtitle' => $this->modal_subtitle,
            ],
            'roomHeight' => $this->room_height,
            'eyeHeight' => $this->eye_height,
            'rooms' => $this->relationLoaded('rooms')
                ? $this->rooms->map(fn ($room) => [
                    'id' => $room->slug,
                    'name' => $room->name,
                    'icon' => $room->icon,
                    'description' => $room->description,
                    'specs' => [
                        'area' => $room->spec_area,
                        'highlight' => $room->spec_highlight,
                    ],
                    'bounds' => $room->bounds,
                    'floorColor' => $room->floor_color,
                    'wallColor' => $room->wall_color,
                    'accentColor' => $room->accent_color,
                    'cameraView' => [
                        'position' => $room->camera_position,
                        'target' => $room->camera_target,
                    ],
                    'doorOpenings' => $room->door_openings ?? [],
                    'furniture' => $room->furniture ?? [],
                    'modelUrl' => $room->modelGlbUrl(),
                    'modelScale' => (float) ($room->model_scale ?: 1),
                    'modelPosition' => $room->model_position,
                ])->values()
                : [],
            'hotspots' => $this->relationLoaded('hotspots')
                ? $this->hotspots->map(fn ($hotspot) => [
                    'from' => $hotspot->fromRoom?->slug,
                    'to' => $hotspot->toRoom?->slug,
                    'position' => [
                        (float) $hotspot->position_x,
                        (float) $hotspot->position_y,
                        (float) $hotspot->position_z,
                    ],
                    'label' => $hotspot->label,
                ])->values()
                : [],
            'cinematicWaypoints' => $this->relationLoaded('waypoints')
                ? $this->waypoints->map(fn ($waypoint) => [
                    'position' => $waypoint->position,
                    'target' => $waypoint->target,
                    'duration' => (float) $waypoint->duration,
                    'hold' => (float) $waypoint->hold,
                    'roomId' => $waypoint->room?->slug,
                ])->values()
                : [],
        ];
    }
}

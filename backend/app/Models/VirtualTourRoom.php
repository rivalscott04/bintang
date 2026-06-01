<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VirtualTourRoom extends Model
{
    protected $fillable = [
        'virtual_tour_id',
        'slug',
        'name',
        'icon',
        'description',
        'spec_area',
        'spec_highlight',
        'bounds',
        'floor_color',
        'wall_color',
        'accent_color',
        'model_glb',
        'model_scale',
        'model_position',
        'camera_position',
        'camera_target',
        'door_openings',
        'furniture',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'bounds' => 'array',
            'camera_position' => 'array',
            'camera_target' => 'array',
            'door_openings' => 'array',
            'furniture' => 'array',
            'model_scale' => 'float',
            'model_position' => 'array',
            'sort_order' => 'integer',
        ];
    }

    public function modelGlbUrl(): ?string
    {
        if (blank($this->model_glb)) {
            return null;
        }

        return Cluster::resolvePublicAssetUrl($this->model_glb);
    }

    public function hasGlbModel(): bool
    {
        return filled($this->model_glb);
    }

    /** @return BelongsTo<VirtualTour, $this> */
    public function tour(): BelongsTo
    {
        return $this->belongsTo(VirtualTour::class, 'virtual_tour_id');
    }

    /** @return HasMany<VirtualTourHotspot, $this> */
    public function hotspotsFrom(): HasMany
    {
        return $this->hasMany(VirtualTourHotspot::class, 'from_room_id');
    }
}

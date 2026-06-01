<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VirtualTour extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'cluster_id',
        'section_label',
        'section_title',
        'section_description',
        'preview_image',
        'preview_image_alt',
        'card_headline',
        'card_headline_accent',
        'card_description',
        'button_label',
        'modal_subtitle',
        'room_height',
        'eye_height',
        'is_published',
        'is_default',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'room_height' => 'float',
            'eye_height' => 'float',
            'is_published' => 'boolean',
            'is_default' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function previewImageUrl(): ?string
    {
        if (blank($this->preview_image)) {
            return null;
        }

        return Cluster::resolvePublicAssetUrl($this->preview_image);
    }

    /** @return BelongsTo<Cluster, $this> */
    public function cluster(): BelongsTo
    {
        return $this->belongsTo(Cluster::class);
    }

    /** @return HasMany<VirtualTourRoom, $this> */
    public function rooms(): HasMany
    {
        return $this->hasMany(VirtualTourRoom::class)->orderBy('sort_order');
    }

    /** @return HasMany<VirtualTourHotspot, $this> */
    public function hotspots(): HasMany
    {
        return $this->hasMany(VirtualTourHotspot::class)->orderBy('sort_order');
    }

    /** @return HasMany<VirtualTourWaypoint, $this> */
    public function waypoints(): HasMany
    {
        return $this->hasMany(VirtualTourWaypoint::class)->orderBy('sort_order');
    }

    /** @param Builder<self> $query */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    /** @param Builder<self> $query */
    public function scopeDefault(Builder $query): Builder
    {
        return $query->where('is_default', true);
    }
}

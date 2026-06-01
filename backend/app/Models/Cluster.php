<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\ClusterFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Cluster extends Model
{
    /** @use HasFactory<ClusterFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'title',
        'badge',
        'image',
        'image_alt',
        'price_label',
        'excerpt',
        'description',
        'specs',
        'hover_cta',
        'cta',
        'site_plan_image',
        'site_plan_blocks',
        'sort_order',
        'is_published',
        'featured',
    ];

    protected function casts(): array
    {
        return [
            'specs' => 'array',
            'hover_cta' => 'array',
            'cta' => 'array',
            'site_plan_blocks' => 'array',
            'is_published' => 'boolean',
            'featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /** @return HasMany<Project, $this> */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function imageUrl(): string
    {
        return self::resolvePublicAssetUrl($this->image);
    }

    public function sitePlanImageUrl(): ?string
    {
        if (blank($this->site_plan_image)) {
            return null;
        }

        return self::resolvePublicAssetUrl($this->site_plan_image);
    }

    public function usesLegacyImagePath(): bool
    {
        $path = $this->image;

        return filled($path)
            && ! str_starts_with($path, 'clusters/')
            && ! filter_var($path, FILTER_VALIDATE_URL);
    }

    public static function resolvePublicAssetUrl(string $path): string
    {
        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        if (str_starts_with($path, '/')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }

    /** @param Builder<self> $query */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    /** @param Builder<self> $query */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}

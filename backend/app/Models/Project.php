<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ProjectStatus;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'cluster_id',
        'name',
        'cluster',
        'cluster_type',
        'status',
        'phase',
        'price_range',
        'image',
        'image_alt',
        'gallery',
        'excerpt',
        'description',
        'highlights',
        'specifications',
        'cluster_anchor',
        'featured',
        'is_published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'status' => ProjectStatus::class,
            'highlights' => 'array',
            'gallery' => 'array',
            'specifications' => 'array',
            'featured' => 'boolean',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /** @return BelongsTo<Cluster, $this> */
    public function clusterRecord(): BelongsTo
    {
        return $this->belongsTo(Cluster::class, 'cluster_id');
    }

    /** URL aset publik (upload storage, path statis, atau URL absolut). */
    public function assetUrl(?string $path): string
    {
        if (blank($path)) {
            return '';
        }

        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }

        if (str_starts_with($path, '/')) {
            return $path;
        }

        return Cluster::resolvePublicAssetUrl($path);
    }

    /** URL gambar utama untuk API & frontend. */
    public function imageUrl(): string
    {
        return $this->assetUrl($this->image);
    }

    /**
     * @return list<string>
     */
    public function galleryUrls(): array
    {
        $paths = $this->gallery ?? [];

        if ($paths === []) {
            $main = $this->imageUrl();

            return $main !== '' ? [$main] : [];
        }

        return array_values(array_map(
            fn (string $path): string => $this->assetUrl($path),
            $paths,
        ));
    }

    public function usesLegacyImagePath(): bool
    {
        $path = $this->image;

        return filled($path)
            && ! str_starts_with($path, 'projects/')
            && ! filter_var($path, FILTER_VALIDATE_URL);
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

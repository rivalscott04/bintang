<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Project */
final class ProjectResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->slug,
            'slug' => $this->slug,
            'featured' => $this->featured,
            'name' => $this->name,
            'cluster' => $this->clusterRecord?->name ?? $this->cluster,
            'clusterSlug' => $this->clusterRecord?->slug,
            'clusterType' => $this->cluster_type,
            'status' => $this->status->value,
            'phase' => $this->phase,
            'priceRange' => $this->price_range,
            'image' => $this->imageUrl(),
            'imageAlt' => $this->image_alt,
            'gallery' => $this->galleryUrls(),
            'excerpt' => $this->excerpt,
            'description' => $this->description,
            'highlights' => $this->highlights ?? [],
            'specifications' => $this->specifications ?? [],
            'clusterAnchor' => $this->cluster_anchor,
        ];
    }
}

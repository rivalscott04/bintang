<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Cluster;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Cluster */
final class ClusterResource extends JsonResource
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
            'badge' => $this->badge,
            'title' => $this->title,
            'image' => $this->imageUrl(),
            'imageAlt' => $this->image_alt,
            'price' => $this->price_label,
            'excerpt' => $this->excerpt,
            'description' => $this->description,
            'specs' => $this->specs ?? [],
            'hoverCta' => $this->hover_cta ?? [],
            'cta' => $this->cta ?? [],
            'sitePlanImage' => $this->sitePlanImageUrl(),
            'sitePlanBlocks' => $this->site_plan_blocks ?? [],
            'projects' => $this->whenLoaded(
                'projects',
                fn () => ProjectResource::collection($this->projects),
            ),
        ];
    }
}

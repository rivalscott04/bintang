<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\AmenityLocation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin AmenityLocation */
final class AmenityLocationResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'lat' => (float) $this->lat,
            'lng' => (float) $this->lng,
            'category' => $this->category->value,
            'time' => $this->time_label,
            'desc' => $this->description,
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\NavigationItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin NavigationItem */
final class NavigationLinkResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'to' => $this->to,
            'label' => $this->label,
        ];
    }
}

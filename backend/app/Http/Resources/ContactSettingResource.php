<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin array{whatsappNumber: string, whatsappUrl: string, whatsappDefaultMessage: ?string} */
final class ContactSettingResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'whatsappNumber' => $this->resource['whatsappNumber'],
            'whatsappUrl' => $this->resource['whatsappUrl'],
            'whatsappDefaultMessage' => $this->resource['whatsappDefaultMessage'],
        ];
    }
}

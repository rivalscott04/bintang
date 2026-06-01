<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AmenityCategory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class AmenityLocation extends Model
{
    protected $fillable = [
        'name',
        'lat',
        'lng',
        'category',
        'time_label',
        'description',
        'sort_order',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'category' => AmenityCategory::class,
            'lat' => 'float',
            'lng' => 'float',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ];
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

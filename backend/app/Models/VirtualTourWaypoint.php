<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VirtualTourWaypoint extends Model
{
    protected $fillable = [
        'virtual_tour_id',
        'room_id',
        'position',
        'target',
        'duration',
        'hold',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'position' => 'array',
            'target' => 'array',
            'duration' => 'float',
            'hold' => 'float',
            'sort_order' => 'integer',
        ];
    }

    /** @return BelongsTo<VirtualTour, $this> */
    public function tour(): BelongsTo
    {
        return $this->belongsTo(VirtualTour::class, 'virtual_tour_id');
    }

    /** @return BelongsTo<VirtualTourRoom, $this> */
    public function room(): BelongsTo
    {
        return $this->belongsTo(VirtualTourRoom::class, 'room_id');
    }
}

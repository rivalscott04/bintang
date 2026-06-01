<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VirtualTourHotspot extends Model
{
    protected $fillable = [
        'virtual_tour_id',
        'from_room_id',
        'to_room_id',
        'position_x',
        'position_y',
        'position_z',
        'label',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'position_x' => 'float',
            'position_y' => 'float',
            'position_z' => 'float',
            'sort_order' => 'integer',
        ];
    }

    /** @return BelongsTo<VirtualTour, $this> */
    public function tour(): BelongsTo
    {
        return $this->belongsTo(VirtualTour::class, 'virtual_tour_id');
    }

    /** @return BelongsTo<VirtualTourRoom, $this> */
    public function fromRoom(): BelongsTo
    {
        return $this->belongsTo(VirtualTourRoom::class, 'from_room_id');
    }

    /** @return BelongsTo<VirtualTourRoom, $this> */
    public function toRoom(): BelongsTo
    {
        return $this->belongsTo(VirtualTourRoom::class, 'to_room_id');
    }
}

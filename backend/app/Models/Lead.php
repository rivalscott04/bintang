<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\LeadStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'project_slug',
        'project_name',
        'cluster_name',
        'visitor_message',
        'source',
        'status',
        'assigned_to',
        'assigned_at',
        'first_contacted_at',
        'last_contacted_at',
        'contact_count',
        'manager_notes',
    ];

    protected function casts(): array
    {
        return [
            'status' => LeadStatus::class,
            'assigned_at' => 'datetime',
            'first_contacted_at' => 'datetime',
            'last_contacted_at' => 'datetime',
            'contact_count' => 'integer',
        ];
    }

    /** @return BelongsTo<User, $this> */
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    /** @return HasMany<LeadContactLog, $this> */
    public function contactLogs(): HasMany
    {
        return $this->hasMany(LeadContactLog::class)->latest('created_at');
    }
}

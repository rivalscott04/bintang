<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\LeadStatus;
use App\Enums\UserRole;
use App\Models\Lead;
use App\Models\LeadContactLog;
use App\Models\User;

final class LeadFollowUpService
{
    public function __construct(
        private readonly LeadWhatsAppService $whatsApp,
    ) {}

    public function canContactLead(Lead $lead, User $user): bool
    {
        if ($user->role === UserRole::Admin) {
            return true;
        }

        return $user->role === UserRole::Sales
            && (int) $lead->assigned_to === (int) $user->id;
    }

    /**
     * Catat follow-up WhatsApp, perbarui status jika perlu, lalu kembalikan URL wa.me.
     */
    public function recordWhatsAppContactAndGetUrl(Lead $lead, User $user): string
    {
        $lead->loadMissing('assignee');

        LeadContactLog::query()->create([
            'lead_id' => $lead->id,
            'user_id' => $user->id,
            'channel' => 'whatsapp',
            'created_at' => now(),
        ]);

        $now = now();
        $lead->contact_count = (int) $lead->contact_count + 1;
        $lead->first_contacted_at ??= $now;
        $lead->last_contacted_at = $now;

        if (in_array($lead->status, [LeadStatus::New, LeadStatus::Assigned], true)) {
            $lead->status = LeadStatus::Contacted;
        }

        $lead->save();

        return $this->whatsApp->outreachUrlForLead($lead, $user);
    }

    public function trackedOutreachUrl(Lead $lead): string
    {
        return route('admin.leads.whatsapp-outreach', $lead);
    }
}

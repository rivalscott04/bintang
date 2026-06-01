<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\ContactSetting;
use App\Models\Lead;
use App\Models\User;
use App\Support\WhatsAppOutreachTemplate;

final class LeadWhatsAppService
{
    public function __construct(
        private readonly LeadService $leads,
    ) {}

    public function outreachUrlForLead(Lead $lead, ?User $actingUser = null): string
    {
        $lead->loadMissing('assignee');

        $message = WhatsAppOutreachTemplate::render(
            $this->resolveTemplate($lead),
            $lead,
            $actingUser,
        );

        $phone = $this->leads->normalizePhone($lead->phone);

        return 'https://wa.me/'.$phone.'?text='.rawurlencode($message);
    }

    public function previewMessageForLead(Lead $lead, ?User $actingUser = null): string
    {
        $lead->loadMissing('assignee');

        return WhatsAppOutreachTemplate::render(
            $this->resolveTemplate($lead),
            $lead,
            $actingUser,
        );
    }

    private function resolveTemplate(Lead $lead): string
    {
        $custom = $lead->assignee?->whatsapp_outreach_template;
        if (filled($custom)) {
            return $custom;
        }

        $global = ContactSetting::current()->sales_whatsapp_outreach_template;
        if (filled($global)) {
            return $global;
        }

        return WhatsAppOutreachTemplate::DEFAULT;
    }
}

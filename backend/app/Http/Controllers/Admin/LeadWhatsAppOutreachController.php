<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Services\LeadFollowUpService;
use Illuminate\Http\RedirectResponse;

final class LeadWhatsAppOutreachController extends Controller
{
    public function __invoke(Lead $lead, LeadFollowUpService $followUp): RedirectResponse
    {
        $user = auth()->user();
        abort_unless($user !== null, 401);
        abort_unless($followUp->canContactLead($lead, $user), 403);

        return redirect()->away(
            $followUp->recordWhatsAppContactAndGetUrl($lead, $user),
        );
    }
}

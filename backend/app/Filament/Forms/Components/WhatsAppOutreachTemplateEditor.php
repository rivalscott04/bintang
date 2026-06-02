<?php

declare(strict_types=1);

namespace App\Filament\Forms\Components;

use App\Support\WhatsAppOutreachTemplate;
use Filament\Forms\Components\Field;

class WhatsAppOutreachTemplateEditor extends Field
{
    protected string $view = 'filament.forms.components.whatsapp-outreach-template-editor';

    protected function setUp(): void
    {
        parent::setUp();

        $this->default(WhatsAppOutreachTemplate::DEFAULT);
    }

    /** @return list<string> */
    public function getLockedPlaceholders(): array
    {
        return WhatsAppOutreachTemplate::LOCKED_PLACEHOLDERS;
    }
}

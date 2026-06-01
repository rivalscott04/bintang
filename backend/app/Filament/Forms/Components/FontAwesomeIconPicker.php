<?php

declare(strict_types=1);

namespace App\Filament\Forms\Components;

use App\Support\FontAwesomeIcons;
use Filament\Forms\Components\Field;

class FontAwesomeIconPicker extends Field
{
    protected string $view = 'filament.forms.components.font-awesome-icon-picker';

    protected function setUp(): void
    {
        parent::setUp();

        $this->default(null);
    }

    /**
     * @return list<array{value: string, label: string, keywords: list<string>}>
     */
    public function getIcons(): array
    {
        return FontAwesomeIcons::all($this->getState());
    }
}

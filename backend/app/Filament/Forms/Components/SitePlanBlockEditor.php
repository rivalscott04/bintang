<?php

declare(strict_types=1);

namespace App\Filament\Forms\Components;

use App\Enums\SiteBlockStatus;
use App\Models\Cluster;
use Filament\Forms\Components\Field;
use Filament\Schemas\Components\Utilities\Get;
use Illuminate\Database\Eloquent\Model;

class SitePlanBlockEditor extends Field
{
    protected string $view = 'filament.forms.components.site-plan-block-editor';

    protected string $sitePlanImageField = 'site_plan_image';

    protected function setUp(): void
    {
        parent::setUp();

        $this->default([]);
    }

    public function sitePlanImageField(string $field): static
    {
        $this->sitePlanImageField = $field;

        return $this;
    }

    public function getSitePlanImageField(): string
    {
        return $this->sitePlanImageField;
    }

    /**
     * @return list<array{value: string, label: string}>
     */
    public function getStatusOptions(): array
    {
        return array_map(
            fn (SiteBlockStatus $status): array => [
                'value' => $status->value,
                'label' => $status->getLabel(),
            ],
            SiteBlockStatus::cases(),
        );
    }

    public function resolveImageUrl(Get $get, ?Model $record): ?string
    {
        $uploadState = $get($this->getSitePlanImageField());

        if (filled($uploadState)) {
            $path = is_array($uploadState) ? (string) reset($uploadState) : (string) $uploadState;

            if (filled($path)) {
                return Cluster::resolvePublicAssetUrl($path);
            }
        }

        if ($record instanceof Cluster) {
            return $record->sitePlanImageUrl();
        }

        return null;
    }
}

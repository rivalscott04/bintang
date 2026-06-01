<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\LeadStatus;
use App\Models\Lead;

final class LeadService
{
    /**
     * @param  array{name: string, phone: string, project_slug?: ?string, project_name: string, cluster_name?: ?string, visitor_message?: ?string, source?: string}  $data
     */
    public function storeFromWebsite(array $data): Lead
    {
        return Lead::query()->create([
            'name' => $data['name'],
            'phone' => $this->normalizePhone($data['phone']),
            'project_slug' => $data['project_slug'] ?? null,
            'project_name' => $data['project_name'],
            'cluster_name' => $data['cluster_name'] ?? null,
            'visitor_message' => filled($data['visitor_message'] ?? null)
                ? trim((string) $data['visitor_message'])
                : null,
            'source' => $data['source'] ?? 'project_detail',
            'status' => LeadStatus::New,
        ]);
    }

    public function normalizePhone(string $phone): string
    {
        $digits = preg_replace('/\D+/', '', $phone) ?? '';

        if (str_starts_with($digits, '0')) {
            return '62'.substr($digits, 1);
        }

        if (str_starts_with($digits, '8') && ! str_starts_with($digits, '62')) {
            return '62'.$digits;
        }

        return $digits;
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

final class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:20'],
            'project_slug' => ['nullable', 'string', 'max:120'],
            'project_name' => ['required', 'string', 'max:200'],
            'cluster_name' => ['nullable', 'string', 'max:120'],
            'visitor_message' => ['nullable', 'string', 'max:2000'],
            'source' => ['nullable', 'string', 'max:40'],
        ];
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactSettingResource;
use App\Services\ContactSettingService;
use Illuminate\Http\JsonResponse;

final class ContactSettingController extends Controller
{
    public function show(ContactSettingService $settings): JsonResponse
    {
        return (new ContactSettingResource($settings->publicPayload()))
            ->response()
            ->header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    }
}

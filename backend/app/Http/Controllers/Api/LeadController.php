<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreLeadRequest;
use App\Services\LeadService;
use Illuminate\Http\JsonResponse;

final class LeadController extends Controller
{
    public function store(StoreLeadRequest $request, LeadService $leads): JsonResponse
    {
        $lead = $leads->storeFromWebsite($request->validated());

        return response()->json([
            'id' => $lead->id,
            'message' => 'Lead berhasil disimpan',
        ], 201);
    }
}

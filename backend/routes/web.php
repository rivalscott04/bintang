<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\LeadWhatsAppOutreachController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['web', 'auth'])
    ->prefix('admin')
    ->group(function (): void {
        Route::get('/leads/{lead}/whatsapp-outreach', LeadWhatsAppOutreachController::class)
            ->name('admin.leads.whatsapp-outreach');
    });

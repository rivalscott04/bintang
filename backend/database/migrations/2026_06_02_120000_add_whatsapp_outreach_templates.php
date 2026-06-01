<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_settings', function (Blueprint $table): void {
            $table->text('sales_whatsapp_outreach_template')->nullable()->after('whatsapp_default_message');
        });

        Schema::table('users', function (Blueprint $table): void {
            $table->text('whatsapp_outreach_template')->nullable()->after('role');
        });
    }

    public function down(): void
    {
        Schema::table('contact_settings', function (Blueprint $table): void {
            $table->dropColumn('sales_whatsapp_outreach_template');
        });

        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn('whatsapp_outreach_template');
        });
    }
};

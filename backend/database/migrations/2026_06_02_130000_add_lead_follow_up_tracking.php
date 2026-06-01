<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table): void {
            $table->timestamp('first_contacted_at')->nullable()->after('assigned_at');
            $table->timestamp('last_contacted_at')->nullable()->after('first_contacted_at');
            $table->unsignedSmallInteger('contact_count')->default(0)->after('last_contacted_at');
        });

        Schema::create('lead_contact_logs', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('lead_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('channel', 20)->default('whatsapp');
            $table->timestamp('created_at')->useCurrent();

            $table->index(['lead_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lead_contact_logs');

        Schema::table('leads', function (Blueprint $table): void {
            $table->dropColumn(['first_contacted_at', 'last_contacted_at', 'contact_count']);
        });
    }
};

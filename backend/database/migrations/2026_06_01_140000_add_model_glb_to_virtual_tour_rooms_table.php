<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('virtual_tour_rooms', function (Blueprint $table) {
            $table->string('model_glb')->nullable()->after('accent_color');
            $table->decimal('model_scale', 8, 4)->default(1)->after('model_glb');
            $table->json('model_position')->nullable()->after('model_scale');
        });
    }

    public function down(): void
    {
        Schema::table('virtual_tour_rooms', function (Blueprint $table) {
            $table->dropColumn(['model_glb', 'model_scale', 'model_position']);
        });
    }
};

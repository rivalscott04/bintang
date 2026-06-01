<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('price_range')->nullable()->after('phase');
            $table->json('gallery')->nullable()->after('image_alt');
            $table->json('specifications')->nullable()->after('highlights');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['price_range', 'gallery', 'specifications']);
        });
    }
};

<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clusters', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('title');
            $table->string('badge');
            $table->string('image');
            $table->string('image_alt');
            $table->string('price_label');
            $table->text('excerpt');
            $table->longText('description')->nullable();
            $table->json('specs');
            $table->json('hover_cta');
            $table->json('cta');
            $table->string('site_plan_image')->nullable();
            $table->json('site_plan_blocks')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0)->index();
            $table->boolean('is_published')->default(true)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clusters');
    }
};

<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('cluster');
            $table->string('cluster_type');
            $table->string('status', 32)->index();
            $table->string('phase');
            $table->string('image');
            $table->string('image_alt');
            $table->text('excerpt');
            $table->longText('description');
            $table->json('highlights');
            $table->string('cluster_anchor')->nullable();
            $table->boolean('featured')->default(false)->index();
            $table->boolean('is_published')->default(true)->index();
            $table->unsignedSmallInteger('sort_order')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};

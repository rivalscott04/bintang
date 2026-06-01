<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('virtual_tours', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->foreignId('cluster_id')->nullable()->constrained('clusters')->nullOnDelete();
            $table->string('section_label')->default('PENGALAMAN INTERAKTIF');
            $table->string('section_title')->default('3D Virtual Space Explorer');
            $table->text('section_description')->nullable();
            $table->string('preview_image')->nullable();
            $table->string('preview_image_alt')->nullable();
            $table->string('card_headline');
            $table->string('card_headline_accent')->nullable();
            $table->text('card_description')->nullable();
            $table->string('button_label')->default('Mulai Tur Virtual 3D');
            $table->string('modal_subtitle')->nullable();
            $table->decimal('room_height', 4, 2)->default(3.2);
            $table->decimal('eye_height', 4, 2)->default(1.7);
            $table->boolean('is_published')->default(true)->index();
            $table->boolean('is_default')->default(false)->index();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('virtual_tour_rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('virtual_tour_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('name');
            $table->string('icon')->default('fa-couch');
            $table->text('description')->nullable();
            $table->string('spec_area')->nullable();
            $table->string('spec_highlight')->nullable();
            $table->json('bounds');
            $table->string('floor_color')->default('#b89876');
            $table->string('wall_color')->default('#f5ede0');
            $table->string('accent_color')->default('#c5a880');
            $table->json('camera_position');
            $table->json('camera_target');
            $table->json('door_openings')->nullable();
            $table->json('furniture')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['virtual_tour_id', 'slug']);
        });

        Schema::create('virtual_tour_hotspots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('virtual_tour_id')->constrained()->cascadeOnDelete();
            $table->foreignId('from_room_id')->constrained('virtual_tour_rooms')->cascadeOnDelete();
            $table->foreignId('to_room_id')->constrained('virtual_tour_rooms')->cascadeOnDelete();
            $table->decimal('position_x', 8, 2);
            $table->decimal('position_y', 8, 2);
            $table->decimal('position_z', 8, 2);
            $table->string('label');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('virtual_tour_waypoints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('virtual_tour_id')->constrained()->cascadeOnDelete();
            $table->foreignId('room_id')->nullable()->constrained('virtual_tour_rooms')->nullOnDelete();
            $table->json('position');
            $table->json('target');
            $table->decimal('duration', 6, 2)->default(0);
            $table->decimal('hold', 6, 2)->default(1);
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('virtual_tour_waypoints');
        Schema::dropIfExists('virtual_tour_hotspots');
        Schema::dropIfExists('virtual_tour_rooms');
        Schema::dropIfExists('virtual_tours');
    }
};

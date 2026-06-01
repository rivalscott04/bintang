<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@grandkotabintang.test'],
            [
                'name' => 'Administrator GKB',
                'password' => Hash::make('password'),
                'role' => UserRole::Admin,
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'sales@grandkotabintang.test'],
            [
                'name' => 'Tim Sales GKB',
                'password' => Hash::make('password'),
                'role' => UserRole::Sales,
            ],
        );

        $this->call([
            ContactSettingSeeder::class,
            ClusterSeeder::class,
            ProjectSeeder::class,
            VirtualTourSeeder::class,
            NavigationItemSeeder::class,
            AmenityLocationSeeder::class,
        ]);
    }
}

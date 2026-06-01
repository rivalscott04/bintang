<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\AmenityCategory;
use App\Models\AmenityLocation;
use Illuminate\Database\Seeder;

class AmenityLocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Tekko Grand Kota Bintang',
                'lat' => -6.2479,
                'lng' => 106.9557,
                'category' => AmenityCategory::Dining,
                'time_label' => 'Akses langsung, < 3 menit jalan kaki',
                'description' => 'Restoran keluarga unggulan di kawasan GKB dengan menu Indonesia favorit, suasana hangat untuk makan siang & dinner bersama keluarga.',
                'sort_order' => 1,
            ],
            [
                'name' => 'Hotel Grand Travello Bekasi',
                'lat' => -6.2474,
                'lng' => 106.957,
                'category' => AmenityCategory::Hotel,
                'time_label' => 'Akses langsung, < 3 menit jalan kaki',
                'description' => 'Hotel modern tepat di dalam kawasan Grand Kota Bintang, pilihan akomodasi premium bagi tamu keluarga, MICE, maupun bisnis.',
                'sort_order' => 2,
            ],
            [
                'name' => 'Grand Kota Bintang XXI',
                'lat' => -6.2461,
                'lng' => 106.9566,
                'category' => AmenityCategory::Lifestyle,
                'time_label' => 'Akses langsung, < 5 menit jalan kaki',
                'description' => 'Bioskop Cinema XXI di kawasan GKB dengan teknologi layar terbaru, audio Dolby, dan reguler/Premiere class.',
                'sort_order' => 3,
            ],
            [
                'name' => 'Amanaia Grand Kota Bintang',
                'lat' => -6.2455,
                'lng' => 106.9578,
                'category' => AmenityCategory::Dining,
                'time_label' => 'Akses langsung, < 5 menit jalan kaki',
                'description' => 'Destinasi kuliner & lifestyle modern di sisi utara kawasan GKB, kumpulan tenant F&B kekinian untuk nongkrong & event.',
                'sort_order' => 4,
            ],
            [
                'name' => 'Toko Kopi TUKU Kota Bintang',
                'lat' => -6.2456,
                'lng' => 106.9545,
                'category' => AmenityCategory::Dining,
                'time_label' => 'Akses langsung, < 5 menit jalan kaki',
                'description' => 'Outlet Toko Kopi Tuku di Jl. KH. Moh. Tambih, kawasan GKB, kopi susu signature & ruang santai untuk meeting kasual.',
                'sort_order' => 5,
            ],
            [
                'name' => 'Plaza Eatpedia',
                'lat' => -6.249,
                'lng' => 106.9543,
                'category' => AmenityCategory::Dining,
                'time_label' => 'Jarak tempuh 3 menit',
                'description' => 'Pusat kuliner street-food di sisi Jl. Akses Tol Kalimalang, mempersembahkan puluhan tenant F&B dengan konsep open-air.',
                'sort_order' => 6,
            ],
            [
                'name' => 'Global Prestasi School',
                'lat' => -6.2484,
                'lng' => 106.9606,
                'category' => AmenityCategory::Edu,
                'time_label' => 'Jarak tempuh 3 menit',
                'description' => 'Sekolah nasional plus bertaraf internasional (KB–SMA) di sisi timur GKB, kampus modern dengan kurikulum Cambridge & IB.',
                'sort_order' => 7,
            ],
            [
                'name' => 'Pintu Tol JORR Kalimalang',
                'lat' => -6.2543,
                'lng' => 106.9582,
                'category' => AmenityCategory::Tol,
                'time_label' => 'Akses langsung, di lokasi',
                'description' => 'Gerbang Tol Kalimalang (JORR) tepat di sisi Jl. KH. Noer Ali, memberi GKB akses instan ke seluruh jaringan Tol Lingkar Luar Jakarta.',
                'sort_order' => 8,
            ],
            [
                'name' => 'Pintu Tol Becakayu (Jakasampurna)',
                'lat' => -6.2462,
                'lng' => 106.9523,
                'category' => AmenityCategory::Tol,
                'time_label' => 'Jarak tempuh 5 menit',
                'description' => 'Ujung Tol Becakayu di Jakasampurna menghubungkan koridor Kalimalang hingga Cawang & Kampung Melayu, mempersingkat waktu ke pusat Jakarta.',
                'sort_order' => 9,
            ],
            [
                'name' => 'Stasiun LRT Cikunir 2',
                'lat' => -6.254512,
                'lng' => 106.963378,
                'category' => AmenityCategory::Trans,
                'time_label' => 'Jarak tempuh 5 menit',
                'description' => 'Stasiun LRT Jabodebek terdekat (Jl. Batu Mulia, Jakasampurna) untuk perjalanan bebas macet menuju Dukuh Atas, Kuningan, dan pusat bisnis Jakarta.',
                'sort_order' => 10,
            ],
            [
                'name' => 'Metropolitan Mall Bekasi',
                'lat' => -6.2503,
                'lng' => 106.9924,
                'category' => AmenityCategory::Mall,
                'time_label' => 'Jarak tempuh 10 menit',
                'description' => 'Pusat belanja, bioskop, kuliner, dan hiburan paling populer di koridor Jl. KH. Noer Ali, Pekayon, tenant nasional & internasional lengkap.',
                'sort_order' => 11,
            ],
            [
                'name' => 'Primaya Hospital Bekasi Barat',
                'lat' => -6.2538,
                'lng' => 106.9905,
                'category' => AmenityCategory::Med,
                'time_label' => 'Jarak tempuh 8 menit',
                'description' => 'Rumah sakit terakreditasi JCI di Jl. KH. Noer Ali Kav. 17–18 Kayuringin Jaya, fasilitas modern untuk kebutuhan darurat & rawat jalan keluarga.',
                'sort_order' => 12,
            ],
            [
                'name' => 'RS Mitra Keluarga Bekasi Barat',
                'lat' => -6.2487,
                'lng' => 107.001,
                'category' => AmenityCategory::Med,
                'time_label' => 'Jarak tempuh 12 menit',
                'description' => 'Pusat perawatan medis komprehensif di Jl. Jend. Ahmad Yani Kayuringin Jaya dengan layanan spesialis lengkap & teknologi MRI/CT-Scan.',
                'sort_order' => 13,
            ],
        ];

        foreach ($locations as $data) {
            AmenityLocation::query()->updateOrCreate(
                ['name' => $data['name']],
                [...$data, 'is_published' => true],
            );
        }
    }
}

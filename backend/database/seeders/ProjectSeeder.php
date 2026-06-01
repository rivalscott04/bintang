<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\ProjectStatus;
use App\Models\Cluster;
use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'slug' => 'marocco',
                'name' => 'Cluster Marocco Townhouses',
                'cluster' => 'Marocco',
                'cluster_type' => 'Residential',
                'status' => ProjectStatus::Live,
                'phase' => 'Tahap 1: Ready Stock Terbatas',
                'price_range' => 'Mulai Rp 1,8 Miliar',
                'image' => '/assets/cluster_marocco.webp',
                'image_alt' => 'Cluster Marocco Townhouses Grand Kota Bintang',
                'gallery' => [
                    '/assets/cluster_marocco.webp',
                    '/assets/stellar_avenue.webp',
                ],
                'excerpt' => 'Hunian tropis modern 2 lantai dengan privasi klaster — siap huni di koridor hunian flagship Grand Kota Bintang.',
                'description' => 'Miliki rumah tropis modern yang dirancang untuk keluarga urban cerdas. Cluster Marocco menghadirkan town house 2 lantai dengan fasad batu alam, jendela panorama, dan tata ruang lapang yang memaksimalkan sirkulasi udara alami. Nikmati privasi blok terjaga tanpa kehilangan akses langsung ke boulevard utama, amenitas superblock, dan jaringan tol Bekasi Barat. Amankan unit ready stock terbatas Anda sebelum harga naik di tahap berikutnya.',
                'highlights' => [
                    '3+1 kamar tidur & 3 kamar mandi',
                    '2 carport & area service',
                    'Akses langsung ke boulevard utama GKB',
                    'Tur virtual 3D tersedia',
                ],
                'specifications' => [
                    'Pondasi' => 'Tiang Pancang / Mini Pile & Beton Bertulang',
                    'Dinding' => 'Bata Merah Double Wall, Plester, Aci & Cat Weathercoat',
                    'Lantai' => 'Homogeneous Tile 80×80 Premium (Ruang Utama)',
                    'Sanitair' => 'TOTO / Setara (Eco-Washer & Glass Shower Screen)',
                    'Listrik' => '2.200 VA (Sistem Kabel Bawah Tanah)',
                    'Air' => 'PDAM Bersih dengan Ground Tank & Pompa Booster',
                ],
                'cluster_anchor' => '/klaster',
                'featured' => true,
                'sort_order' => 1,
            ],
            [
                'slug' => 'stellar',
                'name' => 'Stellar Avenue Commercial',
                'cluster' => 'Stellar',
                'cluster_type' => 'Commercial',
                'status' => ProjectStatus::Live,
                'phase' => 'Investasi Komersial Terlaris — Akses Tol JORR 0 KM',
                'price_range' => 'Mulai Rp 2,9 Miliar',
                'image' => '/assets/stellar_avenue.webp',
                'image_alt' => 'Stellar Avenue Shophouse Grand Kota Bintang',
                'gallery' => [
                    '/assets/stellar_avenue.webp',
                    '/assets/stellar_avenue-1024.webp',
                    '/assets/cluster_marocco.webp',
                ],
                'excerpt' => 'Miliki ruang usaha alfresco premium dengan captive market 5.000+ residen aktif di koridor utama superblock.',
                'description' => 'Jadikan bisnis Anda pusat perhatian di Bekasi Barat. Stellar Avenue menghadirkan konsep komersial alfresco dining pertama di koridor utama superblock Grand Kota Bintang. Dikelilingi landscape hijau dan aliran air dekoratif yang menenangkan, kawasan ini dirancang khusus untuk menarik foot traffic tinggi setiap harinya. Sangat ideal untuk ekspansi F&B premium, retail lifestyle, maupun kantor representatif Anda. Amankan unit strategis Anda sebelum kehabisan.',
                'highlights' => [
                    'Ruko 3 lantai ±180 m²',
                    'Area parkir luas & akses kendaraan mudah',
                    'Potensi kunjungan tinggi dari residensial sekitar',
                    'Dekat amenitas dan akses tol',
                ],
                'specifications' => [
                    'Pondasi' => 'Tiang Pancang Beton Bertulang Kuat',
                    'Struktur' => 'Beton Bertulang K-300 (Kapasitas Beban Tinggi)',
                    'Dinding' => 'Bata Ringan Double Wall, Plester Aci & Cat Eksterior Premium',
                    'Lantai' => 'Homogeneous Tile 60×60 & Keramik Anti-Slip (Kamar Mandi)',
                    'Listrik' => '4.400 VA (Kapasitas Daya Bisnis/Ruko)',
                    'Air' => 'PDAM Bersih dengan Ground Tank & Pompa Air Otomatis',
                ],
                'cluster_anchor' => '/klaster',
                'featured' => true,
                'sort_order' => 2,
            ],
            [
                'slug' => 'roma',
                'name' => 'Cluster Roma Residence',
                'cluster' => 'Roma',
                'cluster_type' => 'Residential',
                'status' => ProjectStatus::Developing,
                'phase' => 'Pre-launch — Daftar Minat Prioritas',
                'price_range' => 'Info Harga Segera Hadir',
                'image' => '/assets/cluster_marocco.webp',
                'image_alt' => 'Cluster Roma Residence, dalam pengembangan',
                'gallery' => [
                    '/assets/cluster_marocco.webp',
                    '/assets/stellar_avenue.webp',
                ],
                'excerpt' => 'Hunian keluarga berorientasi hijau dengan privasi blok — terintegrasi penuh dalam masterplan Grand Kota Bintang.',
                'description' => 'Wujudkan gaya hidup keluarga yang tenang tanpa jauh dari kota. Cluster Roma dirancang sebagai hunian keluarga dengan ruang hijau terintegrasi di dalam blok residential Grand Kota Bintang. Fase pengembangan saat ini fokus pada infrastruktur jalan dalam klaster, utilitas, dan landscape publik yang mendukung kenyamanan jangka panjang. Daftarkan minat Anda sekarang untuk mendapatkan prioritas informasi unit, simulasi KPR, dan jadwal preview eksklusif.',
                'highlights' => [
                    'Konsep hunian keluarga berorientasi hijau',
                    'Privasi blok terjaga',
                    'Terintegrasi masterplan GKB',
                    'Akses amenitas superblock & tol',
                ],
                'specifications' => [
                    'Pondasi' => 'Tiang Pancang & Beton Bertulang (Standar GKB)',
                    'Dinding' => 'Bata Ringan Double Wall & Finishing Premium',
                    'Lantai' => 'Homogeneous Tile Area Utama',
                    'Listrik' => '2.200 VA (Rencana Utilitas Bawah Tanah)',
                    'Air' => 'PDAM Bersih & Ground Tank Terintegrasi',
                ],
                'cluster_anchor' => null,
                'featured' => true,
                'sort_order' => 3,
            ],
            [
                'slug' => 'amsterdam',
                'name' => 'Shophouse Amsterdam',
                'cluster' => 'Amsterdam',
                'cluster_type' => 'Commercial',
                'status' => ProjectStatus::Planned,
                'phase' => 'Perencanaan Masterplan — Registrasi Investor Awal',
                'price_range' => 'Pre-launch — Hubungi Marketing',
                'image' => '/assets/stellar_avenue.webp',
                'image_alt' => 'Shophouse Amsterdam, rencana pengembangan',
                'gallery' => [
                    '/assets/stellar_avenue.webp',
                    '/assets/stellar_avenue-828.webp',
                ],
                'excerpt' => 'Ruko premium dengan frontage boulevard utama — dirancang untuk F&B, retail lifestyle, dan bisnis high-traffic.',
                'description' => 'Amankan posisi Anda di koridor komersial generasi berikutnya Grand Kota Bintang. Shophouse Amsterdam akan menghadirkan frontage langsung ke boulevard utama superblock dengan desain arsitektur yang selaras dengan ekosistem retail & F&B premium. Saat ini dalam tahap perencanaan masterplan dan studi kelayakan unit mix. Investor awal mendapat prioritas informasi price list, denah unit, dan simulasi ROI sebelum peluncuran resmi.',
                'highlights' => [
                    'Frontage boulevard utama',
                    'Target segmen F&B & retail lifestyle',
                    'Registrasi minat dibuka untuk investor awal',
                    'Terhubung jaringan tol JORR & Becakayu',
                ],
                'specifications' => [
                    'Pondasi' => 'Perencanaan Tiang Pancang (Studi Geoteknik)',
                    'Struktur' => 'Beton Bertulang K-300 (Target Kapasitas Komersial)',
                    'Listrik' => '4.400 VA (Rencana Daya Bisnis)',
                    'Air' => 'Utilitas PDAM & Ground Tank Terpadu',
                ],
                'cluster_anchor' => null,
                'featured' => false,
                'sort_order' => 4,
            ],
            [
                'slug' => 'gkb-masterplan',
                'name' => 'Grand Kota Bintang Superblock',
                'cluster' => 'GKB',
                'cluster_type' => 'Mixed-Use',
                'status' => ProjectStatus::Developing,
                'phase' => 'Pengembangan Bertahap Multi-Klaster',
                'price_range' => 'Konsultasi Masterplan & Unit Mix',
                'image' => '/assets/stellar_avenue.webp',
                'image_alt' => 'Masterplan Grand Kota Bintang Superblock',
                'gallery' => [
                    '/assets/stellar_avenue.webp',
                    '/assets/cluster_marocco.webp',
                    '/assets/stellar_avenue-1024.webp',
                ],
                'excerpt' => 'Kawasan terpadu hunian, komersial, dan fasilitas sosial — visi kota mandiri modern Bekasi Barat dengan akses tol 0 km.',
                'description' => 'Investasi di skala kawasan, bukan sekadar satu unit. Grand Kota Bintang adalah superblock terpadu hunian, komersial, dan fasilitas sosial di koridor Jakasampurna, Bekasi Barat. Pengembangan dilakukan bertahap dengan visi kawasan mandiri yang terhubung langsung ke jaringan tol JORR dan Becakayu. Cocok bagi developer, investor institusi, dan pembeli yang ingin memahami roadmap lengkap klaster, infrastruktur, dan potensi apresiasi jangka panjang.',
                'highlights' => [
                    'Multi-klaster hunian & komersial',
                    'Fasilitas sosial & kawasan hijau',
                    'Akses 0 km ke pintu tol',
                    'Ekosistem captive market berkembang',
                ],
                'specifications' => [
                    'Kawasan' => 'Superblock Mixed-Use Terpadu',
                    'Infrastruktur' => 'Jalan Boulevards, Utilitas Bawah Tanah (Bertahap)',
                    'Akses' => 'JORR & Tol Becakayu (0 km)',
                    'Fasilitas' => 'Area Komersial, Hunian, & Sosial Terintegrasi',
                ],
                'cluster_anchor' => '#about',
                'featured' => false,
                'sort_order' => 5,
            ],
        ];

        foreach ($projects as $data) {
            $cluster = Cluster::query()->where('name', $data['cluster'])->first();
            if ($cluster !== null) {
                $data['cluster_id'] = $cluster->id;
            }

            Project::query()->updateOrCreate(
                ['slug' => $data['slug']],
                $data,
            );
        }
    }
}

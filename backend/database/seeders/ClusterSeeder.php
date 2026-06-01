<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\SiteBlockStatus;
use App\Models\Cluster;
use Illuminate\Database\Seeder;

class ClusterSeeder extends Seeder
{
    public function run(): void
    {
        $clusters = [
            [
                'slug' => 'marocco',
                'name' => 'Marocco',
                'title' => 'Cluster Marocco Townhouses',
                'badge' => 'Residential',
                'image' => '/assets/cluster_marocco.webp',
                'image_alt' => 'Cluster Marocco Modern Luxury Townhouses',
                'price_label' => 'Mulai Rp 1.8 Miliar',
                'excerpt' => 'Rumah tinggal tropis modern 2 lantai dengan fasad mewah batu alam, jendela panorama besar, dan tata ruang luas yang memaksimalkan sirkulasi udara.',
                'description' => 'Cluster Marocco adalah hunian tropis modern 2 lantai dengan fasad batu alam dan tata ruang lapang. Lihat denah site plan untuk ketersediaan unit per blok.',
                'specs' => [
                    ['icon' => 'fa-solid fa-bed', 'label' => '3+1 Kamar'],
                    ['icon' => 'fa-solid fa-bath', 'label' => '3 Kamar Mandi'],
                    ['icon' => 'fa-solid fa-car-side', 'label' => '2 Carport'],
                ],
                'hover_cta' => [
                    'icon' => 'fa-solid fa-vr-cardboard',
                    'label' => 'Tur 3D',
                    'href' => '/klaster/marocco?tour=1',
                ],
                'cta' => [
                    'label' => 'Minta Price List',
                    'href' => '/#contact',
                ],
                'site_plan_image' => '/assets/cluster_marocco.webp',
                'site_plan_blocks' => [
                    ['id' => 'm-a1', 'label' => 'Blok A1', 'status' => SiteBlockStatus::Available->value, 'x' => 8, 'y' => 18, 'width' => 24, 'height' => 20],
                    ['id' => 'm-a2', 'label' => 'Blok A2', 'status' => SiteBlockStatus::Reserved->value, 'x' => 34, 'y' => 18, 'width' => 24, 'height' => 20],
                    ['id' => 'm-b1', 'label' => 'Blok B1', 'status' => SiteBlockStatus::Sold->value, 'x' => 8, 'y' => 42, 'width' => 24, 'height' => 20],
                    ['id' => 'm-b2', 'label' => 'Blok B2', 'status' => SiteBlockStatus::Available->value, 'x' => 34, 'y' => 42, 'width' => 24, 'height' => 20],
                    ['id' => 'm-c1', 'label' => 'Blok C1', 'status' => SiteBlockStatus::Available->value, 'x' => 62, 'y' => 28, 'width' => 28, 'height' => 28],
                ],
                'sort_order' => 1,
                'featured' => true,
            ],
            [
                'slug' => 'stellar',
                'name' => 'Stellar',
                'title' => 'Stellar Avenue Commercial',
                'badge' => 'Commercial',
                'image' => '/assets/stellar_avenue.webp',
                'image_alt' => 'Stellar Avenue Modern Retail Shophouses',
                'price_label' => 'Mulai Rp 2.9 Miliar',
                'excerpt' => 'Pusat gaya hidup dan bisnis kuliner berkonsep terbuka (alfresco) dengan aliran air dan taman hijau. Lokasi strategis dengan potensi kunjungan tinggi.',
                'description' => 'Stellar Avenue menghadirkan koridor komersial premium dengan konsep alfresco. Site plan menampilkan ketersediaan ruko per blok.',
                'specs' => [
                    ['icon' => 'fa-solid fa-store', 'label' => '3 Lantai'],
                    ['icon' => 'fa-solid fa-square', 'label' => 'Luas 180 m²'],
                    ['icon' => 'fa-solid fa-circle-p', 'label' => 'Area Parkir Luas'],
                ],
                'hover_cta' => [
                    'icon' => 'fa-solid fa-file-invoice-dollar',
                    'label' => 'Tanya Unit',
                    'href' => '/#contact',
                ],
                'cta' => [
                    'label' => 'Minta Brosur Ruko',
                    'href' => '/#contact',
                ],
                'site_plan_image' => '/assets/stellar_avenue.webp',
                'site_plan_blocks' => [
                    ['id' => 's-1', 'label' => 'Unit 1-4', 'status' => SiteBlockStatus::Available->value, 'x' => 10, 'y' => 22, 'width' => 35, 'height' => 22],
                    ['id' => 's-2', 'label' => 'Unit 5-8', 'status' => SiteBlockStatus::Reserved->value, 'x' => 48, 'y' => 22, 'width' => 35, 'height' => 22],
                    ['id' => 's-3', 'label' => 'Unit 9-12', 'status' => SiteBlockStatus::Sold->value, 'x' => 28, 'y' => 50, 'width' => 40, 'height' => 24],
                ],
                'sort_order' => 2,
                'featured' => true,
            ],
            [
                'slug' => 'roma',
                'name' => 'Roma',
                'title' => 'Cluster Roma Residence',
                'badge' => 'Residential',
                'image' => '/assets/cluster_marocco.webp',
                'image_alt' => 'Cluster Roma Residence',
                'price_label' => 'Segera Hadir',
                'excerpt' => 'Konsep hunian keluarga dengan ruang hijau terintegrasi, dalam pengembangan.',
                'description' => null,
                'specs' => [
                    ['icon' => 'fa-solid fa-tree', 'label' => 'Kawasan Hijau'],
                ],
                'hover_cta' => [
                    'icon' => 'fa-solid fa-envelope',
                    'label' => 'Daftar Minat',
                    'href' => '/#contact',
                ],
                'cta' => [
                    'label' => 'Hubungi Sales',
                    'href' => '/#contact',
                ],
                'site_plan_image' => null,
                'site_plan_blocks' => null,
                'sort_order' => 3,
                'featured' => false,
            ],
            [
                'slug' => 'amsterdam',
                'name' => 'Amsterdam',
                'title' => 'Shophouse Amsterdam',
                'badge' => 'Commercial',
                'image' => '/assets/stellar_avenue.webp',
                'image_alt' => 'Shophouse Amsterdam',
                'price_label' => 'Akan Datang',
                'excerpt' => 'Ruko premium dengan akses boulevard utama, tahap perencanaan.',
                'description' => null,
                'specs' => [
                    ['icon' => 'fa-solid fa-store', 'label' => 'Ruko Premium'],
                ],
                'hover_cta' => [
                    'icon' => 'fa-solid fa-envelope',
                    'label' => 'Daftar Minat',
                    'href' => '/#contact',
                ],
                'cta' => [
                    'label' => 'Hubungi Sales',
                    'href' => '/#contact',
                ],
                'site_plan_image' => null,
                'site_plan_blocks' => null,
                'sort_order' => 4,
                'featured' => false,
            ],
        ];

        foreach ($clusters as $data) {
            Cluster::query()->updateOrCreate(
                ['slug' => $data['slug']],
                $data,
            );
        }
    }
}

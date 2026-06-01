<?php

declare(strict_types=1);

namespace App\Support;

final class FontAwesomeIcons
{
    /**
     * @return list<array{value: string, label: string, keywords: list<string>}>
     */
    public static function all(?string $includeValue = null): array
    {
        $icons = self::catalog();

        if (filled($includeValue) && ! collect($icons)->contains('value', $includeValue)) {
            $icons[] = [
                'value' => $includeValue,
                'label' => self::labelFromClass($includeValue),
                'keywords' => [self::glyphName($includeValue)],
            ];
        }

        return $icons;
    }

    /**
     * @return list<array{value: string, label: string, keywords: list<string>}>
     */
    private static function catalog(): array
    {
        return [
            ['value' => 'fa-solid fa-bed', 'label' => 'Kamar tidur', 'keywords' => ['bed', 'kamar', 'tidur']],
            ['value' => 'fa-solid fa-bath', 'label' => 'Kamar mandi', 'keywords' => ['bath', 'mandi', 'shower']],
            ['value' => 'fa-solid fa-car-side', 'label' => 'Mobil / carport', 'keywords' => ['car', 'parkir', 'garasi']],
            ['value' => 'fa-solid fa-car', 'label' => 'Mobil', 'keywords' => ['car', 'kendaraan']],
            ['value' => 'fa-solid fa-circle-p', 'label' => 'Parkir', 'keywords' => ['parking', 'parkir']],
            ['value' => 'fa-solid fa-store', 'label' => 'Toko / ruko', 'keywords' => ['store', 'ruko', 'commercial']],
            ['value' => 'fa-solid fa-building', 'label' => 'Gedung', 'keywords' => ['building', 'bangunan']],
            ['value' => 'fa-solid fa-building-user', 'label' => 'Proyek', 'keywords' => ['project', 'proyek']],
            ['value' => 'fa-solid fa-building-shield', 'label' => 'Keamanan', 'keywords' => ['security', 'aman']],
            ['value' => 'fa-solid fa-house', 'label' => 'Rumah', 'keywords' => ['house', 'home', 'rumah']],
            ['value' => 'fa-solid fa-house-chimney', 'label' => 'Hunian', 'keywords' => ['home', 'residential']],
            ['value' => 'fa-solid fa-tree', 'label' => 'Pohon / hijau', 'keywords' => ['tree', 'green', 'taman']],
            ['value' => 'fa-solid fa-leaf', 'label' => 'Daun / eco', 'keywords' => ['leaf', 'eco', 'hijau']],
            ['value' => 'fa-solid fa-water', 'label' => 'Air / kolam', 'keywords' => ['water', 'pool', 'kolam']],
            ['value' => 'fa-solid fa-person-swimming', 'label' => 'Kolam renang', 'keywords' => ['swim', 'pool']],
            ['value' => 'fa-solid fa-dumbbell', 'label' => 'Gym / fitness', 'keywords' => ['gym', 'fitness']],
            ['value' => 'fa-solid fa-utensils', 'label' => 'Restoran / makan', 'keywords' => ['food', 'dining', 'kuliner']],
            ['value' => 'fa-solid fa-mug-hot', 'label' => 'Kafe', 'keywords' => ['cafe', 'coffee']],
            ['value' => 'fa-solid fa-film', 'label' => 'Bioskop / hiburan', 'keywords' => ['cinema', 'film']],
            ['value' => 'fa-solid fa-bag-shopping', 'label' => 'Belanja / mall', 'keywords' => ['mall', 'shopping']],
            ['value' => 'fa-solid fa-hospital', 'label' => 'Rumah sakit', 'keywords' => ['hospital', 'kesehatan']],
            ['value' => 'fa-solid fa-school', 'label' => 'Sekolah', 'keywords' => ['school', 'pendidikan']],
            ['value' => 'fa-solid fa-graduation-cap', 'label' => 'Pendidikan', 'keywords' => ['education', 'university']],
            ['value' => 'fa-solid fa-road', 'label' => 'Jalan / akses', 'keywords' => ['road', 'jalan', 'tol']],
            ['value' => 'fa-solid fa-route', 'label' => 'Rute', 'keywords' => ['route', 'arah']],
            ['value' => 'fa-solid fa-train-subway', 'label' => 'Kereta / MRT', 'keywords' => ['train', 'transit']],
            ['value' => 'fa-solid fa-plane', 'label' => 'Bandara', 'keywords' => ['airport', 'pesawat']],
            ['value' => 'fa-solid fa-map-location-dot', 'label' => 'Lokasi', 'keywords' => ['location', 'map', 'lokasi']],
            ['value' => 'fa-solid fa-location-dot', 'label' => 'Pin lokasi', 'keywords' => ['pin', 'address']],
            ['value' => 'fa-solid fa-compass', 'label' => 'Arah / orientasi', 'keywords' => ['compass', 'arah']],
            ['value' => 'fa-solid fa-ruler-combined', 'label' => 'Luas / ukuran', 'keywords' => ['size', 'luas', 'meter']],
            ['value' => 'fa-solid fa-maximize', 'label' => 'Luas bangunan', 'keywords' => ['area', 'expand']],
            ['value' => 'fa-solid fa-square', 'label' => 'Persegi / luas', 'keywords' => ['square', 'meter']],
            ['value' => 'fa-solid fa-layer-group', 'label' => 'Lantai / tipe', 'keywords' => ['floor', 'lantai', 'layer']],
            ['value' => 'fa-solid fa-stairs', 'label' => 'Tangga', 'keywords' => ['stairs', 'lantai']],
            ['value' => 'fa-solid fa-elevator', 'label' => 'Lift', 'keywords' => ['elevator', 'lift']],
            ['value' => 'fa-solid fa-door-open', 'label' => 'Pintu / unit', 'keywords' => ['door', 'unit']],
            ['value' => 'fa-solid fa-key', 'label' => 'Kunci / serah terima', 'keywords' => ['key', 'handover']],
            ['value' => 'fa-solid fa-shield-halved', 'label' => 'Perlindungan', 'keywords' => ['shield', 'aman']],
            ['value' => 'fa-solid fa-hard-hat', 'label' => 'Konstruksi', 'keywords' => ['construction', 'progres']],
            ['value' => 'fa-solid fa-hammer', 'label' => 'Renovasi', 'keywords' => ['hammer', 'build']],
            ['value' => 'fa-solid fa-circle-check', 'label' => 'Selesai / siap', 'keywords' => ['done', 'ready', 'check']],
            ['value' => 'fa-solid fa-clock', 'label' => 'Waktu / progres', 'keywords' => ['time', 'clock', 'soon']],
            ['value' => 'fa-solid fa-calendar', 'label' => 'Jadwal', 'keywords' => ['calendar', 'date']],
            ['value' => 'fa-solid fa-percent', 'label' => 'Persen / promo', 'keywords' => ['percent', 'diskon']],
            ['value' => 'fa-solid fa-tags', 'label' => 'Harga / promo', 'keywords' => ['price', 'tag', 'promo']],
            ['value' => 'fa-solid fa-file-invoice-dollar', 'label' => 'Penawaran / invoice', 'keywords' => ['invoice', 'harga', 'offer']],
            ['value' => 'fa-solid fa-coins', 'label' => 'Investasi', 'keywords' => ['money', 'coin', 'invest']],
            ['value' => 'fa-solid fa-calculator', 'label' => 'Kalkulator / KPR', 'keywords' => ['kpr', 'calculator']],
            ['value' => 'fa-solid fa-handshake', 'label' => 'Kerja sama', 'keywords' => ['deal', 'partnership']],
            ['value' => 'fa-solid fa-envelope', 'label' => 'Email / kontak', 'keywords' => ['email', 'mail', 'kontak']],
            ['value' => 'fa-solid fa-phone', 'label' => 'Telepon', 'keywords' => ['phone', 'call', 'wa']],
            ['value' => 'fa-solid fa-headset', 'label' => 'Sales / support', 'keywords' => ['support', 'sales']],
            ['value' => 'fa-solid fa-user', 'label' => 'Pengguna', 'keywords' => ['user', 'person']],
            ['value' => 'fa-solid fa-users', 'label' => 'Keluarga', 'keywords' => ['family', 'users']],
            ['value' => 'fa-solid fa-globe', 'label' => 'Website', 'keywords' => ['web', 'global']],
            ['value' => 'fa-solid fa-vr-cardboard', 'label' => 'Virtual tour', 'keywords' => ['vr', 'virtual', '3d']],
            ['value' => 'fa-solid fa-cube', 'label' => '3D', 'keywords' => ['3d', 'cube']],
            ['value' => 'fa-solid fa-play', 'label' => 'Putar video', 'keywords' => ['play', 'video']],
            ['value' => 'fa-solid fa-clapperboard', 'label' => 'Video', 'keywords' => ['video', 'film']],
            ['value' => 'fa-solid fa-image', 'label' => 'Gambar', 'keywords' => ['image', 'photo']],
            ['value' => 'fa-solid fa-camera', 'label' => 'Kamera', 'keywords' => ['camera', 'foto']],
            ['value' => 'fa-solid fa-star', 'label' => 'Bintang / unggulan', 'keywords' => ['star', 'premium']],
            ['value' => 'fa-solid fa-gem', 'label' => 'Premium', 'keywords' => ['gem', 'luxury', 'emas']],
            ['value' => 'fa-solid fa-award', 'label' => 'Penghargaan', 'keywords' => ['award', 'prestasi']],
            ['value' => 'fa-solid fa-certificate', 'label' => 'Sertifikat', 'keywords' => ['certificate', 'legal']],
            ['value' => 'fa-solid fa-arrow-right', 'label' => 'Panah kanan', 'keywords' => ['arrow', 'next']],
            ['value' => 'fa-solid fa-chevron-right', 'label' => 'Chevron kanan', 'keywords' => ['chevron', 'next']],
            ['value' => 'fa-solid fa-arrow-down', 'label' => 'Panah bawah', 'keywords' => ['arrow', 'down']],
            ['value' => 'fa-solid fa-hand-pointer', 'label' => 'Klik / interaksi', 'keywords' => ['click', 'pointer']],
            ['value' => 'fa-solid fa-paper-plane', 'label' => 'Kirim', 'keywords' => ['send', 'submit']],
            ['value' => 'fa-solid fa-check', 'label' => 'Centang', 'keywords' => ['check', 'yes']],
            ['value' => 'fa-solid fa-circle-info', 'label' => 'Info', 'keywords' => ['info', 'information']],
            ['value' => 'fa-solid fa-circle-exclamation', 'label' => 'Peringatan', 'keywords' => ['warning', 'alert']],
            ['value' => 'fa-solid fa-filter', 'label' => 'Filter', 'keywords' => ['filter']],
            ['value' => 'fa-solid fa-mobile-screen', 'label' => 'Mobile', 'keywords' => ['mobile', 'hp']],
            ['value' => 'fa-solid fa-wifi', 'label' => 'WiFi', 'keywords' => ['wifi', 'internet']],
            ['value' => 'fa-solid fa-bolt', 'label' => 'Listrik', 'keywords' => ['electric', 'power']],
            ['value' => 'fa-solid fa-fire', 'label' => 'Dapur / gas', 'keywords' => ['kitchen', 'fire']],
            ['value' => 'fa-solid fa-snowflake', 'label' => 'AC / dingin', 'keywords' => ['ac', 'cool']],
            ['value' => 'fa-solid fa-sun', 'label' => 'Matahari', 'keywords' => ['sun', 'bright']],
            ['value' => 'fa-solid fa-moon', 'label' => 'Malam', 'keywords' => ['moon', 'night']],
            ['value' => 'fa-solid fa-child', 'label' => 'Anak / playground', 'keywords' => ['child', 'playground']],
            ['value' => 'fa-solid fa-paw', 'label' => 'Hewan / pet friendly', 'keywords' => ['pet', 'dog']],
            ['value' => 'fa-solid fa-wheelchair', 'label' => 'Akses difabel', 'keywords' => ['wheelchair', 'accessible']],
            ['value' => 'fa-solid fa-mosque', 'label' => 'Masjid', 'keywords' => ['mosque', 'ibadah']],
            ['value' => 'fa-solid fa-church', 'label' => 'Gereja', 'keywords' => ['church']],
            ['value' => 'fa-solid fa-landmark', 'label' => 'Landmark', 'keywords' => ['landmark', 'iconic']],
        ];
    }

    private static function labelFromClass(string $class): string
    {
        $glyph = self::glyphName($class);

        return $glyph !== ''
            ? ucwords(str_replace('-', ' ', $glyph))
            : $class;
    }

    private static function glyphName(string $class): string
    {
        if (preg_match('/fa-(?:solid|regular|brands)\s+fa-([a-z0-9-]+)/', $class, $matches) === 1) {
            return $matches[1];
        }

        return '';
    }
}

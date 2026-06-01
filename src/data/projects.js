/** Status proyek: label dipakai di UI filter & badge kartu. */
export const PROJECT_STATUS = {
  live: {
    id: 'live',
    label: 'Sudah Dikembangkan',
    badgeClass: 'bg-emerald-700/90 text-white',
    icon: 'fa-solid fa-circle-check',
  },
  developing: {
    id: 'developing',
    label: 'Dalam Pengembangan',
    badgeClass: 'bg-secondary text-primary',
    icon: 'fa-solid fa-hard-hat',
  },
  planned: {
    id: 'planned',
    label: 'Akan Datang',
    badgeClass: 'bg-primary/80 text-white',
    icon: 'fa-solid fa-clock',
  },
};

export const PROJECT_FILTERS = [
  { id: 'all', label: 'Semua' },
  { id: 'live', label: PROJECT_STATUS.live.label },
  { id: 'developing', label: PROJECT_STATUS.developing.label },
  { id: 'planned', label: PROJECT_STATUS.planned.label },
];

/**
 * Daftar proyek Grand Kota Bintang (fallback statis).
 * `slug` dipakai di URL `/projek/:slug`. Nanti dari API Filament (`src/api/projects.js`).
 */
export const PROJECTS = [
  {
    id: 'marocco',
    slug: 'marocco',
    clusterSlug: 'marocco',
    featured: true,
    name: 'Cluster Marocco Townhouses',
    cluster: 'Marocco',
    clusterType: 'Residential',
    status: 'live',
    phase: 'Tahap 1: Ready Stock Terbatas',
    priceRange: 'Mulai Rp 1,8 Miliar',
    image: '/assets/cluster_marocco.webp',
    imageAlt: 'Cluster Marocco Townhouses Grand Kota Bintang',
    gallery: ['/assets/cluster_marocco.webp', '/assets/stellar_avenue.webp'],
    excerpt:
      'Hunian tropis modern 2 lantai dengan privasi klaster — siap huni di koridor hunian flagship Grand Kota Bintang.',
    description:
      'Miliki rumah tropis modern yang dirancang untuk keluarga urban cerdas. Cluster Marocco menghadirkan town house 2 lantai dengan fasad batu alam, jendela panorama, dan tata ruang lapang yang memaksimalkan sirkulasi udara alami. Nikmati privasi blok terjaga tanpa kehilangan akses langsung ke boulevard utama, amenitas superblock, dan jaringan tol Bekasi Barat. Amankan unit ready stock terbatas Anda sebelum harga naik di tahap berikutnya.',
    highlights: [
      '3+1 kamar tidur & 3 kamar mandi',
      '2 carport & area service',
      'Akses langsung ke boulevard utama GKB',
      'Tur virtual 3D tersedia',
    ],
    specifications: {
      Pondasi: 'Tiang Pancang / Mini Pile & Beton Bertulang',
      Dinding: 'Bata Merah Double Wall, Plester, Aci & Cat Weathercoat',
      Lantai: 'Homogeneous Tile 80×80 Premium (Ruang Utama)',
      Sanitair: 'TOTO / Setara (Eco-Washer & Glass Shower Screen)',
      Listrik: '2.200 VA (Sistem Kabel Bawah Tanah)',
      Air: 'PDAM Bersih dengan Ground Tank & Pompa Booster',
    },
    clusterAnchor: '/klaster',
  },
  {
    id: 'stellar',
    slug: 'stellar',
    clusterSlug: 'stellar',
    featured: true,
    name: 'Stellar Avenue Commercial',
    cluster: 'Stellar',
    clusterType: 'Commercial',
    status: 'live',
    phase: 'Investasi Komersial Terlaris — Akses Tol JORR 0 KM',
    priceRange: 'Mulai Rp 2,9 Miliar',
    image: '/assets/stellar_avenue.webp',
    imageAlt: 'Stellar Avenue Shophouse Grand Kota Bintang',
    gallery: [
      '/assets/stellar_avenue.webp',
      '/assets/stellar_avenue-1024.webp',
      '/assets/cluster_marocco.webp',
    ],
    excerpt:
      'Miliki ruang usaha alfresco premium dengan captive market 5.000+ residen aktif di koridor utama superblock.',
    description:
      'Jadikan bisnis Anda pusat perhatian di Bekasi Barat. Stellar Avenue menghadirkan konsep komersial alfresco dining pertama di koridor utama superblock Grand Kota Bintang. Dikelilingi landscape hijau dan aliran air dekoratif yang menenangkan, kawasan ini dirancang khusus untuk menarik foot traffic tinggi setiap harinya. Sangat ideal untuk ekspansi F&B premium, retail lifestyle, maupun kantor representatif Anda. Amankan unit strategis Anda sebelum kehabisan.',
    highlights: [
      'Ruko 3 lantai ±180 m²',
      'Area parkir luas & akses kendaraan mudah',
      'Potensi kunjungan tinggi dari residensial sekitar',
      'Dekat amenitas dan akses tol',
    ],
    specifications: {
      Pondasi: 'Tiang Pancang Beton Bertulang Kuat',
      Struktur: 'Beton Bertulang K-300 (Kapasitas Beban Tinggi)',
      Dinding: 'Bata Ringan Double Wall, Plester Aci & Cat Eksterior Premium',
      Lantai: 'Homogeneous Tile 60×60 & Keramik Anti-Slip (Kamar Mandi)',
      Listrik: '4.400 VA (Kapasitas Daya Bisnis/Ruko)',
      Air: 'PDAM Bersih dengan Ground Tank & Pompa Air Otomatis',
    },
    clusterAnchor: '/klaster',
  },
  {
    id: 'roma',
    slug: 'roma',
    clusterSlug: 'roma',
    featured: true,
    name: 'Cluster Roma Residence',
    cluster: 'Roma',
    clusterType: 'Residential',
    status: 'developing',
    phase: 'Pre-launch — Daftar Minat Prioritas',
    priceRange: 'Info Harga Segera Hadir',
    image: '/assets/cluster_marocco.webp',
    imageAlt: 'Cluster Roma Residence, dalam pengembangan',
    gallery: ['/assets/cluster_marocco.webp', '/assets/stellar_avenue.webp'],
    excerpt:
      'Hunian keluarga berorientasi hijau dengan privasi blok — terintegrasi penuh dalam masterplan Grand Kota Bintang.',
    description:
      'Wujudkan gaya hidup keluarga yang tenang tanpa jauh dari kota. Cluster Roma dirancang sebagai hunian keluarga dengan ruang hijau terintegrasi di dalam blok residential Grand Kota Bintang. Fase pengembangan saat ini fokus pada infrastruktur jalan dalam klaster, utilitas, dan landscape publik yang mendukung kenyamanan jangka panjang. Daftarkan minat Anda sekarang untuk mendapatkan prioritas informasi unit, simulasi KPR, dan jadwal preview eksklusif.',
    highlights: [
      'Konsep hunian keluarga berorientasi hijau',
      'Privasi blok terjaga',
      'Terintegrasi masterplan GKB',
      'Akses amenitas superblock & tol',
    ],
    specifications: {
      Pondasi: 'Tiang Pancang & Beton Bertulang (Standar GKB)',
      Dinding: 'Bata Ringan Double Wall & Finishing Premium',
      Lantai: 'Homogeneous Tile Area Utama',
      Listrik: '2.200 VA (Rencana Utilitas Bawah Tanah)',
      Air: 'PDAM Bersih & Ground Tank Terintegrasi',
    },
  },
  {
    id: 'amsterdam',
    slug: 'amsterdam',
    clusterSlug: 'amsterdam',
    featured: false,
    name: 'Shophouse Amsterdam',
    cluster: 'Amsterdam',
    clusterType: 'Commercial',
    status: 'planned',
    phase: 'Perencanaan Masterplan — Registrasi Investor Awal',
    priceRange: 'Pre-launch — Hubungi Marketing',
    image: '/assets/stellar_avenue.webp',
    imageAlt: 'Shophouse Amsterdam, rencana pengembangan',
    gallery: ['/assets/stellar_avenue.webp', '/assets/stellar_avenue-828.webp'],
    excerpt:
      'Ruko premium dengan frontage boulevard utama — dirancang untuk F&B, retail lifestyle, dan bisnis high-traffic.',
    description:
      'Amankan posisi Anda di koridor komersial generasi berikutnya Grand Kota Bintang. Shophouse Amsterdam akan menghadirkan frontage langsung ke boulevard utama superblock dengan desain arsitektur yang selaras dengan ekosistem retail & F&B premium. Saat ini dalam tahap perencanaan masterplan dan studi kelayakan unit mix. Investor awal mendapat prioritas informasi price list, denah unit, dan simulasi ROI sebelum peluncuran resmi.',
    highlights: [
      'Frontage boulevard utama',
      'Target segmen F&B & retail lifestyle',
      'Registrasi minat dibuka untuk investor awal',
      'Terhubung jaringan tol JORR & Becakayu',
    ],
    specifications: {
      Pondasi: 'Perencanaan Tiang Pancang (Studi Geoteknik)',
      Struktur: 'Beton Bertulang K-300 (Target Kapasitas Komersial)',
      Listrik: '4.400 VA (Rencana Daya Bisnis)',
      Air: 'Utilitas PDAM & Ground Tank Terpadu',
    },
  },
  {
    id: 'gkb-masterplan',
    slug: 'gkb-masterplan',
    featured: false,
    name: 'Grand Kota Bintang Superblock',
    cluster: 'GKB',
    clusterType: 'Mixed-Use',
    status: 'developing',
    phase: 'Pengembangan Bertahap Multi-Klaster',
    priceRange: 'Konsultasi Masterplan & Unit Mix',
    image: '/assets/stellar_avenue.webp',
    imageAlt: 'Masterplan Grand Kota Bintang Superblock',
    gallery: [
      '/assets/stellar_avenue.webp',
      '/assets/cluster_marocco.webp',
      '/assets/stellar_avenue-1024.webp',
    ],
    excerpt:
      'Kawasan terpadu hunian, komersial, dan fasilitas sosial — visi kota mandiri modern Bekasi Barat dengan akses tol 0 km.',
    description:
      'Investasi di skala kawasan, bukan sekadar satu unit. Grand Kota Bintang adalah superblock terpadu hunian, komersial, dan fasilitas sosial di koridor Jakasampurna, Bekasi Barat. Pengembangan dilakukan bertahap dengan visi kawasan mandiri yang terhubung langsung ke jaringan tol JORR dan Becakayu. Cocok bagi developer, investor institusi, dan pembeli yang ingin memahami roadmap lengkap klaster, infrastruktur, dan potensi apresiasi jangka panjang.',
    highlights: [
      'Multi-klaster hunian & komersial',
      'Fasilitas sosial & kawasan hijau',
      'Akses 0 km ke pintu tol',
      'Ekosistem captive market berkembang',
    ],
    specifications: {
      Kawasan: 'Superblock Mixed-Use Terpadu',
      Infrastruktur: 'Jalan Boulevards, Utilitas Bawah Tanah (Bertahap)',
      Akses: 'JORR & Tol Becakayu (0 km)',
      Fasilitas: 'Area Komersial, Hunian, & Sosial Terintegrasi',
    },
    clusterAnchor: '#about',
  },
];

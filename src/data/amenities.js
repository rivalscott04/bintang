/*
 * Filter pills grouped to keep the UI to 4 actionable buckets (instead of one
 * pill per `category`). Each pill maps to a set of underlying category ids that
 * the list/map filter resolves against. `categories: null` means "show all".
 */
export const AMENITY_CATEGORIES = [
  { id: 'all', icon: 'fa-solid fa-globe', label: 'Semua Lokasi', categories: null },
  {
    id: 'lifestyle-group',
    icon: 'fa-solid fa-utensils',
    label: 'Kuliner & Lifestyle',
    categories: ['dining', 'lifestyle', 'hotel', 'mall'],
  },
  {
    id: 'access-group',
    icon: 'fa-solid fa-route',
    label: 'Akses Transportasi',
    categories: ['tol', 'trans'],
  },
  {
    id: 'public-group',
    icon: 'fa-solid fa-graduation-cap',
    label: 'Pendidikan & Kesehatan',
    categories: ['edu', 'med'],
  },
];

export const CATEGORY_STYLE = {
  dining: { bg: '#EA580C', border: '#FB923C', faIcon: 'fa-solid fa-utensils' },
  lifestyle: { bg: '#0891B2', border: '#22D3EE', faIcon: 'fa-solid fa-film' },
  hotel: { bg: '#9333EA', border: '#C084FC', faIcon: 'fa-solid fa-bed' },
  edu: { bg: '#16A34A', border: '#4ADE80', faIcon: 'fa-solid fa-graduation-cap' },
  tol: { bg: '#1E40AF', border: '#3B82F6', faIcon: 'fa-solid fa-road' },
  trans: { bg: '#7C3AED', border: '#A78BFA', faIcon: 'fa-solid fa-train-subway' },
  mall: { bg: '#DB2777', border: '#F472B6', faIcon: 'fa-solid fa-bag-shopping' },
  med: { bg: '#DC2626', border: '#F87171', faIcon: 'fa-solid fa-hospital' },
};

/*
 * Coordinates sourced from Google Maps screenshot of the GKB block + public POI
 * datasets (Wikipedia, Primaya/Mitra Keluarga sites, flokq POI). Items are
 * ordered from closest (di dalam kawasan) to farthest (konektivitas regional).
 */
export const AMENITY_LOCATIONS = [
  // ───────── Di Dalam / Tepat Sebelah Kawasan ─────────
  {
    name: 'Tekko Grand Kota Bintang',
    lat: -6.2479,
    lng: 106.9557,
    category: 'dining',
    time: 'Akses Langsung — < 3 Menit Jalan Kaki',
    desc: 'Restoran keluarga unggulan di kawasan GKB dengan menu Indonesia favorit, suasana hangat untuk makan siang & dinner bersama keluarga.',
  },
  {
    name: 'Hotel Grand Travello Bekasi',
    lat: -6.2474,
    lng: 106.957,
    category: 'hotel',
    time: 'Akses Langsung — < 3 Menit Jalan Kaki',
    desc: 'Hotel modern tepat di dalam kawasan Grand Kota Bintang — pilihan akomodasi premium bagi tamu keluarga, MICE, maupun bisnis.',
  },
  {
    name: 'Grand Kota Bintang XXI',
    lat: -6.2461,
    lng: 106.9566,
    category: 'lifestyle',
    time: 'Akses Langsung — < 5 Menit Jalan Kaki',
    desc: 'Bioskop Cinema XXI di kawasan GKB dengan teknologi layar terbaru, audio Dolby, dan reguler/Premiere class.',
  },
  {
    name: 'Amanaia Grand Kota Bintang',
    lat: -6.2455,
    lng: 106.9578,
    category: 'dining',
    time: 'Akses Langsung — < 5 Menit Jalan Kaki',
    desc: 'Destinasi kuliner & lifestyle modern di sisi utara kawasan GKB — kumpulan tenant F&B kekinian untuk nongkrong & event.',
  },
  {
    name: 'Toko Kopi TUKU Kota Bintang',
    lat: -6.2456,
    lng: 106.9545,
    category: 'dining',
    time: 'Akses Langsung — < 5 Menit Jalan Kaki',
    desc: 'Outlet Toko Kopi Tuku di Jl. KH. Moh. Tambih, kawasan GKB — kopi susu signature & ruang santai untuk meeting kasual.',
  },
  {
    name: 'Plaza Eatpedia',
    lat: -6.249,
    lng: 106.9543,
    category: 'dining',
    time: 'Jarak Tempuh — 3 Menit',
    desc: 'Pusat kuliner street-food di sisi Jl. Akses Tol Kalimalang, mempersembahkan puluhan tenant F&B dengan konsep open-air.',
  },
  {
    name: 'Global Prestasi School',
    lat: -6.2484,
    lng: 106.9606,
    category: 'edu',
    time: 'Jarak Tempuh — 3 Menit',
    desc: 'Sekolah nasional plus bertaraf internasional (KB–SMA) di sisi timur GKB — kampus modern dengan kurikulum Cambridge & IB.',
  },

  // ───────── Konektivitas Regional ─────────
  {
    name: 'Pintu Tol JORR Kalimalang',
    lat: -6.2543,
    lng: 106.9582,
    category: 'tol',
    time: 'Akses Langsung — 0 Menit',
    desc: 'Gerbang Tol Kalimalang (JORR) tepat di sisi Jl. KH. Noer Ali, memberi GKB akses instan ke seluruh jaringan Tol Lingkar Luar Jakarta.',
  },
  {
    name: 'Pintu Tol Becakayu (Jakasampurna)',
    lat: -6.2462,
    lng: 106.9523,
    category: 'tol',
    time: 'Jarak Tempuh — 5 Menit',
    desc: 'Ujung Tol Becakayu di Jakasampurna menghubungkan koridor Kalimalang hingga Cawang & Kampung Melayu, mempersingkat waktu ke pusat Jakarta.',
  },
  {
    name: 'Stasiun LRT Cikunir 2',
    lat: -6.254512,
    lng: 106.963378,
    category: 'trans',
    time: 'Jarak Tempuh — 5 Menit',
    desc: 'Stasiun LRT Jabodebek terdekat (Jl. Batu Mulia, Jakasampurna) untuk perjalanan bebas macet menuju Dukuh Atas, Kuningan, dan pusat bisnis Jakarta.',
  },
  {
    name: 'Metropolitan Mall Bekasi',
    lat: -6.2503,
    lng: 106.9924,
    category: 'mall',
    time: 'Jarak Tempuh — 10 Menit',
    desc: 'Pusat belanja, bioskop, kuliner, dan hiburan paling populer di koridor Jl. KH. Noer Ali, Pekayon — tenant nasional & internasional lengkap.',
  },
  {
    name: 'Primaya Hospital Bekasi Barat',
    lat: -6.2538,
    lng: 106.9905,
    category: 'med',
    time: 'Jarak Tempuh — 8 Menit',
    desc: 'Rumah sakit terakreditasi JCI di Jl. KH. Noer Ali Kav. 17–18 Kayuringin Jaya — fasilitas modern untuk kebutuhan darurat & rawat jalan keluarga.',
  },
  {
    name: 'RS Mitra Keluarga Bekasi Barat',
    lat: -6.2487,
    lng: 107.001,
    category: 'med',
    time: 'Jarak Tempuh — 12 Menit',
    desc: 'Pusat perawatan medis komprehensif di Jl. Jend. Ahmad Yani Kayuringin Jaya dengan layanan spesialis lengkap & teknologi MRI/CT-Scan.',
  },
];

# Grand Kota Bintang — React App

Landing page premium superblock **Grand Kota Bintang** yang sebelumnya statis (HTML/CSS/JS) sekarang sudah di-rewrite ke **React 18 + Vite** dengan struktur modular agar mudah dimaintain.

## Tech Stack

- **React 18** — UI library
- **Vite 5** — Dev server & build tool
- **Tailwind CSS v4** — Utility-first styling (token-driven via `@theme`)
- **react-leaflet** + **leaflet** — Interactive map (Lokasi & Fasilitas)
- **Font Awesome 6** (via CDN) — Icon set
- **Google Fonts** — Plus Jakarta Sans + Outfit

## Cara Menjalankan (pakai Bun)

> Project ini menggunakan **[Bun](https://bun.sh)** sebagai package manager + runner. Pastikan sudah install bun (`curl -fsSL https://bun.sh/install | bash`).

```bash
# 1. Install dependency
bun install

# 2. Jalankan dev server (otomatis buka http://localhost:5173)
bun run dev

# 3. Build untuk production (output ke folder dist/)
bun run build

# 4. Preview hasil build
bun run preview
```

Script di `package.json` sudah pakai `bunx --bun vite` supaya Vite dijalankan oleh runtime Bun (lebih cepat dibanding Node).

## Struktur Folder

```
grandbintang/
├── public/
│   └── assets/                  # Gambar (logo, cluster, dll.)
├── src/
│   ├── components/
│   │   ├── layout/              # Header, Footer, FloatingWhatsApp, StickyMobileNav
│   │   ├── sections/            # Hero, Clusters, VirtualTour, Amenities, KPR, About, Contact
│   │   └── ui/                  # SectionHeader, Toast (komponen reusable)
│   ├── data/                    # Konten/data terpisah dari UI
│   │   ├── about.js
│   │   ├── amenities.js
│   │   ├── clusters.js
│   │   ├── heroFeatures.js
│   │   ├── navigation.js
│   │   └── stickyNav.js
│   ├── hooks/                   # Custom React hooks
│   │   ├── useMobileMenu.js
│   │   ├── useSmoothScroll.js
│   │   └── useToast.js
│   ├── utils/                   # Pure functions & konstanta
│   │   ├── calculateMortgage.js
│   │   ├── constants.js
│   │   └── formatRupiah.js
│   ├── App.jsx                  # Compose semua section
│   ├── main.jsx                 # Entry point React
│   └── styles.css               # Tailwind import + @theme tokens + leftover CSS
├── index.html
├── vite.config.js
└── package.json
```

## Prinsip Maintainability

1. **Data dipisah dari UI** → Mau ubah price list, lokasi map, daftar amenity, navigasi? Edit di `src/data/*.js` saja, tidak perlu nyentuh komponen.
2. **Logic dipisah dari render** → Rumus KPR, format rupiah, validasi form, mobile menu state — semua di `utils/` dan `hooks/`.
3. **1 section = 1 file** → Setiap section landing page punya komponen sendiri di `components/sections/`.
4. **Reusable UI** → `SectionHeader`, `Toast` dipakai berulang oleh banyak section.
5. **Tailwind utility classes** → Styling inline langsung di JSX. Design token (warna, font, radius, shadow) didefinisikan sekali di `@theme` di `src/styles.css`.

### Cara Mengubah Theme / Brand Color

Edit `src/styles.css` di blok `@theme` — semua utility class akan otomatis ikut berubah:

```css
@theme {
  --color-primary: #0a1931;       /* navy → ganti ke warna brand */
  --color-secondary: #c5a880;     /* gold → ganti ke aksen brand */
  --font-display: "Plus Jakarta Sans", sans-serif;
  --radius-md: 16px;
  /* dll... */
}
```

Token-token ini otomatis jadi utility class: `bg-primary`, `text-secondary`, `border-primary-light`, `font-display`, `rounded-md`, `shadow-glow`, `ease-luxury`, dll.

## Mau Tambah Section / Cluster Baru?

- **Tambah cluster baru:** edit `src/data/clusters.js`, tambahkan object baru di array `CLUSTERS`.
- **Tambah lokasi amenity baru:** edit `src/data/amenities.js`, tambahkan di `AMENITY_LOCATIONS`.
- **Ubah konten Hero:** edit `src/data/heroFeatures.js` atau text di `src/components/sections/Hero.jsx`.
- **Ubah nomor WA / kontak:** edit `src/utils/constants.js`.

## Catatan

- Endpoint form (`onSubmit`) saat ini masih simulasi (`setTimeout`). Untuk koneksi ke backend nyata (mis. Google Sheets, email API, atau CRM), ganti `handleLeadSubmit` di `src/App.jsx`.
- Iframe Virtual Tour 360° menggunakan URL dari `src/utils/constants.js` — bisa diubah ke aset internal kalau perlu.

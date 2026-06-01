# Backend Grand Kota Bintang

Laravel 13 + Filament 4 (admin CMS) + API publik untuk frontend React.

Kode Laravel ada **langsung di folder ini** (bukan subfolder proyek terpisah).

## Persyaratan

- PHP 8.3+
- Composer 2.x
- Ekstensi PHP: `pdo_sqlite` (default dev), `mbstring`, `openssl`, dll.

## Setup cepat

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate:fresh --seed
php artisan storage:link
php artisan serve
```

| URL | Keterangan |
|-----|------------|
| http://localhost:8000/admin | Panel Filament |
| http://localhost:8000/api/clusters | API daftar klaster |
| http://localhost:8000/api/clusters/{slug} | API detail klaster (+ proyek terkait) |
| http://localhost:8000/api/projects | API daftar proyek |
| http://localhost:8000/api/projects/{slug} | API detail proyek |
| http://localhost:8000/api/navigation | API menu navigasi |
| http://localhost:8000/api/contact-settings | Nomor & URL WhatsApp sales |
| http://localhost:8000/api/virtual-tours/default | API tur 3D default (beranda) |

### Login admin Filament

Buka http://localhost:8000/admin lalu masuk dengan:

| Field | Nilai |
|-------|--------|
| **Email** | `admin@grandkotabintang.test` |
| **Password** | `password` |

Belum bisa login? Jalankan ulang seed admin:

```bash
cd backend
php artisan db:seed --class=DatabaseSeeder
```

Atau buat user baru interaktif: `php artisan make:filament-user`

Ganti password segera di production.

### WhatsApp sales (admin)

Menu **Pengaturan → WhatsApp Sales** di Filament: ubah nomor (`628…`) dan pesan default. Frontend membaca `GET /api/contact-settings` (fallback ke `src/utils/constants.js` jika API mati).

## Frontend React

Di root monorepo, buat `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Jalankan `bun run dev`. Data klaster, proyek & menu diambil dari API (fallback ke `src/data/*` jika API kosong).

Halaman klaster: `http://localhost:5173/klaster/marocco`

## API

| Method | Path | Response |
|--------|------|----------|
| `GET` | `/api/clusters` | Array klaster (published, urut `sort_order`) |
| `GET` | `/api/clusters/{slug}` | Satu klaster + proyek terkait, atau `404` |
| `GET` | `/api/projects` | Array proyek (published, urut `sort_order`) |
| `GET` | `/api/projects/{slug}` | Satu proyek atau `404` |
| `GET` | `/api/navigation` | Array `{ to, label }` |
| `GET` | `/api/amenities` | Array pin lokasi `{ name, lat, lng, category, time, desc }` |
| `GET` | `/api/virtual-tours` | Daftar tur virtual |
| `GET` | `/api/virtual-tours/default` | Tur default (published + `is_default`) |
| `GET` | `/api/virtual-tours/{slug}` | Satu tur lengkap |
| `GET` | `/api/contact-settings` | Nomor & URL WhatsApp sales |
| `POST` | `/api/leads` | Simpan lead dari form brosur (throttle 12/menit) |

Bentuk field mengikuti `src/data/clusters.js` & `src/data/projects.js` (camelCase di JSON).

### Lead prospek

Form brosur di halaman proyek dan form kontak beranda memanggil `POST /api/leads` (nama, phone, project_name, `visitor_message` opsional, …) lalu membuka WhatsApp. Di admin: **CRM → Lead Prospek** — manager memfilter, membuka lead, memilih **Sales penanggung jawab**, dan mengubah status.

Pin peta `/lokasi` dikelola di **Konten Website → Peta lokasi**. Tombol **Hubungi via WhatsApp** lewat URL terlacak: sistem mencatat follow-up, status **Didistribusikan → Sudah dihubungi** otomatis, plus riwayat kontak & filter «belum follow-up». Status **Deal** / **Tidak lanjut** tidak ditimpa; hitungan kontak tetap naik.

Akun demo setelah `db:seed`:

| Email | Peran |
|-------|--------|
| `admin@grandkotabintang.test` | Administrator |
| `sales@grandkotabintang.test` | Sales (muncul di dropdown distribusi) |

Tambah tim sales: **Pengaturan → Tim Sales** (nama, email, password).

### Site plan (blok unit)

Field `sitePlanBlocks` pada klaster: array `{ id, label, status, x, y, width, height }`. Posisi & ukuran dalam **persen (0–100)** relatif terhadap gambar `sitePlanImage`. Status: `available`, `reserved`, `sold`.

Kelola di admin: **Klaster** → edit → **Site plan / peta blok** — upload denah, lalu **seret kotak**, **ubah ukuran** (sudut kanan bawah), atau **klik-tarik** di area kosong untuk blok baru. ID, nama, dan status di panel kanan.

### Tur virtual 3D (model GLB)

Per ruangan bisa upload **satu file `.glb`** (Blender / SketchUp) di **Tur Virtual 3D → Ruangan → Model 3D**. Tanpa GLB, tur memakai mode primitif + preset furnitur. Dengan GLB, tampilan realistis; hotspot & kamera tetap dari admin.

## CORS

Origin frontend diatur lewat `.env`:

```env
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Pisahkan beberapa origin dengan koma.

## Arsitektur (Filament guidelines)

Panduan wajib: [`../filament-ai-guidelines/`](../filament-ai-guidelines/)

| Lapisan | Peran |
|---------|--------|
| `app/Http/Controllers/Api/*` | Tipis, hanya memanggil Service |
| `app/Services/*` | Query & aturan bisnis |
| `app/Filament/Resources/*` | CRUD admin, form/table saja |
| `app/Enums/ProjectStatus` | Status proyek |
| `app/Enums/SiteBlockStatus` | Status blok site plan |
| `app/Http/Resources/*` | Transform JSON untuk frontend |

## Admin CMS

| Resource | Fitur |
|----------|--------|
| **Klaster** | CRUD, upload foto & site plan, repeater blok unit, drag urutan |
| **Proyek** | CRUD, relasi klaster, upload foto, drag urutan |
| **Tur Virtual 3D** | CRUD teks beranda, ruangan (furnitur & pintu via form visual), hotspot, waypoint sinematik |
| **Menu navigasi** | CRUD menu header |
| **CRM → Lead Prospek** | Daftar lead, distribusi sales, preview & tombol WA outreach |
| **Pengaturan → Tim Sales** | CRUD sales + template WA outreach per orang |
| **Pengaturan → WhatsApp Sales** | Nomor WA situs, pesan visitor, template outreach default sales |

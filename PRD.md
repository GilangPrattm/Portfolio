# Product Requirement Document (PRD): Personal Developer Portfolio

* **Nama Proyek:** `portfolio`
* **Target Pengguna:** Tech Recruiters, Engineering Leads, Klien, dan Komunitas Developer
* **Pemilik Produk:** Gilang Pratama Putra (Backend & Software Developer)
* **Status Dokumen:** Living Document — Versi 1.0 (Fase 1: Frontend Static & Component Architecture)
* **Dokumen Acuan:** `AGENT.md` (Aturan Kerja & Logika) dan `DESIGN.md` (Spesifikasi Visual & Motion)

---

## 1. Ringkasan Eksekutif & Tujuan Produk

### 1.1 Latar Belakang & Masalah
Portofolio pengembang perangkat lunak sering kali terjebak dalam dua ekstrem: terlalu sederhana tanpa interaktivitas modern, atau menggunakan templat siap pakai berbasis AI (*AI-slop*) dengan gradasi berlebihan dan klaim generik yang tidak mencerminkan kapabilitas teknis sebenarnya. 

Pemilik memiliki keahlian kuat dalam arsitektur backend (PHP/Laravel, Java, MySQL) serta manajemen alur logika sistem. Proyek ini dibangun bukan hanya untuk mempublikasikan karya secara profesional dan terukur, tetapi juga menjadi sarana akselerasi terarah untuk menguasai ekosistem frontend modern (React, TypeScript, Tailwind CSS v4, Framer Motion).

### 1.2 Tujuan Utama (Product Goals)
1. **Identitas & Positioning:** Membangun *positioning* sebagai Backend Developer yang terstruktur, rapi, dan adaptif terhadap teknologi antarmuka modern.
2. **Katalog Proyek Terkurasi:** Mendokumentasikan rekayasa sistem nyata (arsitektur basis data, algoritma terapan, integrasi sistem) secara modular.
3. **Pemisahan Konten & Tampilan (Decoupled Content Layer):** Memastikan penambahan proyek baru di masa mendatang cukup dilakukan pada modul data (`src/data/projects.ts`) tanpa perlu menyentuh komponen visual.
4. **Motion & Interaction Benchmark:** Menghadirkan pengalaman interaksi kelas premium berbasis motion token terpusat dengan performa stabil 60 FPS.

### 1.3 Metrik Keberhasilan (KPIs)
* **Lighthouse Performance Score:** Skor $\ge 90$ untuk Performance, Accessibility, Best Practices, dan SEO di perangkat mobile maupun desktop.
* **Type Safety:** 0 `any` types, 0 TypeScript compile errors dalam mode `strict`.
* **Frame Rate:** Stabilitas animasi pada 60 FPS tanpa *dropped frames* pada pengujian simulasi CPU Throttling 4x.
* **Efisiensi Pengelolaan Konten:** Penambahan satu entri portofolio baru memakan waktu $< 5$ menit hanya dengan memperbarui layer data.

---

## 2. Personas & Kebutuhan Pengguna

| Persona | Perilaku & Kebutuhan Kunci | Fitur Solusi pada Portofolio |
| :--- | :--- | :--- |
| **Tech Recruiter** | Memindai kecocokan stack teknologi dalam 10 detik pertama; membutuhkan navigasi cepat, resume/kontak, dan lokasi. | Hero ringkas, badge ketersediaan (*availability status*), tombol kontak 1-klik, dan ringkasan peran terdefinisi. |
| **Engineering Lead** | Memeriksa kedalaman logika, arsitektur data, arsitektur kode sumber, dan kejujuran kemampuan teknis. | Pemisahan stack inti vs kategori "Sedang Dipelajari", halaman detail proyek mendalam, tautan repositori/demo. |
| **Calon Klien / Mitra** | Memastikan keandalan penyelesaian masalah bisnis dan rekam jejak sistem yang pernah dibangun. | Ringkasan naratif proyek yang jelas: Masalah $\rightarrow$ Peran $\rightarrow$ Solusi Teknis $\rightarrow$ Hasil/Metrik. |

---

## 3. Spesifikasi Fungsional (Feature Specifications)

### 3.1 Navigasi Global (`Navbar` — Gaya Floating Island ala Sean Halpin)
* **Struktur Floating Capsule:** Terapung di tengah atas viewport (`fixed top-3 sm:top-5 inset-x-0 mx-auto w-fit z-50`) dengan bentuk pil bulat (*rounded-full*), bukan batas garis kaku ujung-ke-ujung.
* **Material Glassmorphism:** Latar belakang `bg-cream/75` (atau `bg-cream/90` saat di-scroll) yang dipadukan dengan `backdrop-blur-xl`, border halus `border-ink/10`, dan bayangan ringan `shadow-lg shadow-ink/5`.
* **Gliding Tab Indicator (Signature Motion):** Tab latar belakang putih meluncur dinamis antar-menu saat kursor berpindah (*hovered*), didukung oleh mekanisme *shared layout animation* Framer Motion (`layoutId="seanHalpinGlidingPill"`) dengan fisika pegas responsif (`stiffness: 400, damping: 30`).
* **Multi-Language Switcher (`LanguageToggle`):** Terintegrasi di sisi kanan kapsul (`ID | EN`) dengan animasi pill independen dan sinkronisasi `localStorage`.
* **Mobile Floating Drawer:** Pada layar kecil, bar menampilkan logo, toggle bahasa, dan hamburger button. Saat dibuka, menu navigasi mengembang menjadi kartu mengambang dengan sudut membulat besar (*rounded-3xl*).

### 3.2 Bagian Hero (`Hero Section`)
* **Arsitektur Grid 2 Kolom (Desktop):**
  * **Kolom Kiri (Konten & Narasi):**
    * *Mask Reveal Headline:* Nama ("Gilang Pratama Putra") dan peran ("Backend Developer") dianimasikan muncul meluncur dari balik batas pemotong (`overflow-hidden`).
    * *Value Proposition:* Ringkasan lugas yang berfokus pada arsitektur sistem backend, integritas data relasional, dan pembelajaran frontend modern.
    * *Call to Action (CTA):* Tombol *"Lihat Proyek"* (anchor `#projects`) dan *"Hubungi Saya"* (anchor `#contact`).
  * **Kolom Kanan (Wadah Foto Profil Gilang):**
    * Kartu foto profil berdimensi rasio $4:5$ dengan frame membulat modern (`rounded-3xl` berlatar belakang `bg-white/80` dan border `border-ink/10`).
    * Menggunakan berkas sumber `src/assets/hero.png` yang siap diperbarui kapan saja oleh Gilang.
    * Dilengkapi floating badge info status akademis Politeknik Negeri Jember (POLIJE) dan interaktivitas hover pegas (*tilt/elevation*).

### 3.3 Struktur Bento Grid (`About & Skills Section`)
Menggunakan arsitektur modular Bento 3 kolom (desktop) dan 1 kolom bertumpuk (mobile):
* **Card Profil Utama (`bg-indigo-brand`):** Berisi ringkasan latar belakang, filosofi rekayasa, rentang span 2 kolom desktop.
* **Card Core Tech Stack (`bg-coral`):** Badge mono-font untuk teknologi backend utama: PHP, Laravel, Java, MySQL, dan PostgreSQL dasar.
* **Card "Sedang Dipelajari" (`bg-mint`):** Khusus menampung teknologi eksplorasi (JavaScript, TypeScript, React) yang ditandai dengan badge eksplisit agar jujur dan tidak melebih-lebihkan kompetensi.
* **Card Metrik / Pendekatan Netral (`bg-white`):** Menampilkan prinsip arsitektur perangkat lunak, kebiasaan manajemen proyek, atau deployment hosting.

### 3.4 Katalog & Filter Proyek (`Projects Section`)
* **Bento Project Cards:** Menampilkan cuplikan proyek dengan thumbnail rasio 16:9, judul, ringkasan kontekstual, tag teknologi (`font-mono`), serta tombol demo/kode.
* **Visual Hierarchy:** Proyek sorotan utama (*featured project*) dialokasikan warna aksen `bg-sun`, sedangkan proyek lainnya menggunakan kartu netral (`bg-white` dengan border halus).
* **Zero Dummy Image Exposure:** Thumbnail proyek instansi yang belum diverifikasi hak publikasinya wajib menggunakan *fallback dynamic abstract gradient/monogram card*.
* **Interaktivitas:** Seluruh kartu dapat diklik untuk navigasi langsung menuju halaman detail proyek.

### 3.5 Halaman Detail Proyek (`ProjectDetail Page`)
* **Client-Side Routing:** Menggunakan rute dinamis berbasis slug (`/projects/:slug`).
* **Arsitektur Konten Detail:**
  1. Header proyek (Judul, Kategori, Tahun, Status: Selesai / Dalam Pengerjaan).
  2. Masalah & Kebutuhan Sistem.
  3. Peran & Kontribusi Spesifik Gilang.
  4. Arsitektur Teknis & Tumpukan Teknologi (disertai alasan pemilihan teknologi).
  5. Tautan Repositori GitHub & Demo Aplikasi Publik (jika ada).
* **Transisi Halaman:** Transisi masuk-keluar yang mulus menggunakan komponen `AnimatePresence` tanpa patahan layout.

### 3.6 Bagian Kontak & Footer (`Contact & Footer`)
* **Saluran Komunikasi Langsung:** Akses menuju akun GitHub, profil LinkedIn, dan alamat email.
* **Fitur 1-Klik Salin Email:** Menyalin alamat email ke papan klip (*clipboard*) dengan umpan balik visual instan ("Tersalin!").
* **Footer:** Sederhana, memuat informasi hak cipta dan stack teknologi yang dipakai.

---

## 4. Persyaratan Non-Fungsional (Non-Functional Requirements)

### 4.1 Aksesibilitas (A11y) & Standar Kontras Teks
* Memenuhi standar WCAG 2.1 Level AA.
* **Matriks Kontras Wajib (Anti Pelanggaran Visual):**
  * Teks di atas `bg-indigo-brand`: `text-white` (Rasio $\ge 4.5:1$).
  * Teks di atas `bg-coral`: **Wajib `text-ink`** (Dilarang teks putih karena kontras tidak memadai).
  * Teks di atas `bg-mint`: **Wajib `text-ink`**.
  * Teks di atas `bg-sun`: **Wajib `text-ink`**.
  * Teks di atas `bg-cream`: `text-ink`.
* Semua elemen interaktif (tombol, input, tautan) wajib memiliki status fokus keyboard yang tampak jelas (`focus-visible:ring-2 focus-visible:ring-indigo-brand`).
* Area sentuh target (*touch target*) perangkat layar sentuh minimal $44 \times 44\text{ px}$.

### 4.2 Responsivitas Tampilan (Mobile-First)
* Pengujian wajib pada 3 titik resolusi:
  * **Mobile:** $375\text{ px}$ (1 kolom bento, padding `p-6`, navigasi adaptif).
  * **Tablet:** $768\text{ px}$ (Transisi ke grid multi-kolom).
  * **Desktop:** $1280\text{ px}$ (3 kolom bento penuh, kontainer terpusat `max-w-6xl`).
* Larangan mutlak terhadap kemunculan *horizontal scroll* pada body halaman di seluruh viewport.

### 4.3 Kualitas Rekayasa & Keamanan (Code Quality & Privacy)
* **TypeScript Strictness:** Konfigurasi `strict: true` pada `tsconfig.json`. Larangan penggunaan tipe `any` (wajib menggunakan tipe konkret, union, atau `unknown`).
* **Ukuran Komponen:** Setiap komponen modular dibatasi maksimal $\sim 150$ baris kode; komponen yang melebihi batas ini wajib dipecah menjadi sub-komponen terpisah.
* **Privasi Proyek Instansi:** Tidak menaruh data riil, kredensial, endpoint internal instansi, NIP, atau screenshot sensitif ke dalam repositori publik; wajib menggunakan data tiruan (*mock data*) yang aman.
* **Manajemen Secret:** Tidak ada kunci API, kata sandi, atau token di dalam kode sumber; variabel konfigurasi wajib melalui `.env` yang terdaftar pada `.gitignore`.

---

## 5. Sistem Desain, Tipografi & Motion Tokens

### 5.1 Token Warna (Tailwind CSS v4 `@theme`)
Didefinisikan secara global pada `src/index.css` tanpa berkas `tailwind.config.js`:

```css
@theme {
  --color-cream: #faf7f2;
  --color-ink: #18181b;
  --color-indigo-brand: #5b5bf0;
  --color-coral: #ff7a59;
  --color-mint: #34d3a0;
  --color-sun: #ffd25e;

  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-sans: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

### 5.2 Tipografi & Hierarki Skala

| Peran | Tipe Huruf | Ukuran Mobile | Ukuran Desktop | Bobot Huruf |
| :--- | :--- | :--- | :--- | :--- |
| **Headline H1** | Plus Jakarta Sans (`font-display`) | $36\text{ px}$ | $60\text{--}72\text{ px}$ | Bold / Extrabold (700/800) |
| **Section Title H2** | Plus Jakarta Sans (`font-display`) | $28\text{ px}$ | $40\text{ px}$ | Bold (700) |
| **Card Title H3** | Plus Jakarta Sans (`font-display`) | $20\text{ px}$ | $24\text{ px}$ | Semi-Bold / Bold (600/700) |
| **Body Paragraph** | Inter (`font-sans`) | $16\text{ px}$ | $16\text{--}18\text{ px}$ | Regular / Medium (400/500) |
| **Tech Tags & Monospace** | JetBrains Mono (`font-mono`) | $12\text{--}13\text{ px}$ | $13\text{ px}$ | Medium (500) |

### 5.3 Spesifikasi Motion Terpusat (`src/lib/motion.ts`)
Semua nilai animasi wajib merujuk ke modul ini untuk mencegah inkonsistensi gerak:

| Kategori Token | Definisi Nilai | Area Penerapan |
| :--- | :--- | :--- |
| **Main Transition Easing** | `[0.22, 1, 0.36, 1]` (Cubic Bezier Ease-out) | Transisi masuk elemen, pergeseran kontainer. |
| **Duration: Fast** | $0.2\text{ detik}$ | Efek hover, aksi klik, pergantian toggle. |
| **Duration: Base** | $0.5\text{ detik}$ | Masuknya kartu bento, scroll-reveal. |
| **Duration: Slow** | $0.8\text{ detik}$ | Animasi hero header, transisi antar halaman. |
| **Spring: Snappy UI** | `stiffness: 300, damping: 30` | Tombol interaktif, indikator aktif, efek magnetik. |
| **Spring: Smooth Element**| `stiffness: 120, damping: 20` | Elemen layout besar, kartu floating. |
| **Stagger Offset** | $0.06\text{--}0.10\text{ detik}$ | Kemunculan urutan kartu dan daftar keahlian. |

* **Aturan Reduksi Gerak:** Wajib mendeteksi `prefers-reduced-motion: reduce`. Saat aktif, nonaktifkan gerak spasial (translasi, skala, tilt, marquee) dan gunakan transisi opasitas murni ($0 \rightarrow 1$).

---

## 6. Arsitektur Data & Model Kontrak

### 6.1 Skema Model Data (`src/types/index.ts`)
```typescript
export type Locale = 'id' | 'en';

export interface LocalizedText {
  id: string;
  en: string;
}

export type ProjectStatus = 'completed' | 'in-progress';
export type SkillCategory = 'backend' | 'database' | 'learning' | 'tools';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  isLearning?: boolean;
}

export interface ProjectLinks {
  demo?: string;
  repo?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description?: LocalizedText;
  role: LocalizedText;
  techStack: string[];
  thumbnail?: string;
  links: ProjectLinks;
  year: number;
  featured: boolean;
  status: ProjectStatus;
}
```

### 6.2 Tata Kelola Multi-Bahasa (`react-i18next`)
* Menjaga keselarasan struktur *key* antara `src/locales/id.json` dan `src/locales/en.json`.
* Tidak menaruh teks antarmuka (*hardcoded copy*) langsung di dalam file komponen JSX.
* Teks yang bersifat dinamis dari data proyek ditangani lewat pembacaan objek `LocalizedText[currentLocale]`.

---

## 7. Arsitektur Sistem & Direktori Proyek

```text
portfolio/
├── public/                 # Favicon dan aset statis teroptimasi
├── src/
│   ├── components/         # Komponen UI atomik: Navbar, BentoCard, ProjectCard, LanguageToggle
│   ├── sections/           # Blok section halaman: HeroSection, AboutSection, ProjectsSection, ContactSection
│   ├── pages/              # Halaman routing: HomePage, ProjectDetailPage, NotFoundPage
│   ├── data/               # Single Source of Truth konten: projects.ts, skills.ts
│   ├── locales/            # Berkas kamus bahasa: id.json, en.json
│   ├── types/              # Deklarasi antarmuka TypeScript
│   ├── lib/                # Konfigurasi utilitas: motion.ts, i18n.ts, utils.ts
│   ├── App.tsx             # Root router wrapper
│   ├── main.tsx            # Entry point aplikasi
│   └── index.css           # Konfigurasi Tailwind v4, font faces, dan token @theme
├── index.html              # Deklarasi Google Fonts dan viewport meta
├── tsconfig.json           # Konfigurasi strict TypeScript
└── vite.config.ts          # Integrasi Vite dan plugin @tailwindcss/vite
```

---

## 8. Protokol Kerja AI Agent & Standard Operasional

Sesuai mandat `AGENT.md`, AI Agent wajib bertindak sebagai **pembimbing teknis sekaligus rekan programmer kolaboratif**:

### 8.1 Prinsip Komunikasi & Pengajaran
1. **Bahasa & Nada:** Menggunakan Bahasa Indonesia komunikatif dengan istilah teknis baku.
2. **Konteks Komparatif:** Selalu mengaitkan paradigma baru React/TypeScript dengan konsep backend yang sudah dipahami Gilang (contoh: Props $\approx$ parameter method/Blade attributes, State $\approx$ session/lifecycle lokal, `projects.ts` $\approx$ Database Seeder).
3. **Penyajian Kode Utuh:** Dilarang memotong kode dengan komentar `// ... sisanya tetap`. Setiap berkas yang disentuh disajikan secara utuh dan siap dieksekusi.
4. **Verifikasi Mandiri:** Menjalankan pengecekan ganda (*double-check*) terhadap sintaks, konsistensi impor, kesesuaian tipe data, penutupan tag JSX, serta verifikasi build sebelum menyerahkan hasil ke pengguna.

### 8.2 Struktur Laporan di Setiap Akhir Tahap
Di setiap penyelesaian tahap pekerjaan, Agent wajib menyajikan 5 komponen laporan:
1. **Ringkasan Pekerjaan:** Hal konkret yang telah diselesaikan.
2. **Daftar Berkas:** Berkas yang baru dibuat atau diubah.
3. **Instruksi Pengujian:** Perintah terminal dan indikator visual keberhasilan.
4. **Latihan Pemahaman Mandiri:** Satu tugas modifikasi kecil yang diarahkan untuk dikerjakan Gilang agar memahami logika kode yang baru ditulis.
5. **Konfirmasi & Validasi Langkah Selanjutnya:** Pertanyaan terarah mengenai opsi arsitektur tahap berikutnya.

---

## 9. Matriks Anti AI-Slop & Standar Penulisan

| Aspek | Praktik Dilarang (AI-Slop) | Praktik Wajib (Standard Disengaja) |
| :--- | :--- | :--- |
| **Gaya Visual** | Latar belakang gradasi ungu/pink neon, efek glassmorphism berlebihan, floating blur orbs dekoratif tanpa tujuan. | Warna datar (*flat block*), kanvas warna cream hangat `#faf7f2`, batas kartu tegas, hierarki visual bervariasi. |
| **Gaya Animasi** | Semua elemen muncul dengan efek fade-up seragam tanpa ritme. | Variasi arah masuk sesuai koordinat kartu bento, mask-reveal judul, motion token terpusat. |
| **Gaya Penulisan** | Kata-kata klise: *"passionate developer"*, *"cutting-edge solutions"*, *"crafting digital experiences"*. | Lugas, jujur, spesifik: mengedepankan kapabilitas teknis Laravel, MySQL, perancangan arsitektur, dan status belajar. |
| **Integritas Konten** | Mengarang angka metrik, jumlah klien fiktif, atau testimoni palsu. | Hanya menampilkan fakta riil proyek akademik/personal yang terkonfirmasi; menggunakan label `TODO` jika data belum ada. |

---

## 10. Rencana Pelaksanaan Bertahap (Execution Roadmap)

### Fase 1 — Frontend Architecture & Polish (Status: Aktif)
* [x] **Tahap 1:** Inisialisasi Vite + React + TypeScript + Tailwind v4, pengujian kerangka bento awal.
* [x] **Tahap 2:** Pemasangan token `@theme` lengkap pada `src/index.css`, pembuatan modul `src/lib/motion.ts`, komponen `Navbar`, dan komponen reusable `BentoCard`.
* [x] **Tahap 3:** Pembangunan section Hero, About, dan Bento Skills menggunakan data statis.
* [x] **Tahap 4:** Pemisahan konten ke layer `src/data/`, pembuatan komponen `ProjectCard` dan grid portofolio dinamis.
* [x] **Tahap 5:** Integrasi `react-i18next`, penyusunan kamus `id.json` & `en.json`, implementasi `LanguageToggle`.
* [x] **Tahap 6:** Pemasangan `React Router`, pembangunan layout dinamis `/projects/:slug`.
* [x] **Tahap 7:** Integrasi animasi tingkat lanjut (hero reveal, scroll progress, transisi rute), optimasi aksesibilitas, responsivitas mobile $375\text{ px}$, dan audit performa.
* [x] **Tahap 8:** Konfigurasi build produksi, optimasi aset WebP, dan deployment ke Vercel/Netlify.

### Fase 2 — Headless Content Management (Future Scope)
* Persiapan migrasi dari `src/data/projects.ts` menuju RESTful API / Headless CMS backend tanpa mengubah struktur komponen frontend yang sudah terbangun.
* Keputusan pemilihan teknologi backend (Laravel Sanctum vs Node.js/NestJS) wajib dikonfirmasikan kepada pemilik setelah Fase 1 selesai secara menyeluruh.

---

## 11. Kriteria Penyelesaian Tahap (Definition of Done)

Sebuah instruksi atau tahap kerja dalam proyek ini hanya dapat dinyatakan selesai apabila memenuhi seluruh poin checklist berikut:
* [ ] Perintah `npm run build` berjalan sukses tanpa galat.
* [ ] Pemeriksaan `npm run lint` bersih dari error kode.
* [ ] Tidak ditemukan penggunaan kata kunci `any` di seluruh berkas TypeScript.
* [ ] Tampilan telah diverifikasi rapi pada lebar layar $375\text{ px}$, $768\text{ px}$, dan $1280\text{ px}$ tanpa adanya pergeseran horizontal.
* [ ] Kontras warna teks memenuhi ketentuan aksesibilitas (terutama penggunaan `text-ink` pada latar belakang `coral`, `mint`, dan `sun`).
* [ ] Seluruh animasi bersumber dari token `src/lib/motion.ts` dan mendukung preferensi `prefers-reduced-motion`.
* [ ] Teks antarmuka telah terhubung secara rapi pada kamus i18n tanpa teks statis yang tertinggal di komponen tampilan.
* [ ] Hasil implementasi telah dikonfirmasikan dan diverifikasi oleh Gilang.
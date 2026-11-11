# AGENT.md — Aturan Kerja AI Agent untuk Proyek Portofolio

Dokumen ini adalah **sumber aturan utama** untuk AI agent yang mengerjakan proyek ini.
Baca seluruh file ini sebelum menulis kode. Untuk hal yang berkaitan dengan tampilan, baca juga `DESIGN.md`.

Jika ada konflik antara dua dokumen:
- Urusan **kerja, kode, struktur** → `AGENT.md` yang berlaku.
- Urusan **visual, warna, tipografi, animasi** → `DESIGN.md` yang berlaku.

---

## 1. Gambaran Proyek

**Nama proyek:** `portfolio`
**Pemilik:** Gilang, mahasiswa POLIJE, berperan sebagai **Backend Developer**.

**Tujuan:** website portofolio pribadi untuk:
1. Memperkenalkan diri dan bidang yang dikuasai.
2. Mendokumentasikan semua proyek yang pernah dikerjakan (bertambah seiring waktu).
3. Menjadi portofolio jangka panjang untuk karier.

**Isi halaman (satu halaman utama + halaman detail proyek):**
- Floating Capsule Navbar bergaya Sean Halpin (gliding indicator + toggle bahasa **ID / EN**)
- Hero 2 kolom (kiri: nama, peran, value proposition, tombol CTA; kanan: space foto profil interaktif)
- About + Skills dalam layout bento grid
- Projects (kartu proyek)
- Contact
- Footer sederhana

**Gaya desain:** semi colorful bento dipadukan dengan floating island UI (terinspirasi dari seanhalpin.xyz). Detail lengkap ada di `DESIGN.md`.

---

## 2. Profil Pemilik (Cara Menyikapi Gilang)

- Kuat di: **PHP/Laravel**, Java, MySQL. Sudah paham manajemen proyek, hosting, dan alur logika program.
- Pemula di: **JavaScript, TypeScript, React** (pernah mencoba React hanya sebentar).
- Proyek ini **sengaja dipilih menantang** agar Gilang belajar React + TypeScript. Jadi tujuannya bukan hanya hasil jadi, tapi juga **proses belajar**.

---

## 3. Peran dan Cara Kolaborasi

Agent berperan sebagai **pembimbing sekaligus rekan programmer**, dari awal sampai proyek selesai.

### 3.1 Aturan komunikasi
- Gunakan **Bahasa Indonesia** untuk penjelasan. Istilah teknis boleh tetap dalam bahasa Inggris.
- Jelaskan **kenapa**, bukan hanya **apa**. Gilang pemula di React/TS, jadi beri konteks singkat untuk konsep baru (misalnya: apa itu props, state, hook).
- Bandingkan dengan konsep Laravel/PHP jika membantu pemahaman (misalnya: komponen React ≈ Blade component, `data/projects.ts` ≈ seeder).
- Kerjakan **bertahap dan kecil**. Satu tahap selesai dan diverifikasi sebelum lanjut.

### 3.2 Validasi sebelum bertindak
- Untuk **fitur atau keputusan baru yang belum dibahas**, ajukan pertanyaan atau konfirmasi dulu sebelum menulis kode, supaya hasilnya persis sesuai keinginan.
- Untuk **tugas yang rumit/kompleks**, selalu beri **feedback atau pertanyaan** (misalnya risiko, alternatif, trade-off) sebelum mengeksekusi.
- Jangan menebak. Jika ada beberapa pilihan masuk akal, tampilkan pilihan beserta rekomendasi.

### 3.3 Aturan kode
- Jika menulis atau mengubah file, berikan **kode lengkap** untuk file tersebut (bukan potongan dengan `...` atau "sisanya tetap").
- **Periksa dua kali** sebelum menyerahkan: typo, import yang hilang, nama variabel tidak konsisten, tipe TypeScript, kurung/tag yang tidak tertutup.
- Jalankan `npm run build` dan `npm run lint` setelah perubahan yang berarti, lalu laporkan hasilnya jujur. Jangan klaim "berhasil" jika belum dijalankan.
- Jangan menghapus atau menimpa file yang sudah ada tanpa menyebutkan apa yang diubah.

### 3.4 Setelah tiap tahap, selalu laporkan
1. Apa yang dikerjakan (ringkas).
2. File apa saja yang dibuat/diubah.
3. Cara mengecek hasilnya (perintah + tampilan yang seharusnya muncul).
4. Satu **tugas latihan** kecil agar Gilang ikut memahami kodenya.
5. Pertanyaan/validasi untuk tahap berikutnya.

---

## 4. Tech Stack (Sudah Diputuskan)

| Kebutuhan | Pilihan |
|---|---|
| Build tool | **Vite** |
| UI | **React** + **TypeScript** (strict) |
| Styling | **Tailwind CSS v4** (plugin `@tailwindcss/vite`, token di `src/index.css` lewat `@theme`) |
| Animasi | **Framer Motion** (prioritas utama, lihat `DESIGN.md` bagian 6) |
| Multi-bahasa | **react-i18next** (ID dan EN) |
| Routing | **React Router** |
| Hosting | **Vercel** atau **Netlify** (deploy dari GitHub) |

**Catatan Tailwind v4:** tidak ada `tailwind.config.js`. Semua token (warna, font) didefinisikan di `src/index.css` dalam blok `@theme`. Jangan membuat config lama.

### Aturan menambah dependensi
- **Jangan** menambah library baru tanpa bertanya dan menyebutkan alasannya.
- **Jangan** mengganti stack (misalnya pindah ke Next.js) tanpa persetujuan. Next.js sengaja ditunda ke proyek lain.

---

## 5. Struktur Folder

```
src/
├── components/     # Komponen reusable: Navbar, BentoCard, ProjectCard, LanguageToggle
├── sections/       # Section halaman: Hero, About, Skills, Projects, Contact
├── pages/          # Halaman route: Home, ProjectDetail
├── data/           # Konten: projects.ts, skills.ts  (konten TERPISAH dari tampilan)
├── locales/        # id.json, en.json
├── types/          # Interface/type TypeScript bersama
├── lib/            # Helper (i18n config, util)
├── App.tsx
├── main.tsx
└── index.css       # Tailwind + token desain (@theme)
```

**Prinsip utama:** *konten terpisah dari tampilan.* Menambah proyek baru = menambah satu data di `data/projects.ts`, **tanpa** mengedit komponen.

---

## 6. Konvensi Kode

- TypeScript **strict**. **Dilarang memakai `any`**; gunakan type yang jelas atau `unknown`.
- Hanya **function component** dan **hooks**. Tidak memakai class component.
- Satu komponen satu file. Nama file komponen **PascalCase** (`BentoCard.tsx`). Nama file data/util **camelCase**.
- Props selalu diberi `interface` atau `type` yang eksplisit.
- Gunakan `const` secara default.
- Komponen kecil dan fokus. Jika satu komponen lebih dari ~150 baris, pertimbangkan dipecah.
- Hindari style inline dan CSS terpisah. Gunakan **utility class Tailwind** dan token dari `@theme`.
- Teks yang tampil ke pengguna **tidak boleh di-hardcode** di komponen. Ambil dari file locale (lihat bagian 8).
- Aksesibilitas wajib: elemen semantik (`header`, `nav`, `main`, `section`, `footer`), `alt` pada gambar, label pada tombol ikon, fokus keyboard terlihat.

---

## 7. Model Data

Usulan awal tipe data (boleh disesuaikan setelah divalidasi dengan Gilang). Disiapkan agar nanti mudah dipindah ke API di Fase 2.

```ts
// src/types/index.ts
export type Locale = 'id' | 'en'

export interface LocalizedText {
  id: string
  en: string
}

export type ProjectStatus = 'completed' | 'in-progress'

export interface Project {
  id: string
  slug: string
  title: LocalizedText
  summary: LocalizedText
  description?: LocalizedText
  role: LocalizedText
  techStack: string[]
  thumbnail?: string
  links: {
    demo?: string
    repo?: string
  }
  year: number
  featured: boolean
  status: ProjectStatus
}
```

---

## 8. Multi-Bahasa (ID + EN)

- Pakai **react-i18next**. Bahasa default: Indonesia.
- Teks UI statis (menu, judul section, tombol) → `src/locales/id.json` dan `en.json`. **Kunci di kedua file harus selalu sama.**
- Konten proyek memakai pola `LocalizedText` (`{ id, en }`).
- Pilihan bahasa disimpan di `localStorage` agar diingat saat kunjungan berikutnya (dibungkus `try/catch`).
- Atribut `lang` pada `<html>` ikut berubah saat bahasa diganti.
- Rancang layout agar tahan terhadap teks yang panjangnya berbeda antar bahasa.

---

## 9. Peta Jalan (Roadmap)

Tandai `[x]` saat selesai. Kerjakan **berurutan**.

### Fase 1 — Frontend (sedang berjalan)
- [x] **Tahap 1:** Setup Vite + React + TS + Tailwind, kerangka bento untuk tes
- [x] **Tahap 2:** Pasang token desain lengkap, buat `src/lib/motion.ts` (motion tokens), `Navbar`, dan komponen reusable `BentoCard` (sudah dengan animasi hover dan masuk dasar)
- [ ] **Tahap 3:** Bangun section Hero, About, Skills (bento grid) dengan data statis
- [ ] **Tahap 4:** Pindahkan konten ke `data/` dengan tipe TypeScript, bangun section Projects + `ProjectCard`
- [ ] **Tahap 5:** Tambah react-i18next (ID/EN) dan `LanguageToggle`
- [ ] **Tahap 6:** React Router + halaman detail proyek
- [ ] **Tahap 7:** Penyempurnaan animasi (hero intro, scroll reveal, transisi halaman, marquee, indikator scroll), responsif mobile, aksesibilitas, SEO dasar (title, meta, favicon)
- [ ] **Tahap 8:** Deploy ke Vercel/Netlify

### Fase 2 — Backend dan Halaman Admin (nanti, belum dimulai)
Tujuan: Gilang bisa **menambah proyek lewat halaman admin** tanpa mengedit kode.
- Butuh: API + database + autentikasi.
- **Keputusan Gilang (dicatat):** untuk sekarang pengelolaan konten **manual lewat data layer** (`src/data/projects.ts`). Panel admin **ditunda** — perlu API + database + auth + hosting kedua, sementara portofolio pribadi jarang diupdate mingguan.
- **Tetap belum diputuskan:** Laravel (Sanctum, MySQL/PostgreSQL) **atau** Node.js + TypeScript (Express/NestJS). Tanyakan lagi ke Gilang saat benar-benar mau mulai Fase 2; **jangan memilih sendiri**.
- **Jalur tengah yang tersedia:** CMS statis git-based (Decap / Netlify CMS) — antarmuka web untuk edit konten tanpa backend sendiri, data tetap di repo.
- Perpindahan dari `data/projects.ts` ke API harus mulus karena tipe `Project` sudah dirancang lebih dulu.
- Jangan mengerjakan apa pun dari Fase 2 sebelum Fase 1 selesai dan Gilang menyetujui.

---

## 10. Privasi dan Keamanan Konten

- Sebagian proyek Gilang adalah **proyek instansi** (misalnya SIWASDAL, HCDP) dan skripsi. Izin publikasi **belum dipastikan**.
- **Jangan** memakai data asli, screenshot asli, nama internal sistem, URL internal, atau data pegawai/instansi dalam kode, aset, atau contoh. Gunakan **data contoh (dummy/placeholder)** sampai Gilang mengonfirmasi mana yang boleh dipublikasikan.
- Jangan pernah menaruh **secret** (API key, password, token) di kode atau repo. Gunakan environment variable, dan pastikan `.env` ada di `.gitignore`.
- Jangan menyertakan kontak pribadi (nomor telepon, alamat rumah) kecuali Gilang menyediakannya secara eksplisit.

---

## 11. Git dan Alur Kerja

- Gunakan **commit kecil dan bermakna** dengan format Conventional Commits, contoh:
  - `feat: add BentoCard component`
  - `fix: correct grid span on mobile`
  - `style: adjust hero spacing`
  - `docs: update agent.md roadmap`
  - `refactor: move projects to data layer`
- Satu tahap roadmap = satu atau beberapa commit. Sarankan commit di akhir tiap tahap.
- Jangan melakukan `git push --force` atau mengubah riwayat tanpa izin.

---

## 12. Definisi "Selesai" untuk Setiap Tahap

Sebuah tahap dianggap selesai hanya jika:
- [ ] `npm run build` berhasil tanpa error
- [ ] `npm run lint` bersih (atau warning dijelaskan)
- [ ] Tidak ada `any` dan tidak ada error TypeScript
- [ ] Tampilan dicek di lebar mobile (~375px), tablet, dan desktop
- [ ] Sesuai `DESIGN.md` (warna, font, spacing, kontras)
- [ ] Lolos checklist Anti AI-Slop dan aturan konten (`DESIGN.md` bagian 13-14)
- [ ] Animasi memakai token `motion.ts`, mulus (uji CPU throttling), dan menghormati `prefers-reduced-motion`
- [ ] Tidak ada teks UI yang di-hardcode (setelah i18n dipasang)
- [ ] Gilang sudah mengonfirmasi hasilnya

---

## 13. Anti AI-Slop dan Kualitas (Wajib)

Proyek ini **tidak boleh terlihat atau terdengar seperti hasil AI generik**. Aturan lengkap ada di `DESIGN.md` bagian 13 (visual) dan bagian 14 (isi/penulisan). Ringkasnya:

- **Visual:** hindari gradasi ungu-biru berlebihan, glassmorphism spam, deretan kartu identik, emoji sebagai ikon, dan layout tanpa hierarki.
- **Tulisan:** hindari kata klise (*passionate, cutting-edge, crafting digital experiences*). Tulis spesifik dan jujur.
- **Konten:** **jangan mengarang** data, statistik, pengalaman, atau testimoni. Jika butuh isi, **tanyakan ke Gilang** atau beri placeholder `TODO` yang jelas.
- **Uji "siapa saja bisa pakai":** jika halaman masih sama saat nama diganti orang lain, berarti belum cukup khas.

### Animasi adalah prioritas
- Animasi adalah ciri khas proyek ini. Ikuti `DESIGN.md` bagian 6 (motion tokens, daftar animasi, aturan kualitas).
- Semua nilai animasi dipusatkan di `src/lib/motion.ts`. Jangan menulis angka animasi acak di komponen.
- Rancang animasi **sejak komponen dibuat**, bukan ditempel di akhir. Pada tiap tahap, sebutkan animasi apa yang ditambahkan dan alasannya.
- Pertahankan performa 60fps dan hormati `prefers-reduced-motion`.
- Untuk keputusan animasi yang subjektif (gaya hero, tingkat intensitas), **tawarkan 2-3 opsi singkat** dan tanya Gilang sebelum menetapkan.

---

## 14. Hal yang Dilarang

- Menulis kode tanpa konteks proyek ini (menebak stack atau struktur).
- Mengganti stack, struktur folder, atau palet warna tanpa persetujuan.
- Menambah fitur di luar roadmap ("sekalian saja") tanpa bertanya.
- Menyalin desain situs lain secara utuh. Referensi boleh, penjiplakan tidak.
- Mengklaim sesuatu "sudah berhasil/teruji" padahal belum dijalankan.
- Menempelkan data sensitif atau data instansi asli ke kode.
- Mengarang konten (angka, pengalaman, testimoni) atau memakai teks pengisi/lorem ipsum.
- Memakai gaya "AI-slop" yang dilarang di `DESIGN.md` bagian 13.
- Menambah animasi tanpa tujuan atau tanpa token dari `motion.ts`.

---

## 15. Perintah Penting

```bash
npm install          # pasang dependensi
npm run dev          # jalankan dev server (biasanya http://localhost:5173)
npm run build        # build produksi + cek TypeScript
npm run lint         # cek kualitas kode
npm run preview      # pratinjau hasil build
```

Tambahkan visual playful berbasis ikon teknologi sesuai design.md bagian 15
(tempel dulu bagian itu ke design.md). Kerjakan bertahap.

SEBELUM menulis kode:
1. Pasang react-icons dan verifikasi bahwa SiPhp, SiLaravel, SiMysql, SiPostgresql,
   SiReact, SiTypescript, SiGit, dan FaJava benar-benar ada. Laporkan hasilnya.
2. Tampilkan rencana singkat: komponen apa yang dibuat (TechSticker, StackCard,
   TerminalCard, EndpointCard, ERDCard, Marquee) dan di section mana.

Lingkup:
- Buat data skill di src/data/skills.ts dengan tipe Skill (id, label, icon, color, group, status).
- Komponen TechSticker reusable: kotak putih rounded-2xl, border tipis, ikon berwarna.
- Hero: 5-6 stiker di sekitar foto, draggable dengan pegas, hover pop/tilt, gerak idle halus.
- Kartu skills: grid stiker dikelompokkan (backend, database, frontend, tools) dengan label
  "learning" untuk skill yang masih dipelajari.
- Marquee ikon teknologi yang berhenti saat hover.
- Minimal satu kartu visual (TerminalCard atau EndpointCard) dengan data generik.
- Semua animasi memakai token dari src/lib/motion.ts dan menghormati prefers-reduced-motion.
- Teks UI lewat i18n (t()), bukan hardcode.
- Jangan mengarang data. Konten kartu visual harus generik, bukan data instansi.

Setelah selesai: npm run build dan npm run lint, uji di 375/768/1280px (ID dan EN), lalu
laporkan dengan format agent.md bagian 3.4 beserta animasi apa yang ditambahkan dan alasannya.
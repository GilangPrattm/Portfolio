# Portfolio — Gilang Pratama Putra

Website portofolio pribadi: backend developer yang sedang memperdalam React & TypeScript.

Dibangun dengan **React 19 + TypeScript (strict) + Vite 8 + Tailwind CSS v4**, dengan
layer konten yang terpisah dari tampilan sehingga menambah proyek **tidak** menyentuh
kode visual.

---

## Menjalankan Proyek

```bash
npm install       # pasang dependensi (sekali saja)
npm run dev       # jalankan dev server → http://localhost:5173
npm run build     # build produksi + cek TypeScript
npm run lint      # cek kualitas kode (Oxlint)
npm run preview   # pratinjau hasil build
```

---

## Cara Menambah Proyek (paling sering dipakai)

Semua data proyek ada di **satu file**: `src/data/projects.ts`.

Cukup tambah satu objek ke array `PROJECTS`. Kartu di section Projects, halaman detail
`/projects/:slug`, dan navigasi akan ikut berubah sendiri — **tidak perlu menyentuh
komponen apa pun**.

```ts
{
  id: 'slug-unik',              // ID internal, unik
  slug: 'slug-unik',            // dipakai di URL: /projects/slug-unik
  title: {
    id: 'Judul Bahasa Indonesia',
    en: 'English Title',
  },
  summary: {                    // ringkasan 1-2 kalimat, dipakai di kartu
    id: '...',
    en: '...',
  },
  problem: { id: '...', en: '...' },       // opsional: masalah yang diselesaikan
  architecture: { id: '...', en: '...' },  // opsional: keputusan teknis
  role: { id: 'Peranmu', en: 'Your Role' },
  techStack: ['PHP', 'Laravel', 'MySQL'],
  links: {
    repo: 'https://github.com/username/repo',  // opsional
    demo: 'https://demo-url.com',             // opsional
  },
  thumbnail: '/gambar-proyek.jpg',  // opsional, ada placeholder otomatis
  year: 2025,
  featured: true,               // true → dapat badge "Pilihan"
  status: 'completed',           // 'completed' | 'in-progress'
}
```

> **Ingat aturan privasi (`AGENT.md` bagian 10):** untuk proyek instansi, jangan gunakan
> nama internal, URL internal, screenshot asli, atau data pegawai sampai izin publikasi
> kamu pastikan. Pakai data contoh dulu.

### Menambah skill

Sama polanya, di `src/data/skills.ts`:

```ts
{
  id: 'python',
  label: 'Python',
  icon: SiPython,              // import dari 'react-icons/si'
  color: '#3776AB',            // hex resmi Simple Icons
  group: 'backend',            // 'backend' | 'database' | 'frontend' | 'tools'
  status: 'learning',          // 'core' = sudah paham, 'learning' = sedang dipelajari
}
```

---

## Struktur Penting

```
src/
├── components/    # komponen reusable (Navbar, BentoCard, ProjectCard, TopoBackground, ...)
├── sections/      # section halaman (Hero, About, Projects, Contact)
├── pages/         # halaman per rute (Home, ProjectDetail, NotFound)
├── data/          # ISI KONTEN: projects.ts, skills.ts  ← yang sering kamu ubah
├── locales/       # teks UI dua bahasa: id.json, en.json
├── types/         # tipe TypeScript bersama
├── lib/           # helper (i18n, motion tokens)
├── App.tsx
└── index.css      # token warna & font (Tailwind v4 @theme)
```

Dokumen aturan kerja ada di `AGENT.md`, aturan visual ada di `DESIGN.md`.

---

## Deploy

Dikonfigurasi untuk **Vercel** (`vercel.json`). Push ke GitHub, lalu connect repository
di Vercel — build command `npm run build`, output directory `dist`.

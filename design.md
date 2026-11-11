# DESIGN.md — Panduan Desain Portofolio

Dokumen ini mengatur **semua keputusan visual** proyek portofolio Gilang.
Aturan kerja, struktur kode, dan roadmap ada di `AGENT.md`. Jika menyangkut tampilan, file inilah yang berlaku.

---

## 1. Konsep Desain

**"Semi-colorful bento"**

- Layout **bento grid**: konten dibagi ke dalam kartu-kartu berukuran berbeda yang tersusun rapi (terinspirasi gaya Apple).
- Latar **terang dan hangat**, bukan full dark.
- Tiap kartu diberi **satu warna aksen** (indigo, coral, mint, kuning) sehingga terasa ceria, tapi tetap profesional.
- Karakter yang dituju: **modern, bersih, ramah, percaya diri**. Bukan ramai atau norak.

**Kesan yang ingin dibangun:** seorang backend developer yang rapi dan terstruktur, tapi punya sisi kreatif.

---

## 2. Warna

Semua warna didefinisikan sebagai token di `src/index.css` dalam blok `@theme` (Tailwind v4). **Jangan menulis hex langsung di komponen.** Gunakan nama token.

| Token | Hex | Kelas Tailwind | Fungsi |
|---|---|---|---|
| `--color-cream` | `#faf7f2` | `bg-cream` | Latar halaman |
| `--color-ink` | `#18181b` | `text-ink` / `bg-ink` | Teks utama, elemen gelap |
| `--color-indigo-brand` | `#5b5bf0` | `bg-indigo-brand` | Aksen utama (brand), kartu profil, tombol utama |
| `--color-coral` | `#ff7a59` | `bg-coral` | Aksen hangat, kartu skills |
| `--color-mint` | `#34d3a0` | `bg-mint` | Aksen segar, kartu "sedang dipelajari" |
| `--color-sun` | `#ffd25e` | `bg-sun` | Aksen cerah, kartu proyek/highlight |

### Aturan pemakaian warna
- Satu kartu = **satu warna dominan**. Jangan menumpuk dua warna aksen dalam satu kartu.
- Latar halaman selalu `cream`. Hindari putih murni `#ffffff` sebagai latar besar.
- Warna aksen dipakai untuk **kartu, tombol, dan highlight**, bukan untuk paragraf teks panjang.
- Maksimal **dua warna aksen berdekatan** di satu area pandang agar tidak terlalu ramai. Selang-seling dengan kartu netral (putih/krem) bila perlu.

### Kontras teks (wajib, aksesibilitas)
| Latar | Warna teks | Catatan |
|---|---|---|
| `indigo-brand` | `text-white` | Kontras cukup untuk teks besar dan sedang |
| `coral` | **`text-ink`** | **Jangan teks putih**: kontras putih di coral terlalu rendah |
| `mint` | `text-ink` | |
| `sun` | `text-ink` | |
| `cream` | `text-ink` | |

Target kontras: minimal **4.5:1** untuk teks biasa dan **3:1** untuk teks besar (≥ 24px, atau ≥ 18.66px tebal). Cek dengan alat contrast checker jika ragu.

### Kartu netral (pelengkap)
- Kartu putih (`bg-white`) dengan border tipis `border-ink/10` untuk memberi ruang bernapas di antara kartu berwarna.

### Dark mode
- **Bukan prioritas awal.** Jangan dikerjakan sebelum Tahap 7 selesai dan Gilang menyetujui.
- Karena semua warna sudah berupa token, dark mode nanti cukup menimpa nilai token tanpa mengubah komponen.

---

## 3. Tipografi

Font dimuat lewat Google Fonts di `index.html` dan didaftarkan di `@theme`.

| Peran | Font | Token / kelas | Bobot |
|---|---|---|---|
| Judul & display | **Plus Jakarta Sans** | `font-display` | 600, 700, 800 |
| Teks isi / UI | **Inter** | `font-sans` | 400, 500, 600 |
| Kode / tag teknologi | **JetBrains Mono** | `font-mono` | 400, 500 |

### Skala ukuran (mobile → desktop)

| Elemen | Mobile | Desktop | Kelas contoh |
|---|---|---|---|
| Judul hero (H1) | 36px | 60-72px | `text-4xl md:text-6xl font-display font-extrabold` |
| Judul section (H2) | 28px | 40px | `text-3xl md:text-4xl font-display font-bold` |
| Judul kartu (H3) | 20px | 24px | `text-xl md:text-2xl font-display font-bold` |
| Teks isi | 16px | 16-18px | `text-base md:text-lg` |
| Teks kecil / caption | 14px | 14px | `text-sm` |
| Tag teknologi | 12-13px | 13px | `text-xs md:text-sm font-mono` |

### Aturan tipografi
- Judul: `leading-tight` dan sedikit `tracking-tight`.
- Teks isi: `leading-relaxed`, lebar baris maksimal sekitar **65 karakter** (`max-w-prose`).
- Ukuran teks isi **tidak boleh di bawah 16px** di mobile (kecuali caption/tag).
- Hanya pakai bobot yang sudah dimuat. Jangan menambah bobot baru tanpa memperbarui link font.

---

## 4. Layout dan Grid

### Prinsip bento
- Mobile: **1 kolom**, kartu menumpuk.
- Tablet/desktop (`md` ke atas): **3 kolom**, kartu boleh `col-span-2` atau `row-span-2` untuk variasi ukuran.
- Jarak antar kartu konsisten: `gap-4` (mobile) dan `gap-5` atau `gap-6` (desktop).
- Container utama: `max-w-6xl mx-auto` dengan padding `px-6 md:px-12`.

### Bentuk kartu
- Sudut membulat besar: `rounded-3xl` (kartu utama), `rounded-2xl` (kartu kecil/tag), `rounded-full` (tombol pil dan badge).
- Padding dalam kartu: `p-6` (mobile) dan `md:p-8` (desktop).
- Bayangan: **minimal atau tanpa bayangan**. Kedalaman dihasilkan dari warna dan border, bukan shadow tebal.

### Susunan section (urutan di halaman)
1. **Navbar (Floating Island Capsule ala Sean Halpin)**: mengapung di tengah atas layar dengan sliding tab indicator.
2. **Hero (2 Kolom Desktop)**:
   - Kiri: nama, peran "Backend Developer", tagline/value proposition, tombol CTA
   - Kanan: wadah kartu foto profil interaktif (`src/assets/hero.png`) dengan sudut membulat modern dan stiker teknologi playful.
3. **About + Skills (bento)**:
   - Kartu profil (indigo, `md:col-span-2`)
   - Kartu skills/stack (coral) dengan stiker teknologi
   - Kartu "Sedang dipelajari" (mint) dengan stiker teknologi
   - Kartu visual backend (TerminalCard & EndpointCard)
   - Kartu institusi akademik & lokasi (white, `md:col-span-3`)
4. **Projects**: grid kartu proyek (kartu `sun` untuk proyek unggulan, kartu netral untuk lainnya)
5. **Contact**: kartu besar dengan email, GitHub, LinkedIn
6. **Footer** sederhana

### Pengelompokan skills (bukan logo acak)
- **Backend:** PHP, Laravel, Java
- **Database:** MySQL, PostgreSQL (dasar)
- **Frontend (sedang dipelajari):** JavaScript, TypeScript, React
- **Tools:** Git, hosting/deployment

Skill ditampilkan sebagai **badge/tag** (`rounded-full`, font mono). Skill yang masih dipelajari diberi penanda berbeda (misalnya titik atau label "learning") agar jujur dan tidak melebih-lebihkan.

---

## 5. Komponen UI

### BentoCard (komponen dasar)
Props yang diharapkan: warna (`indigo | coral | mint | sun | white`), ukuran/span, dan konten (`children`).
- Satu komponen yang dipakai di seluruh halaman. Jangan menulis ulang gaya kartu di banyak tempat.
- Warna teks otomatis mengikuti tabel kontras di bagian 2.

### Tombol
- **Primer:** `bg-ink text-cream`, `rounded-full`, `px-6 py-3`, `font-semibold`.
- **Sekunder:** transparan dengan `border-2 border-ink`, `rounded-full`.
- Hover: naik sedikit (`-translate-y-0.5`) dan/atau skala kecil. Transisi 150-200ms.
- Fokus keyboard: ring terlihat jelas (`focus-visible:ring-2 focus-visible:ring-indigo-brand focus-visible:ring-offset-2`).
- Area sentuh minimal **44x44px** di mobile.

### Navbar (Gaya Floating Capsule Sean Halpin)
- Mengapung di tengah atas (`fixed top-3 sm:top-5 inset-x-0 mx-auto w-fit`), bentuk kapsul penuh (`rounded-full`).
- Saat di puncak halaman, navbar transparan menyatu dengan kanvas. Saat digulir ke bawah, bertransisi menjadi latar `bg-cream/85` dengan `backdrop-blur-xl` dan border `border-ink/10`.
- Efek **Gliding Tab Indicator**: latar belakang pill putih meluncur mulus menggunakan Framer Motion `layoutId` saat kursor berpindah antar-tautan navigasi.
- Isi: Monogram bulat "G" di kiri, menu navigasi di tengah, **toggle bahasa ID | EN** dan tombol mobile drawer di kanan.

### Toggle bahasa
- Dua pilihan jelas: `ID` dan `EN`, yang aktif ditandai dengan latar `ink` dan teks `cream`.

### ProjectCard
- Thumbnail (rasio konsisten, misalnya 16:9), judul, ringkasan singkat, tag teknologi (font mono), tombol Demo/GitHub bila ada.
- Jika belum ada gambar: gunakan **placeholder** bergradasi lembut dari warna aksen, bukan kotak abu-abu kosong.
- Seluruh kartu bisa diklik menuju halaman detail.

---

## 6. Motion dan Animasi (Prioritas Utama)

Animasi adalah **ciri khas** portofolio ini, bukan hiasan tambahan. Targetnya: terasa **hidup, premium, dan disengaja**, tanpa mengorbankan kecepatan dan keterbacaan.

Library: **Framer Motion** (paket `motion` dengan import `motion/react`, atau `framer-motion`; cek versi terbaru, pilih **satu** saja, dan tanyakan Gilang jika ragu).

### 6.1 Bahasa gerak (motion tokens)

Semua animasi memakai nilai dari **satu sumber**: `src/lib/motion.ts` (variants, easing, durasi, spring). Dilarang menulis angka animasi acak di tiap komponen. Konsistensi inilah yang membuat gerak terasa "mahal".

| Token | Nilai usulan | Dipakai untuk |
|---|---|---|
| Easing utama | `[0.22, 1, 0.36, 1]` (ease-out kuat) | Hampir semua transisi masuk |
| Durasi cepat | 0.2 detik | Hover, klik, umpan balik |
| Durasi dasar | 0.5 detik | Elemen masuk, perpindahan kartu |
| Durasi lambat | 0.8 detik | Momen besar (hero, transisi halaman) |
| Spring UI | stiffness 300, damping 30 | Tombol, toggle, kartu yang bereaksi ke kursor |
| Spring lembut | stiffness 120, damping 20 | Elemen besar, layout animation |
| Stagger | 0.06-0.1 detik | Kartu/teks yang muncul berurutan |

Nilai ini titik awal. Boleh disetel setelah dicoba langsung, tapi tetap dipusatkan di `motion.ts`.

### 6.2 Daftar animasi (urut prioritas)

1. **Hero intro (momen "wow" utama).** Judul/nama muncul per baris atau per kata (mask reveal: teks naik dari balik garis potong), lalu tagline dan tombol menyusul dengan stagger. Total durasi maksimal sekitar 1,5 detik agar konten tidak tertunda.
2. **Bento cards masuk berurutan.** Kartu muncul dengan stagger, dengan variasi halus sesuai posisinya (naik, sedikit scale, atau geser dari sisi kolomnya), bukan semua fade-up yang sama.
3. **Hover kartu bereaksi.** Kartu naik, bergeser warna/elemen dalamnya, dan bisa sedikit tilt mengikuti kursor (desktop). Ikon atau badge di dalam kartu ikut bergerak halus.
4. **Tombol yang terasa hidup.** Efek magnetic ringan pada tombol utama, transisi isi saat hover (misalnya panah bergeser), efek tekan (`whileTap`) yang jelas.
5. **Scroll reveal.** Judul section dan konten muncul saat masuk viewport (`whileInView`, sekali saja), dengan ritme yang sama seperti 6.1.
6. **Navbar cerdas.** Tersembunyi saat scroll ke bawah, muncul saat scroll ke atas. Indikator section aktif bergeser mulus (shared `layoutId`).
7. **Indikator progres scroll** tipis di atas halaman (`useScroll` + `useSpring`).
8. **Transisi toggle bahasa.** Teks berganti dengan crossfade/slide halus dan layout tidak melompat (`AnimatePresence` + `layout`), supaya ganti ID/EN terasa mulus.
9. **Transisi antar halaman** (Home ke detail proyek) dengan `AnimatePresence`, termasuk transisi elemen bersama (shared element) dari kartu proyek ke halaman detail bila memungkinkan.
10. **Marquee teknologi.** Deretan tag stack berjalan pelan, otomatis berhenti saat hover dan saat `prefers-reduced-motion`.
11. **Angka count-up.** Hanya untuk angka yang **benar-benar nyata** (lihat bagian 13). Jangan membuat statistik palsu demi animasi.

### 6.3 Aturan kualitas animasi

- **Setiap animasi harus punya alasan:** menuntun mata, memberi umpan balik, atau menunjukkan hubungan antar elemen. Jika tidak punya alasan, hapus.
- **Satu momen "wow" per section,** sisanya halus. Terlalu banyak efek membuat semuanya terasa murahan.
- **Performa 60fps:** animasikan terutama `transform` dan `opacity`. Hindari menganimasikan `width`, `height`, `top`, `left`. Gunakan `will-change` seperlunya.
- **Bundle:** pakai `LazyMotion` dengan fitur `domAnimation` (atau setara) agar ukuran tetap kecil.
- **Konten tetap terbaca** jika animasi gagal atau JavaScript lambat. Jangan membuat teks penting tak terlihat tanpa jalan keluar.
- **Wajib hormati `prefers-reduced-motion`:** matikan gerak besar (parallax, marquee, tilt, magnetic), sisakan transisi opacity sederhana.
- **Tidak ada loop tanpa henti** selain marquee yang bisa dijeda.
- **Parallax:** boleh hanya ringan dan terbatas (satu-dua elemen dekoratif), tidak boleh mengganggu bacaan.
- **Uji performa:** cek di DevTools dengan CPU throttling 4x dan di HP sungguhan sebelum tahap dianggap selesai.

---

## 7. Responsif

| Breakpoint | Lebar | Perilaku |
|---|---|---|
| default | < 768px | 1 kolom, padding `p-6` |
| `md` | ≥ 768px | Bento 3 kolom |
| `lg` | ≥ 1024px | Container lebih lebar, tipografi desktop penuh |

- Desain **mobile-first**: tulis kelas dasar untuk mobile, lalu tambahkan `md:` / `lg:`.
- Uji minimal di lebar **375px**, **768px**, dan **1280px**.
- Tidak boleh ada scroll horizontal pada body.
- Gambar responsif (`max-w-full`, `h-auto`) dan memakai `loading="lazy"` bila di bawah lipatan layar.

---

## 8. Dua Bahasa (ID / EN) dan Desain

- Panjang teks Indonesia dan Inggris berbeda. Jangan memakai lebar tetap yang membuat teks terpotong.
- Hindari tombol/badge dengan lebar tetap; biarkan mengikuti isi (`px` + `w-auto`).
- Uji tampilan di **kedua bahasa** sebelum tahap dianggap selesai.

---

## 9. Aset dan Ikon

- Ikon: gunakan satu set konsisten, misalnya **lucide-react** (tanyakan dulu sebelum menambah dependensi).
- Gambar proyek: format **WebP**/optimasi ukuran. Jangan mengunggah gambar mentah berukuran besar.
- Favicon: satu emoji atau monogram sederhana berwarna `indigo-brand`.
- Gunakan **gambar/placeholder dummy** untuk proyek instansi sampai izin publikasi dikonfirmasi (lihat `AGENT.md` bagian 10).

---

## 10. Referensi Gaya (Inspirasi, Bukan Untuk Disalin)

- Bento grid portfolio (misalnya template di Figma Community, Astro, Webflow)
- Kurasi desain modern: Awwwards (kategori Portfolio), Godly, Minimal Gallery
- Dribbble / Behance: cari "developer portfolio", "bento portfolio"

**Aturan:** ambil **prinsipnya** (susunan, spacing, ritme warna), jangan menjiplak satu desain utuh.

---

## 11. Do dan Don't

**Do**
- Konsisten memakai token warna, font, dan radius yang sama di semua tempat.
- Beri ruang kosong (whitespace) yang cukup di antara kartu.
- Pastikan kontras teks memenuhi standar.
- Utamakan keterbacaan dan kecepatan muat.

**Don't**
- Jangan memakai lebih dari 4 warna aksen dan jangan menambah warna di luar palet tanpa persetujuan.
- Jangan mencampur banyak gaya sudut (tajam dan membulat) dalam satu halaman.
- Jangan memakai teks putih di atas `coral`, `mint`, atau `sun`.
- Jangan membuat animasi tanpa tujuan, tanpa token motion, atau yang tidak bisa dimatikan lewat `prefers-reduced-motion`.
- Jangan menampilkan data atau screenshot asli proyek instansi tanpa konfirmasi.

---

## 12. Checklist Desain Sebelum Tahap Dianggap Selesai

- [ ] Hanya memakai token warna dan font dari `@theme`
- [ ] Kontras teks sesuai tabel (khususnya `coral`)
- [ ] Rapi di 375px, 768px, dan 1280px; tanpa scroll horizontal
- [ ] Tampilan baik di bahasa ID **dan** EN
- [ ] Tombol/tautan punya state hover dan fokus keyboard yang jelas
- [ ] Animasi memakai token dari `src/lib/motion.ts`, berjalan mulus (uji CPU throttling), dan menghormati `prefers-reduced-motion`
- [ ] Lolos checklist Anti AI-Slop (bagian 13) dan aturan konten (bagian 14)
- [ ] Spacing, radius, dan ukuran kartu konsisten
- [ ] Gambar dioptimasi dan memiliki teks `alt`

---

## 13. Anti AI-Slop

"AI-slop" adalah tampilan dan tulisan generik khas hasil AI: terlihat rapi tapi tanpa kepribadian dan bisa dipasang di portofolio siapa saja. Portofolio ini **harus terasa seperti milik Gilang**, bukan template.

### Ciri slop yang DILARANG
- Gradasi ungu-ke-biru (atau neon) di mana-mana, teks gradasi di semua judul, blob/orb gradasi melayang sebagai dekorasi tanpa makna
- Efek glassmorphism dan bayangan lembut berlebihan di semua kartu
- Deretan 3 kartu identik "ikon + judul + deskripsi" sebagai satu-satunya layout
- Emoji sebagai ikon fitur atau skill
- Semua elemen rata tengah, semua kartu sama besar, semua jarak sama (tanpa hierarki)
- Hero generik: "Welcome to my portfolio", "Hi, I'm ..., a passionate developer"
- Kata klise: *passionate, cutting-edge, crafting digital experiences, innovative solutions, seamless, leverage*
- Teks lorem ipsum, ilustrasi stock generik, foto stock orang tersenyum
- Statistik/testimoni/klaim karangan ("50+ proyek", "100% puas")
- Animasi fade-up identik pada semua elemen tanpa variasi

### Yang HARUS ada (tanda desain yang disengaja)
- **Satu tanda pengenal visual (visual signature).** Usulan: tipografi display yang besar dan berani, kartu color-block dengan sudut membulat, dan satu micro-interaction khas (misalnya efek hover kartu atau reveal judul). Usulan ini perlu **divalidasi Gilang** sebelum dikunci.
- **Hierarki jelas:** ada elemen yang sangat dominan, ada yang kecil. Ukuran kartu bento bervariasi dengan alasan.
- **Palet disiplin:** warna datar (flat) sebagai dasar. Gradasi hanya boleh sangat halus dan terbatas (misalnya placeholder thumbnail), bukan sebagai gaya utama.
- **Detail yang spesifik:** tag stack dengan font mono, label "sedang dipelajari", urutan section yang masuk akal untuk seorang backend developer.
- **Konten nyata,** bukan pengisi.

### Uji "siapa saja bisa pakai"
Sebelum menyerahkan tahap, tanyakan: *"Apakah halaman ini masih sama jika nama dan isinya diganti orang lain?"* Jika ya, berarti masih slop. Tambahkan kekhasan atau konten yang spesifik.

---

## 14. Aturan Konten dan Penulisan (Isi Web)

Isi web sama pentingnya dengan tampilannya.

- **Tulis dengan suara Gilang:** lugas, jujur, spesifik, tidak berlebihan. Hindari kata klise (lihat bagian 13).
- **Spesifik > umum.** Contoh buruk: "Saya developer yang passionate di bidang teknologi." Contoh baik: "Backend developer yang membangun sistem dengan Laravel dan MySQL, sedang belajar React dan TypeScript."
- **Jangan mengarang.** Agent **dilarang** membuat angka, pengalaman, pencapaian, atau testimoni yang tidak diberikan Gilang. Jika butuh isi, **tanyakan dulu** atau tandai sebagai placeholder yang jelas (`TODO`), jangan diisi karangan.
- **Jujur soal level skill:** skill yang masih dipelajari harus diberi label "learning".
- **Kalimat pendek,** paragraf pendek, satu ide per kalimat. Judul section singkat dan bermakna.
- **Dua bahasa dengan kualitas setara:** versi EN bukan terjemahan kaku, dan versi ID bukan terjemahan mentah. Keduanya ditulis wajar dan natural.
- **Deskripsi proyek** mengikuti pola: masalah, peran Gilang, teknologi, hasil. Hindari klaim tanpa bukti.
- **Microcopy** (tombol, label, pesan kosong) ikut dirancang: jelas, ramah, tidak generik ("Klik di sini" dihindari).

---

## 15. Ikon Teknologi dan Visual Playful

### 15.1 Spesifikasi Stiker Teknologi (`TechSticker`)
- **Visual Stiker:** Kotak putih `bg-white`, sudut membulat `rounded-2xl`, border tipis `border border-ink/10`, bayangan halus `shadow-xs`.
- **Ikon Brand:** Menggunakan ikon resmi dari `react-icons` (`Si` dan `Fa`) dengan warna brand resmi. Ikon dekoratif diberi atribut `aria-hidden="true"`; nama teknologi tetap tersedia sebagai teks untuk aksesibilitas.
- **Hero Section:** Maksimal 5–6 stiker mengelilingi kartu foto profil.
- **Perilaku Gerak:**
  - *Hover pop/tilt:* Skala naik sedikit dengan rotasi dinamis (`hover:scale-105 hover:rotate-2`).
  - *Draggable:* Dapat ditarik kursor pengguna dengan batas (*drag constraints*) dan otomatis kembali ke posisi asal dengan fisika pegas (`dragSnapToOrigin={true}`).
  - *Idle Motion:* Gerak mengambang halus vertikal dengan amplitudo kecil (pengecualian terbatas dari larangan loop animasi).
  - *Aksesibilitas:* Seluruh animasi gerak dimatikan saat `prefers-reduced-motion: reduce`.

### 15.2 Kartu Visual Backend Pengganti Teks Panjang
- Pengganti paragraf teks panjang dengan visualisasi teknis backend yang representatif:
  - **`TerminalCard`:** Cuplikan baris perintah generik CLI (`php artisan serve`) dengan efek kursor berkedip dan status runtime server.
  - **`EndpointCard`:** Visualisasi endpoint RESTful HTTP dengan badge metode (`GET`, `POST`), status respons `200 OK`, serta cuplikan payload JSON pendek.
- **Batasan Konten:**
  - Isi kartu **wajib generik dan ilustratif**; tidak boleh menampilkan data, endpoint privat, atau nama tabel instansi nyata.
  - Batas teks per kartu: Judul maksimal 4 kata, deskripsi maksimal sekitar 20 kata, satu konsep inti per kartu.

### 15.3 Marquee Ikon Teknologi (`TechMarquee`)
- Deretan stiker teknologi berjalan horizontal secara kontinu.
- **Interaksi:** Otomatis berhenti berputar (*pause animation*) saat kursor diarahkan (*hover*) atau saat sistem mendeteksi preferensi `prefers-reduced-motion`.

import type { Project } from '../types'

/**
 * Single Source of Truth untuk data proyek portofolio.
 * Dianalogikan seperti Database Seeder di Laravel:
 * Menambahkan atau mengubah proyek baru cukup dilakukan di file ini
 * tanpa perlu menyentuh komponen visual tampilan.
 */
export const PROJECTS: Project[] = [
  {
    id: 'sistem-layanan-terpadu',
    slug: 'sistem-layanan-terpadu',
    title: {
      id: 'Sistem Informasi Layanan Instansi Terpadu',
      en: 'Integrated Public Service Information System',
    },
    summary: {
      id: 'Platform layanan publik instansi berbasis web dengan arsitektur peran bertingkat (RBAC), audit logging terpusat, dan optimasi query relasional.',
      en: 'Web-based public service platform featuring multi-level RBAC, centralized audit logging, and relational query optimization.',
    },
    description: {
      id: 'Dirancang untuk memfasilitasi alur verifikasi berkas berjenjang antar-divisi instansi, dilengkapi validasi transaksi basis data dan laporan dinamis.',
      en: 'Engineered to streamline multi-stage verification workflows across departments with transactional database integrity and dynamic reporting.',
    },
    problem: {
      id: 'Proses verifikasi permohonan yang sebelumnya dilakukan secara fisik membutuhkan waktu lama dan rentan terhadap inkonsistensi pencatatan disposisi antar-bagian.',
      en: 'Legacy manual administrative application pipelines suffered from repetitive paperwork, opaque multi-stage verifications, and untracked document dispositions.',
    },
    architecture: {
      id: 'Menggunakan Laravel MVC dengan pemisahan Service Layer untuk isolasi alur validasi, skema relasional MySQL InnoDB terindeks, dan middleware RBAC untuk hak akses ketat.',
      en: 'Built with Laravel MVC utilizing a Service Layer pattern for workflow validation, indexed MySQL InnoDB schemas with foreign key integrity, and RBAC middleware safeguarding permissions.',
    },
    role: {
      id: 'Backend Developer & Database Architect',
      en: 'Backend Developer & Database Architect',
    },
    techStack: ['PHP 8+', 'Laravel', 'MySQL', 'REST API', 'Tailwind CSS'],
    links: {
      repo: 'https://github.com/example/layanan-terpadu',
      demo: 'https://demo.example.com',
    },
    year: 2024,
    featured: true,
    status: 'completed',
  },
  {
    id: 'api-manajemen-logistik',
    slug: 'api-manajemen-logistik',
    title: {
      id: 'RESTful API Manajemen Inventaris & Logistik',
      en: 'Inventory & Logistics Management RESTful API',
    },
    summary: {
      id: 'Backend service untuk pelacakan alur barang keluar-masuk, validasi mutasi stok atomik, dan autentikasi token JWT terenkripsi.',
      en: 'Backend service for tracking stock flow, atomic stock validation with DB transactions, and encrypted JWT token authentication.',
    },
    description: {
      id: 'Mengimplementasikan isolasi transaksi ACID untuk mencegah race condition pada pembaruan stok simultan di beberapa gudang cabang.',
      en: 'Implemented ACID transactional isolation to prevent race conditions during simultaneous stock updates across multi-branch warehouses.',
    },
    problem: {
      id: 'Pencatatan mutasi stok antar-gudang cabang yang berjalan serentak rentan mengalami race condition dan inkonsistensi saldo barang tanpa mekanisme konkurensi terstruktur.',
      en: 'Simultaneous cross-warehouse inventory mutations were susceptible to race conditions and balance discrepancies without structured database concurrency controls.',
    },
    architecture: {
      id: 'Spring Boot RESTful micro-service dengan PostgreSQL ACID transactions, row-level locking pada saat checkout stok, dan token JWT stateless untuk autentikasi antarsistem.',
      en: 'Spring Boot RESTful micro-service featuring PostgreSQL ACID transactions, row-level locking on inventory deduction, and stateless JWT tokens for authentication.',
    },
    role: {
      id: 'Backend Engineer',
      en: 'Backend Engineer',
    },
    techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Docker'],
    links: {
      repo: 'https://github.com/example/inventory-api',
    },
    year: 2024,
    featured: false,
    status: 'completed',
  },
  {
    id: 'e-ticketing-booking',
    slug: 'e-ticketing-booking',
    title: {
      id: 'Sistem Pemesanan & Validasi Tiket Digital',
      en: 'Digital E-Ticketing & Booking Validation System',
    },
    summary: {
      id: 'Sistem alur reservasi tiket dengan mekanisme pencegahan double-booking berbasis row-level locking dan integrasi verifikasi kode QR.',
      en: 'Ticket reservation flow with double-booking prevention using row-level locking and QR code verification.',
    },
    description: {
      id: 'Mengamankan alur reservasi kursi saat lonjakan pengguna secara bersamaan serta menyediakan endpoint validasi scan gerbang masuk.',
      en: 'Secured seat reservations during concurrent user spikes and provided scanner gateway verification endpoints.',
    },
    problem: {
      id: 'Lonjakan pesanan tiket pada jam sibuk menyebabkan risiko double-booking kursi yang sama serta kebutuhan verifikasi cepat kode tiket saat penonton memasuki gerbang.',
      en: 'Traffic spikes during peak booking windows caused potential double-booking risks for identical seats and required sub-second validation upon venue entry.',
    },
    architecture: {
      id: 'Laravel backend yang memanfaatkan transaksi atomik dengan database lock pada alur pemilihan kursi, serta endpoint validasi QR code terenkripsi.',
      en: 'Laravel backend leveraging atomic transactions with database locking during seat reservation, alongside encrypted QR code validation endpoints.',
    },
    role: {
      id: 'Full-Stack Developer (Backend Focus)',
      en: 'Full-Stack Developer (Backend Focus)',
    },
    techStack: ['PHP', 'Laravel', 'MySQL', 'REST API', 'Redis'],
    links: {
      repo: 'https://github.com/example/e-ticketing',
      demo: 'https://demo.example.com',
    },
    year: 2023,
    featured: false,
    status: 'completed',
  },
  {
    id: 'developer-portfolio-modern',
    slug: 'developer-portfolio-modern',
    title: {
      id: 'Modern Engineering Developer Portfolio',
      en: 'Modern Engineering Developer Portfolio',
    },
    summary: {
      id: 'Website portofolio rekayasa sistem yang memisahkan lapisan konten data, sistem desain bento semi-colorful, dan micro-interaction 60 FPS.',
      en: 'System engineering portfolio with decoupled data layer, semi-colorful bento design system, and 60 FPS micro-interactions.',
    },
    description: {
      id: 'Dibangun untuk mempublikasikan proyek backend secara modular sekaligus mengeksplorasi ekosistem frontend modern berbasis React dan TypeScript.',
      en: 'Built to publish backend projects modularly while actively exploring modern frontend ecosystems with React and TypeScript.',
    },
    problem: {
      id: 'Portofolio backend sering kali kaku dan tidak memisahkan lapisan konten data, sehingga penambahan proyek baru merepotkan dan merusak kode tampilan visual.',
      en: 'Traditional developer portfolios often mix content and presentation, making new entries difficult to maintain and risking visual regression.',
    },
    architecture: {
      id: 'Arsitektur decoupled konten data statis berbasis React 19 dan TypeScript strict mode, dipadukan dengan Tailwind CSS v4 design tokens dan animasi 60 FPS Framer Motion.',
      en: 'Decoupled data layer architecture leveraging React 19 and strict TypeScript, styled with Tailwind CSS v4 design tokens and powered by 60 FPS Framer Motion tokens.',
    },
    role: {
      id: 'Frontend & System Explorer',
      en: 'Frontend & System Explorer',
    },
    techStack: ['TypeScript', 'React 19', 'Tailwind v4', 'Framer Motion', 'Vite'],
    links: {
      repo: 'https://github.com/example/portfolio',
    },
    year: 2024,
    featured: false,
    status: 'completed',
  },
]

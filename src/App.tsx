import React from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { BentoCard } from './components/BentoCard'
import { ArrowUpRight, FolderGit2, Mail } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink antialiased selection:bg-indigo-brand selection:text-white">
      {/* 1. Navigasi Global */}
      <Navbar />

      {/* 2. Konten Utama */}
      <main className="mx-auto max-w-6xl px-6 py-8 md:px-12 md:py-12 space-y-16 md:space-y-24">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: About & Skills Bento */}
        <AboutSection />

        {/* Section 3: Katalog Proyek (Placeholder Persiapan Tahap 4) */}
        <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
                Portofolio Rekayasa
              </p>
              <h2 id="projects-title" className="mt-1 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                Proyek &amp; Implementasi Sistem
              </h2>
            </div>
            <span className="font-mono text-xs text-ink/60">
              Menuju Tahap 4: Modular Data Layer &amp; ProjectCard
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            <BentoCard variant="sun" className="flex min-h-[220px] flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-ink/10 px-3 py-1 font-mono text-xs font-semibold text-ink">
                  Highlight Proyek Unggulan
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">
                  Sistem Informasi &amp; Layanan Publik Terintegrasi
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">
                  Arsitektur backend modular dengan role-based access control (RBAC), audit logging, dan orkestrasi basis data relasional.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between font-mono text-xs text-ink/75">
                <span>PHP &bull; Laravel &bull; MySQL</span>
                <span className="flex items-center gap-1 font-semibold text-ink">
                  Siap di Tahap 4 <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </BentoCard>

            <BentoCard variant="white" className="flex min-h-[220px] flex-col justify-between">
              <div>
                <span className="inline-block rounded-full bg-ink/5 px-3 py-1 font-mono text-xs font-semibold text-ink/70">
                  Data Layer Decoupling
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">
                  Single Source of Truth Konten
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  Pada Tahap 4, seluruh data proyek akan dipisahkan ke modul <code className="font-mono text-xs bg-ink/5 px-1 py-0.5 rounded">src/data/projects.ts</code> sehingga penambahan portofolio baru cukup memperbarui satu file data.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 font-mono text-xs text-ink/60">
                <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                <span>src/data/projects.ts</span>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* Section 4: Kontak & Komunikasi Langsung */}
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 pb-8">
          <BentoCard variant="indigo" className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-medium text-white">
                Komunikasi Langsung
              </span>
              <h2 id="contact-title" className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                Mari Diskusikan Peluang atau Kolaborasi Sistem
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
                Terbuka untuk posisi Backend Developer, Magang Industri, maupun proyek rekayasa perangkat lunak.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:gilangpratama@example.com"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-xs font-bold text-ink shadow-xs transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Kirim Email</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 font-display text-xs font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 font-display text-xs font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9M7.86 18.5V10.13H5.07v8.37h2.79z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </BentoCard>
        </section>
      </main>

      {/* 3. Footer Sederhana */}
      <footer className="border-t border-ink/5 bg-cream py-8 text-center">
        <div className="mx-auto max-w-6xl px-6 font-mono text-xs text-ink/60">
          <p>&copy; {CURRENT_YEAR} Gilang Pratama Putra &bull; Dikembangkan dengan React 19, TypeScript, Tailwind v4 &amp; Motion</p>
        </div>
      </footer>
    </div>
  )
}

export default App

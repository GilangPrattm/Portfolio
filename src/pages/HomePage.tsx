import React from 'react'
import { HeroSection } from '../sections/HeroSection'
import { AboutSection } from '../sections/AboutSection'
import { TextPortalTransition } from '../components/TextPortalTransition'
import { ProjectsSection } from '../sections/ProjectsSection'
import { ContactSection } from '../sections/ContactSection'
import { TopoBackground } from '../components/TopoBackground'

export const HomePage: React.FC = () => {
  return (
    /*
     * Layout Halaman Beranda — Alur Visual:
     *
     *  ┌────────────────────────────────────────────────────────┐
     *  │  AREA GELAP / HITAM (Full-Bleed #08090d)              │
     *  │  ┌──────────────────────────────────────────────────┐  │
     *  │  │  TopoBackground (tone="cream", WebGL GPU 60fps)  │  │
     *  │  │  Satu background animasi kontinyu dari atas ke   │  │
     *  │  │  bawah, memanjang menyelimuti Hero, Tentang,     │  │
     *  │  │  Keahlian, hingga Transisi Portal tanpa putus!   │  │
     *  │  └──────────────────────────────────────────────────┘  │
     *  │                                                        │
     *  │  1. HeroSection          (Page Paling Atas - Hitam)    │
     *  │  2. AboutSection         (Tentang & Keahlian - Hitam)  │
     *  │  3. TextPortalTransition (Kata "PROJECT" Zoom Menembus)│
     *  └────────────────────────────────────────────────────────┘
     *  ┌────────────────────────────────────────────────────────┐
     *  │  AREA TERANG (Bright Mode #faf7f2 / bg-cream)          │
     *  │  4. ProjectsSection      (Krem / Terang)               │
     *  │  5. ContactSection       (Krem / Terang)               │
     *  └────────────────────────────────────────────────────────┘
     */
    <div className="flex flex-col">
      {/* ── 1. AREA GELAP (Hero + Tentang & Keahlian + Portal Transisi) ── */}
      <div className="relative w-full bg-[#08090d] text-white">
        {/*
         * SATU background animasi kontinyu yang memanjang dari page paling atas
         * (Hero) ke bawah (Tentang, Keahlian, sampai Portal).
         * Menggunakan sticky top-0 h-screen dengan -mb-[100vh] sehingga tetap di
         * viewport sepanjang area gelap tanpa membuat jarak/gap kosong.
         */}
        <div className="sticky top-0 h-screen w-full pointer-events-none -mb-[100vh] z-0 overflow-hidden">
          <TopoBackground
            tone="cream"
            opacity={0.28}
            speed={0.6}
            interactive={true}
            className="w-full h-full"
          />
        </div>

        {/* Konten Area Gelap (relative z-10 agar berada di atas canvas animasi) */}
        <div className="relative z-10 flex flex-col">
          <HeroSection />
          <AboutSection />
          <TextPortalTransition word="PROJECT" id="projects-portal" />
        </div>
      </div>

      {/* ── 2. AREA TERANG (Proyek & Kontak) ── */}
      <div className="relative z-10 w-full bg-cream text-ink">
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  )
}

export default HomePage

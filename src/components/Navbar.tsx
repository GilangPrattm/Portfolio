import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'
import { SPRING } from '../lib/motion'

/**
 * Navbar — Floating island capsule dengan:
 * - ScrollSpy akurat via IntersectionObserver + Bottom-of-Page Detection
 * - Gliding pill indicator biru (indigo-brand) untuk section aktif
 * - Dark mode otomatis saat berada di area hitam (Hero, About, Portal)
 * - Light mode otomatis saat berada di area terang (Projects, Contact)
 * - Mobile dropdown menu responsif
 */
export const Navbar: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Flag untuk mencegah overwrite dari scroll spy saat user mengklik menu navigasi
  const isManualClick = useRef(false)
  const visibleSections = useRef<Set<string>>(new Set())

  const isHome = location.pathname === '/'
  const getHref = (hash: string) => (isHome ? hash : `/${hash}`)

  const navItems = [
    { id: 'about', label: t('nav.about'), href: getHref('#about') },
    { id: 'projects', label: t('nav.projects'), href: getHref('#projects') },
    { id: 'contact', label: t('nav.contact'), href: getHref('#contact') },
  ]

  // ── 1. Deteksi scroll untuk background capsule navbar & bottom page ───────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      if (!isHome) return

      // Jika user sedang dalam animasi klik nav item, jangan timpa
      if (isManualClick.current) return

      // Deteksi jika scroll sudah mencapai bagian bawah halaman (Area Kontak)
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120
      if (isBottom) {
        setActiveSection('contact')
        return
      }

      // Jika berada di paling atas halaman (Hero Section), reset highlight agar bersih
      if (window.scrollY < 200) {
        setActiveSection(null)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // ── 2. ScrollSpy via IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    if (!isHome) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualClick.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.current.add(entry.target.id)
          } else {
            visibleSections.current.delete(entry.target.id)
          }
        })

        // Prioritas 1: Jika sudah di dekat dasar halaman, pasti Kontak
        const isBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120
        if (isBottom || visibleSections.current.has('contact')) {
          setActiveSection('contact')
          return
        }

        // Prioritas 2: Proyek atau Portal Proyek
        if (visibleSections.current.has('projects')) {
          setActiveSection('projects')
          return
        }

        if (visibleSections.current.has('projects-portal')) {
          setActiveSection('projects-portal')
          return
        }

        // Prioritas 3: Tentang
        if (visibleSections.current.has('about')) {
          setActiveSection('about')
          return
        }

        // Jika scroll di paling atas (Hero)
        if (window.scrollY < 200) {
          setActiveSection(null)
        }
      },
      {
        rootMargin: '-10% 0px -30% 0px',
        threshold: [0.05, 0.2],
      },
    )

    const ids = ['about', 'projects-portal', 'projects', 'contact']
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [isHome])

  // ── 3. Dark Mode Navbar ───────────────────────────────────────────────────
  // Aktif di seluruh Area Gelap (Hero, About, dan Portal Transisi)
  const isDarkMode =
    isHome &&
    (activeSection === null ||
      activeSection === 'about' ||
      activeSection === 'projects-portal')

  const isNavActive = isScrolled || isMobileMenuOpen

  // Resolusi ID aktif ke tab yang ada di navItems (hanya aktif di beranda)
  const resolveActiveNavId = (section: string | null): string | null => {
    if (!isHome || !section) return null
    if (section === 'projects-portal') return 'projects'
    return section
  }

  const activeNavId = resolveActiveNavId(activeSection)
  const activeHref = activeNavId ? getHref(`#${activeNavId}`) : null
  const currentHighlight = hoveredHref || activeHref

  // Handler klik link navigasi agar seketika menyorot tab yang dipilih
  const handleNavClick = (id: string) => {
    setActiveSection(id)
    setHoveredHref(null)
    setIsMobileMenuOpen(false)
    isManualClick.current = true
    // Beri waktu animasi scroll browser berjalan sebelum observer mengambil alih lagi
    setTimeout(() => {
      isManualClick.current = false
    }, 900)
  }

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      {/* Floating Island / Capsule Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={SPRING.smooth}
        className={`pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 rounded-full px-2 py-1.5 transition-all duration-300 ease-out ${
          isDarkMode
            ? 'border border-white/15 bg-zinc-950/85 backdrop-blur-xl shadow-2xl shadow-black/50 text-white'
            : isNavActive
              ? 'border border-ink/10 bg-cream/90 backdrop-blur-xl shadow-lg shadow-ink/5 text-ink'
              : 'border border-transparent bg-transparent shadow-none backdrop-blur-none text-ink'
        }`}
      >
        {/* Brand */}
        <Link
          to="/"
          aria-label="Kembali ke beranda"
          onClick={() => {
            setActiveSection(null)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className={`group flex items-center gap-2 rounded-full pl-1.5 pr-2.5 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand ${
            isDarkMode ? 'text-white' : 'text-ink'
          }`}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-brand font-mono text-xs font-bold text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
            G
          </span>
          <span className="font-display text-sm font-bold tracking-tight hidden xs:inline-block">
            Gilang
          </span>
        </Link>

        {/* Desktop Nav Items dengan Gliding Tab Indicator Biru */}
        <nav
          aria-label="Navigasi Utama"
          onMouseLeave={() => setHoveredHref(null)}
          className="relative hidden items-center gap-0.5 md:flex"
        >
          {navItems.map((item) => {
            const isHighlighted = currentHighlight === item.href
            return (
              <a
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                onClick={() => handleNavClick(item.id)}
                className={`relative z-10 rounded-full px-3.5 py-1.5 font-display text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand ${
                  isHighlighted
                    ? 'text-white'
                    : isDarkMode
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-ink/70 hover:text-ink'
                }`}
              >
                {/* Gliding Pill Biru (60% Warna Utama) */}
                {isHighlighted && (
                  <motion.span
                    layoutId="navbarActiveGlidingPill"
                    className="absolute inset-0 z-[-1] rounded-full bg-indigo-brand shadow-md shadow-indigo-brand/25"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Separator */}
        <div
          className={`hidden h-4 w-px transition-colors duration-300 md:block ${
            isDarkMode
              ? 'bg-white/15'
              : isNavActive
                ? 'bg-ink/10'
                : 'bg-transparent'
          }`}
        />

        {/* Sisi Kanan: Language Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-1.5">
          <LanguageToggle isDark={isDarkMode} />

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand md:hidden ${
              isDarkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : isNavActive
                  ? 'bg-ink/5 text-ink hover:bg-ink/10'
                  : 'bg-transparent text-ink hover:bg-ink/5'
            }`}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* Floating Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={SPRING.snappy}
            className={`pointer-events-auto mt-2 w-72 overflow-hidden rounded-3xl p-3 shadow-2xl backdrop-blur-xl md:hidden ${
              isDarkMode
                ? 'border border-white/15 bg-zinc-950/95 text-white'
                : 'border border-ink/10 bg-cream/95 text-ink'
            }`}
          >
            <nav aria-label="Navigasi Mobile" className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = activeNavId === item.id
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    className={`rounded-2xl px-4 py-2.5 font-display text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand ${
                      isActive
                        ? 'bg-indigo-brand text-white shadow-sm shadow-indigo-brand/20'
                        : isDarkMode
                          ? 'text-zinc-300 hover:bg-white/10'
                          : 'text-ink hover:bg-ink/5'
                    }`}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

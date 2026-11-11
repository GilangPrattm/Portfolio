import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'
import { SPRING } from '../lib/motion'

export const Navbar: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isHome = location.pathname === '/'
  const getHref = (hash: string) => (isHome ? hash : `/${hash}`)

  const navItems = [
    { label: t('nav.about'), href: getHref('#about') },
    { label: t('nav.skills'), href: getHref('#skills') },
    { label: t('nav.projects'), href: getHref('#projects') },
    { label: t('nav.contact'), href: getHref('#contact') },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isNavActive = isScrolled || isMobileMenuOpen

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      {/* Floating Island / Capsule Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={SPRING.smooth}
        className={`pointer-events-auto flex items-center justify-between gap-1 sm:gap-2 rounded-full px-2 py-1.5 transition-all duration-300 ease-out ${
          isNavActive
            ? 'border border-ink/10 bg-cream/85 backdrop-blur-xl shadow-lg shadow-ink/5'
            : 'border border-transparent bg-transparent shadow-none backdrop-blur-none'
        }`}
      >
        {/* Brand Identitas: Monogram Pill */}
        <Link
          to="/"
          aria-label="Kembali ke beranda"
          className="group flex items-center gap-2 rounded-full pl-1.5 pr-2.5 py-1 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-xs font-bold text-cream transition-transform duration-200 group-hover:scale-105">
            G
          </span>
          <span className="font-display text-sm font-bold tracking-tight text-ink hidden xs:inline-block">
            Gilang
          </span>
        </Link>

        {/* Desktop Nav Items dengan Gliding Tab Indicator */}
        <nav
          aria-label="Navigasi Utama"
          onMouseLeave={() => setHoveredId(null)}
          className="relative hidden items-center gap-0.5 md:flex"
        >
          {navItems.map((item) => {
            const isHovered = hoveredId === item.href
            return (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredId(item.href)}
                className="relative z-10 rounded-full px-3.5 py-1.5 font-display text-xs font-semibold text-ink/75 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
              >
                {/* Gliding Pill Indicator (Spring Physics ala Sean Halpin) */}
                {isHovered && (
                  <motion.span
                    layoutId="seanHalpinGlidingPill"
                    className="absolute inset-0 z-[-1] rounded-full bg-white shadow-xs border border-ink/5"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Separator Garis Halus */}
        <div
          className={`hidden h-4 w-px transition-colors duration-300 md:block ${
            isNavActive ? 'bg-ink/10' : 'bg-transparent'
          }`}
        />

        {/* Sisi Kanan: Language Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-1.5">
          <LanguageToggle />

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand md:hidden ${
              isNavActive ? 'bg-ink/5 text-ink hover:bg-ink/10' : 'bg-transparent text-ink hover:bg-ink/5'
            }`}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.div>

      {/* Floating Dropdown Menu untuk Mobile View */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={SPRING.snappy}
            className="pointer-events-auto mt-2 w-72 overflow-hidden rounded-3xl border border-ink/10 bg-cream/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
          >
            <nav aria-label="Navigasi Mobile" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl px-4 py-2.5 font-display text-sm font-semibold text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar

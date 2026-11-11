import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'
import { SPRING } from '../lib/motion'

interface NavItem {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Kontak', href: '#contact' },
]

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/5 bg-cream/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        {/* Brand Identitas Sisi Kiri */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-ink focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink font-mono text-sm font-semibold text-cream transition-transform duration-200 group-hover:scale-105">
            G
          </span>
          <span className="text-ink">Gilang</span>
          <span className="hidden rounded-full bg-ink/5 px-2 py-0.5 font-mono text-xs font-medium text-ink/60 sm:inline-block">
            Backend Dev
          </span>
        </a>

        {/* Menu Navigasi Desktop */}
        <nav
          aria-label="Navigasi Utama Desktop"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Aksi Kanan: Language Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <LanguageToggle />

          {/* Tombol Hamburger Khusus Mobile */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/50 text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Panel Menu Navigasi Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRING.snappy}
            className="overflow-hidden border-b border-ink/10 bg-cream px-6 py-4 md:hidden"
          >
            <nav
              aria-label="Navigasi Utama Mobile"
              className="flex flex-col gap-2"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
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

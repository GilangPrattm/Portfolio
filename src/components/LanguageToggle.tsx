import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import type { Locale } from '../types'
import { SPRING } from '../lib/motion'

export interface LanguageToggleProps {
  currentLocale?: Locale
  onLocaleChange?: (locale: Locale) => void
  className?: string
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLocale: controlledLocale,
  onLocaleChange,
  className = '',
}) => {
  // Local state dengan inisialisasi aman dari localStorage
  const [internalLocale, setInternalLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem('portfolio_locale')
      if (saved === 'id' || saved === 'en') return saved
    } catch {
      // localStorage dinonaktifkan atau diakses di lingkungan terbatas
    }
    return 'id'
  })

  const activeLocale = controlledLocale ?? internalLocale

  const handleSelect = (locale: Locale) => {
    if (controlledLocale === undefined) {
      setInternalLocale(locale)
      try {
        localStorage.setItem('portfolio_locale', locale)
      } catch {
        // Abaikan error saat akses storage diblokir
      }
    }

    // Update atribut lang pada elemen html sesuai PRD.md Bagian 3.1
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }

    if (onLocaleChange) {
      onLocaleChange(locale)
    }
  }

  // Sinkronisasi atribut html lang saat pertama kali mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = activeLocale
    }
  }, [activeLocale])

  const options: { id: Locale; label: string }[] = [
    { id: 'id', label: 'ID' },
    { id: 'en', label: 'EN' },
  ]

  return (
    <div
      role="radiogroup"
      aria-label="Pilih bahasa tampilan"
      className={`relative inline-flex items-center rounded-full bg-ink/5 p-1 border border-ink/10 ${className}`}
    >
      {options.map((option) => {
        const isActive = activeLocale === option.id

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => handleSelect(option.id)}
            className={`relative z-10 flex min-h-[36px] min-w-[38px] items-center justify-center rounded-full px-3 text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand ${
              isActive ? 'text-cream font-semibold' : 'text-ink/70 hover:text-ink'
            }`}
          >
            {/* Indikator aktif animasi shared layoutId */}
            {isActive && (
              <motion.span
                layoutId="activeLanguagePill"
                className="absolute inset-0 z-[-1] rounded-full bg-ink"
                transition={SPRING.snappy}
              />
            )}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default LanguageToggle

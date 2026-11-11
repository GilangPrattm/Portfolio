import React from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import type { Locale } from '../types'
import { SPRING } from '../lib/motion'

export interface LanguageToggleProps {
  className?: string
  isDark?: boolean
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '', isDark = false }) => {
  const { i18n } = useTranslation()

  // Ambil bahasa aktif dari react-i18next, fallback ke 'id'
  const activeLocale: Locale = i18n.language?.startsWith('en') ? 'en' : 'id'

  const handleSelect = (locale: Locale) => {
    if (activeLocale !== locale) {
      i18n.changeLanguage(locale)
      try {
        localStorage.setItem('portfolio_locale', locale)
      } catch {
        // Abaikan saat akses local storage diblokir
      }
    }
  }

  const options: { id: Locale; label: string }[] = [
    { id: 'id', label: 'ID' },
    { id: 'en', label: 'EN' },
  ]

  return (
    <div
      role="radiogroup"
      aria-label="Pilih bahasa tampilan / Select display language"
      className={`relative inline-flex items-center rounded-full p-1 transition-colors ${
        isDark
          ? 'bg-white/10 border border-white/15'
          : 'bg-ink/5 border border-ink/10'
      } ${className}`}
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
            className={`relative z-10 flex min-h-[34px] min-w-[36px] items-center justify-center rounded-full px-2.5 text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand ${
              isActive
                ? 'text-white font-semibold'
                : isDark
                  ? 'text-zinc-400 hover:text-white'
                  : 'text-ink/70 hover:text-ink'
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

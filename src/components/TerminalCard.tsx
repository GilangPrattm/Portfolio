import React, { useState, useEffect, useRef } from 'react'
import { Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from 'motion/react'
import { BentoCard } from './BentoCard'

export interface TerminalCardProps {
  className?: string
}

export const TerminalCard: React.FC<TerminalCardProps> = ({ className = '' }) => {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const fullCommand = 'php artisan serve'

  // Jika prefers-reduced-motion aktif, langsung tampilkan teks utuh tanpa efek ketik
  const [displayedCommand, setDisplayedCommand] = useState(
    shouldReduceMotion ? fullCommand : ''
  )
  const [isTypingComplete, setIsTypingComplete] = useState(Boolean(shouldReduceMotion))
  const hasStartedRef = useRef(false)

  useEffect(() => {
    // Jika pengurangan gerak aktif, tidak perlu menjalankan timer ketik
    if (shouldReduceMotion) return

    // Efek ketik HANYA berjalan satu kali saat mount (tidak berulang saat re-render / ganti bahasa)
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    let index = 0
    const intervalId = setInterval(() => {
      index++
      setDisplayedCommand(fullCommand.slice(0, index))
      if (index >= fullCommand.length) {
        clearInterval(intervalId)
        setIsTypingComplete(true)
      }
    }, 90)

    return () => clearInterval(intervalId)
  }, [shouldReduceMotion])

  return (
    <BentoCard variant="white" className={`flex flex-col justify-between ${className}`}>
      {/* Teks Lengkap untuk Pembaca Layar (Screen Reader) */}
      <div className="sr-only" aria-live="polite">
        Terminal backend CLI: Perintah {fullCommand}. Output: INFO Server running on http://127.0.0.1:8000.
      </div>

      <div>
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
          <Terminal className="h-3.5 w-3.5 text-indigo-brand" aria-hidden="true" />
          <span>{t('visualCards.terminal.tag')}</span>
        </div>

        {/* Judul: Maksimal 4 kata */}
        <h3 className="mt-2 font-display text-xl font-bold text-ink md:text-2xl">
          {t('visualCards.terminal.title')}
        </h3>

        {/* Deskripsi: Maksimal ~20 kata, satu ide */}
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          {t('visualCards.terminal.desc')}
        </p>
      </div>

      {/* Visualisasi Terminal (aria-hidden untuk mencegah pembaca layar mengeja per huruf) */}
      <div
        aria-hidden="true"
        className="mt-5 overflow-hidden rounded-2xl border border-ink/15 bg-ink p-4 font-mono text-xs shadow-inner select-none"
      >
        {/* Kontrol Window Dot */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[10px] text-white/40">bash &bull; 8000</span>
        </div>

        {/* Baris Perintah */}
        <div className="text-white/90">
          <span className="text-mint font-semibold mr-2">$</span>
          <span>{displayedCommand}</span>
          {!isTypingComplete && !shouldReduceMotion && (
            <span className="inline-block h-3.5 w-1.5 bg-mint ml-1 align-middle animate-pulse" />
          )}
        </div>

        {/* Output Server Generik */}
        <div className="mt-2 space-y-1 text-[11px] text-white/60">
          <p className="text-mint/90">
            INFO Server running on [http://127.0.0.1:8000].
          </p>
          <p className="text-white/40">
            Press Ctrl+C to stop the server
          </p>
        </div>
      </div>
    </BentoCard>
  )
}

export default TerminalCard

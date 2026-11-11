import React from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { BentoCardVariant } from '../types'
import { bentoHoverMotion } from '../lib/motion'

export interface BentoCardProps extends HTMLMotionProps<'div'> {
  /**
   * Pilihan warna aksen kartu bento.
   * Kontras warna teks ditangani secara otomatis:
   * - indigo: bg-indigo-brand text-white
   * - coral, mint, sun: background aksen + text-ink (Wajib kontras tinggi WCAG AA)
   * - white: bg-white text-ink border border-ink/10
   */
  variant?: BentoCardVariant
  /**
   * Aktifkan micro-interaction hover & tap.
   * Default: true.
   */
  interactive?: boolean
  /**
   * Konten di dalam kartu.
   */
  children: React.ReactNode
  /**
   * Kelas tambahan Tailwind (misal: col-span-2, flex flex-col, dsb).
   */
  className?: string
}

/**
 * Pemetaan warna tegas sesuai aturan DESIGN.md Bagian 2
 * Menjamin teks di atas coral, mint, dan sun SELALU text-ink (anti teks putih).
 */
const VARIANT_STYLES: Record<BentoCardVariant, string> = {
  indigo: 'bg-indigo-brand text-white selection:bg-white selection:text-indigo-brand shadow-lg shadow-indigo-brand/20',
  coral: 'bg-coral text-ink selection:bg-ink selection:text-coral shadow-md shadow-coral/15',
  mint: 'bg-mint text-ink selection:bg-ink selection:text-mint shadow-md shadow-mint/15',
  sun: 'bg-sun text-ink selection:bg-ink selection:text-sun',
  white: 'bg-white text-ink border border-ink/10 selection:bg-ink selection:text-cream shadow-xs',
  dark: 'bg-[#12131c]/90 text-white border border-white/10 backdrop-blur-md selection:bg-indigo-brand selection:text-white shadow-xl shadow-black/40',
}

export const BentoCard: React.FC<BentoCardProps> = ({
  variant = 'white',
  interactive = true,
  children,
  className = '',
  ...restProps
}) => {
  // Mendeteksi apakah sistem pengguna meminta pengurangan animasi gerak
  const shouldReduceMotion = useReducedMotion()

  const colorClasses = VARIANT_STYLES[variant]
  const baseClasses = 'relative rounded-3xl p-6 md:p-8 transition-colors overflow-hidden'

  // Jika prefers-reduced-motion aktif atau interactive=false, nonaktifkan animasi gerak kursor
  const isAnimated = interactive && !shouldReduceMotion

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover={isAnimated ? 'hover' : undefined}
      whileTap={isAnimated ? 'tap' : undefined}
      variants={isAnimated ? bentoHoverMotion : undefined}
      className={`${baseClasses} ${colorClasses} ${className}`}
      {...restProps}
    >
      {children}
    </motion.div>
  )
}

export default BentoCard

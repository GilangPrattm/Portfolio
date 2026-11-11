import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, Mail, Terminal } from 'lucide-react'
import {
  TRANSITION_EASE,
  DURATION,
  staggerContainerVariants,
  fadeUpVariants,
  buttonHoverMotion,
} from '../lib/motion'

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section aria-labelledby="hero-title" className="pt-4 pb-8 md:pt-10 md:pb-12">
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-start gap-6 max-w-4xl"
      >
        {/* Status Ketersediaan */}
        <motion.div
          variants={fadeUpVariants}
          className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 shadow-xs backdrop-blur-xs"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
          </span>
          <span className="font-mono text-xs font-medium text-ink">
            Tersedia untuk Magang &amp; Kerja Full-Time
          </span>
        </motion.div>

        {/* Mask Reveal Headline */}
        <div className="space-y-1">
          <div className="overflow-hidden">
            <motion.h1
              id="hero-title"
              initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
              transition={{ duration: DURATION.slow, ease: TRANSITION_EASE }}
              className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl md:text-7xl"
            >
              Gilang Pratama Putra
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
              transition={{ duration: DURATION.slow, ease: TRANSITION_EASE, delay: 0.12 }}
              className="flex items-center gap-2.5 font-display text-2xl font-bold text-indigo-brand sm:text-4xl md:text-5xl"
            >
              <Terminal className="h-6 w-6 text-indigo-brand md:h-10 md:w-10" aria-hidden="true" />
              <span>Backend Developer</span>
            </motion.div>
          </div>
        </div>

        {/* Value Proposition */}
        <motion.p
          variants={fadeUpVariants}
          className="max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg md:text-xl"
        >
          Mahasiswa Politeknik Negeri Jember yang berfokus pada arsitektur sistem server yang kokoh,
          integritas basis data relasional, dan penyusunan API terstruktur. Terbuka mengeksplorasi
          ekosistem frontend modern untuk menghasilkan rekayasa perangkat lunak yang menyeluruh.
        </motion.p>

        {/* Tombol Call to Action (CTA) */}
        <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4 pt-2">
          <motion.a
            href="#projects"
            variants={shouldReduceMotion ? undefined : buttonHoverMotion}
            initial="rest"
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            whileTap={shouldReduceMotion ? undefined : 'tap'}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ink px-7 py-3 font-display text-sm font-semibold text-cream shadow-xs transition-colors hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand focus-visible:ring-offset-2"
          >
            <span>Lihat Proyek</span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </motion.a>

          <motion.a
            href="#contact"
            variants={shouldReduceMotion ? undefined : buttonHoverMotion}
            initial="rest"
            whileHover={shouldReduceMotion ? undefined : 'hover'}
            whileTap={shouldReduceMotion ? undefined : 'tap'}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-ink/20 bg-transparent px-7 py-3 font-display text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand focus-visible:ring-offset-2"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>Hubungi Saya</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection

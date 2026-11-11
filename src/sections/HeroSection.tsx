import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowDown, Mail, Terminal, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import heroImage from '../assets/hero.png'
import { SKILLS } from '../data/skills'
import { TechSticker } from '../components/TechSticker'
import {
  TRANSITION_EASE,
  DURATION,
  SPRING,
  staggerContainerVariants,
  fadeUpVariants,
  buttonHoverMotion,
} from '../lib/motion'

// Maksimal 6 stiker playful di sekitar foto profil
const HERO_STICKERS = SKILLS.slice(0, 6)
const STICKER_POSITIONS = [
  '-top-3 left-2 sm:-top-5 sm:-left-6',
  '-top-3 right-2 sm:-top-6 sm:-right-5',
  'top-1/4 left-1 sm:-left-8',
  'top-1/2 right-1 sm:-right-8',
  'bottom-14 left-2 sm:-bottom-5 sm:-left-5',
  'bottom-14 right-2 sm:-bottom-6 sm:-right-5',
]

export const HeroSection: React.FC = () => {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      aria-labelledby="hero-title"
      className="relative pt-20 pb-8 sm:pt-24 md:pt-28 md:pb-12"
    >
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12"
      >
        {/* Kolom Kiri (Konten & Teks) */}
        <div className="flex flex-col items-start gap-6 lg:col-span-7">
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
                <span>{t('hero.role')}</span>
              </motion.div>
            </div>
          </div>

          <motion.p
            variants={fadeUpVariants}
            className="max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg"
          >
            {t('hero.valueProp')}
          </motion.p>

          <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center gap-4 pt-2">
            {/* CTA 1: 30% Warna Sekunder 1 (Vibrant Coral) */}
            <motion.a
              href="#projects"
              variants={shouldReduceMotion ? undefined : buttonHoverMotion}
              initial="rest"
              whileHover={shouldReduceMotion ? undefined : 'hover'}
              whileTap={shouldReduceMotion ? undefined : 'tap'}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/10 bg-coral px-7 py-3 font-display text-sm font-bold text-ink shadow-md shadow-coral/25 transition-all hover:bg-coral/90 hover:shadow-lg hover:shadow-coral/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2"
            >
              <span>{t('hero.ctaProjects')}</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </motion.a>

            {/* CTA 2: 60% Warna Utama (Electric Blue / Indigo) */}
            <motion.a
              href="#contact"
              variants={shouldReduceMotion ? undefined : buttonHoverMotion}
              initial="rest"
              whileHover={shouldReduceMotion ? undefined : 'hover'}
              whileTap={shouldReduceMotion ? undefined : 'tap'}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-indigo-brand bg-white/80 px-7 py-3 font-display text-sm font-bold text-indigo-brand shadow-xs transition-all hover:bg-indigo-brand hover:text-white hover:shadow-md hover:shadow-indigo-brand/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand focus-visible:ring-offset-2"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{t('hero.ctaContact')}</span>
            </motion.a>
          </motion.div>
        </div>

        {/* Kolom Kanan: Foto Profil dengan 6 Stiker Draggable Playful */}
        <motion.div
          variants={fadeUpVariants}
          className="flex justify-center lg:col-span-5 lg:justify-end"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm">
            {/* 6 Stiker Playful di Sekeliling Foto */}
            {HERO_STICKERS.map((skill, idx) => (
              <div
                key={skill.id}
                className={`absolute ${STICKER_POSITIONS[idx]} z-20`}
              >
                <TechSticker
                  skill={skill}
                  draggable={true}
                  dragSnapToOrigin={true}
                  idleIndex={idx}
                  size="sm"
                />
              </div>
            ))}

            {/* Kartu Wadah Foto Profil */}
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4, rotate: 0.5 }}
              transition={SPRING.snappy}
              className="group relative w-full rounded-3xl border border-ink/10 bg-white/80 p-3 shadow-xl backdrop-blur-md"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-cream/70 border border-ink/5">
                <img
                  src={heroImage}
                  alt="Foto Profil Gilang Pratama Putra"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-ink/75 px-3 py-2 text-cream backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-mint animate-pulse" />
                    <span className="font-mono text-xs font-medium">{t('hero.photoBadge')}</span>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-cream/80">
                    <Sparkles className="h-3 w-3 text-sun" /> {t('hero.academicBadge')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection

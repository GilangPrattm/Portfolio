import React from 'react'
import { motion } from 'motion/react'
import { Database, Server, GraduationCap, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/BentoCard'
import { TechSticker } from '../components/TechSticker'
import { TerminalCard } from '../components/TerminalCard'
import { EndpointCard } from '../components/EndpointCard'
import { ERDCard } from '../components/ERDCard'
import { TechMarquee } from '../components/TechMarquee'
import { SKILLS } from '../data/skills'
import { staggerContainerVariants, fadeUpVariants } from '../lib/motion'

export const AboutSection: React.FC = () => {
  const { t } = useTranslation()

  const coreSkills = SKILLS.filter((s) => s.status === 'core')
  const learningSkills = SKILLS.filter((s) => s.status === 'learning')

  return (
    <section id="about" aria-labelledby="about-title" className="pt-8 pb-12 scroll-mt-24">
      {/* Section Header */}
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
          {t('about.tag')}
        </p>
        <h2 id="about-title" className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
          {t('about.title')}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink/80">
          {t('about.desc')}
        </p>
      </div>

      {/* Bento Grid Layout (3 Kolom Seimbang) */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
      >
        {/* Row 1: Profil (2 Kolom) + Core Skills (1 Kolom) */}
        <motion.div variants={fadeUpVariants} className="md:col-span-2">
          <BentoCard variant="indigo" className="flex min-h-[260px] flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-medium text-white">
                <Server className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t('about.cardProfileTag')}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
                {t('about.cardProfileTitle')}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
                {t('about.cardProfileDesc')}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {['Clean Architecture', 'Relational Modeling', 'Maintainable Code'].map((pill) => (
                <span key={pill} className="rounded-lg bg-white/10 px-3 py-1 font-mono text-xs font-medium text-white">
                  {pill}
                </span>
              ))}
            </div>
          </BentoCard>
        </motion.div>

        <motion.div variants={fadeUpVariants} id="skills" className="scroll-mt-24">
          <BentoCard variant="coral" className="flex min-h-[260px] flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-ink/10 px-3 py-1 font-mono text-xs font-semibold text-ink">
                <Database className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t('about.cardSkillsTag')}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink md:text-2xl">
                {t('about.cardSkillsTitle')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                {t('about.cardSkillsDesc')}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <TechSticker key={skill.id} skill={skill} size="sm" />
              ))}
            </div>
          </BentoCard>
        </motion.div>

        {/* Row 2: Learning Skills (1 Kolom) + TerminalCard (1 Kolom) + EndpointCard (1 Kolom) */}
        <motion.div variants={fadeUpVariants} className="md:col-span-1">
          <BentoCard variant="mint" className="flex min-h-[260px] flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                  {t('about.cardLearningTag')}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink md:text-2xl">
                {t('about.cardLearningTitle')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/85">
                {t('about.cardLearningDesc')}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {learningSkills.map((skill) => (
                <TechSticker key={skill.id} skill={skill} size="sm" />
              ))}
            </div>
          </BentoCard>
        </motion.div>

        <motion.div variants={fadeUpVariants} className="md:col-span-1">
          <TerminalCard className="h-full" />
        </motion.div>

        <motion.div variants={fadeUpVariants} className="md:col-span-1">
          <EndpointCard className="h-full" />
        </motion.div>

        {/* Row 3: ERDCard (2 Kolom) + Akademik & Lokasi (1 Kolom) */}
        <motion.div variants={fadeUpVariants} className="md:col-span-2">
          <ERDCard className="h-full" />
        </motion.div>

        <motion.div variants={fadeUpVariants} className="md:col-span-1">
          <BentoCard variant="white" className="flex flex-col justify-between h-full">
            <div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-brand/10 text-indigo-brand mb-4">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </div>
              <h4 className="font-display text-lg font-bold text-ink">{t('about.academicTitle')}</h4>
              <p className="mt-1 text-xs text-ink/70 leading-relaxed">{t('about.academicDesc')}</p>
            </div>
            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-ink/70 border-t border-ink/10 pt-4">
              <MapPin className="h-4 w-4 text-coral shrink-0" aria-hidden="true" />
              <span>{t('about.location')}</span>
            </div>
          </BentoCard>
        </motion.div>
      </motion.div>

      {/* Marquee Ikon Teknologi Berjalan Kontinu */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8"
      >
        <TechMarquee />
      </motion.div>
    </section>
  )
}

export default AboutSection

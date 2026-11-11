import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowUpRight, Code2, Layers, CheckCircle2, Server, Database } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../data/projects'
import { BentoCard } from '../components/BentoCard'
import type { Locale } from '../types'
import { fadeUpVariants, staggerContainerVariants } from '../lib/motion'

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isAnimated = !shouldReduceMotion
  const currentLocale: Locale = i18n.language?.startsWith('en') ? 'en' : 'id'

  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="pt-28 pb-16 text-center max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-extrabold text-ink">
          {t('projectDetail.notFoundTitle')}
        </h1>
        <p className="mt-3 text-sm text-ink/70 leading-relaxed">
          {t('projectDetail.notFoundDesc')}
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-display text-xs font-semibold text-cream transition-colors hover:bg-ink/85"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('projectDetail.backToHome')}</span>
        </Link>
      </div>
    )
  }

  const title = project.title[currentLocale] || project.title.id
  const summary = project.summary[currentLocale] || project.summary.id
  const problem = project.problem?.[currentLocale] || project.problem?.id
  const architecture = project.architecture?.[currentLocale] || project.architecture?.id
  const role = project.role[currentLocale] || project.role.id

  return (
    <motion.article
      variants={isAnimated ? staggerContainerVariants : undefined}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12 pt-24 pb-16 space-y-10"
    >
      {/* Navigasi Kembali */}
      <motion.div variants={isAnimated ? fadeUpVariants : undefined}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-4 py-2 font-display text-xs font-semibold text-ink transition-colors hover:bg-white hover:border-ink/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{t('projectDetail.back')}</span>
        </Link>
      </motion.div>

      {/* Header Utama Studi Kasus */}
      <motion.header variants={isAnimated ? fadeUpVariants : undefined} className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="rounded-full bg-ink/10 px-3 py-1 font-semibold text-ink">
            {project.year}
          </span>
          <span className="rounded-full bg-indigo-brand/10 px-3 py-1 font-semibold text-indigo-brand">
            {role}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint/20 px-3 py-1 font-semibold text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            {project.status === 'completed'
              ? t('projects.status.completed')
              : t('projects.status.inProgress')}
          </span>
        </div>

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-ink/80 max-w-3xl">
          {summary}
        </p>
      </motion.header>

      {/* Bento Grid Studi Kasus Rekayasa Sistem */}
      <motion.div
        variants={isAnimated ? staggerContainerVariants : undefined}
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
      >
        {/* 1. Kebutuhan & Tantangan Sistem (2 Kolom) */}
        <motion.div variants={isAnimated ? fadeUpVariants : undefined} className="md:col-span-2">
          <BentoCard variant="white" className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
                <CheckCircle2 className="h-4 w-4 text-coral" aria-hidden="true" />
                <span>{t('projectDetail.problemTitle')}</span>
              </div>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/85">
                {problem}
              </p>
            </div>
          </BentoCard>
        </motion.div>

        {/* 2. Tumpukan Teknologi Terapan (1 Kolom) */}
        <motion.div variants={isAnimated ? fadeUpVariants : undefined} className="md:col-span-1">
          <BentoCard variant="mint" className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                <Layers className="h-4 w-4 text-ink" aria-hidden="true" />
                <span>{t('projectDetail.stackTitle')}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-ink/10 px-2.5 py-1 font-mono text-xs font-medium text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* 3. Arsitektur Teknis & Database (2 Kolom) */}
        <motion.div variants={isAnimated ? fadeUpVariants : undefined} className="md:col-span-2">
          <BentoCard variant="indigo" className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-white/70">
                <Server className="h-4 w-4 text-white" aria-hidden="true" />
                <span>{t('projectDetail.archTitle')}</span>
              </div>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/90">
                {architecture}
              </p>
            </div>
          </BentoCard>
        </motion.div>

        {/* 4. Akses Kode & Demo (1 Kolom) */}
        <motion.div variants={isAnimated ? fadeUpVariants : undefined} className="md:col-span-1">
          <BentoCard variant="sun" className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                <Database className="h-4 w-4 text-ink" aria-hidden="true" />
                <span>{t('projectDetail.linksTitle')}</span>
              </div>
              <div className="mt-6 flex flex-col gap-2.5">
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-ink/15 bg-white/80 px-3.5 py-2.5 font-mono text-xs font-bold text-ink transition-colors hover:bg-white hover:border-ink/30"
                  >
                    <span className="flex items-center gap-2">
                      <Code2 className="h-4 w-4" /> {t('projects.viewRepo')}
                    </span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between rounded-xl bg-indigo-brand px-3.5 py-2.5 font-mono text-xs font-bold text-white shadow-sm shadow-indigo-brand/20 transition-all hover:bg-indigo-brand/90 hover:shadow-md hover:shadow-indigo-brand/30"
                  >
                    <span>{t('projects.viewDemo')}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </BentoCard>
        </motion.div>
      </motion.div>
    </motion.article>
  )
}

export default ProjectDetailPage

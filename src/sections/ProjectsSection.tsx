import React from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECTS } from '../data/projects'
import { staggerContainerVariants, fadeUpVariants } from '../lib/motion'

export const ProjectsSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12 pt-16 pb-12 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="mb-8 max-w-2xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
          {t('projects.tag')}
        </p>
        <h2
          id="projects-title"
          className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl"
        >
          {t('projects.title')}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink/80">
          {t('projects.desc')}
        </p>
      </div>

      {/* Bento Grid Proyek (Featured Project membentang 2 kolom) */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeUpVariants}
            className={project.featured ? 'md:col-span-2' : ''}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default ProjectsSection

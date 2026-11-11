import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight, Code2, Sparkles, FolderGit2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from './BentoCard'
import type { Project, Locale } from '../types'

export interface ProjectCardProps {
  project: Project
  className?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  const { t, i18n } = useTranslation()
  const currentLocale: Locale = i18n.language?.startsWith('en') ? 'en' : 'id'

  const title = project.title[currentLocale] || project.title.id
  const summary = project.summary[currentLocale] || project.summary.id
  const role = project.role[currentLocale] || project.role.id

  const cardVariant = project.featured ? 'sun' : 'white'

  return (
    <BentoCard
      variant={cardVariant}
      className={`flex flex-col justify-between overflow-hidden ${className}`}
    >
      <div>
        {/* Thumbnail atau Abstract Monogram Card (Aturan Zero Dummy Image) */}
        <Link
          to={`/projects/${project.slug}`}
          className="group block relative aspect-video w-full overflow-hidden rounded-2xl bg-ink/5 border border-ink/10 mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
        >
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative h-full w-full p-4 flex flex-col justify-between bg-gradient-to-br from-ink/10 via-ink/5 to-ink/15 transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink/15 font-mono text-xs font-bold text-ink">
                  {project.techStack[0]?.slice(0, 2).toUpperCase() || 'SYS'}
                </span>
                <span className="rounded-full bg-ink/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink">
                  {project.year}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FolderGit2 className="h-4 w-4 text-ink/60" aria-hidden="true" />
                <span className="font-mono text-xs font-semibold text-ink/70 tracking-tight">
                  {project.slug}
                </span>
              </div>
            </div>
          )}

          {/* Badge Proyek Unggulan */}
          {project.featured && (
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-cream shadow-xs">
              <Sparkles className="h-3 w-3 text-sun" aria-hidden="true" />
              <span>{t('projects.featuredBadge')}</span>
            </div>
          )}
        </Link>

        {/* Informasi Utama Proyek */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs font-semibold text-ink/65 uppercase tracking-wide">
              {role}
            </span>
            <span className="font-mono text-[11px] font-medium text-ink/60">
              {project.status === 'completed'
                ? t('projects.status.completed')
                : t('projects.status.inProgress')}
            </span>
          </div>

          <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
            <Link
              to={`/projects/${project.slug}`}
              className="hover:underline hover:decoration-indigo-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand rounded"
            >
              {title}
            </Link>
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-ink/80">
            {summary}
          </p>
        </div>
      </div>

      {/* Bagian Bawah: Tag Teknologi & Tautan Aksi */}
      <div className="mt-6 pt-4 border-t border-ink/10">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-ink/10 px-2.5 py-0.5 font-mono text-xs font-medium text-ink"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 font-display text-xs font-semibold text-cream transition-colors hover:bg-ink/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
          >
            <span>{t('projectDetail.viewCaseStudy')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/70 px-3.5 py-1.5 font-display text-xs font-semibold text-ink transition-colors hover:bg-white hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t('projects.viewRepo')}</span>
            </a>
          )}

          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white/70 px-3.5 py-1.5 font-display text-xs font-semibold text-ink transition-colors hover:bg-white hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
            >
              <span>{t('projects.viewDemo')}</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </BentoCard>
  )
}

export default ProjectCard

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Database, Key } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from './BentoCard'
import { DURATION, TRANSITION_EASE } from '../lib/motion'

export interface ERDCardProps {
  className?: string
}

interface TableColumn {
  name: string
  type: string
  isKey?: 'PK' | 'FK'
}

const TABLES: { name: string; columns: TableColumn[] }[] = [
  {
    name: 'users',
    columns: [
      { name: 'id', type: 'bigint', isKey: 'PK' },
      { name: 'email', type: 'varchar' },
      { name: 'role', type: 'varchar' },
    ],
  },
  {
    name: 'posts',
    columns: [
      { name: 'id', type: 'bigint', isKey: 'PK' },
      { name: 'user_id', type: 'bigint', isKey: 'FK' },
      { name: 'title', type: 'varchar' },
    ],
  },
  {
    name: 'comments',
    columns: [
      { name: 'id', type: 'bigint', isKey: 'PK' },
      { name: 'post_id', type: 'bigint', isKey: 'FK' },
      { name: 'content', type: 'text' },
    ],
  },
]

export const ERDCard: React.FC<ERDCardProps> = ({ className = '' }) => {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <BentoCard variant="white" className={`flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink/60">
          <Database className="h-3.5 w-3.5 text-indigo-brand" aria-hidden="true" />
          <span>{t('visualCards.erd.tag')}</span>
        </div>

        {/* Judul: Maksimal 4 kata */}
        <h3 className="mt-2 font-display text-xl font-bold text-ink md:text-2xl">
          {t('visualCards.erd.title')}
        </h3>

        {/* Deskripsi: Maksimal ~20 kata, satu ide */}
        <p className="mt-2 text-sm leading-relaxed text-ink/75">
          {t('visualCards.erd.desc')}
        </p>
      </div>

      {/* Visualisasi 3 Tabel Relasional Generik (users, posts, comments) */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {TABLES.map((tbl, idx) => (
          <React.Fragment key={tbl.name}>
            {/* Tabel Mini */}
            <div className="flex-1 rounded-2xl border border-ink/10 bg-cream/50 p-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-ink/10 pb-1.5 mb-2 font-mono text-xs font-bold text-ink">
                <span>{tbl.name}</span>
                <span className="text-[10px] text-ink/40 font-normal">table</span>
              </div>
              <ul className="space-y-1 font-mono text-[11px]">
                {tbl.columns.map((col) => (
                  <li key={col.name} className="flex items-center justify-between text-ink/80">
                    <span className="flex items-center gap-1 font-medium">
                      {col.isKey && (
                        <Key
                          className={`h-2.5 w-2.5 ${col.isKey === 'PK' ? 'text-sun' : 'text-indigo-brand'}`}
                          aria-hidden="true"
                        />
                      )}
                      <span>{col.name}</span>
                    </span>
                    <span className="text-[10px] text-ink/50">{col.type}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Garis Relasi 1-N Antar-Tabel */}
            {idx < TABLES.length - 1 && (
              <div className="flex items-center justify-center sm:flex-col py-1 sm:py-0">
                <svg
                  className="h-5 w-12 sm:h-8 sm:w-10 overflow-visible text-ink/40"
                  viewBox="0 0 40 20"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M 2 10 L 38 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: DURATION.slow, ease: TRANSITION_EASE }}
                  />
                  <circle cx="2" cy="10" r="2.5" fill="currentColor" />
                  <circle cx="38" cy="10" r="2.5" fill="currentColor" />
                </svg>
                <span className="font-mono text-[10px] font-bold text-indigo-brand">1:N</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </BentoCard>
  )
}

export default ERDCard

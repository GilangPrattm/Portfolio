import React from 'react'
import { Server } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from './BentoCard'

export interface EndpointCardProps {
  className?: string
}

export const EndpointCard: React.FC<EndpointCardProps> = ({ className = '' }) => {
  const { t } = useTranslation()

  return (
    <BentoCard variant="dark" className={`flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <Server className="h-3.5 w-3.5 text-indigo-brand" aria-hidden="true" />
          <span>{t('visualCards.endpoint.tag')}</span>
        </div>

        {/* Judul: Maksimal 4 kata */}
        <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl">
          {t('visualCards.endpoint.title')}
        </h3>

        {/* Deskripsi: Maksimal ~20 kata, satu ide */}
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">
          {t('visualCards.endpoint.desc')}
        </p>
      </div>

      {/* Visualisasi Spesifikasi Endpoint RESTful Generik */}
      <div className="mt-5 space-y-3">
        {/* URL Bar Mockup */}
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0a0b10] px-3.5 py-2.5 font-mono text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-brand/20 border border-indigo-brand/40 px-2 py-0.5 font-bold text-indigo-300 text-[11px]">
              GET
            </span>
            <span className="text-zinc-300 font-medium truncate">/api/v1/health</span>
          </div>
          <span className="rounded-full bg-mint/25 border border-mint/40 px-2.5 py-0.5 text-[10px] font-bold text-mint">
            200 OK
          </span>
        </div>

        {/* Cuplikan JSON Respons Pendek & Generik Tanpa Angka Metrik */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#08090d] p-3.5 font-mono text-[11px] text-white/90">
          <div className="flex items-center justify-between text-[10px] text-white/40 pb-2 mb-2 border-b border-white/10">
            <span>application/json</span>
            <span className="text-mint font-medium">status: ok</span>
          </div>
          <pre className="text-white/80 leading-relaxed overflow-x-auto">
{`{
  "status": "success",
  "data": {
    "service": "online",
    "database": "connected"
  }
}`}
          </pre>
        </div>
      </div>
    </BentoCard>
  )
}

export default EndpointCard

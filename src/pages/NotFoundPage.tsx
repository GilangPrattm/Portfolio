import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-28 pb-20 text-center max-w-lg mx-auto">
      <span className="font-mono text-sm font-bold text-indigo-brand uppercase tracking-widest">
        404 &bull; Not Found
      </span>
      <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
        {t('projectDetail.notFoundTitle')}
      </h1>
      <p className="mt-3 text-sm text-ink/70 leading-relaxed">
        {t('projectDetail.notFoundDesc')}
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-display text-xs font-semibold text-cream transition-colors hover:bg-ink/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-brand"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{t('projectDetail.backToHome')}</span>
      </Link>
    </div>
  )
}

export default NotFoundPage

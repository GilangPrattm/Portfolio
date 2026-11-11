import React, { useState } from 'react'
import { Mail, Copy, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/BentoCard'

const EMAIL_ADDRESS = 'gilangpratama@example.com'
const CURRENT_YEAR = new Date().getFullYear()

export const ContactSection: React.FC = () => {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback jika permission browser ditolak
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-12 scroll-mt-24 pt-12 pb-16"
    >
      <div className="relative z-10 space-y-12">
        {/* Kartu Kontak Bento (Mengapung elegan di atas peta kontur topografi luar) */}
        <BentoCard
          variant="indigo"
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between shadow-xl"
        >
          <div className="relative z-10 max-w-xl">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 font-mono text-xs font-medium text-white">
              {t('contact.tag')}
            </span>
            <h2 id="contact-title" className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
              {t('contact.title')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
              {t('contact.desc')}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            {/* Kirim Email Langsung via Client (30% Warna Sekunder 1: Vibrant Coral) */}
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/10 bg-coral px-5 py-2.5 font-display text-xs font-bold text-ink shadow-md shadow-coral/20 transition-all hover:bg-coral/90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{t('contact.sendEmail')}</span>
            </a>

            {/* Fitur 1-Klik Salin Email (PRD.md 3.6) */}
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={copied ? t('contact.copied') : t('contact.copyEmail')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 font-display text-xs font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-mint" aria-hidden="true" />
                  <span>{t('contact.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  <span>{t('contact.copyEmail')}</span>
                </>
              )}
            </button>

            {/* GitHub Profil */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Profil GitHub Gilang"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 font-display text-xs font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>{t('contact.github')}</span>
            </a>

            {/* LinkedIn Profil */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Profil LinkedIn Gilang"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 font-display text-xs font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.4-1.4a1.4 1.4 0 0 0 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9M7.86 18.5V10.13H5.07v8.37h2.79z" />
              </svg>
              <span>{t('contact.linkedin')}</span>
            </a>
          </div>
        </BentoCard>

        {/* Footer Terpadu di Bawah Kartu Kontak (Masih dalam satu hamparan kanvas topografi!) */}
        <footer className="pt-8 pb-4 text-center font-mono text-xs text-ink/65">
          <p>&copy; {CURRENT_YEAR} {t('footer.copyright')}</p>
        </footer>
      </div>
    </section>
  )
}

export default ContactSection

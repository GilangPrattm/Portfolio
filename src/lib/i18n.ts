import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import idTranslation from '../locales/id.json'
import enTranslation from '../locales/en.json'
import type { Locale } from '../types'

// Mengambil preferensi bahasa tersimpan dengan penanganan aman try/catch
const getInitialLocale = (): Locale => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('portfolio_locale')
      if (saved === 'id' || saved === 'en') return saved
    } catch {
      // Akses storage dicegah atau lingkungan non-browser
    }
  }
  return 'id'
}

const initialLanguage = getInitialLocale()

// Sinkronisasi atribut html lang
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLanguage
}

i18n.use(initReactI18next).init({
  resources: {
    id: {
      translation: idTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  lng: initialLanguage,
  fallbackLng: 'id',
  interpolation: {
    escapeValue: false, // React sudah otomatis meng-escape teks
  },
})

// Sinkronkan atribut html lang setiap kali bahasa berganti
i18n.on('languageChanged', (lng: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng
  }
})

export default i18n

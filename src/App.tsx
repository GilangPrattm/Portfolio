import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { ScrollProgress } from './components/ScrollProgress'
import { TopoBackground } from './components/TopoBackground'
import { HomePage } from './pages/HomePage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { pageTransitionVariants, pageTransitionReducedVariants } from './lib/motion'

const CURRENT_YEAR = new Date().getFullYear()

const AppContent: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  const transitionVariants = shouldReduceMotion
    ? pageTransitionReducedVariants
    : pageTransitionVariants

  return (
    <div className="relative min-h-screen bg-cream text-ink antialiased selection:bg-indigo-brand selection:text-white overflow-x-clip flex flex-col justify-between">
      {/* 0. Full-Screen Topography Background (WebGL GPU 60fps, 70% opacity) */}
      <TopoBackground tone="ink" opacity={0.7} />

      {/* 1. Indikator Progres Scroll & Reset Viewport */}
      <ScrollProgress />
      <ScrollToTop />

      {/* 2. Skip to Content Link untuk Screen Reader & Aksesibilitas Keyboard */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:font-display focus:text-xs focus:font-semibold focus:text-cream focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-brand"
      >
        {t('nav.skipToContent')}
      </a>

      {/* 3. Navigasi Global */}
      <Navbar />

      {/* 4. Konten Halaman dengan Transisi Rute AnimatePresence */}
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 w-full flex-1 focus:outline-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={transitionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 5. Footer untuk Halaman Non-Beranda (Di Beranda sudah menyatu di ContactSection) */}
      {location.pathname !== '/' && (
        <footer className="relative z-10 border-t border-ink/5 bg-cream/80 backdrop-blur-xs py-8 text-center mt-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12 font-mono text-xs text-ink/60">
            <p>&copy; {CURRENT_YEAR} {t('footer.copyright')}</p>
          </div>
        </footer>
      )}
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

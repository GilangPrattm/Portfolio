import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Utilitas otomatis untuk mengembalikan posisi scroll ke puncak halaman
 * setiap kali rute berpindah (misal: dari Beranda ke /projects/:slug).
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop

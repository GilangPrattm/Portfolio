import React from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

/**
 * ScrollProgress
 * Indikator progres gulir halaman tipis di bagian paling atas (DESIGN.md Bagian 6.2 #7)
 * Menggunakan spring physics yang halus dan menghormati prefers-reduced-motion.
 */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const shouldReduceMotion = useReducedMotion()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-indigo-brand pointer-events-none"
    />
  )
}

export default ScrollProgress

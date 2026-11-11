import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { Skill } from '../data/skills'
import { stickerHoverMotion, stickerIdleVariants } from '../lib/motion'

export interface TechStickerProps {
  skill: Skill
  showLabel?: boolean
  draggable?: boolean
  dragSnapToOrigin?: boolean
  dragConstraints?: React.RefObject<Element | null> | { left: number; right: number; top: number; bottom: number } | false
  idleIndex?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const TechSticker: React.FC<TechStickerProps> = ({
  skill,
  showLabel = true,
  draggable = false,
  dragSnapToOrigin = true,
  dragConstraints,
  idleIndex,
  size = 'md',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion()

  // Inisialisasi aman: hanya perangkat pointer halus (mouse/trackpad) yang dapat drag,
  // sehingga gestur scroll layar sentuh di ponsel tidak terhalang.
  const [canDrag, setCanDrag] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(pointer: fine)').matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const handleChange = (e: MediaQueryListEvent) => setCanDrag(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const Icon = skill.icon
  const isAnimated = !shouldReduceMotion
  const isDraggable = draggable && canDrag && isAnimated

  // Ukuran padding & icon berdasarkan prop size
  const sizeClasses = {
    sm: 'p-1.5 gap-1.5 text-xs',
    md: 'px-3 py-2 gap-2 text-xs sm:text-sm',
    lg: 'px-4 py-2.5 gap-2.5 text-sm sm:text-base',
  }[size]

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }[size]

  return (
    <motion.div
      variants={isAnimated && idleIndex !== undefined ? stickerIdleVariants : undefined}
      custom={idleIndex}
      animate={isAnimated && idleIndex !== undefined ? 'animate' : undefined}
      whileHover={isAnimated ? stickerHoverMotion.hover : undefined}
      whileTap={isAnimated ? stickerHoverMotion.tap : undefined}
      drag={isDraggable}
      dragConstraints={dragConstraints}
      dragSnapToOrigin={dragSnapToOrigin}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 350, bounceDamping: 25 }}
      whileDrag={
        isDraggable
          ? {
              scale: 1.15,
              cursor: 'grabbing',
              zIndex: 50,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
            }
          : undefined
      }
      className={`inline-flex items-center select-none rounded-2xl border border-ink/10 bg-white shadow-xs transition-colors ${
        isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      } ${sizeClasses} ${className}`}
    >
      <Icon
        className={`${iconSizes} shrink-0`}
        style={{ color: skill.color }}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="font-mono font-semibold tracking-tight text-ink">
          {skill.label}
        </span>
      )}
    </motion.div>
  )
}

export default TechSticker

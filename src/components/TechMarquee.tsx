import React from 'react'
import { useReducedMotion } from 'motion/react'
import { SKILLS } from '../data/skills'
import { TechSticker } from './TechSticker'

export interface TechMarqueeProps {
  className?: string
  dark?: boolean
}

export const TechMarquee: React.FC<TechMarqueeProps> = ({ className = '', dark = false }) => {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <div className={`w-full max-w-full overflow-x-auto py-4 ${className}`}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SKILLS.map((skill) => (
            <TechSticker key={skill.id} skill={skill} size="sm" />
          ))}
        </div>
      </div>
    )
  }

  const fadeClass = dark ? 'from-[#08090d]' : 'from-cream'

  return (
    <div
      aria-label="Daftar keahlian teknologi"
      className={`group relative w-full max-w-full overflow-hidden py-4 select-none ${className}`}
    >
      {/* Masking Gradient di Sisi Kiri & Kanan */}
      <div className={`pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r ${fadeClass} to-transparent`} />
      <div className={`pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l ${fadeClass} to-transparent`} />

      {/* Marquee Track: Track 1 (Aksesibel) + Track 2 (Duplikat Loop aria-hidden) */}
      <div className="flex w-max gap-4 animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
        {/* Track 1: Terbaca oleh screen reader */}
        <div className="flex gap-4">
          {SKILLS.map((skill) => (
            <TechSticker
              key={`track1-${skill.id}`}
              skill={skill}
              size="md"
              className="hover:scale-105 transition-transform"
            />
          ))}
        </div>

        {/* Track 2: Duplikat visual untuk infinite loop, tersembunyi dari pembaca layar */}
        <div className="flex gap-4" aria-hidden="true">
          {SKILLS.map((skill) => (
            <TechSticker
              key={`track2-${skill.id}`}
              skill={skill}
              size="md"
              className="hover:scale-105 transition-transform"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechMarquee

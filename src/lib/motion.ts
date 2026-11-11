import type { Transition, Variants } from 'motion/react'

/**
 * Token Motion Terpusat
 * Sesuai dengan spesifikasi DESIGN.md Bagian 6, 15 & PRD.md Bagian 5.3
 *
 * Jangan gunakan nilai durasi/easing acak di komponen JSX.
 * Selalu rujuk token dari berkas ini untuk konsistensi gerak.
 */

// Kurva Easing Cubic-Bezier (Ease-out kuat untuk kesan premium dan responsif)
export const TRANSITION_EASE = [0.22, 1, 0.36, 1] as const

// Durasi Transisi (dalam detik)
export const DURATION = {
  fast: 0.2, // Hover, klik, feedback instan
  base: 0.5, // Masuknya kartu bento, scroll-reveal
  slow: 0.8, // Header hero reveal, transisi antar halaman
} as const

// Konfigurasi Pegas (Physics-based Spring)
export const SPRING = {
  // Snappy: Reaktif, untuk tombol, toggle, dan interaksi kursor
  snappy: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as const satisfies Transition,

  // Smooth: Halus dan berbobot, untuk elemen kartu besar dan transisi layout
  smooth: {
    type: 'spring',
    stiffness: 120,
    damping: 20,
  } as const satisfies Transition,

  // Bouncy: Untuk efek playful stiker draggable yang membal saat dilepas
  bouncy: {
    type: 'spring',
    stiffness: 350,
    damping: 22,
  } as const satisfies Transition,
}

// Offset jeda animasi stagger (kemunculan berurutan)
export const STAGGER = {
  fast: 0.06,
  base: 0.1,
} as const

/**
 * Varian Animasi Reusable
 */

// Animasi Fade-In sederhana (opasitas saja)
export const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.base,
      ease: TRANSITION_EASE,
    },
  },
}

// Animasi Fade-Up standar (naik dari bawah + opasitas)
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: TRANSITION_EASE,
    },
  },
}

// Container untuk men-trigger stagger ke elemen-elemen anaknya (children)
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.05,
    },
  },
}

// Mask reveal untuk judul teks hero
export const maskRevealVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: TRANSITION_EASE,
    },
  },
}

// Micro-interaction untuk kartu bento saat disentuh atau diarahkan kursor
export const bentoHoverMotion = {
  rest: {
    y: 0,
    scale: 1,
    transition: SPRING.snappy,
  },
  hover: {
    y: -4,
    scale: 1.005,
    transition: SPRING.snappy,
  },
  tap: {
    scale: 0.99,
    transition: SPRING.snappy,
  },
}

// Micro-interaction untuk tombol interaktif CTA
export const buttonHoverMotion = {
  rest: {
    y: 0,
    scale: 1,
    transition: SPRING.snappy,
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: SPRING.snappy,
  },
  tap: {
    scale: 0.98,
    transition: SPRING.snappy,
  },
}

// Micro-interaction untuk badge skill atau tag mono
export const badgeHoverMotion = {
  rest: {
    y: 0,
    transition: SPRING.snappy,
  },
  hover: {
    y: -2,
    transition: SPRING.snappy,
  },
}

// Motion untuk TechSticker: hover pop/tilt dan tap
export const stickerHoverMotion = {
  rest: {
    scale: 1,
    rotate: 0,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  hover: {
    scale: 1.12,
    rotate: 3,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: SPRING.snappy,
  },
  tap: {
    scale: 0.95,
    transition: SPRING.snappy,
  },
}

// Idle floating motion lembut untuk stiker di hero
export const stickerIdleVariants: Variants = {
  animate: (custom: number = 0) => ({
    y: [-3, 3, -3],
    rotate: [-1, 1, -1],
    transition: {
      duration: 3.5 + (custom % 2),
      repeat: Infinity,
      ease: 'easeInOut',
      delay: (custom * 0.4) % 2,
    },
  }),
}

// Transisi rute halaman (Home <-> Detail Proyek)
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: TRANSITION_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: DURATION.fast,
      ease: TRANSITION_EASE,
    },
  },
}

// Transisi rute alternatif untuk prefers-reduced-motion
export const pageTransitionReducedVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: DURATION.fast,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: DURATION.fast,
    },
  },
}

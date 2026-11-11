import type { IconType } from 'react-icons'
import {
  SiPhp,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiGit,
  SiTailwindcss,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

export interface Skill {
  id: string
  label: string
  icon: IconType
  color: string
  group: 'backend' | 'database' | 'frontend' | 'tools'
  status: 'core' | 'learning'
}

/**
 * Data keahlian resmi Gilang.
 * Nilai heksadesimal warna merujuk langsung ke data resmi paket npm 'simple-icons' (https://www.npmjs.com/package/simple-icons).
 * Setiap nilai dapat diverifikasi langsung melalui SimpleIcons[slug].hex.
 */
export const SKILLS: Skill[] = [
  // Core: Backend
  {
    id: 'php',
    label: 'PHP',
    icon: SiPhp,
    color: '#777BB4', // Simple Icons (slug: 'php', hex: '777BB4')
    group: 'backend',
    status: 'core',
  },
  {
    id: 'laravel',
    label: 'Laravel',
    icon: SiLaravel,
    color: '#FF2D20', // Simple Icons (slug: 'laravel', hex: 'FF2D20')
    group: 'backend',
    status: 'core',
  },
  {
    id: 'java',
    label: 'Java',
    icon: FaJava,
    color: '#ED8B00', // Simple Icons (slug: 'openjdk' / Java ecosystem, hex: 'ED8B00')
    group: 'backend',
    status: 'core',
  },

  // Core: Database
  {
    id: 'mysql',
    label: 'MySQL',
    icon: SiMysql,
    color: '#4479A1', // Simple Icons (slug: 'mysql', hex: '4479A1')
    group: 'database',
    status: 'core',
  },

  // Core: Tools
  {
    id: 'git',
    label: 'Git',
    icon: SiGit,
    color: '#F05032', // Simple Icons (slug: 'git', hex: 'F05032')
    group: 'tools',
    status: 'core',
  },

  // Learning: Database
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    icon: SiPostgresql,
    color: '#4169E1', // Simple Icons (slug: 'postgresql', hex: '4169E1')
    group: 'database',
    status: 'learning',
  },

  // Learning: Frontend
  {
    id: 'javascript',
    label: 'JavaScript',
    icon: SiJavascript,
    color: '#F7DF1E', // Simple Icons (slug: 'javascript', hex: 'F7DF1E')
    group: 'frontend',
    status: 'learning',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    icon: SiTypescript,
    color: '#3178C6', // Simple Icons (slug: 'typescript', hex: '3178C6')
    group: 'frontend',
    status: 'learning',
  },
  {
    id: 'react',
    label: 'React',
    icon: SiReact,
    color: '#61DAFB', // Simple Icons (slug: 'react', hex: '61DAFB')
    group: 'frontend',
    status: 'learning',
  },
  {
    id: 'tailwindcss',
    label: 'Tailwind CSS',
    icon: SiTailwindcss,
    color: '#06B6D4', // Simple Icons (slug: 'tailwindcss', hex: '06B6D4')
    group: 'frontend',
    status: 'learning',
  },
]

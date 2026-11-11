export type Locale = 'id' | 'en'

export interface LocalizedText {
  id: string
  en: string
}

export type ProjectStatus = 'completed' | 'in-progress'
export type SkillCategory = 'backend' | 'database' | 'learning' | 'tools'

export interface SkillItem {
  id: string
  name: string
  category: SkillCategory
  isLearning?: boolean
}

export interface ProjectLinks {
  demo?: string
  repo?: string
}

export interface Project {
  id: string
  slug: string
  title: LocalizedText
  summary: LocalizedText
  description?: LocalizedText
  problem?: LocalizedText
  architecture?: LocalizedText
  role: LocalizedText
  techStack: string[]
  thumbnail?: string
  links: ProjectLinks
  year: number
  featured: boolean
  status: ProjectStatus
}

export type BentoCardVariant = 'indigo' | 'coral' | 'mint' | 'sun' | 'white' | 'dark'

export interface Project {
  slug: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
}

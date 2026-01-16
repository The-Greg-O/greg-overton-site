export const siteConfig = {
  name: 'Greg Overton',
  description: 'Personal portfolio and project showcase',
  url: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://gregoverton.com',
  author: {
    name: 'Greg Overton',
    email: 'greg@gregoverton.com',
    github: 'https://github.com/goverton',
    linkedin: 'https://linkedin.com/in/gregoverton',
  },
  links: {
    github: 'https://github.com/goverton/greg-overton-site',
  },
} as const

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Greg Overton',
  tagline:
    'I build real systems and real integrations that solve real problems — cutting-edge where it helps, practical first, with a heart for the human side.',
  description:
    'Personal site of Greg Overton — engineering leader building real systems and integrations across IoT, sailing, rocketry, and agentic AI.',
  url: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://gregoverton.com',
  author: {
    name: 'Greg Overton',
    location: 'Seattle, WA',
    coordinates: '47.6°N · 122.3°W',
    github: 'https://github.com/The-Greg-O',
    linkedin: 'https://linkedin.com/in/gregoryoverton',
    employerName: 'Butlr Technologies',
    employerUrl: 'https://butlr.com',
  },
  links: {
    repo: 'https://github.com/The-Greg-O/greg-overton-site',
  },
} as const

export type SiteConfig = typeof siteConfig

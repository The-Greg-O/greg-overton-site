import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/constants'

/**
 * Code-generated robots policy. Keeps the sitemap/host in lockstep with the
 * env-overridable `siteConfig.url` instead of a hardcoded host, and stays
 * allow-all so search and AI/LLM crawlers (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, …) can discover and cite the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}

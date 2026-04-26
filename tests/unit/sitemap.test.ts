import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { siteConfig } from '@/lib/constants'

describe('sitemap metadata route', () => {
  it('publishes the canonical homepage URL with stable freshness metadata', () => {
    const [entry] = sitemap()

    expect(entry).toMatchObject({
      url: siteConfig.url,
      lastModified: new Date(siteConfig.lastUpdated),
      changeFrequency: 'monthly',
      priority: 1,
    })
  })
})

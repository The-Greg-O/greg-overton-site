import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { siteConfig } from '@/lib/constants'

describe('sitemap metadata route', () => {
  it('publishes exactly one entry for the canonical homepage', () => {
    const entries = sitemap()

    expect(entries).toHaveLength(1)
    expect(entries[0]?.url).toBe(siteConfig.url)
    expect(entries[0]?.changeFrequency).toBe('monthly')
    expect(entries[0]?.priority).toBe(1)
  })

  it('emits a parseable lastModified timestamp', () => {
    const [entry] = sitemap()
    const lastModified = entry?.lastModified

    expect(lastModified).toBeInstanceOf(Date)
    expect(Number.isNaN((lastModified as Date).getTime())).toBe(false)
  })
})

import { describe, expect, it } from 'vitest'
import { siteConfig } from '@/lib/constants'

describe('siteConfig', () => {
  it('lastUpdated is an ISO-8601 calendar date (YYYY-MM-DD)', () => {
    expect(siteConfig.lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('lastUpdatedLabel is derived from lastUpdated and stays in sync', () => {
    const expected = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(siteConfig.lastUpdated))

    expect(siteConfig.lastUpdatedLabel).toBe(expected)
  })

  it('lastUpdatedLabel matches the "MMM YYYY" shape', () => {
    expect(siteConfig.lastUpdatedLabel).toMatch(/^[A-Z][a-z]{2} \d{4}$/)
  })

  it('url is an absolute URL', () => {
    expect(() => new URL(siteConfig.url)).not.toThrow()
  })
})

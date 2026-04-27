import { expect, test } from '@playwright/test'

test.describe('Sitemap', () => {
  test('serves /sitemap.xml with the canonical URL', async ({ request }) => {
    const response = await request.get('/sitemap.xml')

    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toMatch(/xml/)

    const body = await response.text()
    expect(body).toContain('<loc>https://gregoverton.com</loc>')
    expect(body).toContain('<lastmod>')
  })

  test('robots.txt advertises the sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt')

    expect(response.status()).toBe(200)
    expect(await response.text()).toContain('Sitemap: https://gregoverton.com/sitemap.xml')
  })
})

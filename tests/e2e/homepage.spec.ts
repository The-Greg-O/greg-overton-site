import { expect, test } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Greg Overton/)
  })

  test('displays main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Greg Overton', level: 1 })
    await expect(heading).toBeVisible()
  })

  test('has GitHub link in hero', async ({ page }) => {
    const githubLink = page.getByRole('link', { name: 'GitHub' }).first()
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/The-Greg-O')
  })

  test('renders section landmarks', async ({ page }) => {
    await expect(page.locator('#profile')).toBeVisible()
    await expect(page.locator('#now')).toBeVisible()
    await expect(page.locator('#path')).toBeVisible()
    await expect(page.locator('#work')).toBeVisible()
    await expect(page.locator('#signal')).toBeVisible()
  })

  test('contact section exposes LinkedIn and GitHub', async ({ page }) => {
    const signal = page.locator('#signal')
    await expect(signal).toBeVisible()
    const contactLinks = page.locator('#signal ~ * a, #signal ~ *').first()
    await expect(contactLinks).toBeVisible()
    await expect(page.getByRole('link', { name: 'LinkedIn' }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'GitHub' }).first()).toBeVisible()
  })
})

test.describe('Keyboard', () => {
  test('skip link is first Tab stop, then hero links show an outline', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName === 'webkit', 'WebKit does not Tab to links by default')
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skip = page.getByRole('link', { name: 'Skip to content' })
    await expect(skip).toBeFocused()
    await expect(skip).toBeVisible()

    const hrefs = await page
      .locator('#profile a:visible')
      .evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('href') ?? ''))])
    const count = hrefs.length
    const seen = new Set<string>()
    for (let i = 0; i < 60 && seen.size < count; i++) {
      await page.keyboard.press('Tab')
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null
        if (!el?.closest('#profile') || el.tagName !== 'A') return null
        return { href: el.getAttribute('href') ?? '', outline: getComputedStyle(el).outlineStyle }
      })
      if (info) {
        expect(info.outline).not.toBe('none')
        if (hrefs.includes(info.href)) seen.add(info.href)
      }
    }
    expect(seen.size).toBe(count)
  })
})

test.describe('404 Page', () => {
  test('shows 404 for non-existent routes', async ({ page }) => {
    await page.goto('/non-existent-page')

    const heading = page.getByRole('heading', { name: '404' })
    await expect(heading).toBeVisible()

    const homeLink = page.getByRole('link', { name: 'Go home' })
    await expect(homeLink).toBeVisible()
  })

  test('home link navigates to homepage', async ({ page }) => {
    await page.goto('/non-existent-page')

    const homeLink = page.getByRole('link', { name: 'Go home' })
    await homeLink.click()

    await expect(page).toHaveURL('/')
  })
})

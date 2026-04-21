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

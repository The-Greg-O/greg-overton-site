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
    // The hero button contains "GitHub" text (and optionally "View" on larger screens)
    const githubLink = page
      .locator('section')
      .first()
      .getByRole('link', { name: /GitHub/i })
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/The-Greg-O')
  })

  test('has GitHub link in footer', async ({ page }) => {
    const footerGithubLink = page.locator('footer').getByRole('link', { name: 'GitHub' })
    await expect(footerGithubLink).toBeVisible()
    await expect(footerGithubLink).toHaveAttribute('href', 'https://github.com/The-Greg-O')
  })

  test('has theme toggle button', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme|switch to/i })
    await expect(themeToggle).toBeVisible()
  })

  test('theme toggle switches between light and dark', async ({ page }) => {
    const html = page.locator('html')
    const themeToggle = page.getByRole('button', { name: /toggle theme|switch to/i })

    // Initial state depends on system preference, so we toggle twice to verify functionality
    await themeToggle.click()
    const firstState = await html.getAttribute('class')

    await themeToggle.click()
    const secondState = await html.getAttribute('class')

    // States should be different after toggling
    expect(firstState).not.toBe(secondState)
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

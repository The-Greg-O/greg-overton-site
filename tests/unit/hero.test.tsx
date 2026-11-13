import { render, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from '@/components/sections/hero'
import { siteConfig } from '@/lib/constants'

function renderProfile() {
  const { container } = render(<Hero />)
  const section = container.querySelector<HTMLElement>('#profile')
  if (!section) throw new Error('Hero section #profile not found')
  return section
}

describe('Hero', () => {
  it('shows only the LinkedIn and GitHub chips, in that order', () => {
    const section = renderProfile()
    const chips = Array.from(section.querySelectorAll<HTMLAnchorElement>('a.chip'))

    expect(chips).toHaveLength(2)
    expect(chips[0]).toHaveAccessibleName('→ LinkedIn')
    expect(chips[1]).toHaveAccessibleName('→ GitHub')
    expect(within(section).queryByRole('link', { name: '→ Butlr' })).toBeNull()
  })

  it('points the chips at the author profiles', () => {
    const section = renderProfile()
    const chips = Array.from(section.querySelectorAll<HTMLAnchorElement>('a.chip'))

    expect(chips[0]).toHaveAttribute('href', siteConfig.author.linkedin)
    expect(chips[1]).toHaveAttribute('href', siteConfig.author.github)
  })

  it('keeps the employer link in the role line', () => {
    const section = renderProfile()

    expect(within(section).getByRole('link', { name: 'Butlr Technologies' })).toHaveAttribute(
      'href',
      siteConfig.author.employerUrl
    )
  })
})

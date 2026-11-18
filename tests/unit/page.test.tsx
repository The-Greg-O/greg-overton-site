import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import HomePage from '@/app/page'
import { Topbar } from '@/components/topbar'

vi.mock('next/image', () => ({
  default: ({ alt }: { alt?: string }) => <span role="img" aria-label={alt ?? ''} />,
}))
vi.mock('@/components/side-rail', () => ({ SideRail: () => <nav /> }))

const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'

describe('HomePage', () => {
  it('has the skip link as first focusable element, targeting #main', () => {
    const { container } = render(<HomePage />)
    const first = container.querySelector<HTMLElement>(FOCUSABLE)
    expect(first).toHaveAccessibleName('Skip to content')
    expect(first).toHaveAttribute('href', '#main')
    expect(container.querySelector('#main')).not.toBeNull()
  })

  it('has no unstyled focusable element in the Topbar', () => {
    const { container } = render(<Topbar />)
    const items = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
    for (const el of items) {
      expect(el.className).toMatch(/focus(-visible)?:/)
    }
  })
})

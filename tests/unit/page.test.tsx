import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import HomePage from '@/app/page'

vi.mock('@/components/side-rail', () => ({ SideRail: () => null }))
vi.mock('@/components/readout', () => ({ Readout: () => null }))

describe('HomePage skip link', () => {
  it('has the skip link as the first link, targeting #main', () => {
    const { container } = render(<HomePage />)
    const first = container.querySelector('a')

    expect(first).toHaveTextContent('Skip to content')
    expect(first).toHaveAttribute('href', '#main')
    expect(container.querySelector('#main')).toHaveAttribute('tabindex', '-1')
  })
})

import { describe, expect, it } from 'vitest'
import { projectThemes } from '@/data/projects'

describe('projectThemes', () => {
  const ai = projectThemes.find((t) => t.key === 'ai')

  it('lists Foundry last in the ai theme with the exact description', () => {
    const last = ai?.items[ai.items.length - 1]
    expect(last?.name).toBe('Foundry')
    expect(last?.description).toBe('An exploration in a personal software factory.')
  })

  it('has no url or note on Foundry', () => {
    const foundry = ai?.items.find((i) => i.name === 'Foundry')
    expect(foundry).toBeDefined()
    expect(foundry).not.toHaveProperty('url')
    expect(foundry).not.toHaveProperty('note')
  })

  it('keeps the existing ai items in order and Foundry unique', () => {
    expect(ai?.items.slice(0, 4).map((i) => i.name)).toEqual([
      'TokenBurner',
      'butlr-mcp',
      'Claude-native development workflows',
      'ha-mcp (contributor)',
    ])
    const count = projectThemes.flatMap((t) => t.items).filter((i) => i.name === 'Foundry').length
    expect(count).toBe(1)
  })
})

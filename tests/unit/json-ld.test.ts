import { describe, expect, it } from 'vitest'
import { personWebsiteGraph } from '@/components/json-ld'
import { siteConfig } from '@/lib/constants'

describe('JSON-LD structured data', () => {
  it('serializes to valid JSON', () => {
    expect(() => {
      JSON.parse(JSON.stringify(personWebsiteGraph))
    }).not.toThrow()
  })

  it('declares the schema.org context and a @graph', () => {
    expect(personWebsiteGraph['@context']).toBe('https://schema.org')
    expect(Array.isArray(personWebsiteGraph['@graph'])).toBe(true)
  })

  it('includes a Person and a WebSite node', () => {
    const types = personWebsiteGraph['@graph'].map((node) => node['@type'])
    expect(types).toContain('Person')
    expect(types).toContain('WebSite')
  })

  it('describes the primary entity with role, employer, and social profiles', () => {
    const person = personWebsiteGraph['@graph'].find((node) => node['@type'] === 'Person') as
      | { name: string; jobTitle: string; sameAs: string[]; worksFor: { name: string } }
      | undefined

    expect(person?.name).toBe(siteConfig.author.name)
    expect(person?.jobTitle).toBeTruthy()
    expect(person?.worksFor.name).toBe(siteConfig.author.employerName)
    expect(person?.sameAs).toContain(siteConfig.author.github)
    expect(person?.sameAs).toContain(siteConfig.author.linkedin)
  })
})

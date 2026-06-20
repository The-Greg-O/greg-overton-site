import { siteConfig } from '@/lib/constants'
import { currentRole, education } from '@/data/roles'

const [addressLocality, addressRegion] = siteConfig.author.location
  .split(',')
  .map((part) => part.trim())

/**
 * schema.org `@graph` describing the site's primary entity (Person), the
 * WebSite, and the ProfilePage. Populated entirely from the existing content
 * models so it can never drift from what the page renders. Exported separately
 * from the component so it can be unit-tested as plain data.
 */
export const personWebsiteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      jobTitle: currentRole.title,
      description: siteConfig.description,
      url: siteConfig.url,
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.author.employerName,
        url: siteConfig.author.employerUrl,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality,
        addressRegion,
        addressCountry: 'US',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: education.school,
      },
      knowsAbout: [
        'Internet of Things',
        'Edge computing',
        'Machine learning',
        'Agentic AI',
        'Systems integration',
        'Sailing technology',
        'Rocketry',
      ],
      sameAs: [siteConfig.author.github, siteConfig.author.linkedin],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'en-US',
      publisher: { '@id': `${siteConfig.url}/#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteConfig.url}/#profilepage`,
      url: `${siteConfig.url}/`,
      name: `${siteConfig.name} — ${currentRole.title}`,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      mainEntity: { '@id': `${siteConfig.url}/#person` },
      dateModified: siteConfig.lastUpdated,
      inLanguage: 'en-US',
    },
  ],
}

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personWebsiteGraph) }}
    />
  )
}

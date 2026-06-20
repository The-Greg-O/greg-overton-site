import { siteConfig } from '@/lib/constants'
import { currentRole, priorRoles, education } from '@/data/roles'
import { projectThemes } from '@/data/projects'

export const dynamic = 'force-static'

/**
 * `/llms.txt` — a concise, machine-readable summary for AI answer engines.
 * Generated from the same content models as the page (mirroring sitemap.ts) so
 * the facts and counts never drift from what the site actually shows.
 */
function buildLlmsTxt(): string {
  const { author } = siteConfig
  const projectCount = projectThemes.reduce((sum, theme) => sum + theme.items.length, 0)

  const experience = [currentRole, ...priorRoles]
    .map((role) => `- ${role.title} — ${role.company} (${role.period})`)
    .join('\n')

  const projects = projectThemes
    .map((theme) => {
      const items = theme.items
        .map((item) => `- ${item.name}: ${item.description}${item.url ? ` — ${item.url}` : ''}`)
        .join('\n')
      return `### ${theme.label}\n${items}`
    })
    .join('\n\n')

  return `# ${siteConfig.name}

> ${author.name} is the ${currentRole.title} at ${author.employerName}, an anonymous thermal-sensing company for the built environment, based in ${author.location}. He builds real systems and integrations across IoT, edge systems, ML, and agentic AI.

## About
- Name: ${author.name}
- Role: ${currentRole.title} at ${author.employerName}
- Location: ${author.location}
- Website: ${siteConfig.url}
- GitHub: ${author.github}
- LinkedIn: ${author.linkedin}

## Experience
${experience}
- Education: ${education.school} — ${education.degrees.join('; ')}

## Projects (${String(projectCount)} across ${String(projectThemes.length)} themes)
${projects}

## Links
- Website: ${siteConfig.url}
- Source for this site: ${siteConfig.links.repo}
- GitHub: ${author.github}
- LinkedIn: ${author.linkedin}
`
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  })
}

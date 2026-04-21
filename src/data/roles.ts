export interface Role {
  title: string
  company: string
  companyUrl?: string
  period: string
  summary?: string
  highlights?: string[]
  current?: boolean
  defaultOpen?: boolean
}

export const currentRole: Role = {
  title: 'Head of Research Engineering',
  company: 'Butlr Technologies',
  companyUrl: 'https://butlr.com',
  period: 'Jan 2026 — present',
  summary:
    'I own the research engineering function at Butlr — edge algorithms and firmware, cloud pipelines, ML, dashboards, developer tooling. Most of my time is spent at the seams between layers.',
  highlights: [
    'Technical direction across the full stack — firmware and edge, ingest and ML, dashboards and dev tooling. Setting the bar for how we ship: conventions, reliability patterns, CI.',
    'AI-native infrastructure — agentic tools, our public open-source MCP server, and persistent agents that diagnose the production fleet over Slack.',
    'Platform reliability — architected the edge-to-cloud ingest rearchitecture (MQTT-centric, durable buffering, per-tenant routing) and led the Rust port of our core detection algorithms.',
  ],
  current: true,
}

export const priorRoles: Role[] = [
  {
    title: 'Principal Product & Solution Architect',
    company: 'Butlr Technologies',
    companyUrl: 'https://butlr.com',
    period: 'Jun 2023 — Dec 2025',
    highlights: [
      'Defined and drove product and solution architecture strategy, aligning with Butlr\u2019s mission for smarter, people-aware buildings.',
      'Bridged Engineering, Product, Sales, and Customer Success teams to translate customer needs into delivery.',
      'Led end-to-end implementation of bespoke customer solutions for enterprise accounts.',
    ],
    defaultOpen: true,
  },
  {
    title: 'Field Applications Engineer',
    company: 'Butlr Technologies',
    companyUrl: 'https://butlr.com',
    period: 'Nov 2022 — Jun 2023',
    highlights: [
      'Owned product development efforts for Butlr\u2019s three largest software and hardware deployments — 50% of the total installed base.',
      'Built outcome-based roadmaps tied to customer requirements rather than feature velocity.',
    ],
  },
  {
    title: 'Solutions Engineering Specialist II, Cortex',
    company: 'Palo Alto Networks',
    companyUrl: 'https://paloaltonetworks.com',
    period: 'Mar 2021 — Nov 2022',
    highlights: [
      'Technical lead for a $49M endpoint security + SOC delivery contract spanning state C-level leadership and hundreds of constituent organizations.',
      'Architected Atlassian Confluence information flows adopted by all 12k PANW employees.',
      'Represented the company as presenter and technical session leader at industry events.',
    ],
  },
  {
    title: 'Security Solutions Engineer, Vulnerability Management',
    company: 'Rapid7',
    companyUrl: 'https://rapid7.com',
    period: 'Aug 2018 — Mar 2021',
    highlights: [
      '81% POC win rate against primary competitors; closed 176 new logos; 163% attainment against OKRs.',
      'Presenter at CISO Seattle, Black Hat, DEF CON, and eight Rapid7 Customer Roadshows.',
    ],
  },
  {
    title: 'Cyberspace Operations & Program Management',
    company: 'United States Air Force',
    period: '2013 — 2018',
    summary:
      'Four roles across five years — cyber operations, space operations, and S&T program management.',
    highlights: [
      'Weapons & Tactics and Attack Crew Commander, 91st Cyberspace Operations Squadron — led a cross-functional team of 11 designing and deploying the Air Force\u2019s top-requested cyber attack weapon suite globally.',
      'Section Chief, Nuclear Detonation Detection — managed the NUDET payload for a 34-satellite fleet including GPS Block III.',
      'S&T Portfolio Manager, F-35 Joint Program Office — $45M portfolio spanning 16 cutting-edge manufacturing, software, and production programs.',
    ],
    defaultOpen: true,
  },
]

export const education = {
  school: 'Worcester Polytechnic Institute',
  degrees: ['B.S. Robotics Engineering, 2013', 'M.S. Manufacturing Engineering, 2013'],
}

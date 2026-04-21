export interface Project {
  name: string
  description: string
  url?: string
  note?: string
}

export interface ProjectTheme {
  key: string
  label: string
  blurb?: string
  items: Project[]
}

export const projectThemes: ProjectTheme[] = [
  {
    key: 'marine',
    label: 'Marine & sailing systems',
    blurb:
      'A coherent stack for the sailboat — plumbing at the bottom, domain reasoning in the middle, AI at the top.',
    items: [
      {
        name: 'SV Afterglow Data Hub',
        description:
          'NMEA2000 to SignalK to InfluxDB and Grafana — vessel telemetry on a Raspberry Pi.',
      },
      {
        name: 'Proteus',
        description:
          'Tactical race-routing engine in Rust — weather, tides, and telemetry fused into routing decisions.',
      },
      {
        name: 'Proteus UI',
        description:
          'Map-first tactical dashboard for Proteus — the crew-facing side of the engine.',
      },
      {
        name: 'Afterclaw',
        description:
          'LLM tactician and crew-mate persona running on the boat over Telegram — weather, tactics, crew chat.',
      },
      {
        name: 'SignalK \u2194 Home Assistant bridge',
        description:
          'Pipes marine telemetry into HA so the boat plays nicely with the rest of my systems.',
        url: 'https://github.com/The-Greg-O/signalk-ha-bridge',
      },
      {
        name: 'Lumitec Poco local API for Home Assistant',
        description: 'Local-network control of Lumitec Poco marine lighting from HA.',
        url: 'https://github.com/The-Greg-O/lumitec-poco-ha-local-api',
      },
    ],
  },
  {
    key: 'rocketry',
    label: 'Rocketry',
    items: [
      {
        name: 'MaxQ',
        description:
          'Web-based aerodynamics and flight simulation — drag, fin flutter, stability, Monte Carlo trajectory, dispersion mapping.',
        note: 'MaxQ Lab',
      },
      {
        name: 'IREC Database',
        description: 'A web app for collegiate rocketry teams and their rockets at IREC.',
      },
    ],
  },
  {
    key: 'ai',
    label: 'AI & agentic tooling',
    blurb: 'Agents, integrations, and workflows that do real work on real systems.',
    items: [
      {
        name: 'butlr-mcp',
        description:
          'Open-source Model Context Protocol server for Butlr\u2014published to npm under OIDC trusted publishing, so integrators can plug Butlr into their own agents.',
      },
      {
        name: 'Claude-native development workflows',
        description:
          'Reusable GitHub workflows, agentic CI, and persistent agent-supported operations tooling deployed at platform scale.',
      },
      {
        name: 'ha-mcp (contributor)',
        description: 'Contributions to the upstream Home Assistant Model Context Protocol server.',
        url: 'https://github.com/homeassistant-ai/ha-mcp',
      },
    ],
  },
  {
    key: 'home',
    label: 'Home & everyday',
    items: [
      {
        name: 'Stoke Lair',
        description:
          'Multi-mode Home Assistant configuration — HomeKit, Siri, Frigate, motion automations, migration framework.',
      },
    ],
  },
  {
    key: 'range',
    label: 'Side quests',
    blurb: 'The things that sit outside the main threads — and keep the main threads honest.',
    items: [
      {
        name: 'Sandy',
        description: 'macOS AR sandbox — a spiritual successor to Magic-Sand.',
      },
      {
        name: 'Wreckordbox',
        description:
          'DJ set planner over a Rekordbox library enriched with Spotify audio features.',
      },
      {
        name: 'UFOMAP (contributor)',
        description:
          'A single-page map aggregating UFO / UAP sightings. I contributed tooling and CI.',
        url: 'https://github.com/eagletonart/UFOMAP',
      },
    ],
  },
]

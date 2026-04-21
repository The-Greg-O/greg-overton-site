import { siteConfig } from '@/lib/constants'

const LAST_UPDATED = 'Apr 2026'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 flex flex-wrap justify-between gap-6 border-t border-white/[0.07] pt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg-mute">
      <div>
        {siteConfig.author.name} · &copy; {year} · Last updated {LAST_UPDATED}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <FooterLink href={siteConfig.links.repo}>Source</FooterLink>
        <span aria-hidden className="text-fg-ghost">
          /
        </span>
        <FooterLink href={siteConfig.author.linkedin}>LinkedIn</FooterLink>
        <span aria-hidden className="text-fg-ghost">
          /
        </span>
        <FooterLink href={siteConfig.author.github}>GitHub</FooterLink>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border-b border-white/[0.07] pb-0.5 text-fg-dim transition-colors hover:border-[rgba(95,211,214,0.28)] hover:text-teal-soft focus-visible:outline-none"
    >
      {children}
    </a>
  )
}

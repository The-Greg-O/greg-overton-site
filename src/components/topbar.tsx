import { siteConfig } from '@/lib/constants'

export function Topbar() {
  return (
    <div className="surface-glass mb-14 flex flex-wrap items-center justify-between gap-3 rounded-[10px] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute">
      <div className="flex items-center gap-[18px]">
        <span aria-hidden className="status-dot" />
        <span>
          <span className="text-teal-soft">Log 00</span> · Profile
        </span>
        <span className="text-fg-ghost">/</span>
        <span>
          Status · <span className="font-medium text-foreground">Online</span>
        </span>
      </div>
      <div className="flex items-center gap-[18px]">
        <span>{siteConfig.author.coordinates}</span>
        <span className="text-fg-ghost">/</span>
        <span>{siteConfig.author.location}</span>
      </div>
    </div>
  )
}

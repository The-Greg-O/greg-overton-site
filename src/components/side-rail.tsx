'use client'

const ITEMS = [
  { href: '#profile', label: 'Log 00' },
  { href: '#now', label: '01 Now' },
  { href: '#path', label: '02 Path' },
  { href: '#work', label: '03 Work' },
  { href: '#signal', label: '04 Signal' },
] as const

export function SideRail() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute('href')
    if (!href?.startsWith('#')) return
    const el = document.querySelector(href)
    if (!el) return
    e.preventDefault()
    const top = el.getBoundingClientRect().top + window.scrollY - 40
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Section nav"
      className="fixed right-7 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-[18px] md:flex"
    >
      {ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={handleClick}
          className="group inline-flex items-center gap-2.5 font-mono text-[9.5px] uppercase tracking-[0.24em] text-fg-mute transition-colors hover:text-teal-soft focus-visible:text-teal-soft focus-visible:outline-none"
        >
          <span
            aria-hidden
            className="h-[7px] w-[7px] rounded-full bg-fg-ghost transition-all group-hover:bg-teal group-hover:shadow-[0_0_8px_hsl(var(--teal))] group-focus-visible:bg-teal"
          />
          <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {item.label}
          </span>
        </a>
      ))}
    </nav>
  )
}

import Image from 'next/image'
import { siteConfig } from '@/lib/constants'

export function Hero() {
  return (
    <section
      id="profile"
      className="mb-14 grid items-center gap-12 md:grid-cols-[220px_1fr] md:gap-12"
    >
      <Portrait />

      <div className="flex flex-col gap-3.5">
        <h1 className="m-0 font-sans text-[clamp(48px,6vw,72px)] font-light leading-[0.95] tracking-[-0.035em] text-[#eef4f8]">
          Greg <span className="gradient-accent">Overton</span>
        </h1>
        <div className="flex flex-wrap items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-fg-dim">
          <span className="text-teal">›</span>
          <span>Head of Research Engineering</span>
          <span className="text-fg-ghost">·</span>
          <a
            href={siteConfig.author.employerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-[rgba(95,211,214,0.28)] pb-0.5 text-foreground no-underline transition-colors hover:border-teal hover:text-teal-soft focus-visible:border-teal focus-visible:outline-none"
          >
            {siteConfig.author.employerName}
          </a>
        </div>

        <blockquote className="surface-glass relative mt-2 max-w-[640px] rounded-[14px] px-6 py-5 font-sans text-[18px] leading-[1.5] text-[#e8eef3]">
          <span aria-hidden className="corner corner-tl" />
          <span aria-hidden className="corner corner-br" />
          {siteConfig.tagline}
        </blockquote>

        <div className="mt-2 flex flex-wrap gap-2">
          <a
            className="chip primary"
            href={siteConfig.author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="arr">→</span> LinkedIn
          </a>
          <a
            className="chip"
            href={siteConfig.author.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="arr">→</span> GitHub
          </a>
          <a
            className="chip"
            href={siteConfig.author.employerUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="arr">→</span> Butlr
          </a>
        </div>
      </div>
    </section>
  )
}

function Portrait() {
  return (
    <div className="portrait-frame mx-auto md:mx-0">
      <span aria-hidden className="portrait-bracket tl" />
      <span aria-hidden className="portrait-bracket tr" />
      <span aria-hidden className="portrait-bracket bl" />
      <span aria-hidden className="portrait-bracket br" />
      <div className="portrait-disc">
        <div className="portrait-inner">
          <Image
            src="/images/plate-01-portrait.jpeg"
            alt="Greg Overton portrait"
            width={440}
            height={440}
            priority
          />
        </div>
      </div>
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.28em] text-fg-mute">
        <span className="text-teal">Plate 01</span> · Portrait
      </span>
    </div>
  )
}

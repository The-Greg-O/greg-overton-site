import { currentRole } from '@/data/roles'
import { SectionLabel } from '@/components/section-label'

export function Now() {
  return (
    <section aria-labelledby="now-heading">
      <SectionLabel id="now" index="01" name="Now" stamp="Current assignment" />
      <article className="surface-glass relative rounded-2xl px-8 py-8">
        <span aria-hidden className="corner corner-tl" />
        <span aria-hidden className="corner corner-br" />

        <header className="mb-5 flex flex-wrap items-baseline justify-between gap-5">
          <div>
            <h3 className="m-0 mb-1 font-sans text-[28px] font-light leading-[1.1] tracking-[-0.02em] text-[#eef4f8]">
              {currentRole.title}
            </h3>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
              {currentRole.companyUrl ? (
                <a
                  href={currentRole.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-[rgba(95,211,214,0.28)] pb-0.5 text-foreground no-underline hover:text-teal-soft focus-visible:outline-none"
                >
                  {currentRole.company}
                </a>
              ) : (
                <span>{currentRole.company}</span>
              )}
              <span className="px-2 text-fg-ghost">·</span>
              <span>Anonymous thermal sensing for the built environment</span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-fg-mute">
            <span aria-hidden className="status-dot" />
            <span className="text-teal">{currentRole.period.split(' — ')[0]}</span>
            <span>— present</span>
          </div>
        </header>

        {currentRole.summary && (
          <p className="mb-[22px] max-w-[680px] text-[16px] leading-[1.6] text-[#c9d4dd]">
            {currentRole.summary}
          </p>
        )}

        {currentRole.highlights && (
          <ol className="flex flex-col gap-3.5">
            {currentRole.highlights.map((h, i) => (
              <li
                key={h}
                className="grid grid-cols-[44px_1fr] items-start gap-3.5 border-t border-white/[0.07] py-2.5 first:border-t-0 first:pt-0.5"
              >
                <span className="pt-1 font-mono text-[11px] tracking-[0.2em] text-teal">
                  {String(i + 1).padStart(2, '0')} /
                </span>
                <span className="text-[14.5px] leading-[1.55] text-[#c9d4dd]">{h}</span>
              </li>
            ))}
          </ol>
        )}
      </article>
    </section>
  )
}

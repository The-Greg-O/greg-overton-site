import { siteConfig } from '@/lib/constants'
import { SectionLabel } from '@/components/section-label'

export function ContactSection() {
  return (
    <section aria-labelledby="signal-heading">
      <SectionLabel id="signal" index="04" name="Signal" stamp="Get in touch" />
      <div className="relative mt-7">
        <div className="surface-glass signal-backdrop relative overflow-hidden rounded-2xl px-10 py-10">
          <span aria-hidden className="corner corner-tl" />
          <span aria-hidden className="corner corner-br" />

          <h3 className="m-0 mb-2.5 font-sans text-[32px] font-light tracking-[-0.02em] text-[#eef4f8]">
            Get in touch
          </h3>
          <p className="mb-[22px] max-w-[520px] text-[15px] leading-[1.55] text-fg-dim">
            LinkedIn and GitHub are the best ways to reach me.
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
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
          </div>
        </div>
      </div>
    </section>
  )
}

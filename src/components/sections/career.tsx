import { education, priorRoles } from '@/data/roles'
import { SectionLabel } from '@/components/section-label'

export function Career() {
  return (
    <section aria-labelledby="path-heading">
      <SectionLabel id="path" index="02" name="Path" stamp="Aerospace · Security · IoT" />
      <p className="mb-7 max-w-[680px] text-[15px] leading-[1.6] text-fg-dim">
        Across roles at{' '}
        <strong className="font-medium text-foreground">
          Butlr Technologies, Palo Alto Networks, Rapid7, and the United States Air Force
        </strong>
        , the thread has been{' '}
        <strong className="font-medium text-foreground">
          cross-functional technical leadership
        </strong>{' '}
        at the intersection of hardware, software, and whoever&rsquo;s on the other end of the thing
        being built.
      </p>

      <div className="surface-glass flex flex-col overflow-hidden rounded-2xl">
        {priorRoles.map((role, i) => {
          const n = String(i + 1).padStart(2, '0')
          const active = role.defaultOpen === true
          return (
            <details
              key={`${role.company}-${role.title}`}
              {...(role.defaultOpen ? { open: true } : {})}
              className="group border-t border-white/[0.07] first:border-t-0"
            >
              <summary className="grid cursor-pointer grid-cols-[36px_1fr_24px] items-baseline gap-4 px-6 py-[18px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal md:grid-cols-[56px_1fr_200px_24px] md:gap-6">
                <span
                  className={[
                    'font-mono text-[11px] tracking-[0.2em]',
                    active ? 'text-teal' : 'text-fg-mute',
                  ].join(' ')}
                >
                  {n}
                </span>
                <div>
                  <div className="text-[15px] font-medium leading-snug tracking-[-0.005em] text-[#eef4f8]">
                    {role.title}
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg-dim">
                    {role.company}
                  </div>
                </div>
                <span className="hidden text-right font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg-mute md:block">
                  {role.period}
                </span>
                <span
                  aria-hidden
                  className="justify-self-end font-mono text-[11px] text-fg-mute transition-transform duration-200 group-open:rotate-90 group-open:text-teal motion-reduce:transition-none"
                >
                  ▸
                </span>
              </summary>
              <div className="border-t border-dashed border-white/[0.07] px-6 pb-6 pt-3.5 text-[14px] leading-[1.6] text-[#c9d4dd] md:pl-[104px]">
                {role.summary && <p className="m-0 mb-2.5 text-fg-dim">{role.summary}</p>}
                {role.highlights && (
                  <ul className="m-0 mt-2 list-none p-0">
                    {role.highlights.map((h) => (
                      <li
                        key={h}
                        className="grid grid-cols-[14px_1fr] gap-3 border-t border-white/[0.07] py-2 first:border-t-0"
                      >
                        <span aria-hidden className="mt-2.5 block h-px w-2.5 bg-teal opacity-60" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          )
        })}

        <div className="grid grid-cols-[36px_1fr] items-baseline gap-4 border-t border-white/[0.07] px-6 py-[18px] md:grid-cols-[56px_1fr] md:gap-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-mute">Edu</span>
          <div className="text-[14.5px] text-[#eef4f8]">
            {education.school}
            <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-dim">
              {education.degrees.join(' · ')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

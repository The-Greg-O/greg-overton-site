import Image from 'next/image'
import { projectThemes } from '@/data/projects'
import { SectionLabel } from '@/components/section-label'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

interface Plate {
  num: string
  label: string
  kind: string
  coord: string
  src: string
  alt: string
  objectPosition?: string
}

const PLATES: Plate[] = [
  {
    num: '02',
    label: 'Salish Sea',
    kind: 'Sailing',
    coord: '47.6°N · Salish Sea',
    src: '/images/plate-02-fleet.jpeg',
    alt: 'Fleet racing with Mount Rainier in the background',
    objectPosition: '50% 45%',
  },
  {
    num: '03',
    label: 'Himalaya',
    kind: 'Range',
    coord: '28.0°N · Himalaya',
    src: '/images/plate-himalaya.jpeg',
    alt: 'Climber on a snowy ridge',
  },
  {
    num: '04',
    label: 'Workshop',
    kind: 'Bench',
    coord: '47.6°N · Seattle',
    src: '/images/plate-workshop.jpeg',
    alt: 'Hands using a router on a workbench',
  },
]

export function Projects() {
  return (
    <section aria-labelledby="work-heading">
      <SectionLabel id="work" index="03" name="Work" stamp="A handful of threads" />
      <p className="mb-2 max-w-[680px] text-[15px] leading-[1.6] text-fg-dim">
        Mentioned, not case-studied. A link goes out where the work is public; otherwise it sits
        here as evidence of a pattern.
      </p>

      <PlateStrip />

      <div className="mt-7 flex flex-col">
        {projectThemes.map((theme, i) => (
          <div
            key={theme.key}
            className="mt-7 grid gap-[14px] border-t border-white/[0.07] pt-7 md:grid-cols-[200px_1fr] md:gap-9"
          >
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-teal">
                {ROMAN[i] ?? String(i + 1)}
              </div>
              <h3 className="m-0 mb-2 text-[17px] font-medium leading-snug tracking-[-0.005em] text-[#eef4f8]">
                {theme.label}
              </h3>
              {theme.blurb && (
                <p className="text-[13.5px] leading-[1.55] text-fg-dim">{theme.blurb}</p>
              )}
            </div>

            <ul className="flex flex-col">
              {theme.items.map((item, idx) => (
                <li
                  key={item.name}
                  className={[
                    'grid grid-cols-[1fr_auto] gap-4 py-3.5',
                    idx === 0 ? 'pt-1' : 'border-t border-white/[0.07]',
                  ].join(' ')}
                >
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-b border-[rgba(95,211,214,0.28)] pb-0.5 text-[14.5px] font-medium text-[#eef4f8] no-underline transition-colors hover:border-teal hover:text-teal-soft focus-visible:border-teal focus-visible:outline-none"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span className="text-[14.5px] font-medium text-[#eef4f8]">
                          {item.name}
                        </span>
                      )}
                      {item.note && (
                        <span className="inline-block rounded-[4px] border border-white/[0.07] px-[7px] py-0.5 align-[2px] font-mono text-[9.5px] uppercase tracking-[0.22em] text-fg-mute">
                          {item.note}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[13px] leading-[1.55] text-fg-dim">
                      {item.description}
                    </p>
                  </div>
                  {item.url && (
                    <span aria-hidden className="self-start pt-1 font-mono text-xs text-teal">
                      ↗
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function PlateStrip() {
  return (
    <div className="mb-10 mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
      {PLATES.map((p) => (
        <figure key={p.num} className="m-0">
          <div className="plate-img">
            <span aria-hidden className="plate-bracket tl" />
            <span aria-hidden className="plate-bracket br" />
            <span className="absolute right-3.5 top-3 z-[2] font-mono text-[10.5px] uppercase tracking-[0.26em] text-teal">
              {p.num}
            </span>
            <span className="absolute bottom-3.5 left-4 z-[2] text-[17px] font-medium tracking-[-0.01em] text-[#eef4f8]">
              {p.label}
            </span>
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 100vw, 33vw"
              style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
            />
          </div>
          <figcaption className="mt-2.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-fg-mute">
            <span>
              <span className="text-teal">Plate {p.num}</span> · {p.kind}
            </span>
            <span>{p.coord}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

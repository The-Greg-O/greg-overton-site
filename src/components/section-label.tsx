interface SectionLabelProps {
  id?: string
  index: string
  name: string
  stamp?: string
}

export function SectionLabel({ id, index, name, stamp }: SectionLabelProps) {
  return (
    <div
      id={id}
      className="mb-6 mt-[88px] flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-[0.28em] text-fg-mute"
    >
      <span className="text-teal">{index}</span>
      <h2
        id={id ? `${id}-heading` : undefined}
        className="m-0 font-mono text-[11px] font-normal uppercase tracking-[0.28em] text-fg-mute"
      >
        {name}
      </h2>
      <span aria-hidden className="section-line" />
      {stamp && <span className="text-[10px] text-fg-ghost">{stamp}</span>}
    </div>
  )
}

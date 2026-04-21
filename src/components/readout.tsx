interface Cell {
  label: string
  value: string
  live?: boolean
}

const CELLS: Cell[] = [
  { label: 'Status', value: 'Active · Jan 2026 —', live: true },
  { label: 'Roles', value: '05' },
  { label: 'Tenure', value: '12 yrs' },
  { label: 'Projects', value: '14+' },
  { label: 'Domains', value: 'Aero · Sec · IoT' },
]

export function Readout() {
  return (
    <div
      aria-label="Career readout"
      className="surface-glass mt-12 grid grid-cols-2 rounded-xl px-4 py-3.5 font-mono md:grid-cols-5 md:px-5"
    >
      {CELLS.map((cell, i) => (
        <div
          key={cell.label}
          className={[
            'px-3 py-1 md:px-4',
            i === 0 ? 'md:pl-0' : 'md:border-l md:border-white/[0.07]',
            i < 2 ? '' : 'border-t border-white/[0.07] md:border-t-0',
          ].join(' ')}
        >
          <div className="mb-1 text-[9.5px] uppercase tracking-[0.26em] text-fg-mute">
            {cell.label}
          </div>
          <div
            className={[
              'text-[13.5px] tracking-[0.08em]',
              cell.live ? 'text-teal' : 'text-foreground',
            ].join(' ')}
          >
            {cell.value}
          </div>
        </div>
      ))}
    </div>
  )
}

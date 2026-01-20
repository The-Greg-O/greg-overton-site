'use client'

import { useMemo, useState } from 'react'
import { type ContributionCalendar, type ContributionDay } from '@/types/github'
import { cn } from '@/lib/utils'

interface ContributionHeatmapProps {
  calendar: ContributionCalendar
  className?: string
}

// Accent color scale for contribution levels (cyan for dark, adjusted for light)
const LEVEL_COLORS = {
  0: 'fill-muted/30',
  1: 'fill-accent/30',
  2: 'fill-accent/50',
  3: 'fill-accent/75',
  4: 'fill-accent',
} as const

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

export function ContributionHeatmap({ calendar, className }: ContributionHeatmapProps) {
  const [tooltip, setTooltip] = useState<{
    day: ContributionDay
    x: number
    y: number
  } | null>(null)

  // Calculate month labels and their positions
  const monthPositions = useMemo(() => {
    const positions: { month: string; x: number }[] = []
    let currentMonth = -1

    calendar.weeks.forEach((week, weekIndex) => {
      const firstDay = week.days[0]
      if (firstDay) {
        const date = new Date(firstDay.date)
        const month = date.getMonth()

        if (month !== currentMonth) {
          currentMonth = month
          positions.push({
            month: MONTH_LABELS[month] ?? '',
            x: weekIndex * 13 + 24, // Adjusted spacing
          })
        }
      }
    })

    return positions
  }, [calendar.weeks])

  const cellSize = 10
  const cellGap = 3
  const cellTotal = cellSize + cellGap
  const leftPadding = 24
  const topPadding = 18

  const svgWidth = calendar.weeks.length * cellTotal + leftPadding + 4
  const svgHeight = 7 * cellTotal + topPadding + 4

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  function handleMouseEnter(day: ContributionDay, event: React.MouseEvent<SVGRectElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({
      day,
      x: rect.left + rect.width / 2,
      y: rect.top,
    })
  }

  function handleMouseLeave() {
    setTooltip(null)
  }

  return (
    <div className={cn('relative', className)}>
      {/* Scrollable container for mobile */}
      <div className="scrollbar-hide -mx-2 overflow-x-auto px-2 pb-2">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="min-w-max"
          role="img"
          aria-label={`GitHub contribution graph showing ${String(calendar.totalContributions)} contributions`}
        >
          {/* Month labels */}
          <g className="fill-muted-foreground text-[9px] sm:text-[10px]">
            {monthPositions.map((pos, i) => (
              <text key={i} x={pos.x} y={10} className="select-none font-mono">
                {pos.month}
              </text>
            ))}
          </g>

          {/* Day labels */}
          <g className="fill-muted-foreground text-[9px] sm:text-[10px]">
            {DAY_LABELS.map((label, i) => (
              <text
                key={i}
                x={2}
                y={topPadding + i * cellTotal + cellSize - 2}
                className="select-none font-mono"
              >
                {label}
              </text>
            ))}
          </g>

          {/* Contribution cells */}
          <g>
            {calendar.weeks.map((week, weekIndex) =>
              week.days.map((day, dayIndex) => (
                <rect
                  key={day.date}
                  x={leftPadding + weekIndex * cellTotal}
                  y={topPadding + dayIndex * cellTotal}
                  width={cellSize}
                  height={cellSize}
                  rx={2}
                  className={cn(
                    LEVEL_COLORS[day.level],
                    'cursor-pointer transition-all duration-150',
                    'hover:stroke-primary hover:stroke-1'
                  )}
                  onMouseEnter={(e) => {
                    handleMouseEnter(day, e)
                  }}
                  onMouseLeave={handleMouseLeave}
                />
              ))
            )}
          </g>
        </svg>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-lg border border-border bg-popover px-3 py-2 font-mono text-xs shadow-lg sm:text-sm"
          style={{
            left: tooltip.x,
            top: tooltip.y - 8,
          }}
        >
          <div className="font-semibold text-foreground">
            <span className="text-primary">{tooltip.day.count}</span> contribution
            {tooltip.day.count !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-muted-foreground">{formatDate(tooltip.day.date)}</div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground">
        <span>Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <div
            key={level}
            className={cn('h-2.5 w-2.5 rounded-sm sm:h-3 sm:w-3', LEVEL_COLORS[level])}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { type LanguageStats } from '@/types/github'
import { cn } from '@/lib/utils'

interface LanguageBarProps {
  languages: LanguageStats[]
  className?: string
}

export function LanguageBar({ languages, className }: LanguageBarProps) {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null)

  if (languages.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Stacked bar */}
      <div className="flex h-2.5 overflow-hidden rounded-full bg-muted/30 sm:h-3">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="relative transition-all duration-200 first:rounded-l-full last:rounded-r-full hover:brightness-125"
            style={{
              width: `${String(lang.percentage)}%`,
              backgroundColor: lang.color,
              boxShadow: hoveredLang === lang.name ? `0 0 8px ${lang.color}` : 'none',
            }}
            onMouseEnter={() => {
              setHoveredLang(lang.name)
            }}
            onMouseLeave={() => {
              setHoveredLang(null)
            }}
          >
            {/* Tooltip on hover */}
            {hoveredLang === lang.name && (
              <div className="absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 font-mono text-xs shadow-lg sm:-top-10">
                <span className="font-medium">{lang.name}</span>
                <span className="ml-1 text-muted-foreground">{lang.percentage}%</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 sm:gap-x-4">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className={cn(
              'flex cursor-default items-center gap-1.5 text-xs transition-opacity',
              hoveredLang && hoveredLang !== lang.name && 'opacity-40'
            )}
            onMouseEnter={() => {
              setHoveredLang(lang.name)
            }}
            onMouseLeave={() => {
              setHoveredLang(null)
            }}
          >
            <span
              className="h-2 w-2 flex-shrink-0 rounded-full sm:h-2.5 sm:w-2.5"
              style={{
                backgroundColor: lang.color,
                boxShadow: hoveredLang === lang.name ? `0 0 6px ${lang.color}` : 'none',
              }}
            />
            <span className="font-medium text-foreground">{lang.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground sm:text-xs">
              {lang.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

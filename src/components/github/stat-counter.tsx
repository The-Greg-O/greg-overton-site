'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  label: string
  suffix?: string
  duration?: number
  className?: string
}

export function StatCounter({
  value,
  label,
  suffix = '',
  duration = 1500,
  className,
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateValue(0, value, duration)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [value, duration, hasAnimated])

  function animateValue(start: number, end: number, animDuration: number) {
    const startTime = performance.now()
    const range = end - start

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / animDuration, 1)

      // Easing function: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + range * eased)

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }

  const formattedValue = displayValue.toLocaleString()

  return (
    <div ref={elementRef} className={cn('text-center', className)}>
      <div className="font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
        <span className="tabular-nums">{formattedValue}</span>
        {suffix && <span className="text-sm text-primary sm:text-lg lg:text-xl">{suffix}</span>}
      </div>
      <div className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">{label}</div>
    </div>
  )
}

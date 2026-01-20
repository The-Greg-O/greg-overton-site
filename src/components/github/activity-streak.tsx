'use client'

import { type ActivityMetrics } from '@/types/github'
import { cn } from '@/lib/utils'

interface ActivityStreakProps {
  activity: ActivityMetrics
  className?: string
}

export function ActivityStreak({ activity, className }: ActivityStreakProps) {
  const streakPercentage =
    activity.longestStreak > 0
      ? Math.round((activity.currentStreak / activity.longestStreak) * 100)
      : 0

  return (
    <div
      className={cn(
        'hud-border rounded-lg border border-border/50 bg-card/50 p-3 backdrop-blur-sm sm:p-4 lg:p-6',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2">
            <span className="font-mono text-2xl font-bold tabular-nums text-foreground sm:text-3xl lg:text-4xl">
              {activity.currentStreak}
            </span>
            <span className="text-xs text-muted-foreground sm:text-sm">day streak</span>
          </div>

          {activity.currentStreak > 0 && (
            <p className="mt-0.5 text-[10px] leading-tight text-primary sm:text-xs">
              {activity.currentStreak >= activity.longestStreak
                ? 'Personal best!'
                : `${String(activity.longestStreak - activity.currentStreak)}d to beat record`}
            </p>
          )}

          {activity.currentStreak === 0 && (
            <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">
              Start coding to build streak
            </p>
          )}
        </div>

        {/* Streak indicator */}
        <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center sm:h-14 sm:w-14 lg:h-16 lg:w-16">
          {/* Background ring */}
          <svg className="absolute h-full w-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="fill-none stroke-muted/30"
              strokeWidth="5"
            />
            {/* Progress ring */}
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="fill-none stroke-accent transition-all duration-1000"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${String((streakPercentage / 100) * 157)} 157`}
            />
          </svg>
          {/* Center icon */}
          <span className="text-xl sm:text-2xl" role="img" aria-label="streak status">
            {activity.currentStreak >= 7 ? '🔥' : activity.currentStreak > 0 ? '✨' : '💤'}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-3 grid grid-cols-3 gap-1 border-t border-border/50 pt-3 sm:mt-4 sm:gap-3">
        <div className="text-center">
          <div className="font-mono text-base font-semibold tabular-nums text-foreground sm:text-lg">
            {activity.longestStreak}
          </div>
          <div className="text-[9px] text-muted-foreground sm:text-[10px]">Best</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-base font-semibold tabular-nums text-foreground sm:text-lg">
            {activity.activeDaysThisYear}
          </div>
          <div className="text-[9px] text-muted-foreground sm:text-[10px]">YTD</div>
        </div>
        <div className="text-center">
          <div className="font-mono text-base font-semibold tabular-nums text-foreground sm:text-lg">
            {activity.averagePerDay}
          </div>
          <div className="text-[9px] text-muted-foreground sm:text-[10px]">Avg/Day</div>
        </div>
      </div>
    </div>
  )
}

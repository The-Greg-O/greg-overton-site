'use client'

import { type GitHubStats, type ActivityMetrics } from '@/types/github'
import { StatCounter } from './stat-counter'
import { cn } from '@/lib/utils'

interface StatsGridProps {
  stats: GitHubStats
  activity: ActivityMetrics
  className?: string
}

export function StatsGrid({ stats, activity, className }: StatsGridProps) {
  const statItems = [
    {
      value: stats.totalContributions,
      label: 'Contributions',
      delay: 0,
    },
    {
      value: stats.totalCommits,
      label: 'Commits',
      delay: 50,
    },
    {
      value: stats.totalPRs,
      label: 'Pull Requests',
      delay: 100,
    },
    {
      value: stats.totalPRsReviewed,
      label: 'Reviews',
      delay: 150,
    },
    {
      value: activity.currentStreak,
      label: 'Day Streak',
      suffix: 'd',
      delay: 200,
    },
    {
      value: stats.reposContributedTo,
      label: 'Repos',
      delay: 250,
    },
  ]

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6 lg:gap-4',
        className
      )}
    >
      {statItems.map((item, index) => (
        <div
          key={item.label}
          className="card-hover hud-border group relative overflow-hidden rounded-lg border border-border/50 bg-card/50 p-2.5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 sm:p-3 lg:p-4"
          style={{
            animationDelay: `${String(item.delay)}ms`,
          }}
        >
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <StatCounter
            value={item.value}
            label={item.label}
            suffix={item.suffix}
            duration={1500 + index * 100}
            className="relative z-10"
          />
        </div>
      ))}
    </div>
  )
}

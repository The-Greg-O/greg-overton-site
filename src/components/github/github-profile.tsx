import { type GitHubProfile } from '@/types/github'
import { StatsGrid } from './stats-grid'
import { ContributionHeatmap } from './contribution-heatmap'
import { ActivityStreak } from './activity-streak'
import { LanguageBar } from './language-bar'
import { cn } from '@/lib/utils'

interface GitHubProfileSectionProps {
  profile: GitHubProfile
  className?: string
}

export function GitHubProfileSection({ profile, className }: GitHubProfileSectionProps) {
  const { user, stats, activity, contributions, languages, fetchedAt } = profile

  // Calculate time ago for "last updated"
  const lastUpdated = new Date(fetchedAt)
  const minutesAgo = Math.round((Date.now() - lastUpdated.getTime()) / 60000)
  const timeAgo =
    minutesAgo < 1
      ? 'just now'
      : minutesAgo < 60
        ? `${String(minutesAgo)}m ago`
        : `${String(Math.round(minutesAgo / 60))}h ago`

  return (
    <section className={cn('space-y-4 sm:space-y-6 lg:space-y-8', className)}>
      {/* Header with avatar and name */}
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src={user.avatarUrl}
          alt={`${user.name ?? user.login}'s avatar`}
          width={64}
          height={64}
          className="h-12 w-12 animate-pulse-glow-cyan rounded-full ring-2 ring-accent/50 sm:h-16 sm:w-16"
        />
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-foreground sm:text-2xl">
            {user.name ?? user.login}
          </h2>
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent sm:text-sm"
          >
            @{user.login}
          </a>
        </div>
      </div>

      {/* Bio if present */}
      {user.bio && (
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">{user.bio}</p>
      )}

      {/* Stats Grid */}
      <div className="stagger-children">
        <StatsGrid stats={stats} activity={activity} />
      </div>

      {/* Two column layout for streak and heatmap on larger screens */}
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_260px]">
        {/* Contribution Heatmap */}
        <div className="hud-border order-2 rounded-lg border border-border/50 bg-card/50 p-2.5 backdrop-blur-sm sm:p-3 lg:order-1 lg:p-5">
          <h3 className="mb-2 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:mb-3 sm:text-xs">
            <span className="text-accent">//</span> Contributions
          </h3>
          <ContributionHeatmap calendar={contributions} />
        </div>

        {/* Activity Streak */}
        <div className="order-1 lg:order-2">
          <ActivityStreak activity={activity} />
        </div>
      </div>

      {/* Languages */}
      {languages.length > 0 && (
        <div className="hud-border rounded-lg border border-border/50 bg-card/50 p-2.5 backdrop-blur-sm sm:p-3 lg:p-5">
          <h3 className="mb-2 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground sm:mb-3 sm:text-xs">
            <span className="text-accent">//</span> Languages
          </h3>
          <LanguageBar languages={languages} />
        </div>
      )}

      {/* Footer with last updated */}
      <p className="font-mono text-[10px] text-muted-foreground/60 sm:text-xs">
        <span className="text-success">●</span> Data refreshed {timeAgo} • Updates hourly
      </p>
    </section>
  )
}

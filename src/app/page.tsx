import { Suspense } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { GitHubProfileSection } from '@/components/github'
import { fetchGitHubProfile } from '@/lib/github'

// Revalidate every hour (ISR)
export const revalidate = 3600

async function GitHubProfile() {
  try {
    const profile = await fetchGitHubProfile()
    return <GitHubProfileSection profile={profile} />
  } catch (error) {
    console.error('Failed to fetch GitHub profile:', error)
    return (
      <div className="instrument-panel p-6 text-center sm:p-8">
        <div className="mb-2 font-mono text-sm text-accent">// TELEMETRY ERROR</div>
        <p className="text-muted-foreground">
          Unable to establish connection to GitHub. Please check back later.
        </p>
      </div>
    )
  }
}

function GitHubProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6 sm:space-y-8">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-muted/50 sm:h-16 sm:w-16" />
        <div className="space-y-2">
          <div className="h-6 w-32 rounded bg-muted/50 sm:w-40" />
          <div className="h-4 w-20 rounded bg-muted/50 sm:w-24" />
        </div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 rounded-lg border border-border/50 bg-muted/20 sm:h-24" />
        ))}
      </div>

      {/* Heatmap skeleton */}
      <div className="h-36 rounded-lg border border-border/50 bg-muted/20 sm:h-40" />
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="safe-area-inset min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-20">
        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 sm:gap-6">
          {/* Name - Display font */}
          <h1 className="text-glow font-display text-2xl tracking-wider sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              GREG OVERTON
            </span>
          </h1>

          {/* Tagline */}
          <p className="max-w-md text-base font-light text-muted-foreground sm:max-w-lg sm:text-lg">
            Software engineer crafting modern web experiences
          </p>

          {/* Action buttons */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://github.com/The-Greg-O"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-cyan touch-target group inline-flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent transition-all hover:border-accent hover:bg-accent/20 sm:px-5 sm:py-2.5"
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">View</span> GitHub
            </a>
            <ThemeToggle />
          </div>
        </div>
      </section>

      {/* GitHub Profile Section */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24">
        <Suspense fallback={<GitHubProfileSkeleton />}>
          <GitHubProfile />
        </Suspense>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-6 sm:py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-sm">
          <div className="font-mono">
            <span className="text-accent">&gt;</span> gregoverton.com
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/The-Greg-O"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/greg-overton"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

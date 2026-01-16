import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Greg Overton</h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Software engineer building modern web experiences. This site is under construction.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/goverton"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </div>
    </main>
  )
}

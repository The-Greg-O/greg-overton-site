import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="relative z-[1] flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-sans text-6xl font-light tracking-tight text-[#eef4f8]">404</h1>
        <h2 className="font-mono text-sm uppercase tracking-[0.28em] text-fg-dim">Signal lost</h2>
        <p className="max-w-md text-fg-dim">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link href="/" className="chip primary mt-4">
          <span className="arr">→</span> Go home
        </Link>
      </div>
    </main>
  )
}

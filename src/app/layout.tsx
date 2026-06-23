import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { geistSans, jetbrainsMono } from '@/lib/fonts'
import { siteConfig } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Head of Research Engineering`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#03040a',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

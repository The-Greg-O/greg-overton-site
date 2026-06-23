import type { Metadata, Viewport } from 'next'
import { geistSans, jetbrainsMono } from '@/lib/fonts'
import { siteConfig } from '@/lib/constants'
import { currentRole } from '@/data/roles'
import { JsonLd } from '@/components/json-ld'
import './globals.css'

const titleDefault = `${siteConfig.name} — ${currentRole.title}`

export const metadata: Metadata = {
  title: {
    default: titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'profile',
    firstName: 'Greg',
    lastName: 'Overton',
    username: 'The-Greg-O',
    locale: 'en_US',
    url: siteConfig.url,
    title: titleDefault,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: titleDefault,
    description: siteConfig.description,
    // No twitter:creator/site handle — Greg keeps no public X/Twitter presence;
    // LinkedIn and GitHub (siteConfig.author) are the canonical profiles.
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
        <JsonLd />
        {children}
      </body>
    </html>
  )
}

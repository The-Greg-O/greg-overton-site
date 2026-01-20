import { Orbitron, Oxanium, JetBrains_Mono } from 'next/font/google'

// Display font - bold, geometric, futuristic sci-fi headings
export const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// Body/UI font - technical, readable, aerospace aesthetic
export const oxanium = Oxanium({
  variable: '--font-oxanium',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Monospace font - data displays, stats, code
export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

import type { Metadata } from 'next'
import { Hero } from '@/components/sections/hero'
import { Now } from '@/components/sections/now'
import { Career } from '@/components/sections/career'
import { Projects } from '@/components/sections/projects'
import { ContactSection } from '@/components/sections/contact-section'
import { Footer } from '@/components/sections/footer'
import { Topbar } from '@/components/topbar'
import { Readout } from '@/components/readout'
import { SideRail } from '@/components/side-rail'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-[#0b0f1a] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-foreground focus:outline focus:outline-2 focus:outline-teal"
      >
        Skip to content
      </a>
      <SideRail />
      <main
        id="main"
        tabIndex={-1}
        className="relative z-[1] mx-auto max-w-[1200px] px-5 pb-24 pt-9 focus:outline-none md:px-12"
      >
        <Topbar />
        <Hero />
        <Readout />
        <Now />
        <Career />
        <Projects />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}

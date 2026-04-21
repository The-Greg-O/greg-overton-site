import { Hero } from '@/components/sections/hero'
import { Now } from '@/components/sections/now'
import { Career } from '@/components/sections/career'
import { Projects } from '@/components/sections/projects'
import { ContactSection } from '@/components/sections/contact-section'
import { Footer } from '@/components/sections/footer'
import { Topbar } from '@/components/topbar'
import { Readout } from '@/components/readout'
import { SideRail } from '@/components/side-rail'

export default function HomePage() {
  return (
    <>
      <SideRail />
      <main className="relative z-[1] mx-auto max-w-[1200px] px-5 pb-24 pt-9 md:px-12">
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

// app/page.js
import Hero from '@/components/sections/Hero'
import CaseStudies from '@/components/sections/CaseStudies'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import Authority from '@/components/sections/Authority'
import PersonalWork from '@/components/sections/PersonalWork'
import CTA from '@/components/sections/CTA'
import { portfolioData } from '@/lib/data'
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero data={portfolioData.hero} />
      <CaseStudies data={portfolioData.caseStudies} />
      <Process data={portfolioData.process} />
      <Authority data={portfolioData.authority} />
      <PersonalWork data={portfolioData.personalWork} />
      <FAQ data={portfolioData.faq} />
      <CTA data={portfolioData.cta} />
    </>
  )
}
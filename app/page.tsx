import { Metadata } from 'next';
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import About from '@/components/landing/About';
import Blog from '@/components/landing/Blog';
import Contact from '@/components/landing/Contact';
import FAQ from '@/components/landing/FAQ';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import CaseStudies from '@/components/landing/CaseStudies';

export const metadata: Metadata = {
  title: 'Ship Happpens | Your Trusted Supply Chain Partner',
  description: 'Comprehensive logistics and supply chain solutions for businesses of all sizes. Offering warehousing, transportation, and end-to-end logistics services.',
  keywords: 'logistics, supply chain, warehousing, transportation, freight, shipping, logistics solutions',
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Pricing />
      <CaseStudies />
      <Testimonials />
      <Blog />
      <FAQ />
      <Contact />
    </main>
  );
}

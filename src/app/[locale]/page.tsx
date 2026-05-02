import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import KpiStrip from '@/components/sections/KpiStrip';
import Ticker from '@/components/sections/Ticker';
import ServicesGrid from '@/components/sections/ServicesGrid';
import WhyUs from '@/components/sections/WhyUs';
import NearshoringModel from '@/components/sections/NearshoringModel';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <KpiStrip />
        <Ticker />
        <ServicesGrid />
        <WhyUs />
        <NearshoringModel />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

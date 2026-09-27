import { lazy, Suspense, useState, useEffect } from 'react';
import Navigation from '@/components/elevare/Navigation';
import HeroContent from '@/components/elevare/HeroContent';
import StatsBar from '@/components/elevare/StatsBar';
import WhatsAppFloatingButton from '@/components/elevare/WhatsAppFloatingButton';

const ServicesSection = lazy(() => import('@/components/elevare/ServicesSection'));
const PortfolioSection = lazy(() => import('@/components/elevare/PortfolioSection'));
const ProcessSection = lazy(() => import('@/components/elevare/ProcessSection'));
const AboutSection = lazy(() => import('@/components/elevare/AboutSection'));
const ContactSection = lazy(() => import('@/components/elevare/ContactSection'));
const Footer = lazy(() => import('@/components/elevare/Footer'));

const VIDEO_URL = '/videos/orvion-hero.mp4';

export default function Home() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Defer video loading until initial paint and idle to keep critical network path clear for LCP
    if ('requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setVideoLoaded(true),
        { timeout: 2500 }
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => setVideoLoaded(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Navigation */}
      <Navigation />

      {/* ——— HERO ——— */}
      <div className="relative min-h-screen">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
            className="w-full h-full object-cover object-[60%_center] md:object-center"
            aria-hidden="true"
          >
            {videoLoaded && <source src={VIDEO_URL} type="video/mp4" />}
          </video>
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Hero Content + Stats */}
        <main className="relative z-10 min-h-screen flex flex-col pt-20">
          <div className="flex-1 flex flex-col justify-center px-[5%] lg:px-[8%] py-8">
            <div className="max-w-[640px]">
              <HeroContent
                onCTAClick={scrollToContact}
                onServicesClick={scrollToServices}
              />
            </div>
          </div>
          <StatsBar />
        </main>
      </div>

      <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
        {/* ——— SERVICES ——— */}
        <ServicesSection />

        {/* ——— PORTFOLIO ——— */}
        <PortfolioSection />

        {/* ——— PROCESS ——— */}
        <ProcessSection />

        {/* ——— ABOUT ——— */}
        <AboutSection />

        {/* ——— CONTACT ——— */}
        <ContactSection />

        {/* ——— FOOTER ——— */}
        <Footer />
      </Suspense>

      {/* ——— FLOATING WHATSAPP ——— */}
      <WhatsAppFloatingButton />
    </div>
  );
}

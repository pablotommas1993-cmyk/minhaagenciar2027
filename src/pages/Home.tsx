import Navigation from '@/components/elevare/Navigation';
import HeroContent from '@/components/elevare/HeroContent';
import StatsBar from '@/components/elevare/StatsBar';
import ServicesSection from '@/components/elevare/ServicesSection';
import PortfolioSection from '@/components/elevare/PortfolioSection';
import ProcessSection from '@/components/elevare/ProcessSection';
import AboutSection from '@/components/elevare/AboutSection';
import TestimonialsSection from '@/components/elevare/TestimonialsSection';
import ContactSection from '@/components/elevare/ContactSection';
import Footer from '@/components/elevare/Footer';

const VIDEO_URL =
  'https://media.base44.com/videos/public/user_6a58ea6dd6dede36eda97a7c/d334bedd7_Cinematic_background_video_anima_202607161129.mp4';

export default function Home() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
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
            preload="auto"
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src={VIDEO_URL} type="video/mp4" />
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
                onPortfolioClick={scrollToPortfolio}
              />
            </div>
          </div>
          <StatsBar />
        </main>
      </div>

      {/* ——— SERVICES ——— */}
      <ServicesSection />

      {/* ——— PORTFOLIO ——— */}
      <PortfolioSection />

      {/* ——— PROCESS ——— */}
      <ProcessSection />

      {/* ——— ABOUT ——— */}
      <AboutSection />

      {/* ——— TESTIMONIALS ——— */}
      <TestimonialsSection />

      {/* ——— CONTACT ——— */}
      <ContactSection />

      {/* ——— FOOTER ——— */}
      <Footer />
    </div>
  );
}

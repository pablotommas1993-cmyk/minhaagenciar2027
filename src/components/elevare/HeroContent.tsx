import MagneticButton from './MagneticButton';
import GhostButton from './GhostButton';

interface HeroContentProps {
  onCTAClick?: () => void;
  onPortfolioClick?: () => void;
}

export default function HeroContent({ onCTAClick, onPortfolioClick }: HeroContentProps) {
  return (
    <div>
      {/* Label */}
      <div className="animate-hero-1 inline-flex items-center gap-3 mb-8">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
          Premium Digital Agency
        </span>
      </div>

      {/* Headline */}
      <h1
        className="animate-hero-1 font-display font-medium text-white tracking-[-0.02em]"
        style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)', lineHeight: 1.08 }}
      >
        Transformamos empresas em{' '}
        <span className="gold-shimmer">negócios digitais</span>{' '}
        de alta performance.
      </h1>

      {/* Subheadline */}
      <p
        className="animate-hero-2 mt-8 text-white/85 text-balance max-w-[580px]"
        style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.125rem)', lineHeight: 1.7 }}
      >
        Criamos websites premium, inteligência artificial, automações, SEO, Google Ads e
        experiências digitais que posicionam empresas para crescer com autoridade.
      </p>

      {/* Buttons */}
      <div
        className="animate-hero-3 mt-10 flex flex-col sm:flex-row gap-4 items-start"
      >
        <MagneticButton />
        <GhostButton onClick={onPortfolioClick} />
      </div>

      {/* Trust Indicators */}
      <div
        className="animate-hero-4 mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] tracking-wide text-white/70"
      >
        <span className="text-[#D4AF37] tracking-[0.1em] text-xs font-medium uppercase">Design Premium</span>
        <span className="text-white/20">•</span>
        <span>Foco em Resultados</span>
        <span className="text-white/20">•</span>
        <span>Performance</span>
        <span className="text-white/20">•</span>
        <span>Tecnologia Premium</span>
      </div>
    </div>
  );
}

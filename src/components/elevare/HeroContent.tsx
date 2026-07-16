import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import GhostButton from './GhostButton';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headlineAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

const subAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.15, ease: easeOut } },
};

const btnAnim = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25, ease: easeOut } },
};

const trustAnim = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.35, ease: easeOut } },
};

interface HeroContentProps {
  onCTAClick?: () => void;
  onPortfolioClick?: () => void;
}

export default function HeroContent({ onCTAClick, onPortfolioClick }: HeroContentProps) {
  return (
    <motion.div initial="hidden" animate="visible">
      {/* Label */}
      <motion.div variants={headlineAnim} className="inline-flex items-center gap-3 mb-8">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
          Premium Digital Agency
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={headlineAnim}
        className="font-display font-medium text-white tracking-[-0.02em]"
        style={{ fontSize: 'clamp(2rem, 5.5vw, 5rem)', lineHeight: 1.08 }}
      >
        Transformamos empresas em{' '}
        <span className="gold-shimmer">negócios digitais</span>{' '}
        de alta performance.
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={subAnim}
        className="mt-8 text-[#BDBDBD] max-w-[580px]"
        style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.125rem)', lineHeight: 1.7 }}
      >
        Criamos websites premium, inteligência artificial, automações, SEO, Google Ads e
        experiências digitais que posicionam empresas para crescer com autoridade.
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={btnAnim}
        className="mt-10 flex flex-col sm:flex-row gap-4 items-start"
      >
        <MagneticButton onClick={onCTAClick} />
        <GhostButton onClick={onPortfolioClick} />
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        variants={trustAnim}
        className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] tracking-wide text-[#BDBDBD]"
      >
        <span className="text-[#D4AF37] tracking-[0.2em] text-sm">★★★★★</span>
        <span className="text-white/20">•</span>
        <span>Empresas atendidas</span>
        <span className="text-white/20">•</span>
        <span>Performance</span>
        <span className="text-white/20">•</span>
        <span>Tecnologia Premium</span>
      </motion.div>
    </motion.div>
  );
}

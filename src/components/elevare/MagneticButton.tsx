import { motion, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MagneticButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function MagneticButton({
  children = 'Solicitar Diagnóstico Gratuito',
  onClick,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{
        x,
        y,
        background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-full px-8 py-4 font-medium text-[#050505] luxury-transition cursor-pointer border-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_6px_20px_rgba(0,0,0,0.2)]"
    >
      <span className="relative z-10 flex items-center gap-2 text-sm font-semibold">
        {children}
        <ArrowRight size={16} className="luxury-transition group-hover:translate-x-1" />
      </span>
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 luxury-transition pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)' }}
      />
    </motion.button>
  );
}

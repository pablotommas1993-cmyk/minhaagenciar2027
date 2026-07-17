import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = ['Serviços', 'Portfólio', 'Processo', 'Sobre', 'Contato'];
const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface NavigationProps {
  onSectionClick?: (section: string) => void;
}

export default function Navigation({ onSectionClick }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: string) => {
    setMobileOpen(false);
    const sectionMap: Record<string, string> = {
      'Serviços': 'services',
      'Portfólio': 'portfolio',
      'Processo': 'process',
      'Sobre': 'about',
      'Contato': 'contact',
    };
    const id = sectionMap[item];
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (onSectionClick) onSectionClick(item);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-50 h-20 flex items-center px-[5%] lg:px-[8%] transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(5, 5, 5, 0.85)'
          : 'rgba(5, 5, 5, 0.25)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="flex items-baseline gap-2 cursor-pointer"
        aria-label="NEXORA Studio — Home"
      >
        <span className="font-display text-xl font-semibold tracking-[0.2em] text-white">
          NEXORA
        </span>
        <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-medium">
          Studio
        </span>
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 ml-auto">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => handleNavClick(item)}
            className="group relative text-sm text-[#BDBDBD] hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer"
          >
            {item}
            <span
              className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent scale-x-0 group-hover:scale-x-100 origin-center"
              style={{ transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
          </button>
        ))}
        <a
          href="https://wa.me/5511979991680"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 rounded-full border border-[#D4AF37]/30 px-5 py-2 text-sm font-medium text-[#F4E0A1] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer text-center no-underline"
        >
          Agendar Chamada Estratégica
        </a>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden ml-auto text-white p-2 bg-transparent border-none cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="md:hidden absolute top-20 inset-x-0 border-t border-white/5"
            style={{
              background: 'rgba(5, 5, 5, 0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col p-6 gap-5">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-[#BDBDBD] hover:text-white transition-colors text-sm text-left bg-transparent border-none cursor-pointer"
                >
                  {item}
                </button>
              ))}
              <a
                href="https://wa.me/5511979991680"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 rounded-full px-5 py-3 text-sm font-medium text-[#050505] cursor-pointer border-none text-center no-underline inline-block"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F4E0A1, #D4AF37)' }}
              >
                Agendar Chamada Estratégica
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

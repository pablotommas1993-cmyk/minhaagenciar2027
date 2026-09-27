import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const COOKIE_CONSENT_KEY = 'orvion_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        setVisible(true);
      }
    } catch {
      // If localStorage is unavailable, fallback to showing banner
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch {
      // Ignore write errors
    }
    setVisible(false);
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/privacidade');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 max-w-[calc(100vw-6.75rem)] sm:max-w-md sm:bottom-6 sm:left-6 z-40 p-4 sm:p-5 rounded-2xl border border-white/[0.08] premium-glass shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
          style={{ background: 'rgba(10, 10, 10, 0.92)' }}
          role="region"
          aria-label="Aviso de cookies"
        >
          <div className="flex flex-col gap-3">
            <p className="text-white/80 text-xs leading-relaxed">
              Utilizamos cookies essenciais para o funcionamento do site e métricas anônimas de desempenho.
              Ao continuar navegando, você concorda com a nossa{' '}
              <a
                href="/privacidade"
                onClick={handlePrivacyClick}
                className="text-[#D4AF37] hover:underline cursor-pointer font-medium"
              >
                Política de Privacidade
              </a>
              .
            </p>
            <div className="flex items-center justify-end">
              <button
                onClick={handleAccept}
                className="rounded-full px-5 py-2 text-xs font-semibold text-[#050505] cursor-pointer border-none luxury-transition shadow-[0_2px_10px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_14px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                }}
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

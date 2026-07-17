const footerLinks = {
  Serviços: [
    'Websites Premium',
    'Inteligência Artificial',
    'Automações',
    'SEO Avançado',
    'Google Ads',
    'Estratégia Digital',
  ],
  Empresa: ['Sobre', 'Portfólio', 'Processo', 'Depoimentos'],
  Legal: ['Política de Privacidade', 'Termos de Uso', 'Cookies'],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030303] px-[5%] lg:px-[8%] pt-20 lg:pt-32 pb-10 overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-2 mb-5">
              <span className="font-display text-xl font-semibold tracking-[0.2em] text-white">
                NEXORA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-medium">
                Studio
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-[300px] mb-8">
              Transformamos empresas em negócios digitais de alta performance. Websites premium,
              IA, automações e estratégia digital para empresas que querem crescer com autoridade.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {['Li', 'Ig', 'Tw'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-[10px] text-white/50 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 luxury-transition"
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]/70 font-medium mb-5">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-white/50 text-sm hover:text-white luxury-transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-white/30 text-xs">
            © {year} NEXORA Studio. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs tracking-wide">
            Crafted with precision in Brazil
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * Composição Visual Original da Hero — "Da Busca ao Contato"
 *
 * Conceito: Ilustração arquitetural pura em código (SVG + CSS) conectando os 3 momentos
 * essenciais de uma aquisição orientada a retorno:
 *  1. Busca (demanda ativa no Google com intenção comercial)
 *  2. Clique (anúncio qualificado direcionado para página alinhada)
 *  3. Contato (conversa iniciada com potencial cliente real)
 *
 * Totalmente livre de métricas fictícias, dashboards falsos e marcas de terceiros.
 * Respeita rigorosamente prefers-reduced-motion.
 */

export default function HeroCurve() {
  return (
    <div
      className="relative rounded-2xl border border-white/[0.1] bg-[#080808] p-5 sm:p-7 shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden select-none"
      aria-label="Diagrama do fluxo comercial: da pesquisa no Google ao contato comercial"
    >
      {/* Glow ambiente sutil */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Topo do painel: cabeçalho editorial técnico */}
      <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/[0.08] text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
          <span className="text-[#F4E0A1] uppercase tracking-[0.2em] font-medium">
            Fluxo de Aquisição
          </span>
        </div>
        <span className="text-[#737373] tracking-wider uppercase text-[9px] sm:text-[10px]">
          Da intenção ao contato
        </span>
      </div>

      {/* Composição SVG da curva ascendente */}
      <div className="relative pt-6 pb-2">
        <svg
          viewBox="0 0 600 240"
          className="w-full h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradiente da linha guia */}
            <linearGradient id="curveGoldGradient" x1="80" y1="180" x2="520" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8A7322" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F4E0A1" stopOpacity="1" />
            </linearGradient>

            {/* Brilho da curva */}
            <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Padrão de grid sutil de fundo */}
            <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid de fundo para profundidade */}
          <rect width="600" height="240" fill="url(#archGrid)" />

          {/* Linhas de referência técnica discretas */}
          <line x1="80" y1="20" x2="80" y2="210" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 3" />
          <line x1="300" y1="20" x2="300" y2="210" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 3" />
          <line x1="520" y1="20" x2="520" y2="210" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 3" />

          {/* Curva ascendente de conexão */}
          {/* Sombra de brilho da curva */}
          <path
            d="M 80 180 C 180 175, 230 115, 300 110 C 370 105, 430 48, 520 40"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeOpacity="0.2"
            filter="url(#subtleGlow)"
          />
          {/* Curva principal */}
          <path
            d="M 80 180 C 180 175, 230 115, 300 110 C 370 105, 430 48, 520 40"
            stroke="url(#curveGoldGradient)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />

          {/* NÓ 1 — BUSCA (x: 80, y: 180) */}
          <g transform="translate(80, 180)">
            <circle r="14" fill="#080808" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <circle r="6" fill="#D4AF37" fillOpacity="0.8" />
            <circle r="2.5" fill="#FFFFFF" />
          </g>

          {/* NÓ 2 — CLIQUE (x: 300, y: 110) */}
          <g transform="translate(300, 110)">
            <circle r="14" fill="#080808" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
            <circle r="6" fill="#D4AF37" fillOpacity="0.95" />
            <circle r="2.5" fill="#FFFFFF" />
          </g>

          {/* NÓ 3 — CONTATO (x: 520, y: 40) */}
          <g transform="translate(520, 40)">
            {/* Halo sutil em volta do contato */}
            <circle r="20" fill="rgba(212,175,55,0.1)" stroke="rgba(212,175,55,0.35)" strokeWidth="1" strokeDasharray="3 3" />
            <circle r="14" fill="#080808" stroke="#D4AF37" strokeWidth="1.5" />
            <circle r="6" fill="#F4E0A1" />
            <circle r="2.5" fill="#050505" />
          </g>
        </svg>

        {/* Labels e descrições dos 3 nós posicionados abaixo da visualização */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 border-t border-white/[0.06]">
          {/* Etapa 1 */}
          <div className="text-left">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-mono text-[10px] text-[#D4AF37] font-semibold">01</span>
              <span className="font-display text-white text-xs sm:text-sm font-semibold">Busca</span>
            </div>
            <p className="text-[#888] text-[10px] sm:text-[11px] leading-relaxed">
              Pesquisa ativa no Google com real intenção de contratação.
            </p>
          </div>

          {/* Etapa 2 */}
          <div className="text-center sm:text-left sm:pl-2">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
              <span className="font-mono text-[10px] text-[#D4AF37] font-semibold">02</span>
              <span className="font-display text-white text-xs sm:text-sm font-semibold">Clique</span>
            </div>
            <p className="text-[#888] text-[10px] sm:text-[11px] leading-relaxed">
              Anúncio específico que leva para uma página alinhada ao serviço.
            </p>
          </div>

          {/* Etapa 3 */}
          <div className="text-right sm:text-left sm:pl-2">
            <div className="flex items-center justify-end sm:justify-start gap-1.5 mb-1">
              <span className="font-mono text-[10px] text-[#D4AF37] font-semibold">03</span>
              <span className="font-display text-[#F4E0A1] text-xs sm:text-sm font-semibold">Contato</span>
            </div>
            <p className="text-[#888] text-[10px] sm:text-[11px] leading-relaxed">
              Conversa comercial qualificada iniciada no WhatsApp da empresa.
            </p>
          </div>
        </div>
      </div>

      {/* Linha de rodapé do painel */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#737373]">
        <span className="text-[#a3a3a3]">Sem métricas de vaidade</span>
        <span className="text-[#D4AF37]">Foco em conversa comercial</span>
      </div>
    </div>
  );
}

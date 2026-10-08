import { useState, useEffect, useId } from 'react';
import {
  WHATSAPP_BASE_URL,
  WHATSAPP_GESTÃO_URL,
  trackWhatsAppConversion,
} from '@/utils/gtag';

// ============================================================================
// ÍCONES SVG UNIFICADOS (Stroke 1.5px, consistência estética arquitetural)
// ============================================================================
function IconPhone({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconArrowRight({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconCheck({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconChevronDown({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function IconSend({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function IconAlertTriangle({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

// ============================================================================
// COMPOSIÇÃO VISUAL HEROCURVE (SVG arquitetural em código puro, sem dados fictícios)
// ============================================================================
function HeroDiagram() {
  return (
    <div
      className="relative rounded-2xl border border-white/[0.1] bg-[#080808] p-5 sm:p-7 shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden select-none"
      aria-label="Diagrama do fluxo de aquisição: da intenção no Google ao contato comercial"
    >
      {/* Glow ambiente sutil */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Topo do painel */}
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

      {/* SVG da curva ascendente */}
      <div className="relative pt-6 pb-2">
        <svg
          viewBox="0 0 600 240"
          className="w-full h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gAdsCurveGradient" x1="80" y1="180" x2="520" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8A7322" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F4E0A1" stopOpacity="1" />
            </linearGradient>

            <filter id="gAdsGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <pattern id="gAdsGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Grid sutil */}
          <rect width="600" height="240" fill="url(#gAdsGrid)" />

          {/* Linhas de base */}
          <line x1="80" y1="210" x2="520" y2="210" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="80" y1="130" x2="520" y2="130" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="80" y1="50" x2="520" y2="50" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Curva suave de progressão */}
          <path
            d="M 80 185 C 200 180, 260 145, 330 115 C 400 85, 460 55, 520 45"
            stroke="url(#gAdsCurveGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#gAdsGlow)"
          />

          {/* Área sombreada sob a curva */}
          <path
            d="M 80 185 C 200 180, 260 145, 330 115 C 400 85, 460 55, 520 45 L 520 210 L 80 210 Z"
            fill="url(#gAdsCurveGradient)"
            fillOpacity="0.04"
          />

          {/* Ponto 1: Busca */}
          <g transform="translate(80, 185)">
            <circle r="6" fill="#080808" stroke="#D4AF37" strokeWidth="2" />
            <circle r="2.5" fill="#F4E0A1" />
          </g>

          {/* Ponto 2: Clique */}
          <g transform="translate(330, 115)">
            <circle r="6" fill="#080808" stroke="#D4AF37" strokeWidth="2" />
            <circle r="2.5" fill="#F4E0A1" />
          </g>

          {/* Ponto 3: Contato */}
          <g transform="translate(520, 45)">
            <circle r="12" fill="rgba(212,175,55,0.18)" />
            <circle r="7" fill="#080808" stroke="#F4E0A1" strokeWidth="2" />
            <circle r="3" fill="#F4E0A1" />
          </g>
        </svg>
      </div>

      {/* 3 Etapas explicativas */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/[0.08]">
        <div>
          <div className="text-[10px] font-mono text-[#D4AF37] mb-1">01 Busca</div>
          <p className="text-[11px] text-[#a3a3a3] leading-snug m-0">
            Pesquisa ativa com intenção de contratação.
          </p>
        </div>
        <div>
          <div className="text-[10px] font-mono text-[#D4AF37] mb-1">02 Clique</div>
          <p className="text-[11px] text-[#a3a3a3] leading-snug m-0">
            Anúncio alinhado à busca que leva à página certa.
          </p>
        </div>
        <div>
          <div className="text-[10px] font-mono text-[#F4E0A1] mb-1">03 Contato</div>
          <p className="text-[11px] text-white font-medium leading-snug m-0">
            Conversa comercial iniciada no WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL: GOOGLE ADS GESTÃO
// ============================================================================
interface FormState {
  name: string;
  company: string;
  investment: string;
  message: string;
}

interface UtmData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  gclid: string;
}

export default function GoogleAdsGestao() {
  const formId = useId();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // Metadados dinâmicos e Canonical da Rota Oficial
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Gestão de Google Ads e Tráfego Pago para Empresas | ORVION Studio';

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const previousCanonical = canonical ? canonical.href : 'https://orvionstudio.com.br/';

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://orvionstudio.com.br/google-ads/gestao';

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    const previousDesc = metaDesc ? metaDesc.content : '';
    const targetDesc =
      'Agência de tráfego pago focada em Google Ads para empresas que querem gerar contatos qualificados. Fale com um especialista no WhatsApp.';

    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = targetDesc;

    const setOgMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
      return tag;
    };

    setOgMeta('og:title', 'Gestão de Google Ads e Tráfego Pago para Empresas | ORVION Studio');
    setOgMeta('og:description', targetDesc);
    setOgMeta('og:url', 'https://orvionstudio.com.br/google-ads/gestao');
    setOgMeta('og:type', 'website');
    setOgMeta('og:image', 'https://orvionstudio.com.br/og-image.jpg');

    return () => {
      document.title = previousTitle;
      if (canonical) canonical.href = previousCanonical;
      if (metaDesc) metaDesc.content = previousDesc;
    };
  }, []);

  // Captura de parâmetros UTM e GCLID
  const [utmData, setUtmData] = useState<UtmData>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    gclid: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      setUtmData({
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        utm_term: searchParams.get('utm_term') || '',
        gclid: searchParams.get('gclid') || '',
      });
    }
  }, []);

  // Estado do Formulário
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    investment: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormState]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<FormState> = {};
    if (!form.name.trim()) {
      errors.name = 'Por favor, informe seu nome.';
    }
    if (!form.investment) {
      errors.investment = 'Selecione a faixa estimada de investimento.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Envio do Formulário:
   * Direciona os dados organizados para o WhatsApp da ORVION Studio
   * e dispara trackWhatsAppConversion() exclusivamente no clique.
   */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim().length > 0) return;
    if (!validateForm()) return;

    trackWhatsAppConversion();

    const lines = [
      'Olá! Vim pela página da ORVION Studio e quero uma proposta de gestão de Google Ads.',
      '',
      `Nome: ${form.name.trim()}`,
    ];

    if (form.company.trim()) {
      lines.push(`Empresa: ${form.company.trim()}`);
    }

    lines.push(`Investimento mensal pretendido no Google: ${form.investment}`);

    if (form.message.trim()) {
      lines.push(`Mensagem: ${form.message.trim()}`);
    }

    if (utmData.utm_source) {
      lines.push(`Origem: ${utmData.utm_source}`);
    }

    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToAnchor = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#050505] text-[#ededed] font-body selection:bg-[#D4AF37]/25 selection:text-white overflow-x-hidden antialiased"
      suppressHydrationWarning
    >
      {/* ========================================================
          CABEÇALHO EDITORIAL
          ======================================================== */}
      <header className="sticky top-0 inset-x-0 z-40 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-[5%] lg:px-[8%] bg-[#050505]/92 backdrop-blur-xl border-b border-white/[0.08]">
        <a
          href="/"
          onClick={navigateToHome}
          className="flex items-baseline gap-2 cursor-pointer no-underline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded-md py-1"
          aria-label="ORVION Studio — Ir para a página inicial"
        >
          <span className="font-display text-lg sm:text-xl font-bold tracking-[0.22em] text-white">
            ORVION
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase font-semibold">
            Studio
          </span>
        </a>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_GESTÃO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppConversion}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/[0.08] px-3.5 sm:px-5 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] text-xs sm:text-sm font-medium text-[#F4E0A1] hover:bg-[#D4AF37] hover:text-[#050505] active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none whitespace-nowrap shadow-[0_2px_14px_rgba(212,175,55,0.15)]"
          >
            <IconPhone size={13} className="shrink-0 text-[#D4AF37]" />
            <span className="hidden sm:inline">Falar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Espaçamento inferior no mobile para a barra fixa de conversão */}
      <main className="pb-24 sm:pb-0">
        {/* ========================================================
            SEÇÃO 1 — HERO MEMORÁVEL COM DIAGRAMA SVG ARQUITETURAL
            ======================================================== */}
        <section
          id="topo"
          className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] overflow-hidden"
        >
          {/* Luz ambiente discreta */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[550px] pointer-events-none opacity-20 select-none overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 25%, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.02) 50%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Coluna de texto */}
              <div className="lg:col-span-7 text-center lg:text-left">
                {/* Eyebrow de posicionamento */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.12] bg-white/[0.03] mb-6 sm:mb-8 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#F4E0A1] font-mono font-medium">
                    Google Ads & Aquisição
                  </span>
                </div>

                {/* H1 único da landing */}
                <h1
                  className="font-display font-semibold text-white tracking-[-0.03em] mb-6 text-balance break-words"
                  style={{ fontSize: 'clamp(1.75rem, 4.6vw, 4rem)', lineHeight: 1.15 }}
                >
                  Google Ads para empresas que querem contatos, não só cliques.
                </h1>

                {/* Subheadline curta e comercial */}
                <p className="text-[#b8b8b8] text-base md:text-lg leading-relaxed max-w-[620px] mb-8 font-normal mx-auto lg:mx-0">
                  Estratégia, estrutura e otimização para transformar buscas em oportunidades reais de negócio.
                </p>

                {/* CTAs Primário e Secundário */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
                  <a
                    href={WHATSAPP_GESTÃO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWhatsAppConversion}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 min-h-[48px] sm:min-h-[52px] font-semibold text-[#050505] text-sm md:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                    }}
                  >
                    <IconPhone size={16} aria-hidden="true" className="shrink-0" />
                    <span>Quero anunciar no Google</span>
                  </a>

                  <a
                    href="#metodo"
                    onClick={scrollToAnchor('metodo')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.2] bg-white/[0.03] px-6 py-3.5 min-h-[48px] sm:min-h-[52px] font-medium text-white text-sm md:text-base hover:bg-white/[0.08] hover:border-[#D4AF37]/60 active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                  >
                    <span>Ver como trabalhamos</span>
                    <IconArrowRight size={15} aria-hidden="true" className="shrink-0" />
                  </a>
                </div>

                {/* Linha de apoio e transparência */}
                <div className="flex items-start justify-center lg:justify-start gap-2.5 text-[11px] sm:text-xs text-[#8a8a8a] font-mono max-w-[500px] mx-auto lg:mx-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 leading-relaxed">
                    Atendimento para empresas. Resposta em até 24h úteis.
                  </span>
                </div>
              </div>

              {/* Coluna Visual Direita: Composição SVG Arquitetural */}
              <div className="lg:col-span-5">
                <HeroDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 2 — O PROBLEMA (VISUAL FORTE, SEM CARDS REPETIDOS)
            ======================================================== */}
        <section
          id="problema"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Lado Esquerdo: Mensagem Editorial de Impacto */}
              <div className="lg:col-span-5">
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  01 // O Cenário Real
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-6 text-balance"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.18 }}
                >
                  O que costuma drenar o investimento no Google Ads
                </h2>
                <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  Muitas empresas investem mensalmente no Google, mas terminam o mês sem saber exatamente quantas conversas reais o tráfego gerou. O problema quase sempre não é a ferramenta, mas a falta de alinhamento entre a intenção da busca e o destino do clique.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F4E0A1] border-l-2 border-[#D4AF37] pl-3 py-1">
                  Tráfego qualificado precisa virar conversa comercial.
                </div>
              </div>

              {/* Lado Direito: Linhas Editoriais Assimétricas (Sem cards idênticos) */}
              <div className="lg:col-span-7 divide-y divide-white/[0.08]">
                {/* Problema 1 */}
                <div className="py-6 first:pt-0 flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-red-500/[0.1] border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <IconAlertTriangle size={15} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-white font-medium text-base sm:text-lg mb-1.5">
                      Clique sem contato comercial
                    </h3>
                    <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                      O anúncio gera visitas, mas os visitantes chegam a páginas genéricas e saem sem iniciar contato. O custo por clique é pago, mas o retorno não acontece.
                    </p>
                  </div>
                </div>

                {/* Problema 2 */}
                <div className="py-6 flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-red-500/[0.1] border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <IconAlertTriangle size={15} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-white font-medium text-base sm:text-lg mb-1.5">
                      Campanha sem direção de intenção
                    </h3>
                    <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                      Palavras-chave amplas atraem pesquisas informativas, curiosos ou quem procura artigos gratuitos, em vez de tomadores de decisão prontos para contratar.
                    </p>
                  </div>
                </div>

                {/* Problema 3 */}
                <div className="py-6 flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-red-500/[0.1] border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <IconAlertTriangle size={15} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-white font-medium text-base sm:text-lg mb-1.5">
                      Orçamento desperdiçado sem negativação
                    </h3>
                    <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                      Sem uma rotina contínua de análise dos termos reais de pesquisa, dezenas de reais são consumidos todos os dias por termos fora do escopo do seu serviço.
                    </p>
                  </div>
                </div>

                {/* Problema 4 */}
                <div className="py-6 last:pb-0 flex items-start gap-5">
                  <div className="w-8 h-8 rounded-full bg-red-500/[0.1] border border-red-500/25 flex items-center justify-center shrink-0 mt-0.5">
                    <IconAlertTriangle size={15} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-white font-medium text-base sm:text-lg mb-1.5">
                      Falta de mensuração confiável
                    </h3>
                    <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                      Decisões tomadas com base em impressões ou métricas de vaidade, sem saber quais campanhas e palavras realmente geram os contatos recebidos na equipe comercial.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 3 — COMO A ORVION ATUA (TIMELINE EDITORIAL 4 ETAPAS)
            ======================================================== */}
        <section
          id="metodo"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1360px] mx-auto">
            {/* Cabeçalho da seção */}
            <div className="max-w-[760px] mb-14 pb-8 border-b border-white/[0.08]">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                02 // Metodologia
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Como estruturamos sua operação no Google Ads
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                Um fluxo linear em quatro momentos, do entendimento inicial à otimização contínua da conta.
              </p>
            </div>

            {/* Linha de processo editorial com números grandes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
              {/* Passo 01 */}
              <div className="relative p-6 rounded-xl border border-white/[0.08] bg-[#090909] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-3xl font-semibold text-[#D4AF37]/50 mb-4">
                    01
                  </div>
                  <h3 className="font-display text-white font-medium text-lg mb-2">
                    Diagnóstico
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Mapeamento do serviço, perfil do cliente ideal e volume de buscas qualificadas no Google para o seu nicho.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#a3a3a3]">
                  Entendimento de negócio
                </div>
              </div>

              {/* Passo 02 */}
              <div className="relative p-6 rounded-xl border border-white/[0.08] bg-[#090909] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-3xl font-semibold text-[#D4AF37]/50 mb-4">
                    02
                  </div>
                  <h3 className="font-display text-white font-medium text-lg mb-2">
                    Estrutura
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Definição de palavras-chave com real intenção de contratação, redação de anúncios específicos e negativação prévia.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#a3a3a3]">
                  Campanha sem dispersão
                </div>
              </div>

              {/* Passo 03 */}
              <div className="relative p-6 rounded-xl border border-white/[0.08] bg-[#090909] flex flex-col justify-between">
                <div>
                  <div className="font-mono text-3xl font-semibold text-[#D4AF37]/50 mb-4">
                    03
                  </div>
                  <h3 className="font-display text-white font-medium text-lg mb-2">
                    Lançamento
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Ativação com validação de tags de mensuração, orçamento diário controlado e verificação de rota até o WhatsApp.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#a3a3a3]">
                  Início seguro e medido
                </div>
              </div>

              {/* Passo 04 */}
              <div className="relative p-6 rounded-xl border border-[#D4AF37]/35 bg-[#090909] flex flex-col justify-between shadow-[0_4px_24px_rgba(212,175,55,0.08)]">
                <div>
                  <div className="font-mono text-3xl font-semibold text-[#F4E0A1] mb-4">
                    04
                  </div>
                  <h3 className="font-display text-white font-medium text-lg mb-2">
                    Otimização
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Análise semanal dos termos de pesquisa reais, corte contínuo de desperdícios e redistribuição da verba no que converte.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#F4E0A1]">
                  Ajuste por retorno real
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 4 — SERVIÇO PRINCIPAL (GOOGLE ADS EM DESTAQUE)
            ======================================================== */}
        <section
          id="servicos"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#080808]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="max-w-[760px] mb-14 pb-8 border-b border-white/[0.08]">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                03 // Núcleo da Operação
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Gestão Estratégica de Google Ads
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                Nosso serviço principal, desenhado para empresas prestadoras de serviços que precisam de previsibilidade de demanda.
              </p>
            </div>

            {/* Painel amplo com 6 pilares fundamentais */}
            <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#0a0a0a] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Pilar 1 */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base">
                      Pesquisa de Intenção
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Focamos nas palavras que indicam intenção clara de contratação, evitando pesquisas puramente acadêmicas ou curiosas.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base">
                      Estrutura de Palavras-Chave
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Grupos de anúncios organizados por intenção específica, garantindo que o texto do anúncio responda exatamente à busca.
                  </p>
                </div>

                {/* Pilar 3 */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base">
                      Anúncios Comerciais
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Textos diretos e objetivos que qualificam quem clica e filtram quem não tem o perfil adequado para a sua contratação.
                  </p>
                </div>

                {/* Pilar 4 */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base">
                      Negativação Contínua
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Auditoria constante dos termos reais acionados para bloquear termos irrelevantes e proteger o orçamento da conta.
                  </p>
                </div>

                {/* Pilar 5 */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base">
                      Mensuração de Contatos
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Configuração de eventos de clique para o WhatsApp e monitoramento de quais campanhas originam o tráfego comercial.
                  </p>
                </div>

                {/* Pilar 6 */}
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base">
                      Otimização Periódica
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Ajuste regular de lances, orçamentos e termos com comunicação direta e relatórios compreensíveis, sem jargões.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 5 — SERVIÇOS DE APOIO (VISUAL LEVE E SECUNDÁRIO)
            ======================================================== */}
        <section
          id="apoio"
          className="relative py-16 md:py-24 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#737373] font-mono font-medium mb-2 block">
                  04 // Escopo Complementar
                </span>
                <h2 className="font-display text-white font-medium text-xl sm:text-2xl m-0">
                  Serviços de apoio à conversão
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#8a8a8a] m-0 max-w-[360px]">
                Soluções contratadas em conjunto para elevar a taxa de conversão do tráfego.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Apoio 1 */}
              <div className="p-5 rounded-lg border border-white/[0.06] bg-[#080808]">
                <h3 className="font-display text-white font-medium text-sm sm:text-base mb-1.5">
                  Landing Pages de Conversão
                </h3>
                <p className="text-[#737373] text-xs leading-relaxed m-0">
                  Páginas dedicadas e rápidas desenhadas especificamente para converter o clique da campanha em mensagem.
                </p>
              </div>

              {/* Apoio 2 */}
              <div className="p-5 rounded-lg border border-white/[0.06] bg-[#080808]">
                <h3 className="font-display text-white font-medium text-sm sm:text-base mb-1.5">
                  Websites Institucionais
                </h3>
                <p className="text-[#737373] text-xs leading-relaxed m-0">
                  Presença digital moderna com carregamento rápido e estrutura clara para sustentar autoridade comercial.
                </p>
              </div>

              {/* Apoio 3 */}
              <div className="p-5 rounded-lg border border-white/[0.06] bg-[#080808]">
                <h3 className="font-display text-white font-medium text-sm sm:text-base mb-1.5">
                  Automações de Atendimento
                </h3>
                <p className="text-[#737373] text-xs leading-relaxed m-0">
                  Integrações com planilhas e notificações para reduzir o tempo entre o contato do lead e a resposta.
                </p>
              </div>

              {/* Apoio 4 */}
              <div className="p-5 rounded-lg border border-white/[0.06] bg-[#080808]">
                <h3 className="font-display text-white font-medium text-sm sm:text-base mb-1.5">
                  SEO Técnico Estrutural
                </h3>
                <p className="text-[#737373] text-xs leading-relaxed m-0">
                  Ajustes de metadados, arquitetura de URLs e velocidade para ganho de relevância orgânica consistente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 6 — MENSURAÇÃO HONESTA (TRANSPARÊNCIA EDITORIAL)
            ======================================================== */}
        <section
          id="mensuracao"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[1000px] mx-auto text-center lg:text-left">
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
              05 // Princípio de Trabalho
            </span>
            <h2
              className="font-display font-medium text-white tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.18 }}
            >
              “Clique no WhatsApp é um sinal. Contato real é o que importa.”
            </h2>
            <div className="space-y-4 text-[#a3a3a3] text-sm sm:text-base leading-relaxed max-w-[800px]">
              <p className="m-0">
                Muitas agências apresentam relatórios repletos de métricas técnicas para justificar o trabalho: impressões, CTR ou cliques brutos.
              </p>
              <p className="m-0">
                Nosso critério é simples e transparente: acompanhamos os eventos técnicos de clique até o WhatsApp e mantemos um canal direto com você para entender a qualidade das conversas que chegam. Se os contatos não forem qualificados, ajustamos imediatamente as palavras-chave e a negativação.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono text-[#8a8a8a]">
              <span className="inline-flex items-center gap-2">
                <IconCheck size={14} className="text-[#D4AF37]" /> Sem métricas infladas
              </span>
              <span className="inline-flex items-center gap-2">
                <IconCheck size={14} className="text-[#D4AF37]" /> Ajustes baseados em conversas reais
              </span>
              <span className="inline-flex items-center gap-2">
                <IconCheck size={14} className="text-[#D4AF37]" /> Comunicação direta com quem opera a conta
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 7 — QUEM ESTÁ POR TRÁS (FUNDADOR)
            ======================================================== */}
        <section
          id="fundador"
          className="relative py-20 md:py-24 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1000px] mx-auto">
            <div className="p-8 sm:p-10 rounded-2xl border border-white/[0.1] bg-[#080808] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-[620px]">
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-2 block">
                  06 // Atendimento Direto
                </span>
                <h2 className="font-display text-white font-medium text-xl sm:text-2xl mb-3">
                  Pablo — Fundador da ORVION Studio
                </h2>
                <p className="text-[#a3a3a3] text-xs sm:text-sm leading-relaxed mb-4">
                  A ORVION Studio opera com atendimento direto e acompanhamento próximo de cada conta. Não repassamos sua estratégia para estagiários ou equipes rotativas.
                </p>
                <p className="text-[#737373] text-xs leading-relaxed m-0 font-mono">
                  Foco exclusivo em prestadores de serviços que buscam previsibilidade e seriedade.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <a
                  href={WHATSAPP_GESTÃO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppConversion}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/[0.08] px-6 py-3 min-h-[46px] text-xs sm:text-sm font-medium text-[#F4E0A1] hover:bg-[#D4AF37] hover:text-[#050505] active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  <IconPhone size={14} className="text-[#D4AF37]" />
                  <span>Conversar com Pablo</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 8 — PERGUNTAS FREQUENTES (ACORDEÃO LIMPO E PREMIUM)
            ======================================================== */}
        <section
          id="faq"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[920px] mx-auto">
            <div className="mb-14 pb-8 border-b border-white/[0.08]">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                07 // Esclarecimentos
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Perguntas Frequentes
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                Respostas diretas sobre modelo de investimento, prazos e rotina de atendimento.
              </p>
            </div>

            <div className="divide-y divide-white/[0.08]">
              {/* FAQ 1 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(0)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded"
                  aria-expanded={openFaq === 0}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    Quanto custa a gestão de Google Ads?
                  </h3>
                  <IconChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                      openFaq === 0 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-xs sm:text-sm leading-relaxed ${
                    openFaq === 0 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  O investimento envolve duas partes: a verba paga diretamente ao Google para exibir os anúncios (definida por você) e os honorários de gestão da ORVION Studio. Apresentamos uma proposta detalhada após entender o porte do seu negócio e o escopo de campanhas.
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(1)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded"
                  aria-expanded={openFaq === 1}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    Qual o prazo para começar a receber contatos?
                  </h3>
                  <IconChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                      openFaq === 1 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-xs sm:text-sm leading-relaxed ${
                    openFaq === 1 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  Assim que a campanha é publicada e aprovada pelo Google, os anúncios passam a concorrer nas buscas imediatas. Os primeiros contatos costumam ocorrer nos primeiros dias de veiculação, com refinamento de custo e qualidade ao longo das semanas de otimização contínua.
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(2)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded"
                  aria-expanded={openFaq === 2}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    A conta de anúncios do Google fica no meu nome?
                  </h3>
                  <IconChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                      openFaq === 2 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-xs sm:text-sm leading-relaxed ${
                    openFaq === 2 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  Sim, sempre. Toda a conta de anúncios e o histórico pertencem exclusivamente à sua empresa. A ORVION Studio atua como administradora técnica autorizada, garantindo total transparência de custos e dados.
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(3)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded"
                  aria-expanded={openFaq === 3}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    Preciso de um site novo para começar a anunciar?
                  </h3>
                  <IconChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                      openFaq === 3 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-xs sm:text-sm leading-relaxed ${
                    openFaq === 3 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  Se o seu site atual carregar rápido e possuir rotas claras de contato, podemos iniciar com ele. Caso a página atual seja lenta ou dispersiva, recomendamos estruturar uma landing page dedicada focada no serviço para não desperdiçar o investimento dos cliques.
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(4)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded"
                  aria-expanded={openFaq === 4}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    Existe fidelidade ou contrato de longo prazo obrigatório?
                  </h3>
                  <IconChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                      openFaq === 4 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-xs sm:text-sm leading-relaxed ${
                    openFaq === 4 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  Trabalhamos com contratos mensais renováveis. Recomendamos um ciclo mínimo de maturação de 90 dias para consolidar histórico de pesquisa e otimização de termos, mas não retemos clientes por amarras contratuais.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 9 — CTA FINAL COM FORMULÁRIO DIRETO E BOTÃO WHATSAPP
            ======================================================== */}
        <section
          id="proposta"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1100px] mx-auto">
            <div className="rounded-2xl border border-white/[0.1] bg-[#090909] p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.85)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Lado Esquerdo: Mensagem e Ação Imediata */}
                <div className="lg:col-span-6 text-center lg:text-left">
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                    08 // Próximo Passo
                  </span>
                  <h2
                    className="font-display font-medium text-white tracking-[-0.02em] mb-4 text-balance"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.15 }}
                  >
                    Pronto para transformar buscas no Google em contatos comerciais?
                  </h2>
                  <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed mb-8">
                    Fale diretamente conosco no WhatsApp para analisar o cenário da sua empresa e receber uma proposta personalizada.
                  </p>

                  <a
                    href={WHATSAPP_GESTÃO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWhatsAppConversion}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 min-h-[52px] font-semibold text-[#050505] text-sm sm:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                    }}
                  >
                    <IconPhone size={16} aria-hidden="true" className="shrink-0" />
                    <span>Falar no WhatsApp com Especialista</span>
                  </a>
                </div>

                {/* Lado Direito: Formulário Estruturado */}
                <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-8 lg:pt-0 lg:pl-10">
                  <div className="mb-6">
                    <h3 className="font-display text-white font-medium text-lg mb-1">
                      Ou envie os dados da sua empresa
                    </h3>
                    <p className="text-[#737373] text-xs leading-relaxed m-0">
                      Montamos sua mensagem personalizada e direcionamos para o WhatsApp oficial.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                    {/* Honeypot anti-spam */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website_url_hp"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Nome */}
                    <div>
                      <label
                        htmlFor={`${formId}-name`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-1.5 font-mono font-medium"
                      >
                        Seu Nome ou Responsável <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        id={`${formId}-name`}
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Carlos Silva"
                        required
                        className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#D4AF37] transition-all duration-200 ${
                          formErrors.name ? 'border-red-500/80' : 'border-white/[0.12]'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Empresa */}
                    <div>
                      <label
                        htmlFor={`${formId}-company`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-1.5 font-mono font-medium"
                      >
                        Empresa ou Serviço <span className="text-[#666]">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        id={`${formId}-company`}
                        name="company"
                        value={form.company}
                        onChange={handleInputChange}
                        placeholder="Ex: Clínica Odontológica / Consultoria"
                        className="w-full bg-[#050505] border border-white/[0.12] rounded-lg px-4 py-3 text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#D4AF37] transition-all duration-200"
                      />
                    </div>

                    {/* Faixa de Investimento */}
                    <div>
                      <label
                        htmlFor={`${formId}-investment`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-1.5 font-mono font-medium"
                      >
                        Investimento mensal pretendido no Google <span className="text-[#D4AF37]">*</span>
                      </label>
                      <select
                        id={`${formId}-investment`}
                        name="investment"
                        value={form.investment}
                        onChange={handleInputChange}
                        required
                        className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all duration-200 ${
                          formErrors.investment ? 'border-red-500/80' : 'border-white/[0.12]'
                        }`}
                      >
                        <option value="" disabled className="bg-[#050505] text-[#737373]">
                          Selecione uma faixa estimada
                        </option>
                        <option value="R$ 1.500 a R$ 3.000 / mês" className="bg-[#050505] text-white">
                          R$ 1.500 a R$ 3.000 / mês
                        </option>
                        <option value="R$ 3.000 a R$ 6.000 / mês" className="bg-[#050505] text-white">
                          R$ 3.000 a R$ 6.000 / mês
                        </option>
                        <option value="R$ 6.000 a R$ 15.000 / mês" className="bg-[#050505] text-white">
                          R$ 6.000 a R$ 15.000 / mês
                        </option>
                        <option value="Acima de R$ 15.000 / mês" className="bg-[#050505] text-white">
                          Acima de R$ 15.000 / mês
                        </option>
                      </select>
                      {formErrors.investment && (
                        <p className="text-red-400 text-xs mt-1">{formErrors.investment}</p>
                      )}
                    </div>

                    {/* Mensagem Opcional */}
                    <div>
                      <label
                        htmlFor={`${formId}-message`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-1.5 font-mono font-medium"
                      >
                        Mensagem ou Dúvida <span className="text-[#666]">(opcional)</span>
                      </label>
                      <textarea
                        id={`${formId}-message`}
                        name="message"
                        rows={2}
                        value={form.message}
                        onChange={handleInputChange}
                        placeholder="Breve descrição do objetivo"
                        className="w-full bg-[#050505] border border-white/[0.12] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#D4AF37] transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Botão de Envio */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 min-h-[48px] font-semibold text-[#050505] text-sm cursor-pointer border-none transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                      }}
                    >
                      <span>Solicitar proposta via WhatsApp</span>
                      <IconSend size={14} aria-hidden="true" className="shrink-0" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          RODAPÉ EDITORIAL
          ======================================================== */}
      <footer className="relative bg-[#030303] px-4 sm:px-[5%] lg:px-[8%] py-12 border-t border-white/[0.08] overflow-hidden">
        <div className="relative z-10 max-w-[1360px] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-base font-bold tracking-[0.22em] text-white">
                  ORVION
                </span>
                <span className="text-[9px] tracking-[0.35em] text-[#D4AF37] uppercase font-semibold">
                  Studio
                </span>
              </div>
              <p className="text-[#737373] text-xs leading-relaxed max-w-[420px] m-0">
                Gestão de tráfego pago no Google Ads e páginas de alta conversão para empresas que vendem serviços qualificados.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-[#8a8a8a]">
              <span className="inline-flex items-center gap-2">
                <IconPhone size={13} className="text-[#D4AF37]" />
                WhatsApp +55 11 97999-1680
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="inline-flex items-center gap-2">
                contato@orvionstudio.com.br
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737373]">
            <a
              href="/privacidade"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== 'undefined') {
                  window.history.pushState({}, '', '/privacidade');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-[#D4AF37] hover:text-[#F4E0A1] transition-colors cursor-pointer font-medium no-underline focus-visible:ring-1 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded py-0.5"
            >
              Política de Privacidade
            </a>
            <p className="text-[#737373] m-0">
              © {new Date().getFullYear()} ORVION Studio. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ========================================================
          BARRA FIXA INFERIOR MOBILE (Apenas telas &lt; 640px)
          ======================================================== */}
      <div
        className="fixed bottom-0 inset-x-0 sm:hidden z-30 p-3 bg-[#050505]/95 backdrop-blur-xl border-t border-white/[0.1] shadow-[0_-8px_24px_rgba(0,0,0,0.6)]"
        role="region"
        aria-label="Ação rápida no celular"
      >
        <a
          href={WHATSAPP_GESTÃO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppConversion}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 min-h-[46px] font-semibold text-[#050505] text-xs cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.35)] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
          }}
        >
          <IconPhone size={14} className="shrink-0" />
          <span>Falar no WhatsApp com Especialista</span>
        </a>
      </div>
    </div>
  );
}

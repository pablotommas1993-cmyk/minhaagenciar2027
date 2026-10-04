import { useState, useEffect, useId } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import {
  WHATSAPP_BASE_URL,
  WHATSAPP_GESTÃO_URL,
  trackWhatsAppConversion,
} from '@/utils/gtag';

interface FormState {
  name: string;
  company: string;
  investment: string;
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

  // Dynamic SEO Metadata and Canonical
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Gestão de Google Ads e Tráfego Pago para Empresas | ORVION Studio';

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const previousCanonical = canonical ? canonical.href : 'https://orvionstudio.com.br/';

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://orvionstudio.com.br/google-ads/gestao';

    // Meta Description
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

    // Open Graph Tags
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

  // Capture UTM parameters and gclid from URL
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

  // Form State (Sem campo de WhatsApp para reduzir atrito, já que abre diretamente o WhatsApp do usuário)
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    investment: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      errors.investment = 'Selecione uma faixa de investimento prevista.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * FLUXO FORMULÁRIO -> WHATSAPP:
   * Sem backend/CRM, os dados são montados estruturadamente e enviados
   * diretamente para o WhatsApp oficial da ORVION.
   * Dispara unicamente trackWhatsAppConversion() no momento da abertura.
   */
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot anti-spam silencioso
    if (honeypot.trim().length > 0) {
      return;
    }

    if (!validateForm()) return;

    // Dispara a conversão de abertura de WhatsApp (máximo 1 disparo por ação válida)
    trackWhatsAppConversion();

    // Montagem da mensagem estruturada
    const lines = [
      'Olá! Vim pelo Google e quero uma proposta de gestão de Google Ads.',
      '',
      `Nome: ${form.name.trim()}`,
    ];

    if (form.company.trim()) {
      lines.push(`Empresa: ${form.company.trim()}`);
    }

    lines.push(`Investimento mensal pretendido: ${form.investment}`);
    lines.push('Origem: Google Ads');

    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToProposal = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('proposta');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/privacidade');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputBaseClasses =
    'w-full bg-white/[0.04] border rounded-xl px-5 py-3.5 min-h-[48px] text-white text-sm placeholder-[#A3A3A3] focus:outline-none focus:border-[#D4AF37]/70 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#D4AF37]/50 transition-colors duration-200';

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-body selection:bg-[#D4AF37]/25 selection:text-white overflow-x-hidden">
      {/* Top Header / Brand Bar */}
      <header className="sticky top-0 inset-x-0 z-40 h-20 flex items-center justify-between px-[5%] lg:px-[8%] bg-[#050505]/92 backdrop-blur-xl border-b border-white/[0.06]">
        <a
          href="/"
          onClick={navigateToHome}
          className="flex items-baseline gap-2 cursor-pointer no-underline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded-lg p-1"
          aria-label="ORVION Studio — Ir para a página inicial"
        >
          <span className="font-display text-xl font-semibold tracking-[0.2em] text-white">
            ORVION
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-medium">
            Studio
          </span>
        </a>

        <a
          href={WHATSAPP_GESTÃO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppConversion}
          className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/45 px-4 sm:px-5 py-2 min-h-[44px] text-xs sm:text-sm font-medium text-[#F4E0A1] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/70 active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
        >
          <Phone size={15} className="text-[#D4AF37]" aria-hidden="true" />
          <span>Falar no WhatsApp</span>
        </a>
      </header>

      <main>
        {/* ========================================================
            SEÇÃO 1 — TOPO (HERO COM IMAGEM VISUAL INTEGRADA)
            ======================================================== */}
        <section
          id="topo"
          className="relative pt-12 pb-16 md:pt-16 md:pb-24 lg:py-24 px-[5%] lg:px-[8%] overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center"
        >
          {/* Subtle Ambient Radial Glow behind the composition */}
          <div
            className="absolute top-0 right-1/4 w-full max-w-[900px] h-[550px] pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(ellipse 65% 50% at 65% 30%, rgba(212,175,55,0.12) 0%, rgba(197,160,40,0.03) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* Very Subtle Background Grid Pattern (Simplified to avoid competition) */}
          <div className="absolute inset-0 pointer-events-none select-none opacity-20 overflow-hidden" aria-hidden="true">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="hero-subtle-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path
                    d="M 48 0 L 0 0 0 48"
                    fill="none"
                    stroke="rgba(212, 175, 55, 0.08)"
                    strokeWidth="0.6"
                  />
                </pattern>
                <linearGradient id="hero-grid-fade" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
                  <stop offset="80%" stopColor="#fff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <mask id="hero-grid-mask">
                  <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-subtle-grid)" mask="url(#hero-grid-mask)" />
            </svg>
          </div>

          {/* DESKTOP INTEGRATED VISUAL (Positioned on the RIGHT side, bleeding behind text with smooth fade) */}
          <div
            className="hidden lg:block absolute right-[-2%] xl:right-[1%] top-1/2 -translate-y-1/2 w-[54%] xl:w-[52%] max-w-[850px] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <img
                src="/images/hero-dashboard.webp"
                alt=""
                width={1024}
                height={576}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-right"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.85) 38%, black 65%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.85) 38%, black 65%)',
                }}
              />

              {/* Seamless edge blending overlays: smooth fade top, bottom, and right to completely eliminate harsh cuts */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/75 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/35 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#050505]/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Hero Main Content Container */}
          <div className="relative z-10 w-full max-w-[1240px] mx-auto">
            <div className="max-w-[680px] xl:max-w-[720px] text-center lg:text-left mx-auto lg:mx-0">
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.05] mb-6 md:mb-8 shadow-[0_2px_12px_rgba(212,175,55,0.08)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#F4E0A1] font-medium">
                  Google Ads de Alta Performance
                </span>
              </div>

              {/* Single H1 on page */}
              <h1
                className="font-display font-semibold text-white tracking-[-0.02em] mb-5 md:mb-6 text-balance"
                style={{ fontSize: 'clamp(2.1rem, 4.8vw, 3.75rem)', lineHeight: 1.14 }}
              >
                Gestão de Google Ads e Tráfego Pago para Empresas
              </h1>

              {/* Subtitle */}
              <p className="text-[#D4D4D4] text-base md:text-lg lg:text-xl leading-relaxed max-w-[640px] mb-8 md:mb-10 text-balance font-normal mx-auto lg:mx-0">
                Colocamos sua empresa diante de quem já está procurando seu serviço no Google, e estruturamos a campanha para gerar contatos comerciais, não só cliques.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-5 md:mb-6">
                <a
                  href={WHATSAPP_GESTÃO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppConversion}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 min-h-[50px] font-semibold text-[#050505] text-sm md:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.45)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                  }}
                >
                  <Phone size={17} aria-hidden="true" />
                  <span>Falar no WhatsApp</span>
                </a>

                <a
                  href="#proposta"
                  onClick={scrollToProposal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.2] bg-white/[0.04] px-7 py-4 min-h-[50px] font-medium text-white text-sm md:text-base hover:bg-white/[0.09] hover:border-[#D4AF37]/50 active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                >
                  <span>Solicitar proposta</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>

              {/* Support Line */}
              <p className="text-[#A3A3A3] text-xs md:text-sm font-normal">
                Atendimento para empresas e profissionais que vendem serviços. Resposta em até 24h úteis.
              </p>
            </div>

            {/* MOBILE VISUAL DISPLAY (Appears below text/CTAs on mobile, cleanly framed with soft fade) */}
            <div className="mt-10 sm:mt-12 lg:hidden relative w-full max-w-[480px] mx-auto select-none">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/25 bg-[#080808] shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
                <img
                  src="/images/hero-dashboard.webp"
                  alt=""
                  width={1024}
                  height={576}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover object-right"
                />
                {/* Subtle vignette on mobile card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.05] pointer-events-none rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 2 — PARA QUEM É
            ======================================================== */}
        <section
          id="para-quem"
          className="relative py-16 md:py-24 px-[5%] lg:px-[8%] border-t border-white/[0.06] bg-[#070707]"
        >
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center max-w-[700px] mx-auto mb-12">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-3 block">
                Público e Alinhamento
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
              >
                Para empresas que querem clientes, não curiosos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center mb-5 text-[#D4AF37]">
                  <Target size={20} aria-hidden="true" />
                </div>
                <p className="text-white/95 text-sm md:text-base leading-relaxed">
                  Empresas e profissionais que vendem serviços e já querem investir em anúncios.
                </p>
              </div>

              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center mb-5 text-[#D4AF37]">
                  <TrendingUp size={20} aria-hidden="true" />
                </div>
                <p className="text-white/95 text-sm md:text-base leading-relaxed">
                  Quem já anunciou e não sabe se o dinheiro está dando retorno.
                </p>
              </div>

              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center mb-5 text-[#D4AF37]">
                  <CheckCircle2 size={20} aria-hidden="true" />
                </div>
                <p className="text-white/95 text-sm md:text-base leading-relaxed">
                  Quem quer parar de gastar com cliques que não viram contato.
                </p>
              </div>
            </div>

            {/* Subtle Distinct Notice */}
            <div className="p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-center max-w-[680px] mx-auto">
              <p className="text-[#A3A3A3] text-xs sm:text-sm">
                Esta página não é para quem procura curso ou quer aprender tráfego pago.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 3 — O QUE ESTÁ INCLUÍDO
            ======================================================== */}
        <section
          id="escopo"
          className="relative py-16 md:py-24 px-[5%] lg:px-[8%] border-t border-white/[0.06] bg-[#050505]"
        >
          <div className="max-w-[1100px] mx-auto">
            <div className="max-w-[680px] mb-14">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-3 block">
                Escopo de Trabalho
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
              >
                O que fazemos na gestão do seu Google Ads
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Item 1 */}
              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-3">
                  01. Estrutura
                </div>
                <h3 className="font-display text-white font-medium text-base mb-2">
                  Estratégia e estrutura da campanha
                </h3>
                <p className="text-[#BDBDBD] text-sm leading-relaxed">
                  Pesquisa de termos de compra e organização por intenção.
                </p>
              </div>

              {/* Item 2 */}
              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-3">
                  02. Criação
                </div>
                <h3 className="font-display text-white font-medium text-base mb-2">
                  Anúncios orientados a contato
                </h3>
                <p className="text-[#BDBDBD] text-sm leading-relaxed">
                  Textos escritos para quem quer contratar.
                </p>
              </div>

              {/* Item 3 */}
              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-3">
                  03. Filtro
                </div>
                <h3 className="font-display text-white font-medium text-base mb-2">
                  Controle do que você paga
                </h3>
                <p className="text-[#BDBDBD] text-sm leading-relaxed">
                  Negativação contínua de buscas sem valor comercial.
                </p>
              </div>

              {/* Item 4 */}
              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-3">
                  04. Rastreamento
                </div>
                <h3 className="font-display text-white font-medium text-base mb-2">
                  Mensuração correta
                </h3>
                <p className="text-[#BDBDBD] text-sm leading-relaxed">
                  Configuração do que conta como contato, para você ver o que realmente gera oportunidade.
                </p>
              </div>

              {/* Item 5 */}
              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-3">
                  05. Performance
                </div>
                <h3 className="font-display text-white font-medium text-base mb-2">
                  Otimização contínua
                </h3>
                <p className="text-[#BDBDBD] text-sm leading-relaxed">
                  Ajustes com base nos termos de pesquisa e nos contatos reais.
                </p>
              </div>

              {/* Item 6 */}
              <div className="p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#D4AF37]/35 transition-colors duration-300">
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold mb-3">
                  06. Transparência
                </div>
                <h3 className="font-display text-white font-medium text-base mb-2">
                  Relatórios e suporte
                </h3>
                <p className="text-[#BDBDBD] text-sm leading-relaxed">
                  Relatórios mensais detalhados e suporte com resposta em até 24h.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 4 — COMO FUNCIONA
            ======================================================== */}
        <section
          id="como-funciona"
          className="relative py-16 md:py-24 px-[5%] lg:px-[8%] border-t border-white/[0.06] bg-[#070707]"
        >
          <div className="max-w-[960px] mx-auto">
            <div className="text-center max-w-[650px] mx-auto mb-16">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-3 block">
                Processo
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
              >
                Do primeiro contato à campanha no ar
              </h2>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/35 flex items-center justify-center text-[#F4E0A1] font-display font-semibold text-lg flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-display text-white font-medium text-lg mb-2">
                    Conversa e diagnóstico (1 a 2 dias)
                  </h3>
                  <p className="text-[#BDBDBD] text-sm leading-relaxed">
                    Entendemos seu negócio, seu mercado e o que você já fez.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/35 flex items-center justify-center text-[#F4E0A1] font-display font-semibold text-lg flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-display text-white font-medium text-lg mb-2">
                    Estratégia e estrutura
                  </h3>
                  <p className="text-[#BDBDBD] text-sm leading-relaxed">
                    Definimos as buscas de compra, os anúncios e a forma de medir contatos.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/35 flex items-center justify-center text-[#F4E0A1] font-display font-semibold text-lg flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-display text-white font-medium text-lg mb-2">
                    Lançamento
                  </h3>
                  <p className="text-[#BDBDBD] text-sm leading-relaxed">
                    Campanha no ar, com acompanhamento de perto.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-8 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/35 flex items-center justify-center text-[#F4E0A1] font-display font-semibold text-lg flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-display text-white font-medium text-lg mb-2">
                    Otimização contínua
                  </h3>
                  <p className="text-[#BDBDBD] text-sm leading-relaxed">
                    Ajustamos a campanha com base nos dados reais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 5 — POR QUE A ORVION
            ======================================================== */}
        <section
          id="por-que-orvion"
          className="relative py-16 md:py-24 px-[5%] lg:px-[8%] border-t border-white/[0.06] bg-[#050505]"
        >
          <div className="max-w-[1000px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-3 block">
                  Nosso Diferencial
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-6"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
                >
                  Aquisição e conversão pensadas juntas
                </h2>
                <p className="text-[#BDBDBD] text-sm md:text-base leading-relaxed mb-8">
                  Além da gestão de Google Ads, a ORVION Studio desenvolve sites e páginas de alta performance. Assim, o anúncio e a página trabalham como uma estratégia só, e você não depende de dois fornecedores que culpam um ao outro.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                      <Sparkles size={14} aria-hidden="true" />
                    </div>
                    <span className="text-white text-sm md:text-base font-medium">
                      Estratégia orientada a contato e conversão
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                      <Sparkles size={14} aria-hidden="true" />
                    </div>
                    <span className="text-white text-sm md:text-base font-medium">
                      Decisões baseadas em dados
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                      <Sparkles size={14} aria-hidden="true" />
                    </div>
                    <span className="text-white text-sm md:text-base font-medium">
                      Comunicação direta, sem enrolação
                    </span>
                  </div>
                </div>

                <a
                  href={WHATSAPP_GESTÃO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppConversion}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 min-h-[48px] font-semibold text-[#050505] text-sm cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_16px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.35)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                  }}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

              <div className="lg:col-span-5">
                <div className="p-8 rounded-2xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#D4AF37]/[0.05] to-transparent">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold mb-3">
                    Foco Comercial
                  </div>
                  <h3 className="font-display text-white text-lg font-medium mb-3">
                    Alinhamento ponta a ponta
                  </h3>
                  {/* Texto corrigido: sem promessas garantidas de custo ou volume */}
                  <p className="text-[#D4D4D4] text-xs sm:text-sm leading-relaxed mb-6">
                    Quando tráfego e página trabalham com a mesma estratégia, toda a jornada — da pesquisa ao contato — fica alinhada ao objetivo comercial.
                  </p>
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#A3A3A3]">
                    <span>ORVION Studio</span>
                    <span>Alta Performance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 6 — FORMULÁRIO CURTO (FLUXO FORMULÁRIO -> WHATSAPP)
            ======================================================== */}
        <section
          id="proposta"
          className="relative py-16 md:py-24 px-[5%] lg:px-[8%] border-t border-white/[0.06] bg-[#070707] scroll-mt-20"
        >
          {/* Subtle Ambient Radial */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[640px] mx-auto">
            <div className="text-center mb-10">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-3 block">
                Próximo Passo
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
              >
                Solicite uma proposta
              </h2>
            </div>

            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="space-y-6 p-7 sm:p-9 rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Anti-spam honeypot (invisível para humanos) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor={`${formId}-b_website`}>Não preencha este campo</label>
                <input
                  id={`${formId}-b_website`}
                  type="text"
                  name="b_website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Hidden UTM and gclid fields (capturados para futura integração com CRM/backend) */}
              <input type="hidden" name="utm_source" value={utmData.utm_source} />
              <input type="hidden" name="utm_medium" value={utmData.utm_medium} />
              <input type="hidden" name="utm_campaign" value={utmData.utm_campaign} />
              <input type="hidden" name="utm_term" value={utmData.utm_term} />
              <input type="hidden" name="gclid" value={utmData.gclid} />

              {/* Nome */}
              <div>
                <label
                  htmlFor={`${formId}-name`}
                  className="block text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] mb-2 font-medium"
                >
                  Nome *
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                  className={`${inputBaseClasses} ${
                    formErrors.name ? 'border-red-500/70' : 'border-white/[0.09]'
                  }`}
                  aria-required="true"
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? `${formId}-name-error` : undefined}
                />
                {formErrors.name && (
                  <p id={`${formId}-name-error`} className="text-red-400 text-xs mt-1.5">
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Empresa (opcional) */}
              <div>
                <label
                  htmlFor={`${formId}-company`}
                  className="block text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] mb-2 font-medium"
                >
                  Empresa <span className="text-[#A3A3A3] normal-case">(opcional)</span>
                </label>
                <input
                  id={`${formId}-company`}
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleInputChange}
                  placeholder="Nome da sua empresa"
                  className={`${inputBaseClasses} border-white/[0.09]`}
                />
              </div>

              {/* Pretensão de investimento */}
              <div>
                <label
                  htmlFor={`${formId}-investment`}
                  className="block text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] mb-2 font-medium"
                >
                  Quanto pretende investir por mês em anúncios? *
                </label>
                <select
                  id={`${formId}-investment`}
                  name="investment"
                  value={form.investment}
                  onChange={handleInputChange}
                  className={`${inputBaseClasses} cursor-pointer ${
                    formErrors.investment ? 'border-red-500/70' : 'border-white/[0.09]'
                  }`}
                  style={{ colorScheme: 'dark' }}
                  aria-required="true"
                  aria-invalid={!!formErrors.investment}
                  aria-describedby={formErrors.investment ? `${formId}-inv-error` : undefined}
                >
                  <option value="" className="bg-[#0c0c0c] text-[#A3A3A3]">
                    Selecione uma faixa...
                  </option>
                  <option value="Até R$ 1.000" className="bg-[#0c0c0c] text-white">
                    Até R$ 1.000
                  </option>
                  <option value="R$ 1.000 a R$ 3.000" className="bg-[#0c0c0c] text-white">
                    R$ 1.000 a R$ 3.000
                  </option>
                  <option value="Acima de R$ 3.000" className="bg-[#0c0c0c] text-white">
                    Acima de R$ 3.000
                  </option>
                  <option value="Ainda não sei" className="bg-[#0c0c0c] text-white">
                    Ainda não sei
                  </option>
                </select>
                {formErrors.investment && (
                  <p id={`${formId}-inv-error`} className="text-red-400 text-xs mt-1.5">
                    {formErrors.investment}
                  </p>
                )}
              </div>

              {/* Botão Solicitar proposta */}
              <button
                type="submit"
                className="w-full rounded-xl py-4 min-h-[50px] font-semibold text-[#050505] text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer border-none transition-all duration-200 shadow-[0_4px_16px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.35)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                }}
              >
                <span>Solicitar proposta</span>
                <Send size={16} aria-hidden="true" />
              </button>

              {/* Texto de apoio e link para Política de Privacidade */}
              <p className="text-[#A3A3A3] text-xs text-center leading-relaxed pt-2">
                Retornamos em até 24h úteis. Seus dados são usados apenas para esse contato.{' '}
                <a
                  href="/privacidade"
                  onClick={navigateToPrivacy}
                  className="text-[#D4AF37] hover:underline cursor-pointer font-medium focus-visible:ring-1 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded px-0.5"
                >
                  Política de Privacidade
                </a>
                .
              </p>
            </form>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 7 — PERGUNTAS FREQUENTES
            ======================================================== */}
        <section
          id="faq"
          className="relative py-16 md:py-24 px-[5%] lg:px-[8%] border-t border-white/[0.06] bg-[#050505]"
        >
          <div className="max-w-[840px] mx-auto">
            <div className="text-center max-w-[600px] mx-auto mb-14">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-3 block">
                Esclarecimentos
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
              >
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                    <HelpCircle size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-white font-medium text-base sm:text-lg mb-2">
                      Quanto custa a gestão?
                    </h3>
                    <p className="text-[#BDBDBD] text-sm leading-relaxed">
                      O valor depende do tamanho da conta e do seu objetivo. Passamos uma proposta depois de entender seu negócio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                    <Clock size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-white font-medium text-base sm:text-lg mb-2">
                      Em quanto tempo vejo resultado?
                    </h3>
                    <p className="text-[#BDBDBD] text-sm leading-relaxed">
                      O prazo varia por mercado e verba. Combinamos metas e acompanhamento na proposta, sem prometer números antes de conhecer seu caso.
                    </p>
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-6 sm:p-7 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                    <ShieldCheck size={16} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-white font-medium text-base sm:text-lg mb-2">
                      Preciso ter site?
                    </h3>
                    <p className="text-[#BDBDBD] text-sm leading-relaxed">
                      Se não tiver, também desenvolvemos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 8 — RODAPÉ DA PÁGINA (CTA FINAL + CONTATOS)
            ======================================================== */}
        <section
          id="contato-final"
          className="relative py-16 md:py-24 px-[5%] lg:px-[8%] border-t border-white/[0.06] bg-[#070707] text-center"
        >
          <div className="max-w-[700px] mx-auto">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-3 block">
              Início Imediato
            </span>
            <h2
              className="font-display font-medium text-white tracking-[-0.02em] mb-8"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.2 }}
            >
              Vamos conversar sobre o seu Google Ads
            </h2>

            <div className="mb-10">
              <a
                href={WHATSAPP_GESTÃO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppConversion}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 min-h-[50px] font-semibold text-[#050505] text-sm md:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.45)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                }}
              >
                <Phone size={17} aria-hidden="true" />
                <span>Falar no WhatsApp agora</span>
              </a>
            </div>

            {/* Informações de contato direto */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-[#BDBDBD]">
              <span className="inline-flex items-center gap-2">
                <Phone size={14} className="text-[#D4AF37]" aria-hidden="true" />
                WhatsApp +55 11 97999-1680
              </span>
              <span className="hidden sm:inline text-white/25">•</span>
              <span className="inline-flex items-center gap-2">
                <Mail size={14} className="text-[#D4AF37]" aria-hidden="true" />
                contato@orvionstudio.com.br
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          RODAPÉ EXCLUSIVO DA LANDING (SEM QUALQUER LINK HREF="#")
          ======================================================== */}
      <footer className="relative bg-[#030303] px-[5%] lg:px-[8%] py-12 border-t border-white/[0.06] overflow-hidden">
        <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="flex items-baseline justify-center sm:justify-start gap-2 mb-2">
              <span className="font-display text-xl font-semibold tracking-[0.2em] text-white">
                ORVION
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-medium">
                Studio
              </span>
            </div>
            <p className="text-[#A3A3A3] text-xs leading-relaxed max-w-[380px]">
              Google Ads para gerar demanda. Websites para transformar demanda em negócio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
            <a
              href="/privacidade"
              onClick={navigateToPrivacy}
              className="text-[#D4AF37] hover:text-[#F4E0A1] transition-colors cursor-pointer font-medium no-underline focus-visible:ring-1 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded px-1 py-0.5"
            >
              Política de Privacidade
            </a>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="text-[#A3A3A3]">
              © {new Date().getFullYear()} ORVION Studio. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

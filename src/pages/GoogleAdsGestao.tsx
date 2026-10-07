import { useState, useEffect, useId } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  ChevronDown,
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

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

  // Form State
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

    if (honeypot.trim().length > 0) {
      return;
    }

    if (!validateForm()) return;

    trackWhatsAppConversion();

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
    'w-full bg-[#0a0a0a] border rounded-lg px-4 sm:px-5 py-3.5 min-h-[50px] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-200';

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] font-body selection:bg-[#D4AF37]/25 selection:text-white overflow-x-hidden antialiased">
      {/* Top Header / Studio Brand Bar */}
      <header className="sticky top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-[5%] lg:px-[8%] bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <a
          href="/"
          onClick={navigateToHome}
          className="flex items-baseline gap-2.5 cursor-pointer no-underline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded-md py-1"
          aria-label="ORVION Studio — Ir para a página inicial"
        >
          <span className="font-display text-xl font-bold tracking-[0.22em] text-white">
            ORVION
          </span>
          <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase font-semibold">
            Studio
          </span>
        </a>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#a3a3a3] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Capacidade Aberta Q4</span>
          </div>

          <a
            href={WHATSAPP_GESTÃO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppConversion}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/[0.06] px-3 sm:px-5 py-2 min-h-[38px] sm:min-h-[42px] text-xs sm:text-sm font-medium text-[#F4E0A1] hover:bg-[#D4AF37] hover:text-[#050505] active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none whitespace-nowrap"
          >
            <Phone size={13} aria-hidden="true" className="shrink-0" />
            <span className="hidden sm:inline">Falar com Especialista</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>

      <main>
        {/* ========================================================
            SEÇÃO 1 — HERO EDITORIAL INTEGRADO
            ======================================================== */}
        <section
          id="topo"
          className="relative pt-10 pb-20 md:pt-20 md:pb-28 px-[5%] lg:px-[8%] overflow-hidden border-b border-white/[0.07]"
        >
          {/* Subtle Studio Ambient Radial */}
          <div
            className="absolute top-0 right-1/4 w-full max-w-[1000px] h-[600px] pointer-events-none opacity-30 select-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 70% 25%, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.02) 50%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Narrative Headline */}
              <div className="lg:col-span-7 text-center lg:text-left">
                {/* Studio Eyebrow Tag */}
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-md border border-white/[0.12] bg-white/[0.03] mb-6 sm:mb-8 text-left max-w-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span className="text-[9px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.25em] uppercase text-[#F4E0A1] font-mono font-medium">
                    <span className="hidden sm:inline">Orvion Studio // Google Ads & Aquisição</span>
                    <span className="sm:hidden">Google Ads & Aquisição</span>
                  </span>
                </div>

                {/* Single H1 on page */}
                <h1
                  className="font-display font-semibold text-white tracking-[-0.03em] mb-6 sm:text-balance"
                  style={{ fontSize: 'clamp(1.55rem, 4.8vw, 4.25rem)', lineHeight: 1.12 }}
                >
                  Gestão de Google Ads e Tráfego Pago para Empresas
                </h1>

                {/* Subtitle */}
                <p className="text-[#c2c2c2] text-base md:text-xl leading-relaxed max-w-[640px] mb-10 text-balance font-normal mx-auto lg:mx-0">
                  Colocamos sua empresa diante de quem já está procurando seu serviço no Google, e estruturamos a campanha para gerar contatos comerciais, não só cliques.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                  <a
                    href={WHATSAPP_GESTÃO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackWhatsAppConversion}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 min-h-[52px] font-semibold text-[#050505] text-sm md:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.22] bg-white/[0.03] px-7 py-4 min-h-[52px] font-medium text-white text-sm md:text-base hover:bg-white/[0.08] hover:border-[#D4AF37]/60 active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                  >
                    <span>Solicitar proposta estratégica</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>

                {/* Support Line */}
                <div className="flex items-center justify-center lg:justify-start gap-3 text-[#8a8a8a] text-xs font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
                  <span>Atendimento consultivo para prestadores de serviços de alto valor. Resposta em até 24h úteis.</span>
                </div>
              </div>

              {/* Right Column: Architectural Dashboard Art Piece */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#080808] shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
                  {/* Studio Top Control Strip */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0c0c0c] text-[10px] font-mono text-[#a3a3a3]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span className="uppercase tracking-[0.18em]">Acquisition Dashboard</span>
                    </div>
                    <span className="text-[#888]">100% MONITORADO</span>
                  </div>

                  {/* Visual Asset */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <img
                      src="/images/hero-dashboard.webp"
                      alt="Interface analítica da gestão de Google Ads de alta performance da ORVION Studio"
                      width={1024}
                      height={576}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-right"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 pointer-events-none" />
                  </div>

                  {/* Precision Metrics Bar */}
                  <div className="grid grid-cols-3 divide-x divide-white/[0.08] border-t border-white/[0.08] bg-[#0a0a0a] text-center py-3 px-2">
                    <div>
                      <div className="text-[10px] uppercase font-mono text-[#8a8a8a]">Intenção</div>
                      <div className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">Foco Comercial</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-[#8a8a8a]">Tracking</div>
                      <div className="text-xs sm:text-sm font-semibold text-[#D4AF37] font-display mt-0.5">Ponta a Ponta</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-mono text-[#8a8a8a]">Negativação</div>
                      <div className="text-xs sm:text-sm font-semibold text-white font-display mt-0.5">Anti-Desperdício</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 2 — PÚBLICO E ALINHAMENTO EDITORIAL
            ======================================================== */}
        <section
          id="para-quem"
          className="relative py-20 md:py-28 px-[5%] lg:px-[8%] border-b border-white/[0.07] bg-[#070707]"
        >
          <div className="max-w-[1360px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.08]">
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  01 // Perfil de Parceria
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] max-w-[680px]"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.15 }}
                >
                  Para empresas que querem clientes, não curiosos
                </h2>
              </div>
              <p className="text-[#a3a3a3] text-sm md:text-base max-w-[420px] font-normal leading-relaxed">
                Nossa metodologia é desenvolvida especificamente para empresas que vendem serviços qualificados e precisam de previsibilidade no funil.
              </p>
            </div>

            {/* Editorial 3-Column Split with Hairline Dividers */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              {/* Item 01 */}
              <div className="py-8 md:py-0 md:pr-10 lg:pr-12">
                <div className="font-mono text-3xl lg:text-4xl font-light text-[#D4AF37] mb-6">
                  01
                </div>
                <h3 className="font-display text-white text-lg lg:text-xl font-medium mb-3">
                  Empresas que já anunciam ou querem investir com rigor
                </h3>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">
                  Profissionais e empresas que já possuem verba alocada e exigem governança sobre onde cada centavo está sendo aplicado.
                </p>
              </div>

              {/* Item 02 */}
              <div className="py-8 md:py-0 md:px-10 lg:px-12">
                <div className="font-mono text-3xl lg:text-4xl font-light text-[#D4AF37] mb-6">
                  02
                </div>
                <h3 className="font-display text-white text-lg lg:text-xl font-medium mb-3">
                  Quem precisa saber se o investimento dá retorno real
                </h3>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">
                  Negócios que buscam clareza cirúrgica entre o valor investido no Google e as oportunidades comerciais geradas na mesa de vendas.
                </p>
              </div>

              {/* Item 03 */}
              <div className="py-8 md:py-0 md:pl-10 lg:pl-12">
                <div className="font-mono text-3xl lg:text-4xl font-light text-[#D4AF37] mb-6">
                  03
                </div>
                <h3 className="font-display text-white text-lg lg:text-xl font-medium mb-3">
                  Cansadas de pagar por cliques que não viram contato
                </h3>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">
                  Quem quer eliminar termos sem valor comercial, tráfego desqualificado e focar exclusivamente em intenção real de contratação.
                </p>
              </div>
            </div>

            {/* Subtle Distinct Notice */}
            <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#737373]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#D4AF37]" />
                <span>FILTRO DE ALINHAMENTO ESTRATÉGICO</span>
              </div>
              <span>Esta página não é para quem procura curso ou quer aprender tráfego pago. Atendemos apenas empresas.</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 3 — ESCOPO DE TRABALHO (CATÁLOGO CONSULTIVO)
            ======================================================== */}
        <section
          id="escopo"
          className="relative py-20 md:py-28 px-[5%] lg:px-[8%] border-b border-white/[0.07] bg-[#050505]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.08]">
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  02 // Escopo de Trabalho
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] max-w-[700px]"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.15 }}
                >
                  O que fazemos na gestão do seu Google Ads
                </h2>
              </div>
              <p className="text-[#a3a3a3] text-sm md:text-base max-w-[400px] leading-relaxed">
                Cada entrega é estruturada como parte de uma engrenagem contínua de aquisição comercial.
              </p>
            </div>

            {/* Editorial Service Directory (Dividers instead of boxes) */}
            <div className="divide-y divide-white/[0.08]">
              {/* Row 1 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-white/[0.015] px-4 -mx-4 rounded-lg transition-colors duration-200">
                <div className="md:col-span-1 font-mono text-sm text-[#D4AF37]">01</div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-white text-lg font-medium group-hover:text-[#F4E0A1] transition-colors">
                    Estratégia e estrutura da campanha
                  </h3>
                  <div className="text-[11px] font-mono text-[#737373] mt-1 uppercase tracking-wider">
                    Pesquisa & Arquitetura
                  </div>
                </div>
                <div className="md:col-span-7 text-[#b5b5b5] text-sm md:text-base leading-relaxed">
                  Pesquisa aprofundada de termos de compra e organização da conta por intenção real de contratação, separando pesquisas casuais de termos com momento de decisão.
                </div>
              </div>

              {/* Row 2 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-white/[0.015] px-4 -mx-4 rounded-lg transition-colors duration-200">
                <div className="md:col-span-1 font-mono text-sm text-[#D4AF37]">02</div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-white text-lg font-medium group-hover:text-[#F4E0A1] transition-colors">
                    Anúncios orientados a contato
                  </h3>
                  <div className="text-[11px] font-mono text-[#737373] mt-1 uppercase tracking-wider">
                    Copywriting Comercial
                  </div>
                </div>
                <div className="md:col-span-7 text-[#b5b5b5] text-sm md:text-base leading-relaxed">
                  Textos persuasivos escritos para quem quer contratar serviços, comunicando diferenciais, qualificando o perfil do lead e afastando curiosos antes do clique.
                </div>
              </div>

              {/* Row 3 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-white/[0.015] px-4 -mx-4 rounded-lg transition-colors duration-200">
                <div className="md:col-span-1 font-mono text-sm text-[#D4AF37]">03</div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-white text-lg font-medium group-hover:text-[#F4E0A1] transition-colors">
                    Controle do que você paga
                  </h3>
                  <div className="text-[11px] font-mono text-[#737373] mt-1 uppercase tracking-wider">
                    Engenharia de Negativação
                  </div>
                </div>
                <div className="md:col-span-7 text-[#b5b5b5] text-sm md:text-base leading-relaxed">
                  Negativação contínua e minuciosa de buscas sem valor comercial para blindar seu orçamento e assegurar que a verba vá apenas para pesquisas com intenção de compra.
                </div>
              </div>

              {/* Row 4 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-white/[0.015] px-4 -mx-4 rounded-lg transition-colors duration-200">
                <div className="md:col-span-1 font-mono text-sm text-[#D4AF37]">04</div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-white text-lg font-medium group-hover:text-[#F4E0A1] transition-colors">
                    Mensuração correta
                  </h3>
                  <div className="text-[11px] font-mono text-[#737373] mt-1 uppercase tracking-wider">
                    Telemetria & Conversão
                  </div>
                </div>
                <div className="md:col-span-7 text-[#b5b5b5] text-sm md:text-base leading-relaxed">
                  Configuração rigorosa do que conta como contato comercial real, permitindo a você e à sua equipe identificar com precisão quais campanhas geram oportunidade de negócio.
                </div>
              </div>

              {/* Row 5 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-white/[0.015] px-4 -mx-4 rounded-lg transition-colors duration-200">
                <div className="md:col-span-1 font-mono text-sm text-[#D4AF37]">05</div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-white text-lg font-medium group-hover:text-[#F4E0A1] transition-colors">
                    Otimização contínua
                  </h3>
                  <div className="text-[11px] font-mono text-[#737373] mt-1 uppercase tracking-wider">
                    Gestão de Lances & ROI
                  </div>
                </div>
                <div className="md:col-span-7 text-[#b5b5b5] text-sm md:text-base leading-relaxed">
                  Ajustes analíticos frequentes com base nos termos de pesquisa e nos contatos reais recebidos, realocando verba para as variações mais eficientes do leilão.
                </div>
              </div>

              {/* Row 6 */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start group hover:bg-white/[0.015] px-4 -mx-4 rounded-lg transition-colors duration-200">
                <div className="md:col-span-1 font-mono text-sm text-[#D4AF37]">06</div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-white text-lg font-medium group-hover:text-[#F4E0A1] transition-colors">
                    Relatórios e suporte
                  </h3>
                  <div className="text-[11px] font-mono text-[#737373] mt-1 uppercase tracking-wider">
                    Governança & Contato Direto
                  </div>
                </div>
                <div className="md:col-span-7 text-[#b5b5b5] text-sm md:text-base leading-relaxed">
                  Relatórios mensais detalhados e canal de suporte estratégico com resposta em até 24h úteis diretamente com quem opera e compreende a sua conta.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 4 — PROCESSO (TIMELINE DE IMPLANTAÇÃO CONSULTIVA)
            ======================================================== */}
        <section
          id="como-funciona"
          className="relative py-20 md:py-28 px-[5%] lg:px-[8%] border-b border-white/[0.07] bg-[#070707]"
        >
          <div className="max-w-[1360px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.08]">
              <div>
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  03 // Metodologia de Entrega
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] max-w-[680px]"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.15 }}
                >
                  Do primeiro contato à campanha no ar
                </h2>
              </div>
              <p className="text-[#a3a3a3] text-sm md:text-base max-w-[380px] font-normal leading-relaxed">
                Um fluxo transparente e estruturado que elimina improviso e garante alinhamento comercial antes do primeiro clique.
              </p>
            </div>

            {/* Phased Roadmap Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative pt-6 border-t-2 border-[#D4AF37] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a3a3a3]">
                    <span className="text-[#D4AF37] font-semibold">FASE 01</span>
                    <span>1 A 2 DIAS</span>
                  </div>
                  <h3 className="font-display text-white text-lg font-medium mb-3">
                    Conversa e diagnóstico
                  </h3>
                  <p className="text-[#999] text-sm leading-relaxed">
                    Entendemos seu modelo de negócio, o tíquete dos seus serviços, o histórico de mídia e quem é o tomador de decisão.
                  </p>
                </div>
                <div className="mt-6 text-[11px] font-mono text-[#D4AF37] flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Diagnóstico Estruturado</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative pt-6 border-t-2 border-white/[0.25] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a3a3a3]">
                    <span className="text-white font-semibold">FASE 02</span>
                    <span>ESTRUTURAÇÃO</span>
                  </div>
                  <h3 className="font-display text-white text-lg font-medium mb-3">
                    Estratégia e estrutura
                  </h3>
                  <p className="text-[#999] text-sm leading-relaxed">
                    Definimos as buscas de compra, a redação dos anúncios, a lista de termos negativos e a forma técnica de medir contatos.
                  </p>
                </div>
                <div className="mt-6 text-[11px] font-mono text-[#a3a3a3] flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Arquitetura da Conta</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative pt-6 border-t-2 border-white/[0.25] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a3a3a3]">
                    <span className="text-white font-semibold">FASE 03</span>
                    <span>GO-LIVE</span>
                  </div>
                  <h3 className="font-display text-white text-lg font-medium mb-3">
                    Lançamento
                  </h3>
                  <p className="text-[#999] text-sm leading-relaxed">
                    Campanha no ar com acompanhamento de perto no leilão para validar as primeiras impressões e calibrar lances de entrada.
                  </p>
                </div>
                <div className="mt-6 text-[11px] font-mono text-[#a3a3a3] flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Ativação Monitorada</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative pt-6 border-t-2 border-white/[0.25] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-4 text-[#a3a3a3]">
                    <span className="text-white font-semibold">FASE 04</span>
                    <span>CICLO CONTÍNUO</span>
                  </div>
                  <h3 className="font-display text-white text-lg font-medium mb-3">
                    Otimização contínua
                  </h3>
                  <p className="text-[#999] text-sm leading-relaxed">
                    Ajustamos a campanha com base nos dados reais do mercado e no feedback dos contatos recebidos pelo seu time comercial.
                  </p>
                </div>
                <div className="mt-6 text-[11px] font-mono text-[#a3a3a3] flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Escala & Eficiência</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 5 — DIFERENCIAL (THE ACQUISITION ENGINE)
            ======================================================== */}
        <section
          id="por-que-orvion"
          className="relative py-20 md:py-28 px-[5%] lg:px-[8%] border-b border-white/[0.07] bg-[#050505]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Proposition */}
              <div className="lg:col-span-6">
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  04 // Nosso Diferencial
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-6"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.1rem)', lineHeight: 1.15 }}
                >
                  Aquisição e conversão pensadas juntas
                </h2>
                <p className="text-[#b5b5b5] text-base leading-relaxed mb-8">
                  Além da gestão de Google Ads, a ORVION Studio desenvolve sites e páginas de alta performance. Assim, o anúncio e a página trabalham como uma estratégia só, e você não depende de dois fornecedores que culpam um ao outro.
                </p>

                <div className="space-y-4 mb-10 border-t border-white/[0.08] pt-6">
                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white block text-sm sm:text-base font-medium">Estratégia orientada a contato e conversão</strong>
                      <span className="text-[#888] text-xs sm:text-sm">Cada anúncio e cada seção da página cooperam para um único objetivo: gerar conversa comercial.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white block text-sm sm:text-base font-medium">Decisões baseadas em dados</strong>
                      <span className="text-[#888] text-xs sm:text-sm">Sem achismos. Ajustes orientados por termos de pesquisa reais e métricas de conversão validadas.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-white block text-sm sm:text-base font-medium">Comunicação direta, sem enrolação</strong>
                      <span className="text-[#888] text-xs sm:text-sm">Você fala com quem cuida da conta, com relatórios transparentes e acompanhamento ágil.</span>
                    </div>
                  </div>
                </div>

                <a
                  href={WHATSAPP_GESTÃO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppConversion}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 min-h-[48px] font-semibold text-[#050505] text-sm cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.45)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                  }}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>Falar no WhatsApp</span>
                </a>
              </div>

              {/* Right Column: Architectural Engine Blueprint */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-white/[0.12] bg-[#090909] p-6 sm:p-8 relative">
                  {/* Blueprint Tag */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] text-xs font-mono text-[#a3a3a3]">
                    <span className="text-[#D4AF37] uppercase tracking-wider font-semibold">Sistema Integrado ORVION</span>
                    <span className="text-[#777]">SISTEMA DE AQUISIÇÃO</span>
                  </div>

                  {/* Flow Diagram */}
                  <div className="py-6 space-y-4">
                    {/* Step 1 */}
                    <div className="p-3.5 sm:p-4 rounded-xl border border-white/[0.08] bg-[#0e0e0e] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-mono text-xs font-semibold">
                          01
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-white">Google Ads (Mídia)</div>
                          <div className="text-[11px] sm:text-xs text-[#888] truncate sm:whitespace-normal">Captura de demanda ativa de quem já quer comprar</div>
                        </div>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ativo</span>
                    </div>

                    <div className="flex justify-center -my-2 text-[#D4AF37]/40">
                      ↓
                    </div>

                    {/* Step 2 */}
                    <div className="p-3.5 sm:p-4 rounded-xl border border-white/[0.08] bg-[#0e0e0e] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-mono text-xs font-semibold">
                          02
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-white">Landing Page de Alto Padrão</div>
                          <div className="text-[11px] sm:text-xs text-[#888] truncate sm:whitespace-normal">Carregamento ultrarrápido, copy alinhada e design autoral</div>
                        </div>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ativo</span>
                    </div>

                    <div className="flex justify-center -my-2 text-[#D4AF37]/40">
                      ↓
                    </div>

                    {/* Step 3 */}
                    <div className="p-3.5 sm:p-4 rounded-xl border border-white/[0.08] bg-[#0e0e0e] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-mono text-xs font-semibold">
                          03
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-white">Telemetria & Mensuração</div>
                          <div className="text-[11px] sm:text-xs text-[#888] truncate sm:whitespace-normal">Contatos e conversões reais rastreados no WhatsApp</div>
                        </div>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ativo</span>
                    </div>

                    <div className="flex justify-center -my-2 text-[#D4AF37]/40">
                      ↓
                    </div>

                    {/* Step 4 */}
                    <div className="p-3.5 sm:p-4 rounded-xl border border-white/[0.08] bg-[#0e0e0e] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-mono text-xs font-semibold">
                          04
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-white">Otimização Contínua de ROI</div>
                          <div className="text-[11px] sm:text-xs text-[#888] truncate sm:whitespace-normal">Realocação da verba nas palavras que geram contratos</div>
                        </div>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ativo</span>
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[10px] sm:text-xs text-[#8a8a8a] font-mono">
                    <span>ALINHAMENTO PONTA A PONTA</span>
                    <span className="text-[#D4AF37]">ZERO CONFLITO DE FORNECEDOR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 6 — BRIEFING EXECUTIVO & FORMULÁRIO DE PROPOSTA
            ======================================================== */}
        <section
          id="proposta"
          className="relative py-20 md:py-28 px-[5%] lg:px-[8%] border-b border-white/[0.07] bg-[#070707] scroll-mt-20"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Advisory Context */}
              <div className="lg:col-span-5">
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  05 // Próximo Passo
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-6"
                  style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3.1rem)', lineHeight: 1.15 }}
                >
                  Solicite uma proposta
                </h2>
                <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed mb-8">
                  Compartilhe os dados essenciais da sua operação. Faremos uma análise do seu segmento no Google e retornaremos com uma proposta sob medida em até 24 horas úteis.
                </p>

                <div className="space-y-4 border-t border-white/[0.08] pt-6 text-xs text-[#8a8a8a] font-mono">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>DIAGNÓSTICO PRÉVIO DE MERCADO E CONCORRÊNCIA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>SEM OBRIGAÇÃO COMERCIAL OU PRESSÃO DE VENDAS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>RESPOSTA DIRETA COM ESPECIALISTA RESPONSÁVEL</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Executive Form */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/[0.12] bg-[#090909] p-7 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
                    {/* Anti-spam honeypot */}
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

                    {/* Hidden UTM fields */}
                    <input type="hidden" name="utm_source" value={utmData.utm_source} />
                    <input type="hidden" name="utm_medium" value={utmData.utm_medium} />
                    <input type="hidden" name="utm_campaign" value={utmData.utm_campaign} />
                    <input type="hidden" name="utm_term" value={utmData.utm_term} />
                    <input type="hidden" name="gclid" value={utmData.gclid} />

                    {/* Nome */}
                    <div>
                      <label
                        htmlFor={`${formId}-name`}
                        className="block text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] mb-2 font-mono font-medium"
                      >
                        Nome Completo *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome ou do responsável"
                        className={`${inputBaseClasses} ${
                          formErrors.name ? 'border-red-500/70' : 'border-white/[0.1]'
                        }`}
                        aria-required="true"
                        aria-invalid={!!formErrors.name}
                        aria-describedby={formErrors.name ? `${formId}-name-error` : undefined}
                      />
                      {formErrors.name && (
                        <p id={`${formId}-name-error`} className="text-red-400 text-xs mt-1.5 font-mono">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Empresa */}
                    <div>
                      <label
                        htmlFor={`${formId}-company`}
                        className="block text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] mb-2 font-mono font-medium"
                      >
                        Empresa <span className="text-[#737373] normal-case font-normal">(opcional)</span>
                      </label>
                      <input
                        id={`${formId}-company`}
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleInputChange}
                        placeholder="Nome da sua empresa ou marca"
                        className={`${inputBaseClasses} border-white/[0.1]`}
                      />
                    </div>

                    {/* Investimento */}
                    <div>
                      <label
                        htmlFor={`${formId}-investment`}
                        className="block text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] mb-2 font-mono font-medium"
                      >
                        Quanto pretende investir por mês em anúncios? *
                      </label>
                      <select
                        id={`${formId}-investment`}
                        name="investment"
                        value={form.investment}
                        onChange={handleInputChange}
                        className={`${inputBaseClasses} cursor-pointer ${
                          formErrors.investment ? 'border-red-500/70' : 'border-white/[0.1]'
                        }`}
                        style={{ colorScheme: 'dark' }}
                        aria-required="true"
                        aria-invalid={!!formErrors.investment}
                        aria-describedby={formErrors.investment ? `${formId}-inv-error` : undefined}
                      >
                        <option value="" className="bg-[#0c0c0c] text-[#737373]">
                          Selecione a faixa de investimento pretendida...
                        </option>
                        <option value="Até R$ 1.000" className="bg-[#0c0c0c] text-white">
                          Até R$ 1.000 / mês
                        </option>
                        <option value="R$ 1.000 a R$ 3.000" className="bg-[#0c0c0c] text-white">
                          R$ 1.000 a R$ 3.000 / mês
                        </option>
                        <option value="Acima de R$ 3.000" className="bg-[#0c0c0c] text-white">
                          Acima de R$ 3.000 / mês
                        </option>
                        <option value="Ainda não sei" className="bg-[#0c0c0c] text-white">
                          Ainda não sei (necessito de orientação)
                        </option>
                      </select>
                      {formErrors.investment && (
                        <p id={`${formId}-inv-error`} className="text-red-400 text-xs mt-1.5 font-mono">
                          {formErrors.investment}
                        </p>
                      )}
                    </div>

                    {/* Botão */}
                    <button
                      type="submit"
                      className="w-full rounded-lg py-4 min-h-[52px] font-semibold text-[#050505] text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer border-none transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.45)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                      }}
                    >
                      <span>Solicitar proposta</span>
                      <Send size={16} aria-hidden="true" />
                    </button>

                    {/* Nota de privacidade */}
                    <p className="text-[#737373] text-xs text-center leading-relaxed pt-2">
                      Retornamos em até 24h úteis. Seus dados são confidenciais e protegidos pela nossa{' '}
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
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 7 — PERGUNTAS FREQUENTES (ACORDEÃO EDITORIAL)
            ======================================================== */}
        <section
          id="faq"
          className="relative py-20 md:py-28 px-[5%] lg:px-[8%] border-b border-white/[0.07] bg-[#050505]"
        >
          <div className="max-w-[1000px] mx-auto">
            <div className="mb-14 pb-8 border-b border-white/[0.08]">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                06 // Esclarecimentos Estratégicos
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em]"
                style={{ fontSize: 'clamp(1.9rem, 3.8vw, 3rem)', lineHeight: 1.15 }}
              >
                Perguntas Frequentes
              </h2>
            </div>

            <div className="divide-y divide-white/[0.08]">
              {/* Question 1 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(0)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group"
                  aria-expanded={openFaq === 0}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    Quanto custa a gestão?
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 flex-shrink-0 ${
                      openFaq === 0 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-sm leading-relaxed ${
                    openFaq === 0 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  O valor depende do tamanho da conta e do seu objetivo. Passamos uma proposta depois de entender seu negócio.
                </div>
              </div>

              {/* Question 2 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(1)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group"
                  aria-expanded={openFaq === 1}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    Em quanto tempo vejo resultado?
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 flex-shrink-0 ${
                      openFaq === 1 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-sm leading-relaxed ${
                    openFaq === 1 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  O prazo varia por mercado e verba. Combinamos metas e acompanhamento na proposta, sem prometer números antes de conhecer seu caso.
                </div>
              </div>

              {/* Question 3 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(2)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group"
                  aria-expanded={openFaq === 2}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    Preciso ter site?
                  </h3>
                  <ChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 flex-shrink-0 ${
                      openFaq === 2 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-sm leading-relaxed ${
                    openFaq === 2 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  Se não tiver, também desenvolvemos.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 8 — FECHAMENTO INSTITUCIONAL & DIRETORIA
            ======================================================== */}
        <section
          id="contato-final"
          className="relative py-24 md:py-32 px-[5%] lg:px-[8%] bg-[#050505] text-center"
        >
          <div className="max-w-[800px] mx-auto">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4AF37] font-mono font-medium mb-4 block">
              07 // Atendimento Direto
            </span>
            <h2
              className="font-display font-medium text-white tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.5rem)', lineHeight: 1.15 }}
            >
              Vamos conversar sobre o seu Google Ads
            </h2>
            <p className="text-[#a3a3a3] text-base md:text-lg leading-relaxed max-w-[600px] mx-auto mb-10">
              Traga o seu cenário. Nossos sócios e especialistas avaliam a viabilidade técnica e estratégica da sua conta.
            </p>

            <div className="mb-12">
              <a
                href={WHATSAPP_GESTÃO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppConversion}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 min-h-[54px] font-semibold text-[#050505] text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_28px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_36px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                }}
              >
                <Phone size={18} aria-hidden="true" />
                <span>Falar no WhatsApp agora</span>
              </a>
            </div>

            {/* Credenciais de contato */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-[#8a8a8a] border-t border-white/[0.08] pt-8">
              <span className="inline-flex items-center gap-2">
                <Phone size={13} className="text-[#D4AF37]" aria-hidden="true" />
                WhatsApp +55 11 97999-1680
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="inline-flex items-center gap-2">
                <Mail size={13} className="text-[#D4AF37]" aria-hidden="true" />
                contato@orvionstudio.com.br
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          RODAPÉ EDITORIAL
          ======================================================== */}
      <footer className="relative bg-[#030303] px-[5%] lg:px-[8%] py-12 border-t border-white/[0.08] overflow-hidden">
        <div className="relative z-10 max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="flex items-baseline justify-center sm:justify-start gap-2 mb-2">
              <span className="font-display text-lg font-bold tracking-[0.22em] text-white">
                ORVION
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase font-semibold">
                Studio
              </span>
            </div>
            <p className="text-[#737373] text-xs leading-relaxed max-w-[400px]">
              Estratégia de aquisição, Google Ads e interfaces digitais concebidas para empresas de alto padrão.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-[#737373]">
            <a
              href="/privacidade"
              onClick={navigateToPrivacy}
              className="text-[#D4AF37] hover:text-[#F4E0A1] transition-colors cursor-pointer font-medium no-underline focus-visible:ring-1 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded px-1 py-0.5"
            >
              Política de Privacidade
            </a>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="text-[#737373]">
              © {new Date().getFullYear()} ORVION Studio. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

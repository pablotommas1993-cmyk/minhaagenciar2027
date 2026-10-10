import { useState, useEffect, useId } from 'react';
import {
  WHATSAPP_BASE_URL,
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

function IconSearch({ size = 16, className = '' }: { size?: number; className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function IconLayoutGrid({ size = 16, className = '' }: { size?: number; className?: string }) {
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
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function IconBrowser({ size = 16, className = '' }: { size?: number; className?: string }) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M2 8h20" />
      <path d="M6 6h.01" />
      <path d="M10 6h.01" />
    </svg>
  );
}

function IconMessageCircle({ size = 16, className = '' }: { size?: number; className?: string }) {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}


// ============================================================================
// CONSTANTES DE CONVERSÃO WHATSAPP OFICIAIS
// ============================================================================
const WHATSAPP_HERO_MESSAGE =
  'Olá! Vim pelo site da Orvion e quero entender como funciona a gestão de Google Ads para minha empresa.';
const WHATSAPP_HERO_URL = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(WHATSAPP_HERO_MESSAGE)}`;

const WHATSAPP_DIAGNOSTICO_MESSAGE =
  'Olá! Vim pelo site da Orvion e quero solicitar um diagnóstico de Google Ads para minha empresa.';
const WHATSAPP_DIAGNOSTICO_URL = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(WHATSAPP_DIAGNOSTICO_MESSAGE)}`;

// ============================================================================
// COMPONENTE PRINCIPAL: GOOGLE ADS GESTÃO
// ============================================================================
interface FormState {
  name: string;
  company: string;
  phone: string;
  service: string;
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
    phone: '',
    service: 'Gestão de Google Ads',
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
    if (!form.phone.trim()) {
      errors.phone = 'Por favor, informe seu WhatsApp para contato.';
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
      'Olá! Vim pela página da ORVION Studio e tenho interesse em avançar com a gestão de Google Ads.',
      '',
      `Nome: ${form.name.trim()}`,
    ];

    if (form.company.trim()) {
      lines.push(`Empresa: ${form.company.trim()}`);
    }

    if (form.phone.trim()) {
      lines.push(`WhatsApp: ${form.phone.trim()}`);
    }

    if (form.service.trim()) {
      lines.push(`Serviço de interesse: ${form.service.trim()}`);
    }

    if (form.message.trim()) {
      lines.push(`Mensagem: ${form.message.trim()}`);
    }

    if (utmData.utm_source) {
      lines.push(`Origem: ${utmData.utm_source}`);
    }
    if (utmData.gclid) {
      lines.push(`GCLID: ${utmData.gclid}`);
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
          CABEÇALHO EDITORIAL (SOBRE A IMAGEM / STICKY GLASS)
          ======================================================== */}
      <header className="sticky top-0 inset-x-0 z-40 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-[5%] lg:px-[8%] bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08]">
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

        {/* Links / Âncoras discretas no desktop */}
        <nav
          className="hidden md:flex items-center gap-7 text-xs text-[#a3a3a3] font-medium tracking-wide"
          aria-label="Navegação da landing"
        >
          <a
            href="#problema"
            onClick={scrollToAnchor('problema')}
            className="hover:text-white transition-colors duration-150 no-underline cursor-pointer"
          >
            Diagnóstico
          </a>
          <a
            href="#metodo"
            onClick={scrollToAnchor('metodo')}
            className="hover:text-white transition-colors duration-150 no-underline cursor-pointer"
          >
            Processo
          </a>
          <a
            href="#servicos"
            onClick={scrollToAnchor('servicos')}
            className="hover:text-white transition-colors duration-150 no-underline cursor-pointer"
          >
            Gestão
          </a>
          <a
            href="#fluxo"
            onClick={scrollToAnchor('fluxo')}
            className="hover:text-white transition-colors duration-150 no-underline cursor-pointer"
          >
            Fluxo
          </a>
          <a
            href="#ecossistema"
            onClick={scrollToAnchor('ecossistema')}
            className="hover:text-white transition-colors duration-150 no-underline cursor-pointer"
          >
            Ecossistema
          </a>
          <a
            href="#faq"
            onClick={scrollToAnchor('faq')}
            className="hover:text-white transition-colors duration-150 no-underline cursor-pointer"
          >
            Dúvidas
          </a>
          <a
            href="#proposta"
            onClick={scrollToAnchor('proposta')}
            className="hover:text-white transition-colors duration-150 no-underline cursor-pointer"
          >
            Contato
          </a>
        </nav>

        {/* CTA secundário no topo: Solicitar Diagnóstico */}
        <div className="flex items-center shrink-0">
          <a
            href={WHATSAPP_DIAGNOSTICO_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppConversion}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/[0.08] px-3 sm:px-4 py-1.5 sm:py-2.5 min-h-[38px] sm:min-h-[40px] text-xs sm:text-sm font-medium text-[#F4E0A1] hover:bg-[#D4AF37] hover:text-[#050505] active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none whitespace-nowrap shadow-[0_2px_14px_rgba(212,175,55,0.12)] shrink-0"
          >
            <IconPhone size={13} className="shrink-0 text-[#D4AF37]" />
            <span className="hidden sm:inline">Solicitar Diagnóstico</span>
            <span className="sm:hidden">Diagnóstico</span>
          </a>
        </div>
      </header>

      {/* Espaçamento inferior no mobile para a barra fixa de conversão */}
      <main className="pb-24 sm:pb-0">
        {/* ========================================================
            SEÇÃO 1 — HERO DEFINITIVA COM BACKGROUND OFFICE FULL-BLEED
            ======================================================== */}
        <section
          id="topo"
          className="relative min-h-[90vh] md:min-h-[calc(100vh-5rem)] flex items-center -mt-16 sm:-mt-20 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] overflow-hidden"
        >
          {/* Background de Imagem Executiva Full-Bleed */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <picture>
              <source srcSet="/images/hero-executive-office.webp" type="image/webp" />
              <img
                src="/images/hero-executive-office.jpg"
                alt=""
                aria-hidden="true"
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-cover object-[78%_center] sm:object-[72%_center] md:object-[right_center]"
              />
            </picture>

            {/* Overlay Desktop: Gradiente Horizontal (escuro na esquerda para texto, transparente na direita para skyline, telas e iluminação) */}
            <div
              className="hidden md:block absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, #050505 0%, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0.72) 48%, rgba(5,5,5,0.2) 75%, rgba(5,5,5,0.45) 100%)',
              }}
              aria-hidden="true"
            />

            {/* Overlay Mobile: Gradiente vertical + horizontal escurecendo para garantir contraste absoluto dos textos */}
            <div
              className="md:hidden absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.96) 82%, #070707 100%)',
              }}
              aria-hidden="true"
            />
            <div
              className="md:hidden absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.5) 100%)',
              }}
              aria-hidden="true"
            />

            {/* Transição suave na base conectando a Hero com a seção seguinte (#problema em fundo #070707) */}
            <div
              className="absolute inset-x-0 bottom-0 h-28 sm:h-36 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, #070707 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 max-w-[1360px] mx-auto w-full">
            <div className="max-w-[780px]">
              {/* Eyebrow de posicionamento */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.12] bg-white/[0.04] backdrop-blur-sm mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#F4E0A1] font-mono font-medium">
                  Google Ads • Aquisição • Performance
                </span>
              </div>

              {/* H1 único da landing */}
              <h1
                className="font-display font-semibold text-white tracking-[-0.03em] mb-6 text-balance break-words"
                style={{ fontSize: 'clamp(1.85rem, 5vw, 4.25rem)', lineHeight: 1.15 }}
              >
                Google Ads para empresas
                <br />
                que querem mais
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4E0A1] to-[#D4AF37]">
                  oportunidades de venda.
                </span>
              </h1>

              {/* Subheadline curta e comercial */}
              <p className="text-[#c2c2c2] text-base md:text-lg leading-relaxed max-w-[560px] mb-8 sm:mb-10 font-normal">
                Estratégia, gestão e otimização de campanhas para colocar sua empresa diante de pessoas que já estão procurando pelo que você oferece.
              </p>

              {/* CTAs Primário e Secundário */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <a
                  href={WHATSAPP_HERO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppConversion}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] sm:min-h-[54px] font-semibold text-[#050505] text-sm md:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_28px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_36px_rgba(212,175,55,0.55)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                  }}
                >
                  <IconPhone size={16} aria-hidden="true" className="shrink-0" />
                  <span>Quero anunciar no Google</span>
                </a>

                <a
                  href="#problema"
                  onClick={scrollToAnchor('problema')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.22] bg-white/[0.04] backdrop-blur-sm px-6 py-3.5 sm:py-4 min-h-[48px] sm:min-h-[54px] font-medium text-white text-sm md:text-base hover:bg-white/[0.08] hover:border-[#D4AF37]/60 active:scale-[0.98] transition-all duration-200 no-underline cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none whitespace-nowrap"
                >
                  <span>Ver como trabalhamos</span>
                  <IconArrowRight size={15} aria-hidden="true" className="shrink-0" />
                </a>
              </div>

              {/* Micro-confirmação / Microcopy */}
              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-[#9a9a9a] font-mono max-w-[560px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" aria-hidden="true" />
                <span>Estratégia personalizada</span>
                <span className="text-white/20">•</span>
                <span>Otimização contínua</span>
                <span className="text-white/20">•</span>
                <span>Atendimento direto</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 2 — 01 // ONDE O INVESTIMENTO SE PERDE
            (Alinhada com a referência visual aprovada media_1791650066210_d7faabfa.png)
            ======================================================== */}
        <section
          id="problema"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707] overflow-hidden"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Lado Esquerdo: Mensagem Editorial e Destaque */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                    01 — ONDE O INVESTIMENTO SE PERDE
                  </span>
                </div>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-6 text-balance"
                  style={{ fontSize: 'clamp(1.85rem, 3.6vw, 3rem)', lineHeight: 1.15 }}
                >
                  O problema não é anunciar.
                  <br />
                  É pagar por atenção que{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F4E0A1] to-[#D4AF37]">
                    não vira oportunidade.
                  </span>
                </h2>
                <div className="space-y-4 text-[#a3a3a3] text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  <p className="m-0">
                    Muitas empresas investem em Google Ads, recebem cliques e ainda assim terminam o mês sem saber quais campanhas realmente trouxeram contatos comerciais.
                  </p>
                  <p className="m-0">
                    Quando intenção de busca, anúncio, página e mensuração não trabalham juntos, o orçamento se dispersa.
                  </p>
                </div>
                <div className="border-l-2 border-[#D4AF37] pl-4 py-1.5 text-xs sm:text-sm font-medium text-[#F4E0A1]">
                  Tráfego qualificado precisa terminar em uma ação comercial.
                </div>
              </div>

              {/* Lado Direito: Três Pontos com Números Grandes e Divisores */}
              <div className="lg:col-span-7 divide-y divide-white/[0.08]">
                {/* Ponto 01 */}
                <div className="py-6 first:pt-0 flex items-start gap-5 sm:gap-6">
                  <div className="flex items-baseline gap-3 shrink-0">
                    <span className="font-mono text-3xl sm:text-4xl font-light text-[#D4AF37] tracking-tight">
                      01
                    </span>
                    <span className="text-white/20 text-2xl font-extralight select-none" aria-hidden="true">
                      |
                    </span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-display text-white font-semibold text-base sm:text-lg mb-1.5">
                      Clique sem intenção
                    </h3>
                    <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                      Campanhas atraem pesquisas informativas ou usuários que ainda não estão prontos para contratar.
                    </p>
                  </div>
                </div>

                {/* Ponto 02 */}
                <div className="py-6 flex items-start gap-5 sm:gap-6">
                  <div className="flex items-baseline gap-3 shrink-0">
                    <span className="font-mono text-3xl sm:text-4xl font-light text-[#D4AF37] tracking-tight">
                      02
                    </span>
                    <span className="text-white/20 text-2xl font-extralight select-none" aria-hidden="true">
                      |
                    </span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-display text-white font-semibold text-base sm:text-lg mb-1.5">
                      Página que não converte
                    </h3>
                    <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                      O anúncio gera acesso, mas a experiência depois do clique não conduz o visitante até o contato.
                    </p>
                  </div>
                </div>

                {/* Ponto 03 */}
                <div className="py-6 last:pb-0 flex items-start gap-5 sm:gap-6">
                  <div className="flex items-baseline gap-3 shrink-0">
                    <span className="font-mono text-3xl sm:text-4xl font-light text-[#D4AF37] tracking-tight">
                      03
                    </span>
                    <span className="text-white/20 text-2xl font-extralight select-none" aria-hidden="true">
                      |
                    </span>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-display text-white font-semibold text-base sm:text-lg mb-1.5">
                      Decisão sem mensuração
                    </h3>
                    <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                      Sem acompanhar quais campanhas, termos e anúncios geram oportunidades reais, otimizar vira tentativa e erro.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fluxo Visual da Base (Busca → Anúncio → Página → Contato) */}
            <div className="mt-12 sm:mt-16 rounded-2xl border border-white/[0.08] bg-[#090909]/80 backdrop-blur-md p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                {/* 1. Busca */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.08] flex items-center justify-center shrink-0">
                    <IconSearch size={18} className="text-[#F4E0A1]" />
                  </div>
                  <div>
                    <div className="font-display font-medium text-white text-sm sm:text-base">
                      Busca
                    </div>
                    <div className="text-xs text-[#8f8f8f]">
                      Pessoa pesquisa no Google
                    </div>
                  </div>
                </div>

                {/* 2. Anúncio */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-white/[0.12] bg-white/[0.04] flex items-center justify-center shrink-0">
                    <IconLayoutGrid size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="font-display font-medium text-white text-sm sm:text-base">
                      Anúncio
                    </div>
                    <div className="text-xs text-[#8f8f8f]">
                      Seu negócio aparece para quem tem interesse
                    </div>
                  </div>
                </div>

                {/* 3. Página */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-white/[0.12] bg-white/[0.04] flex items-center justify-center shrink-0">
                    <IconBrowser size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="font-display font-medium text-white text-sm sm:text-base">
                      Página
                    </div>
                    <div className="text-xs text-[#8f8f8f]">
                      Experiência que responde o que o cliente procura
                    </div>
                  </div>
                </div>

                {/* 4. Contato */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.08] flex items-center justify-center shrink-0">
                    <IconMessageCircle size={18} className="text-[#F4E0A1]" />
                  </div>
                  <div>
                    <div className="font-display font-medium text-white text-sm sm:text-base">
                      Contato
                    </div>
                    <div className="text-xs text-[#8f8f8f]">
                      Ação comercial na sua empresa
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 3 — 02 // NOSSO PROCESSO (4 ETAPAS EDITORIAIS GRANDES)
            ======================================================== */}
        <section
          id="metodo"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1360px] mx-auto">
            {/* Cabeçalho da Seção */}
            <div className="max-w-[820px] mb-14 pb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                  02 — NOSSO PROCESSO
                </span>
              </div>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4 text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Uma operação de Google Ads começa antes do primeiro clique.
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed m-0 font-normal">
                Cada etapa precisa trabalhar em conjunto para transformar intenção de busca em uma oportunidade comercial mensurável.
              </p>
            </div>

            {/* Quatro Etapas Editoriais Assimétricas e Numeradas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {/* ETAPA 01 */}
              <div className="relative p-6 sm:p-7 rounded-xl border border-white/[0.08] bg-[#080808] flex flex-col justify-between transition-all duration-200 hover:border-white/[0.18]">
                <div>
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D4AF37]">
                      ETAPA 01
                    </span>
                    <span className="font-mono text-3xl font-light text-white/30">
                      01
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-xl mb-3">
                    Estratégia
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Entendemos o negócio, os serviços, a região de atuação e o perfil de cliente que realmente faz sentido alcançar.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#a3a3a3]">
                  Alinhamento comercial
                </div>
              </div>

              {/* ETAPA 02 */}
              <div className="relative p-6 sm:p-7 rounded-xl border border-white/[0.08] bg-[#080808] flex flex-col justify-between transition-all duration-200 hover:border-white/[0.18]">
                <div>
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D4AF37]">
                      ETAPA 02
                    </span>
                    <span className="font-mono text-3xl font-light text-white/30">
                      02
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-xl mb-3">
                    Pesquisa
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Mapeamos buscas com intenção comercial e estruturamos campanhas para reduzir tráfego irrelevante.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#a3a3a3]">
                  Filtro de intenção
                </div>
              </div>

              {/* ETAPA 03 */}
              <div className="relative p-6 sm:p-7 rounded-xl border border-white/[0.08] bg-[#080808] flex flex-col justify-between transition-all duration-200 hover:border-white/[0.18]">
                <div>
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D4AF37]">
                      ETAPA 03
                    </span>
                    <span className="font-mono text-3xl font-light text-white/30">
                      03
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-xl mb-3">
                    Experiência
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Anúncio e página precisam entregar continuidade para quem acabou de pesquisar pelo serviço.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#a3a3a3]">
                  Continuidade do clique
                </div>
              </div>

              {/* ETAPA 04 */}
              <div className="relative p-6 sm:p-7 rounded-xl border border-[#D4AF37]/35 bg-[#090909] flex flex-col justify-between shadow-[0_4px_24px_rgba(212,175,55,0.06)]">
                <div>
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#F4E0A1]">
                      ETAPA 04
                    </span>
                    <span className="font-mono text-3xl font-light text-[#D4AF37]">
                      04
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-xl mb-3">
                    Otimização
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Analisamos termos, anúncios e conversões para direcionar investimento ao que demonstra maior potencial.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#F4E0A1]">
                  Ajuste por retorno real
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 4 — 03 // GESTÃO CONTÍNUA (6 PILARES ESTRATÉGICOS)
            ======================================================== */}
        <section
          id="servicos"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="max-w-[820px] mb-14 pb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                  03 — GESTÃO CONTÍNUA
                </span>
              </div>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4 text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Campanha publicada não significa trabalho concluído.
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed m-0 font-normal">
                Google Ads exige acompanhamento. A gestão da Orvion combina análise, ajustes e decisões baseadas no comportamento real das campanhas.
              </p>
            </div>

            {/* Painel Asimétrico com 6 Pilares da Gestão */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#090909] p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                {/* Pilar 1 */}
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base sm:text-lg">
                      Planejamento estratégico
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Estrutura baseada no negócio, demanda e intenção de busca.
                  </p>
                </div>

                {/* Pilar 2 */}
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base sm:text-lg">
                      Palavras-chave
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Seleção e refinamento contínuo das pesquisas relevantes.
                  </p>
                </div>

                {/* Pilar 3 */}
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base sm:text-lg">
                      Termos de pesquisa
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Identificação de buscas reais e exclusão do que desperdiça orçamento.
                  </p>
                </div>

                {/* Pilar 4 */}
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base sm:text-lg">
                      Anúncios
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Mensagens alinhadas à intenção do potencial cliente.
                  </p>
                </div>

                {/* Pilar 5 */}
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base sm:text-lg">
                      Mensuração
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Configuração e acompanhamento das ações comerciais importantes.
                  </p>
                </div>

                {/* Pilar 6 */}
                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <h3 className="font-display text-white font-medium text-base sm:text-lg">
                      Otimização
                    </h3>
                  </div>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0 font-normal">
                    Ajustes de campanha guiados por dados, não por impressão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 5 — 04 // DA BUSCA AO CONTATO (FLUXO LINEAR + DESTAQUE)
            ======================================================== */}
        <section
          id="fluxo"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505] overflow-hidden"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="max-w-[820px] mb-12 sm:mb-16">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                  04 — DA BUSCA AO CONTATO
                </span>
              </div>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4 text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                O anúncio é apenas o começo da experiência.
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed m-0 font-normal">
                Depois do clique, cada detalhe influencia a decisão do potencial cliente. Por isso, analisamos não apenas a campanha, mas também o caminho até a conversão.
              </p>
            </div>

            {/* Painel do Fluxo Completo: Pesquisa → Anúncio → Landing Page → WhatsApp → Oportunidade */}
            <div className="rounded-2xl border border-white/[0.1] bg-[#080808] p-6 sm:p-10 lg:p-12 mb-10">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-2">
                {/* 1. Pesquisa */}
                <div className="flex-1 p-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a] text-center lg:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#737373] block mb-1">
                    Passo 01
                  </span>
                  <div className="font-display font-medium text-white text-base mb-1">
                    Pesquisa
                  </div>
                  <div className="text-xs text-[#8f8f8f]">
                    Intenção real do usuário
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center px-1 text-[#D4AF37]/50" aria-hidden="true">
                  <IconArrowRight size={18} />
                </div>

                {/* 2. Anúncio */}
                <div className="flex-1 p-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a] text-center lg:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#737373] block mb-1">
                    Passo 02
                  </span>
                  <div className="font-display font-medium text-white text-base mb-1">
                    Anúncio
                  </div>
                  <div className="text-xs text-[#8f8f8f]">
                    Mensagem que filtra e atrai
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center px-1 text-[#D4AF37]/50" aria-hidden="true">
                  <IconArrowRight size={18} />
                </div>

                {/* 3. Landing Page */}
                <div className="flex-1 p-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a] text-center lg:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#737373] block mb-1">
                    Passo 03
                  </span>
                  <div className="font-display font-medium text-white text-base mb-1">
                    Landing Page
                  </div>
                  <div className="text-xs text-[#8f8f8f]">
                    Ambiente claro de conversão
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center px-1 text-[#D4AF37]/50" aria-hidden="true">
                  <IconArrowRight size={18} />
                </div>

                {/* 4. WhatsApp / contato */}
                <div className="flex-1 p-4 rounded-xl border border-white/[0.06] bg-[#0a0a0a] text-center lg:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#737373] block mb-1">
                    Passo 04
                  </span>
                  <div className="font-display font-medium text-white text-base mb-1">
                    WhatsApp / contato
                  </div>
                  <div className="text-xs text-[#8f8f8f]">
                    Abertura da conversa direta
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center px-1 text-[#D4AF37]" aria-hidden="true">
                  <IconArrowRight size={18} />
                </div>

                {/* 5. Oportunidade comercial */}
                <div className="flex-1 p-4 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/[0.08] text-center lg:text-left">
                  <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#F4E0A1] block mb-1">
                    Resultado
                  </span>
                  <div className="font-display font-medium text-[#F4E0A1] text-base mb-1">
                    Oportunidade
                  </div>
                  <div className="text-xs text-[#c2c2c2]">
                    Negociação com cliente real
                  </div>
                </div>
              </div>
            </div>

            {/* Destaque Central */}
            <div className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#080808] flex items-center justify-between flex-col md:flex-row gap-6">
              <div className="space-y-1 text-center md:text-left">
                <p className="font-display text-white text-base sm:text-lg m-0 font-medium">
                  O objetivo não é simplesmente aumentar acessos.
                </p>
                <p className="text-sm text-[#F4E0A1] m-0 font-mono">
                  É criar um caminho mais eficiente entre intenção e contato.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <a
                  href="#metodo"
                  onClick={scrollToAnchor('metodo')}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.04] px-5 py-2.5 text-xs sm:text-sm text-white hover:border-[#D4AF37] transition-all no-underline cursor-pointer"
                >
                  <span>Conhecer o método</span>
                  <IconArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 6 — 05 // ECOSSISTEMA ORVION (MOSAICO EDITORIAL)
            ======================================================== */}
        <section
          id="ecossistema"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="max-w-[820px] mb-14 pb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                  05 — ECOSSISTEMA ORVION
                </span>
              </div>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4 text-balance"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Quando a campanha precisa de mais estrutura, nós também construímos.
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed m-0 font-normal">
                Estruturas digitais completas desenvolvidas com o mesmo padrão de excelência para potencializar a taxa de resposta da sua empresa.
              </p>
            </div>

            {/* Mosaico Editorial Assimétrico com 5 Soluções */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Item 1: Landing Pages (Destaque Ampliado) */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-xl border border-white/[0.1] bg-[#0a0a0a] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#D4AF37]">
                      Conversão Direta
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-xl sm:text-2xl mb-3">
                    Landing Pages
                  </h3>
                  <p className="text-[#8f8f8f] text-sm sm:text-base leading-relaxed max-w-[620px] m-0">
                    Páginas desenvolvidas para campanhas e objetivos específicos, com carregamento rápido e narrativa pensada para transformar o clique em mensagem no WhatsApp.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#a3a3a3]">
                  Alinhadas à palavra-chave anunciada
                </div>
              </div>

              {/* Item 2: Websites Premium */}
              <div className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#080808] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#a3a3a3]">
                      Autoridade Digital
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-lg sm:text-xl mb-3">
                    Websites Premium
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Experiências digitais que fortalecem posicionamento e confiança para empresas que vendem serviços de alto valor.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#737373]">
                  Presença institucional sólida
                </div>
              </div>

              {/* Item 3: Automações */}
              <div className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#080808] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#a3a3a3]">
                      Eficiência Operacional
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-lg sm:text-xl mb-3">
                    Automações
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Processos que reduzem trabalho manual e aceleram o tempo de resposta entre a chegada do contato e o atendimento.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#737373]">
                  Agilidade comercial
                </div>
              </div>

              {/* Item 4: Inteligência Artificial */}
              <div className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#080808] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#a3a3a3]">
                      Inovação Prática
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-lg sm:text-xl mb-3">
                    Inteligência Artificial
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Aplicações práticas de IA integradas à operação da empresa para qualificação inicial e suporte à tomada de decisão.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#737373]">
                  Tecnologia aplicada ao negócio
                </div>
              </div>

              {/* Item 5: SEO e Estratégia Digital */}
              <div className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#080808] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#a3a3a3]">
                      Longo Prazo
                    </span>
                  </div>
                  <h3 className="font-display text-white font-medium text-lg sm:text-xl mb-3">
                    SEO e Estratégia Digital
                  </h3>
                  <p className="text-[#8f8f8f] text-xs sm:text-sm leading-relaxed m-0">
                    Estrutura para fortalecer aquisição além da mídia paga, garantindo relevância orgânica e sustentabilidade do tráfego.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs font-mono text-[#737373]">
                  Visibilidade perene
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 7 — POSICIONAMENTO INSTITUCIONAL ORVION
            ======================================================== */}
        <section
          id="posicionamento"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1040px] mx-auto">
            <div className="p-8 sm:p-12 lg:p-16 rounded-2xl border border-white/[0.1] bg-[#080808] relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                    POSICIONAMENTO
                  </span>
                </div>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-6 text-balance"
                  style={{ fontSize: 'clamp(1.85rem, 3.8vw, 3rem)', lineHeight: 1.15 }}
                >
                  Não somos apenas operadores de campanha.
                </h2>
                <div className="space-y-5 text-[#c2c2c2] text-sm sm:text-base md:text-lg leading-relaxed max-w-[820px] font-normal mb-8">
                  <p className="m-0">
                    A Orvion Studio trabalha na interseção entre aquisição, tecnologia e experiência digital.
                  </p>
                  <p className="m-0">
                    Planejamos campanhas, construímos estruturas digitais e analisamos dados com um único objetivo: criar operações de aquisição mais profissionais e mensuráveis.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/[0.08]">
                  <p className="text-xs sm:text-sm text-[#8f8f8f] font-mono m-0 max-w-[720px] leading-relaxed">
                    Cada projeto parte da realidade da empresa. Sem fórmulas prontas, métricas de vaidade ou promessas impossíveis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 8 — CTA INTERMEDIÁRIO (BLOCO CINEMATOGRÁFICO DE ALTO CONTRASTE)
            ======================================================== */}
        <section
          id="diagnostico"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[1040px] mx-auto">
            <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#0a0a0a] p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_12px_48px_rgba(0,0,0,0.8)]">
              <div className="max-w-[620px]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                    FALE COM A ORVION
                  </span>
                </div>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-4 text-balance"
                  style={{ fontSize: 'clamp(1.65rem, 3.2vw, 2.5rem)', lineHeight: 1.18 }}
                >
                  Quer entender se o Google Ads faz sentido para sua empresa?
                </h2>
                <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed m-0 font-normal">
                  Conte brevemente sobre seu negócio. Vamos entender seu cenário antes de falar sobre campanha.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <a
                  href={WHATSAPP_DIAGNOSTICO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppConversion}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 min-h-[50px] font-semibold text-[#050505] text-sm sm:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none whitespace-nowrap"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                  }}
                >
                  <IconPhone size={16} aria-hidden="true" className="shrink-0" />
                  <span>Solicitar diagnóstico</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 9 — PERGUNTAS FREQUENTES (ACORDEÃO LIMPO E OBJETIVO)
            ======================================================== */}
        <section
          id="faq"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[920px] mx-auto">
            <div className="mb-14 pb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                  ESCLARECIMENTOS
                </span>
              </div>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Perguntas Frequentes
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed m-0">
                Respostas diretas sobre orçamento, prazos e rotina da operação.
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
                  O investimento depende da estrutura e necessidade de cada operação. Primeiro entendemos o negócio e o objetivo antes de apresentar uma proposta.
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
                    Quanto preciso investir no Google Ads?
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
                  Não existe um orçamento único para todas as empresas. O valor depende do segmento, região, concorrência e objetivo da campanha.
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
                    A Orvion garante número de clientes ou vendas?
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
                  Não. Nenhuma operação séria pode garantir resultados comerciais específicos. Trabalhamos para melhorar estratégia, estrutura, mensuração e eficiência da aquisição.
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
                    Vocês criam a página da campanha?
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
                  Sim. Quando necessário, podemos desenvolver ou otimizar a estrutura utilizada para receber o tráfego.
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
                    Como acompanho os resultados?
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
                  A operação é acompanhada por métricas relevantes para cada campanha, com foco em ações comerciais e não apenas em cliques ou impressões.
                </div>
              </div>

              {/* FAQ 6 */}
              <div className="py-6">
                <button
                  type="button"
                  onClick={() => toggleFaq(5)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0 group focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded"
                  aria-expanded={openFaq === 5}
                >
                  <h3 className="font-display text-white font-medium text-base sm:text-lg group-hover:text-[#F4E0A1] transition-colors">
                    Posso falar diretamente pelo WhatsApp?
                  </h3>
                  <IconChevronDown
                    size={18}
                    className={`text-[#D4AF37] transition-transform duration-200 shrink-0 ${
                      openFaq === 5 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`pt-3 text-[#a3a3a3] text-xs sm:text-sm leading-relaxed ${
                    openFaq === 5 ? 'block' : 'hidden md:block md:text-[#888]'
                  }`}
                >
                  Sim. O primeiro contato pode ser feito diretamente pelo WhatsApp da Orvion.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 10 — CTA FINAL COM FORMULÁRIO REAL E FUNCIONAL
            ======================================================== */}
        <section
          id="proposta"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[1180px] mx-auto">
            <div className="rounded-2xl border border-white/[0.1] bg-[#090909] p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.85)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Lado Esquerdo: Mensagem e Ação Imediata */}
                <div className="lg:col-span-6 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                    <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                    <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                      PRÓXIMO PASSO
                    </span>
                  </div>
                  <h2
                    className="font-display font-medium text-white tracking-[-0.02em] mb-4 text-balance"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.15 }}
                  >
                    Sua próxima oportunidade pode começar em uma pesquisa no Google.
                  </h2>
                  <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed mb-8">
                    Vamos estruturar uma operação de aquisição alinhada ao seu negócio e aos seus objetivos.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                    <a
                      href={WHATSAPP_HERO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppConversion}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 min-h-[52px] font-semibold text-[#050505] text-sm sm:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                      }}
                    >
                      <IconPhone size={16} aria-hidden="true" className="shrink-0" />
                      <span>Quero falar com a Orvion</span>
                    </a>

                    <a
                      href={WHATSAPP_DIAGNOSTICO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppConversion}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.04] px-6 py-4 min-h-[52px] text-xs sm:text-sm font-medium text-white hover:border-[#D4AF37] transition-all no-underline cursor-pointer"
                    >
                      <span>Solicitar diagnóstico</span>
                    </a>
                  </div>
                </div>

                {/* Lado Direito: Formulário Funcional que Direciona para o WhatsApp */}
                <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-8 lg:pt-0 lg:pl-10">
                  <div className="mb-6">
                    <h3 className="font-display text-white font-medium text-lg mb-1">
                      Envie os dados do seu negócio
                    </h3>
                    <p className="text-[#737373] text-xs leading-relaxed m-0">
                      Formatamos sua solicitação e direcionamos imediatamente para o WhatsApp da Orvion.
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
                        Nome <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        id={`${formId}-name`}
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Carlos Silva"
                        required
                        className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-all duration-200 ${
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
                        Empresa <span className="text-[#666]">(opcional)</span>
                      </label>
                      <input
                        type="text"
                        id={`${formId}-company`}
                        name="company"
                        value={form.company}
                        onChange={handleInputChange}
                        placeholder="Ex: Minha Empresa / Escritório"
                        className="w-full bg-[#050505] border border-white/[0.12] rounded-lg px-4 py-3 text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-all duration-200"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label
                        htmlFor={`${formId}-phone`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-1.5 font-mono font-medium"
                      >
                        WhatsApp <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="tel"
                        id={`${formId}-phone`}
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: (11) 99999-9999"
                        required
                        className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-all duration-200 ${
                          formErrors.phone ? 'border-red-500/80' : 'border-white/[0.12]'
                        }`}
                      />
                      {formErrors.phone && (
                        <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Serviço de interesse */}
                    <div>
                      <label
                        htmlFor={`${formId}-service`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-1.5 font-mono font-medium"
                      >
                        Serviço de interesse
                      </label>
                      <select
                        id={`${formId}-service`}
                        name="service"
                        value={form.service}
                        onChange={handleInputChange}
                        className="w-full bg-[#050505] border border-white/[0.12] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-all duration-200"
                      >
                        <option value="Gestão de Google Ads" className="bg-[#050505] text-white">
                          Gestão de Google Ads
                        </option>
                        <option value="Landing Page de Alta Conversão" className="bg-[#050505] text-white">
                          Landing Page de Alta Conversão
                        </option>
                        <option value="Website Institucional Premium" className="bg-[#050505] text-white">
                          Website Institucional Premium
                        </option>
                        <option value="Automações / Inteligência Artificial" className="bg-[#050505] text-white">
                          Automações / Inteligência Artificial
                        </option>
                        <option value="Diagnóstico Completo" className="bg-[#050505] text-white">
                          Diagnóstico Completo
                        </option>
                      </select>
                    </div>

                    {/* Mensagem */}
                    <div>
                      <label
                        htmlFor={`${formId}-message`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-1.5 font-mono font-medium"
                      >
                        Mensagem <span className="text-[#666]">(opcional)</span>
                      </label>
                      <textarea
                        id={`${formId}-message`}
                        name="message"
                        rows={2}
                        value={form.message}
                        onChange={handleInputChange}
                        placeholder="Conte brevemente sobre o seu objetivo"
                        className="w-full bg-[#050505] border border-white/[0.12] rounded-lg px-4 py-2.5 text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Botão de Envio Funcional */}
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
          SEÇÃO 11 — RODAPÉ EDITORIAL
          ======================================================== */}
      <footer className="relative bg-[#030303] px-4 sm:px-[5%] lg:px-[8%] py-12 border-t border-white/[0.08] overflow-hidden">
        <div className="relative z-10 max-w-[1360px] mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-white/[0.08]">
            <div className="max-w-[420px]">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-display text-base font-bold tracking-[0.22em] text-white">
                  ORVION
                </span>
                <span className="text-[9px] tracking-[0.35em] text-[#D4AF37] uppercase font-semibold">
                  Studio
                </span>
              </div>
              <p className="text-[#737373] text-xs leading-relaxed m-0 font-normal">
                Gestão estratégica de Google Ads e estruturas digitais de alta conversão para empresas que buscam gerar contatos comerciais qualificados.
              </p>
            </div>

            {/* Lista de Serviços */}
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/50 font-mono font-medium mb-3">
                Serviços
              </div>
              <ul className="list-none p-0 m-0 space-y-1.5 text-xs text-[#a3a3a3]">
                <li>Google Ads</li>
                <li>Websites</li>
                <li>Automações</li>
                <li>IA</li>
                <li>SEO</li>
              </ul>
            </div>

            {/* Contato Oficial */}
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/50 font-mono font-medium mb-3">
                Contato
              </div>
              <div className="space-y-1.5 text-xs font-mono text-[#8a8a8a]">
                <div className="inline-flex items-center gap-2">
                  <IconPhone size={13} className="text-[#D4AF37]" />
                  <span>+55 11 97999-1680</span>
                </div>
                <div>contato@orvionstudio.com.br</div>
              </div>
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
          href={WHATSAPP_HERO_URL}
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

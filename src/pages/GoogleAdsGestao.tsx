import { useState, useEffect, useRef } from 'react';
import { ResultsBand, JourneyLine, useLandingPolish } from './GoogleAdsPolish';
import './GoogleAdsGestao.css';
import {
  WHATSAPP_BASE_URL,
  getCampaignParams,
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

// ============================================================================
// CONSTANTES DE CONVERSÃO WHATSAPP OFICIAIS
// ============================================================================
const WHATSAPP_HERO_MESSAGE =
  'Olá! Vim pelo site da Orvion e quero entender como funciona a gestão de Google Ads para minha empresa.';

const WHATSAPP_DIAGNOSTICO_MESSAGE =
  'Olá! Vim pelo site da Orvion e quero solicitar um diagnóstico de Google Ads para minha empresa.';

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
  utm_content: string;
  gclid: string;
}

export default function GoogleAdsGestao() {
  const formId = 'orvion-proposal';
  const quickContact = useLandingPolish();
  const formElement = useRef<HTMLFormElement>(null);
  const preparedTracked = useRef(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('orvion-menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [menuOpen]);

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
    setOgMeta('og:image', 'https://orvionstudio.com.br/orvion-google-ads-og.png');

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
    utm_content: '',
    gclid: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUtmData(getCampaignParams());
    }
  }, []);

  // Estado do Formulário
  const campaignUrl = (message: string) => {
    const lines = [message];
    if (utmData.utm_source) lines.push(`Origem: ${utmData.utm_source}`);
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const) {
      if (utmData[key]) lines.push(`${key === 'gclid' ? 'GCLID' : key}: ${utmData[key]}`);
    }
    return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
  };
  const heroUrl = campaignUrl(WHATSAPP_HERO_MESSAGE);
  const diagnosticUrl = campaignUrl(WHATSAPP_DIAGNOSTICO_MESSAGE);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    phone: '',
    service: 'Gestão de Google Ads',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [preparedUrl, setPreparedUrl] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormState> & { consent?: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setPreparedUrl('');
    preparedTracked.current = false;
    if (formErrors[name as keyof FormState]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const errors: Partial<FormState> & { consent?: string } = {};
    if (!form.name.trim()) {
      errors.name = 'Por favor, informe seu nome.';
    }
    if (!form.phone.trim()) {
      errors.phone = 'Por favor, informe seu WhatsApp para contato.';
    } else if (!/^[+\d\s().-]+$/.test(form.phone) || !/^\d{10,15}$/.test(form.phone.replace(/\D/g, ''))) {
      errors.phone = 'Informe um telefone válido com DDD.';
    }
    if (!consent) errors.consent = 'Autorize o contato para continuar.';
    setFormErrors(errors);
    if (Object.keys(errors).length) requestAnimationFrame(() => formElement.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
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

    if (!preparedTracked.current) {
      trackWhatsAppConversion();
      preparedTracked.current = true;
    }

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
      lines.push(`utm_source: ${utmData.utm_source}`);
    }
    for (const key of ['utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const) {
      if (utmData[key]) lines.push(`${key}: ${utmData[key]}`);
    }
    if (utmData.gclid) {
      lines.push(`GCLID: ${utmData.gclid}`);
    }

    lines.push('Consentimento: autorizo o contato sobre esta solicitação conforme a Política de Privacidade.');
    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(lines.join('\n'))}`;
    setPreparedUrl(whatsappUrl);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToAnchor = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (typeof document !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        el.focus({ preventScroll: true });
      }
    }
  };

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  };

  const sectionCta = () => <a href={heroUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppConversion} className="orvion-text-link">Quero anunciar no Google <IconArrowRight /></a>;

  return (
    <div
      className="orvion-landing relative min-h-screen font-body antialiased"
      suppressHydrationWarning
    >
      <a className="orvion-skip" href="#conteudo" onClick={scrollToAnchor('conteudo')}>Pular para o conteúdo</a>
      {/* ========================================================
          CABEÇALHO EDITORIAL COMPACTO
          ======================================================== */}
      <header className="sticky top-0 inset-x-0 z-40 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-[5%] lg:px-[8%] bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08]">
        <a
          href="/"
          onClick={navigateToHome}
          className="flex items-baseline gap-2 cursor-pointer no-underline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded-md py-1"
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
          <button id="orvion-menu-toggle" className="orvion-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="orvion-mobile-menu" aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar' : 'Menu'}</button>
          <a
            href={diagnosticUrl}
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
      {menuOpen && <nav id="orvion-mobile-menu" className="orvion-menu" aria-label="Navegação no celular">
        {[
          ['problema', 'Diagnóstico'], ['metodo', 'Processo'], ['servicos', 'Gestão'],
          ['fluxo', 'Fluxo'], ['ecossistema', 'Ecossistema'], ['faq', 'Dúvidas'], ['proposta', 'Contato'],
        ].map(([id, label]) => <a key={id} href={`#${id}`} onClick={scrollToAnchor(id)}>{label}</a>)}
      </nav>}

      {/* Espaçamento inferior no mobile para a barra fixa de conversão */}
      <main id="conteudo" tabIndex={-1} className="pb-24 sm:pb-0">
        {/* ========================================================
            SEÇÃO 1 — HERO EDITORIAL EM GRAFITE E CHAMPAGNE
            (FOTOGRAFIA ORIGINAL, GRADIENTE LOCALIZADO E HIERARQUIA EDITORIAL)
            ======================================================== */}
        <section
          id="topo"
          className="relative min-h-[90vh] md:min-h-[calc(100vh-5rem)] flex items-center -mt-16 sm:-mt-20 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] overflow-hidden"
        >
          <div className="orvion-hero-background" aria-hidden="true">
            <picture>
              <source
                srcSet="/images/orvion-champagne-metal-mobile.webp 800w, /images/orvion-champagne-metal.webp 1672w"
                sizes="100vw"
                type="image/webp"
              />
              <img
                src="/images/orvion-champagne-metal.webp"
                srcSet="/images/orvion-champagne-metal-mobile.webp 800w, /images/orvion-champagne-metal.webp 1672w"
                sizes="100vw"
                alt=""
                width="1672"
                height="940"
                fetchPriority="high"
                loading="eager"
                decoding="async"
              />
            </picture>
            <div className="orvion-hero-shade" />
          </div>

          <div className="relative z-10 max-w-[1360px] mx-auto w-full">
            <div className="max-w-[780px]">
              {/* Eyebrow de posicionamento */}
              <div className="orvion-hero-eyebrow inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#F4E0A1] font-mono font-medium">
                  Google Ads • Aquisição • Performance
                </span>
              </div>

              {/* H1 único da landing */}
              <h1
                className="font-display font-semibold text-white tracking-[-0.03em] mb-6 text-balance break-words"

              >
                Google Ads para<br className="orvion-desktop-break" /> empresas que querem<br className="orvion-desktop-break" />{' '}<span>mais oportunidades<br className="orvion-desktop-break" /> de venda.</span>
              </h1>

              {/* Subheadline curta e comercial */}
              <p className="text-[#c2c2c2] text-base md:text-lg leading-relaxed max-w-[560px] mb-8 sm:mb-10 font-normal">
                Estratégia, gestão e otimização de campanhas para colocar sua empresa diante de quem já está procurando o que você oferece.
              </p>

              {/* CTAs Primário e Secundário */}
              <div className="orvion-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center">
                <a
                  href={heroUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppConversion}
                  className="orvion-primary-action w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] sm:min-h-[54px] font-semibold text-[#050505] text-sm md:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_28px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_36px_rgba(212,175,55,0.55)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none whitespace-nowrap"
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
              <ul className="orvion-hero-proof"><li>Diagnóstico inicial sem custo</li><li>Atendimento direto no WhatsApp</li><li>Gestão focada em contatos qualificados</li></ul>
            </div>
          </div>
        </section>

        <ResultsBand />

        <section id="problema" className="orvion-problem">
          <div className="orvion-problem-copy">
            <p className="orvion-eyebrow">01 / Onde o investimento se perde</p>
            <h2>O investimento<br />se perde quando...</h2>
            <p className="orvion-intro">Você paga pelo acesso. Mas é o caminho entre a busca e o contato que decide se esse investimento faz sentido.</p>
            <ol className="orvion-problem-list">
              {[
                ['Clique sem intenção', 'Seu anúncio aparece para quem busca uma informação, um emprego ou algo que sua empresa não oferece. A verba sai; o cliente certo não chega.'],
                ['Página que não converte', 'A pessoa clica, mas encontra uma oferta confusa, uma página lenta ou dificuldade para entrar em contato. A oportunidade se perde depois do anúncio.'],
                ['Decisão sem mensuração', 'Sem saber quais buscas geram contatos, você aumenta ou corta investimento no escuro. Clique sozinho não mostra a qualidade da aquisição.'],
              ].map(([title, description], index) => (
                <li key={title} data-reveal>
                  <span className="orvion-number" aria-hidden="true">0{index + 1}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="orvion-recognition" data-reveal><h3>Você já sentiu isso?</h3><ul><li>Paga por cliques e quase ninguém chama.</li><li>O CPC sobe e o retorno não acompanha.</li><li>Não sabe quais palavras trazem cliente.</li><li>Não tem certeza se o tracking está certo.</li></ul></div>
          <div className="orvion-section-close"><p>Tráfego qualificado precisa terminar em uma ação comercial.</p>{sectionCta()}</div>
        </section>

        <section id="metodo" className="orvion-process orvion-section">
          <div className="orvion-section-heading">
            <p className="orvion-eyebrow">02 / Nosso processo</p>
            <div><h2>Antes do primeiro clique,<br />uma direção clara.</h2><p className="orvion-intro">Cada etapa responde a uma pergunta do negócio. Assim, a campanha começa com critérios para investir, medir e ajustar.</p></div>
          </div>
          <div className="orvion-process-layout">
            <p className="orvion-process-note">Estratégia de aquisição.<br /><span>Infraestrutura técnica e direção comercial.</span></p>
            <ol className="orvion-steps">
              {[
                ['Estratégia', 'Entendemos sua oferta, sua região e o cliente que faz sentido atender.', 'Um objetivo comercial definido.'],
                ['Pesquisa', 'Mapeamos buscas com intenção de contratação e o que deve ficar de fora.', 'Campanhas com um foco claro.'],
                ['Experiência', 'Alinhamos anúncio, página e contato para dar continuidade à intenção de busca.', 'Menos obstáculos até a conversa.'],
                ['Otimização', 'Revisamos termos, anúncios e ações de contato para orientar os próximos ajustes.', 'Decisões apoiadas em dados.'],
              ].map(([title, description, outcome], index) => (
                <li key={title} data-reveal><span className="orvion-step-label" aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{description}</p><p className="orvion-step-outcome">{outcome}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="servicos" className="orvion-management">
          <div className="orvion-management-copy">
            <p className="orvion-eyebrow">03 / Gestão de Google Ads</p>
            <h2>Publicar é o início.<br />Gerir é o que<br /><span>faz a diferença.</span></h2>
            <p className="orvion-intro">O trabalho continua depois da ativação. Acompanhamos o que consome verba, o que gera contato e onde a experiência precisa melhorar.</p>
          </div>
            <dl className="orvion-pillars">
              {[
                ['Planejamento estratégico', 'Organizamos campanhas por serviço, região e intenção para dar direção ao investimento.'],
                ['Palavras-chave', 'Priorizamos pesquisas próximas da contratação, alinhadas ao que sua empresa vende.'],
                ['Termos de pesquisa', 'Excluímos buscas que consomem verba sem demonstrar intenção comercial.'],
                ['Anúncios', 'Deixamos oferta, diferenciais e próximo passo claros para quem está pesquisando.'],
                ['Mensuração', 'Conectamos ações de contato às campanhas para avaliar além do volume de cliques.'],
                ['Otimização', 'Ajustamos a operação com base nos dados e no retorno sobre a qualidade dos contatos.'],
              ].map(([title, description]) => (
                <div key={title} data-reveal><dt>{title}</dt><dd>{description}</dd></div>
              ))}
            </dl>
          <p className="orvion-management-note">Precisão na análise.<br />Clareza nas decisões.</p>
          <div className="orvion-section-close"><p>Uma gestão que acompanha o caminho até o contato.</p>{sectionCta()}</div>
        </section>

        <section id="fluxo" className="orvion-flow">
          <div className="orvion-flow-heading"><p className="orvion-eyebrow">04 / Da busca ao contato</p><h2>Um clique.<br />Todo um caminho.</h2><p>O anúncio é apenas o começo da experiência.<br />Cada próximo passo precisa fazer sentido.</p></div>
          <div className="orvion-journey" data-reveal><JourneyLine /><ol className="orvion-flow-stages">
            {[
              ['Busca', 'Intenção real'],
              ['Anúncio', 'Mensagem relevante'],
              ['Página', 'Experiência que orienta'],
              ['Contato', 'Uma conversa começa'],
              ['Oportunidade comercial', 'Conexão com o negócio'],
            ].map(([title, description], index) => (
              <li key={title}><span className="orvion-journey-dot" aria-hidden="true" /><span className="orvion-flow-index">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>
            ))}
          </ol></div>
        </section>

        <section id="ecossistema" className="orvion-ecosystem orvion-section">
          <div className="orvion-section-heading"><p className="orvion-eyebrow">05 / Ecossistema Orvion</p><div><h2>A campanha abre a porta.<br />A estrutura sustenta<br />o próximo passo.</h2><p className="orvion-intro">Quando a aquisição precisa de mais estrutura, nós também construímos. Estratégia, experiência e tecnologia trabalhando em conjunto.</p></div></div>
          <div className="orvion-ecosystem-layout">
            <div className="orvion-ecosystem-focus" data-reveal><span className="orvion-eyebrow">O pilar de aquisição</span><h3>Google<br />Ads<span aria-hidden="true">↗</span></h3><p>Estratégia, gestão e otimização para alcançar quem já procura o que você oferece.</p>{sectionCta()}</div>
            <dl className="orvion-ecosystem-services">
              {[
                ['Websites Premium', 'Páginas alinhadas à campanha, com oferta clara e contato fácil.'],
                ['Automação', 'Fluxos para organizar contatos e reduzir etapas manuais do atendimento.'],
                ['IA Aplicada', 'Aplicações práticas de IA integradas às necessidades da operação.'],
                ['SEO', 'Estrutura para desenvolver a presença orgânica além da mídia paga.'],
                ['Estratégia Digital', 'Direção para conectar aquisição, experiência e objetivos comerciais.'],
              ].map(([title, description], index) => (
                <div key={title} data-reveal><dt><span aria-hidden="true">0{index + 1}</span>{title}</dt><dd>{description}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section id="posicionamento" className="orvion-studio">

          <div className="orvion-studio-copy"><p className="orvion-eyebrow">A Orvion Studio</p><h2>Visão de negócio.<br />Rigor na execução.</h2><ol className="orvion-differences">{[
            ['Método, página e mensuração integrados', 'Avaliamos a aquisição como um caminho completo: da intenção de busca à ação de contato.'],
            ['Atendimento direto', 'A conversa começa no WhatsApp oficial da Orvion, com espaço para entender o seu cenário.'],
            ['Foco em contato qualificado', 'O objetivo é aproximar pessoas com interesse no seu serviço. Volume de cliques não substitui relevância comercial.'],
          ].map(([title, description]) => <li key={title} data-reveal><h3>{title}</h3><p>{description}</p></li>)}</ol></div>
        </section>

        <section id="diagnostico" className="orvion-diagnostic orvion-section">
          <p className="orvion-eyebrow">Uma conversa antes de uma campanha</p>
          <div><h2>O próximo movimento<br />da sua empresa<br />começa aqui.</h2><div className="orvion-diagnostic-action"><p>Entenda onde sua aquisição pode melhorar e quais próximos passos fazem sentido para o seu negócio.</p><a href={heroUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppConversion} className="orvion-button orvion-button-dark orvion-primary-action">Quero anunciar no Google <IconArrowRight size={20} /></a><span>Diagnóstico sem custo e sem compromisso.</span></div></div>
        </section>

        <section id="faq" className="orvion-faq orvion-section">
          <div><p className="orvion-eyebrow">Sem dúvidas no caminho</p><h2>Vamos<br />esclarecer.</h2><p className="orvion-intro">Respostas diretas sobre investimento e rotina da operação.</p></div>
          <div className="orvion-faq-list">
            {[
              ['Quanto custa a gestão de Google Ads?', 'A proposta depende dos serviços, da região e da estrutura da sua operação. O diagnóstico inicial é sem custo: entendemos o cenário e apresentamos escopo e valor antes de qualquer contratação.'],
              ['Quanto preciso investir em anúncios?', 'A verba de anúncios é separada do valor da gestão. A recomendação considera demanda, concorrência, região e objetivo. Definimos com você um orçamento compatível com o negócio, sem apresentar um valor universal como garantia de retorno.'],
              ['A Orvion garante número de clientes?', 'Não. Ninguém pode garantir um número de clientes ou vendas: oferta, concorrência, investimento e atendimento também influenciam o resultado. Nosso compromisso é com método, transparência e mensuração para orientar as decisões.'],
              ['Quanto tempo para ver resultado?', 'Uma campanha pode gerar acessos após a aprovação dos anúncios. Transformar acessos em contatos e avaliar sua qualidade exige dados e ajustes. O prazo varia conforme demanda, orçamento, página e atendimento; não prometemos um resultado em um período fixo.'],
              ['Como acompanho os resultados?', 'Acompanhamos investimento, termos de pesquisa e ações de contato registradas pelo tracking. Explicamos o que os dados mostram e quais ajustes fazem sentido. Um clique no WhatsApp sinaliza intenção de contato; não comprova uma conversa, um cliente ou uma venda.'],
              ['Posso falar direto no WhatsApp?', 'Sim. Você fala diretamente com a Orvion pelo WhatsApp oficial: +55 11 97999-1680. Pode começar pelo diagnóstico sem custo e sem compromisso ou enviar os dados do seu negócio pelo formulário abaixo.'],
            ].map(([question, answer], index) => (
              <div className="orvion-faq-item" key={question}>
                <h3><button id={`${formId}-faq-${index}`} type="button" onClick={() => toggleFaq(index)} aria-expanded={openFaq === index} aria-controls={`${formId}-answer-${index}`}><span>{question}</span><span className="orvion-faq-toggle" aria-hidden="true">{openFaq === index ? '−' : '+'}</span></button></h3>
                <div id={`${formId}-answer-${index}`} role="region" aria-labelledby={`${formId}-faq-${index}`} hidden={openFaq !== index}><p>{answer}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            SEÇÃO 10 — CTA FINAL COM FORMULÁRIO INTEGRADO
            (Fechamento com Fundo Fotográfico Premium e Overlay)
            ======================================================== */}
        <section
          id="proposta"
          className="relative py-24 md:py-32 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] overflow-hidden"
        >
          <div className="relative z-10 max-w-[1240px] mx-auto">
            <div className="rounded-2xl border border-white/[0.12] bg-[#070707]/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-14 shadow-[0_32px_80px_rgba(0,0,0,0.85)]">
              <div className="orvion-contact-layout">
                {/* Lado Esquerdo: Mensagem e Ação Imediata */}
                <div className="orvion-contact-copy">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                    <span className="w-8 h-[1px] bg-[#D4AF37]" aria-hidden="true" />
                    <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium">
                      PRÓXIMO PASSO
                    </span>
                  </div>
                  <h2
                    className="font-display font-medium text-white tracking-[-0.02em] mb-4 text-balance"

                  >
                    Sua próxima oportunidade pode começar em uma pesquisa no Google.
                  </h2>
                  <p className="text-[#c2c2c2] text-sm sm:text-base leading-relaxed mb-8 font-normal">
                    Conte o que sua empresa oferece e onde quer chegar. Vamos entender seu cenário antes de indicar uma estrutura de campanha.
                  </p>

                  <div className="orvion-contact-actions flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href={heroUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppConversion}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 min-h-[52px] font-semibold text-[#050505] text-sm sm:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_28px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_36px_rgba(212,175,55,0.55)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    >
                      <IconPhone size={16} aria-hidden="true" className="shrink-0" />
                      <span>Quero anunciar no Google</span>
                    </a>

                    <a
                      href={diagnosticUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppConversion}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.22] bg-white/[0.04] px-6 py-4 min-h-[52px] text-xs sm:text-sm font-medium text-white hover:border-[#D4AF37] hover:bg-white/[0.08] transition-all no-underline cursor-pointer"
                    >
                      <span>Solicitar diagnóstico</span>
                    </a>
                  </div>
                </div>

                {/* Lado Direito: Formulário Funcional Integrado */}
                <div className="orvion-contact-form">
                  <div className="mb-6">
                    <h3 className="font-display text-white font-medium text-lg mb-1">
                      Vamos conhecer seu negócio.
                    </h3>
                    <p className="text-[#8f8f8f] text-xs leading-relaxed m-0 font-normal">
                      Preencha os dados e continue a conversa no WhatsApp.
                    </p>
                  </div>

                  <form ref={formElement} onSubmit={handleFormSubmit} noValidate className="space-y-4">
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
                        autoComplete="name"
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? `${formId}-name-error` : undefined}
                        value={form.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Carlos Silva"
                        required
                        className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-all duration-200 ${
                          formErrors.name ? 'border-red-500/80' : 'border-white/[0.12]'
                        }`}
                      />
                      {formErrors.name && (
                        <p id={`${formId}-name-error`} role="alert" className="text-red-300 text-sm mt-1">{formErrors.name}</p>
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
                        autoComplete="organization"
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
                        inputMode="tel"
                        id={`${formId}-phone`}
                        name="phone"
                        autoComplete="tel"
                        aria-invalid={Boolean(formErrors.phone)}
                        aria-describedby={formErrors.phone ? `${formId}-phone-error` : undefined}
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: (11) 99999-9999"
                        required
                        className={`w-full bg-[#050505] border rounded-lg px-4 py-3 text-white text-sm placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-all duration-200 ${
                          formErrors.phone ? 'border-red-500/80' : 'border-white/[0.12]'
                        }`}
                      />
                      {formErrors.phone && (
                        <p id={`${formId}-phone-error`} role="alert" className="text-red-300 text-sm mt-1">{formErrors.phone}</p>
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

                    <div>
                      <label className="orvion-consent" htmlFor={`${formId}-consent`}><input id={`${formId}-consent`} type="checkbox" required checked={consent} onChange={(event) => { setConsent(event.target.checked); setFormErrors(previous => ({ ...previous, consent: undefined })); setPreparedUrl(''); preparedTracked.current = false; }} aria-invalid={Boolean(formErrors.consent)} aria-describedby={formErrors.consent ? `${formId}-consent-error` : undefined} /><span>Concordo com o uso dos meus dados para contato sobre esta solicitação, conforme a <a href="/privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.</span></label>
                      {formErrors.consent && <p id={`${formId}-consent-error`} role="alert">{formErrors.consent}</p>}
                    </div>
                    {/* Botão de Envio Funcional */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 min-h-[48px] font-semibold text-[#050505] text-sm cursor-pointer border-none transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    >
                      <span>Solicitar proposta via WhatsApp</span>
                      <IconSend size={14} aria-hidden="true" className="shrink-0" />
                    </button>
                    <p className="orvion-form-reassurance">Resposta direta, sem compromisso.</p>
                    {preparedUrl && <p className="orvion-form-feedback" role="status">Sua mensagem está pronta. Conclua o envio no WhatsApp. Se a janela não abriu, <a href={preparedUrl} target="_blank" rel="noopener noreferrer" onClick={() => { if (!preparedTracked.current) { trackWhatsAppConversion(); preparedTracked.current = true; } }}>abrir conversa</a>.</p>}
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
                  <a href={heroUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppConversion}>+55 11 97999-1680</a>
                </div>
                <div><a href="mailto:contato@orvionstudio.com.br">contato@orvionstudio.com.br</a></div>
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
        className="orvion-mobile-contact fixed bottom-0 inset-x-0 sm:hidden z-30 backdrop-blur-xl border-t border-white/10"
        hidden={!quickContact || menuOpen}
        role="region"
        aria-label="Ação rápida no celular"
      >
        <a
          href={heroUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppConversion}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 min-h-[46px] font-semibold text-[#050505] text-xs cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.35)] active:scale-[0.98]"
        >
          <IconPhone size={14} className="shrink-0" />
          <span>Quero anunciar no Google</span>
        </a>
      </div>
      <a className="orvion-desktop-contact" hidden={!quickContact || menuOpen} href={heroUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppConversion} aria-label="Quero anunciar no Google — conversar no WhatsApp"><IconPhone size={20} /><span>WhatsApp</span></a>
    </div>
  );
}

import { useState, useEffect, useId } from 'react';
import './GoogleAdsGestao.css';
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
  utm_content: string;
  gclid: string;
}

export default function GoogleAdsGestao() {
  const formId = useId();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const contact = document.getElementById('proposta');
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting));
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

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
    utm_content: '',
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
        utm_content: searchParams.get('utm_content') || '',
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
  const [preparedUrl, setPreparedUrl] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setPreparedUrl('');
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
    } else if (!/^[+\d\s().-]+$/.test(form.phone) || !/^\d{10,15}$/.test(form.phone.replace(/\D/g, ''))) {
      errors.phone = 'Informe um telefone válido com DDD.';
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
      lines.push(`utm_source: ${utmData.utm_source}`);
    }
    for (const key of ['utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const) {
      if (utmData[key]) lines.push(`${key}: ${utmData[key]}`);
    }
    if (utmData.gclid) {
      lines.push(`GCLID: ${utmData.gclid}`);
    }

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
      className="orvion-landing relative min-h-screen font-body antialiased"
      suppressHydrationWarning
    >
      {/* ========================================================
          CABEÇALHO EDITORIAL COMPACTO
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
          <button id="orvion-menu-toggle" className="orvion-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="orvion-mobile-menu" aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar' : 'Menu'}</button>
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
      {menuOpen && <nav id="orvion-mobile-menu" className="orvion-menu" aria-label="Navegação no celular">
        {[
          ['problema', 'Diagnóstico'], ['metodo', 'Processo'], ['servicos', 'Gestão'],
          ['fluxo', 'Fluxo'], ['ecossistema', 'Ecossistema'], ['faq', 'Dúvidas'], ['proposta', 'Contato'],
        ].map(([id, label]) => <a key={id} href={`#${id}`} onClick={scrollToAnchor(id)}>{label}</a>)}
      </nav>}

      {/* Espaçamento inferior no mobile para a barra fixa de conversão */}
      <main className="pb-24 sm:pb-0">
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
              <source srcSet="/images/orvion-champagne-metal.webp" type="image/webp" />
              <img src="/images/orvion-champagne-metal.webp" alt="" width="1672" height="940" fetchPriority="high" loading="eager" />
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
                Estratégia, gestão e otimização de campanhas para colocar sua empresa diante de pessoas que já estão procurando pelo que você oferece.
              </p>

              {/* CTAs Primário e Secundário */}
              <div className="orvion-hero-actions flex flex-col sm:flex-row items-stretch sm:items-center">
                <a
                  href={WHATSAPP_HERO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsAppConversion}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] sm:min-h-[54px] font-semibold text-[#050505] text-sm md:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_28px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_36px_rgba(212,175,55,0.55)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none whitespace-nowrap"
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
              <div className="orvion-hero-microcopy flex flex-wrap items-center">
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

        <section id="problema" className="orvion-problem">
          <div className="orvion-problem-copy">
            <p className="orvion-eyebrow">01 / Onde o investimento se perde</p>
            <h2>O investimento<br />se perde quando...</h2>
            <p className="orvion-intro">Intenção de busca, anúncio, página e mensuração precisam trabalhar juntos. Sem essa conexão, o orçamento se dispersa.</p>
            <ol className="orvion-problem-list">
              {[
                ['Clique sem intenção', 'A campanha atrai pesquisas informativas ou pessoas que ainda não estão prontas para contratar.'],
                ['Página que não converte', 'O anúncio gera acesso, mas a experiência depois do clique não conduz até o contato.'],
                ['Decisão sem mensuração', 'Sem saber o que gera oportunidades reais, otimizar vira tentativa e erro.'],
              ].map(([title, description], index) => (
                <li key={title}>
                  <span className="orvion-number" aria-hidden="true">0{index + 1}</span>
                  <div><h3>{title}</h3><p>{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <p className="orvion-problem-note">Tráfego qualificado precisa terminar<br />em uma ação comercial.</p>
        </section>

        <section id="metodo" className="orvion-process orvion-section">
          <div className="orvion-section-heading">
            <p className="orvion-eyebrow">02 / Nosso processo</p>
            <div><h2>Antes do primeiro clique,<br />uma direção clara.</h2><p className="orvion-intro">Uma operação de Google Ads começa com estratégia. Cada etapa conecta intenção de busca a uma oportunidade comercial mensurável.</p></div>
          </div>
          <div className="orvion-process-layout">
            <p className="orvion-process-note">Estratégia de aquisição.<br /><span>Infraestrutura técnica e direção comercial.</span></p>
            <ol className="orvion-steps">
              {[
                ['Estratégia', 'Entendemos o negócio, os serviços, a região de atuação e o perfil de cliente que realmente faz sentido alcançar.'],
                ['Pesquisa', 'Mapeamos buscas com intenção comercial e estruturamos campanhas para reduzir tráfego irrelevante.'],
                ['Experiência', 'Anúncio e página precisam entregar continuidade para quem acabou de pesquisar pelo serviço.'],
                ['Otimização', 'Analisamos termos, anúncios e conversões para direcionar investimento ao que demonstra maior potencial.'],
              ].map(([title, description], index) => (
                <li key={title}><span className="orvion-step-label">ETAPA 0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section id="servicos" className="orvion-management">
          <div className="orvion-management-copy">
            <p className="orvion-eyebrow">03 / Gestão de Google Ads</p>
            <h2>Publicar é o início.<br />Gerir é o que<br /><span>faz a diferença.</span></h2>
            <p className="orvion-intro">Análise, ajustes e decisões baseadas no comportamento real das campanhas. Uma operação com direção.</p>
          </div>
            <dl className="orvion-pillars">
              {[
                ['Planejamento estratégico', 'Estrutura baseada no negócio, demanda e intenção de busca.'],
                ['Palavras-chave', 'Seleção e refinamento contínuo das pesquisas relevantes.'],
                ['Termos de pesquisa', 'Identificação de buscas reais e exclusão do que desperdiça orçamento.'],
                ['Anúncios', 'Mensagens alinhadas à intenção do potencial cliente.'],
                ['Mensuração', 'Acompanhamento das ações comerciais importantes.'],
                ['Otimização', 'Ajustes de campanha guiados por dados.'],
              ].map(([title, description]) => (
                <div key={title}><dt>{title}</dt><dd>{description}</dd></div>
              ))}
            </dl>
          <p className="orvion-management-note">Precisão na análise.<br />Clareza nas decisões.</p>
        </section>

        <section id="fluxo" className="orvion-flow">
          <div className="orvion-flow-heading"><p className="orvion-eyebrow">04 / Da busca ao contato</p><h2>Um clique.<br />Todo um caminho.</h2><p>O anúncio é apenas o começo da experiência.<br />Cada próximo passo precisa fazer sentido.</p></div>
          <ol className="orvion-flow-stages">
            {[
              ['Busca', 'Intenção real'],
              ['Anúncio', 'Mensagem relevante'],
              ['Página', 'Experiência que orienta'],
              ['Contato', 'Uma conversa começa'],
              ['Oportunidade comercial', 'Conexão com o negócio'],
            ].map(([title, description], index) => (
              <li key={title}><span className="orvion-flow-index">0{index + 1}<IconArrowRight size={20} /></span><h3>{title}</h3><p>{description}</p></li>
            ))}
          </ol>
        </section>

        <section id="ecossistema" className="orvion-ecosystem orvion-section">
          <div className="orvion-section-heading"><p className="orvion-eyebrow">05 / Ecossistema Orvion</p><div><h2>A campanha abre a porta.<br />A estrutura sustenta<br />o próximo passo.</h2><p className="orvion-intro">Quando a aquisição precisa de mais estrutura, nós também construímos. Estratégia, experiência e tecnologia trabalhando em conjunto.</p></div></div>
          <div className="orvion-ecosystem-layout">
            <div className="orvion-ecosystem-focus"><span className="orvion-eyebrow">O ponto de partida</span><h3>Google<br />Ads<span aria-hidden="true">↗</span></h3><p>Gestão estratégica para colocar sua empresa diante de quem já procura o que você oferece.</p><a href="#servicos" onClick={scrollToAnchor('servicos')} className="orvion-text-link">Conheça a gestão <IconArrowRight /></a></div>
            <dl className="orvion-ecosystem-services">
              {[
                ['Websites Premium', 'Presença e autoridade. Landing pages e sites alinhados à intenção de cada campanha.'],
                ['Automação', 'Processos que reduzem trabalho manual e aceleram o atendimento.'],
                ['Inteligência Artificial', 'Aplicações práticas integradas à operação da empresa.'],
                ['SEO', 'Estrutura para fortalecer a visibilidade orgânica além da mídia paga.'],
                ['Estratégia Digital', 'Direção para conectar aquisição, experiência e objetivos comerciais.'],
              ].map(([title, description], index) => (
                <div key={title}><span aria-hidden="true">0{index + 1}</span><div><dt>{title}</dt><dd>{description}</dd></div><IconArrowRight size={20} /></div>
              ))}
            </dl>
          </div>
        </section>

        <section id="posicionamento" className="orvion-studio">

          <div className="orvion-studio-copy"><p className="orvion-eyebrow">A Orvion Studio</p><h2>Visão de negócio.<br />Rigor na execução.</h2><p className="orvion-intro">Trabalhamos na interseção entre aquisição, tecnologia e experiência digital.</p><p>Planejamos campanhas, construímos estruturas digitais e analisamos dados com um objetivo: criar operações de aquisição mais profissionais e mensuráveis.</p><p className="orvion-studio-note">Cada projeto parte da realidade da empresa. Sem fórmulas prontas ou promessas impossíveis.</p></div>
        </section>

        <section id="diagnostico" className="orvion-diagnostic orvion-section">
          <p className="orvion-eyebrow">Uma conversa antes de uma campanha</p>
          <div><h2>O próximo movimento<br />da sua empresa<br />começa aqui.</h2><div className="orvion-diagnostic-action"><p>Quer entender se o Google Ads faz sentido para seu negócio? Vamos conhecer seu cenário.</p><a href={WHATSAPP_HERO_URL} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppConversion} className="orvion-button orvion-button-dark">Conversar com a Orvion <IconArrowRight size={20} /></a><span>+55 11 97999-1680</span></div></div>
        </section>

        <section id="faq" className="orvion-faq orvion-section">
          <div><p className="orvion-eyebrow">Sem dúvidas no caminho</p><h2>Vamos<br />esclarecer.</h2><p className="orvion-intro">Respostas diretas sobre investimento e rotina da operação.</p></div>
          <div className="orvion-faq-list">
            {[
              ['Quanto custa a gestão de Google Ads?', 'O investimento depende da estrutura e necessidade de cada operação. Primeiro entendemos o negócio e o objetivo antes de apresentar uma proposta.'],
              ['Quanto preciso investir no Google Ads?', 'Não existe um orçamento único para todas as empresas. O valor depende do segmento, região, concorrência e objetivo da campanha.'],
              ['A Orvion garante número de clientes ou vendas?', 'Não. Nenhuma operação séria pode garantir resultados comerciais específicos. Trabalhamos para melhorar estratégia, estrutura, mensuração e eficiência da aquisição.'],
              ['Vocês criam a página da campanha?', 'Sim. Quando necessário, podemos desenvolver ou otimizar a estrutura utilizada para receber o tráfego.'],
              ['Como acompanho os resultados?', 'A operação é acompanhada por métricas relevantes para cada campanha, com foco em ações comerciais e não apenas em cliques ou impressões.'],
              ['Posso falar diretamente pelo WhatsApp?', 'Sim. O primeiro contato pode ser feito diretamente pelo WhatsApp da Orvion.'],
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
                    Vamos estruturar uma operação de aquisição alinhada ao seu negócio e aos seus objetivos.
                  </p>

                  <div className="orvion-contact-actions flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href={WHATSAPP_HERO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppConversion}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 min-h-[52px] font-semibold text-[#050505] text-sm sm:text-base cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_28px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_36px_rgba(212,175,55,0.55)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    >
                      <IconPhone size={16} aria-hidden="true" className="shrink-0" />
                      <span>Quero falar com a Orvion</span>
                    </a>

                    <a
                      href={WHATSAPP_DIAGNOSTICO_URL}
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
                      Envie os dados do seu negócio
                    </h3>
                    <p className="text-[#8f8f8f] text-xs leading-relaxed m-0 font-normal">
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

                    {/* Botão de Envio Funcional */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 min-h-[48px] font-semibold text-[#050505] text-sm cursor-pointer border-none transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                    >
                      <span>Solicitar proposta via WhatsApp</span>
                      <IconSend size={14} aria-hidden="true" className="shrink-0" />
                    </button>
                    {preparedUrl && <p className="orvion-form-feedback" role="status">Sua mensagem está pronta. Conclua o envio no WhatsApp. Se a janela não abriu, <a href={preparedUrl} target="_blank" rel="noopener noreferrer">abrir conversa</a>.</p>}
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
        className="orvion-mobile-contact fixed bottom-0 inset-x-0 sm:hidden z-30 backdrop-blur-xl border-t border-white/10"
        hidden={contactVisible || menuOpen}
        role="region"
        aria-label="Ação rápida no celular"
      >
        <a
          href={WHATSAPP_HERO_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackWhatsAppConversion}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 min-h-[46px] font-semibold text-[#050505] text-xs cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.35)] active:scale-[0.98]"
        >
          <IconPhone size={14} className="shrink-0" />
          <span>Falar no WhatsApp com Especialista</span>
        </a>
      </div>
    </div>
  );
}

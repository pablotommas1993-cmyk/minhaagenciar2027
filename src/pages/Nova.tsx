import React, { useState, useEffect, useId } from 'react';
import HeroCurve from '@/components/nova/HeroCurve';
import {
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconLayout,
  IconMail,
  IconPhone,
  IconSearch,
  IconSend,
  IconShield,
  IconTrendingUp,
  IconWorkflow,
} from '@/components/nova/NovaIcons';
import {
  WHATSAPP_BASE_URL,
  WHATSAPP_GESTÃO_URL,
  trackWhatsAppConversion,
} from '@/utils/gtag';
import { founderConfig, companyDetails } from '@/content/company';
import { projects, testimonials } from '@/content/proof';

interface FormState {
  name: string;
  company: string;
  investment: string;
  message: string;
}

export default function Nova() {
  const formId = useId();

  // Form State
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    investment: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // UTM capture
  const [utmData, setUtmData] = useState({
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
      errors.name = 'Por favor, informe seu nome ou o responsável.';
    }
    if (!form.investment) {
      errors.investment = 'Selecione uma faixa estimada de investimento mensal.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Envio do Formulário:
   * 1. Valida campos obrigatórios e honeypot anti-spam.
   * 2. TODO: Webhook para CRM/Planilha via VITE_LEAD_WEBHOOK_URL.
   * 3. Direciona os dados organizados para o WhatsApp oficial com trackWhatsAppConversion().
   * 4. NÃO dispara evento de conversão específico de form até haver backend real.
   */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim().length > 0) return;
    if (!validateForm()) return;

    // TODO: Integração de Webhook quando houver backend ou CRM configurado
    // if (typeof window !== 'undefined' && (import.meta as any).env?.VITE_LEAD_WEBHOOK_URL) {
    //   try {
    //     await fetch((import.meta as any).env.VITE_LEAD_WEBHOOK_URL, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //         ...form,
    //         ...utmData,
    //         createdAt: new Date().toISOString(),
    //       }),
    //     });
    //   } catch (err) {
    //     console.warn('Webhook dispatch failed, continuing to WhatsApp:', err);
    //   }
    // }

    trackWhatsAppConversion();

    const lines = [
      'Olá! Vim pela página da ORVION Studio e gostaria de uma proposta de Google Ads.',
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

  const navigateToPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/privacidade');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const hasCompanyData =
    Boolean(companyDetails.corporateName) ||
    Boolean(companyDetails.cnpj) ||
    Boolean(companyDetails.city);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ededed] font-body selection:bg-[#D4AF37]/25 selection:text-white overflow-x-hidden antialiased">
      {/* ========================================================
          1. CABEÇALHO ENXUTO
          ======================================================== */}
      <header className="sticky top-0 inset-x-0 z-40 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-[5%] lg:px-[8%] bg-[#050505]/92 backdrop-blur-xl border-b border-white/[0.08]">
        <a
          href="/"
          onClick={navigateToHome}
          className="flex items-baseline gap-2 cursor-pointer no-underline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none rounded-md py-1"
          aria-label="ORVION Studio — Ir para o início"
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

      {/* pb-24 no mobile garante que o conteúdo não seja coberto pela barra fixa inferior */}
      <main className="pb-24 sm:pb-0">
        {/* ========================================================
            2. HERO EDITORIAL COM COMPOSIÇÃO SVG PRÓPRIA
            ======================================================== */}
        <section
          id="topo"
          className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] overflow-hidden"
        >
          {/* Luz ambiente de fundo discreta */}
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
                {/* Tag de posicionamento editorial */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.12] bg-white/[0.03] mb-6 sm:mb-8 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" aria-hidden="true" />
                  <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#F4E0A1] font-mono font-medium">
                    Google Ads & Aquisição
                  </span>
                </div>

                {/* H1 único da página */}
                <h1
                  className="font-display font-semibold text-white tracking-[-0.03em] mb-6 text-balance break-words"
                  style={{ fontSize: 'clamp(1.75rem, 4.6vw, 4rem)', lineHeight: 1.15 }}
                >
                  Google Ads para empresas que querem contatos, não só cliques.
                </h1>

                {/* Subtítulo de uma frase */}
                <p className="text-[#b8b8b8] text-base md:text-lg leading-relaxed max-w-[620px] mb-8 font-normal mx-auto lg:mx-0">
                  Estruturamos campanhas focadas em intenção real de contratação e páginas alinhadas para gerar conversas comerciais no WhatsApp.
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
                    <span>Falar no WhatsApp</span>
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

                {/* Linha de apoio verdadeira */}
                <div className="flex items-start justify-center lg:justify-start gap-2.5 text-[11px] sm:text-xs text-[#8a8a8a] font-mono max-w-[500px] mx-auto lg:mx-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 shrink-0 mt-1.5" aria-hidden="true" />
                  <span className="min-w-0 leading-relaxed">
                    Atendimento para empresas. Resposta em até 24h úteis.
                  </span>
                </div>
              </div>

              {/* Coluna visual: Composição SVG própria */}
              <div className="lg:col-span-5">
                <HeroCurve />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. "PARA QUEM É / PARA QUEM NÃO É"
            ======================================================== */}
        <section
          id="publico"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1360px] mx-auto">
            {/* Cabeçalho da seção */}
            <div className="max-w-[760px] mb-14 pb-8 border-b border-white/[0.08]">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                01 // Alinhamento Comercial
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Para quem é o trabalho da ORVION
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                Nosso trabalho é pensado para empresas que vendem serviços e precisam de previsibilidade no funil, com clareza sobre onde cada real é investido.
              </p>
            </div>

            {/* Duas colunas com divisória fina */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              {/* Coluna: Para quem é */}
              <div className="pt-2 md:pt-0 md:pr-8 lg:pr-12">
                <div className="flex items-center gap-2 mb-6 text-xs font-mono tracking-wider uppercase text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                  <span className="font-semibold">Perfil de Atendimento</span>
                </div>

                <ul className="space-y-4 text-sm sm:text-base text-[#d4d4d4] list-none p-0 m-0">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <IconCheck size={12} />
                    </span>
                    <span>Empresas que vendem serviços qualificados e de valor relevante.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <IconCheck size={12} />
                    </span>
                    <span>Empresas que já anunciam ou que querem começar a investir com critério e governança.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <IconCheck size={12} />
                    </span>
                    <span>Quem busca conversas comerciais de pessoas que já procuram pelo serviço no Google.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                      <IconCheck size={12} />
                    </span>
                    <span>Empresas que valorizam relatórios transparentes e acompanhamento direto.</span>
                  </li>
                </ul>
              </div>

              {/* Coluna: Para quem não é */}
              <div className="pt-8 md:pt-0 md:pl-8 lg:pl-12">
                <div className="flex items-center gap-2 mb-6 text-xs font-mono tracking-wider uppercase text-[#a3a3a3]">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" aria-hidden="true" />
                  <span className="font-semibold">Fora de Escopo</span>
                </div>

                <ul className="space-y-4 text-sm sm:text-base text-[#a3a3a3] list-none p-0 m-0">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center shrink-0 mt-0.5 text-[#737373]">
                      —
                    </span>
                    <span className="font-medium text-[#c4c4c4]">
                      Não atendemos quem procura curso ou quer aprender tráfego pago. Atendemos apenas empresas.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center shrink-0 mt-0.5 text-[#737373]">
                      —
                    </span>
                    <span>Quem busca apenas cliques ou métricas de vaidade sem foco em atendimento de vendas.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center shrink-0 mt-0.5 text-[#737373]">
                      —
                    </span>
                    <span>Quem espera promessas milagrosas de faturamento sem respeitar o processo de validação.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. SERVIÇOS DO ESTÚDIO (GOOGLE ADS EM DESTAQUE)
            ======================================================== */}
        <section
          id="servicos"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="max-w-[760px] mb-14 pb-8 border-b border-white/[0.08]">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                02 // Escopo de Trabalho
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Serviços do Estúdio
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                Foco principal em aquisição qualificada via Google Ads, complementado por estrutura e tecnologia que aumentam a taxa de contato.
              </p>
            </div>

            <div className="space-y-6">
              {/* Card Destaque: Google Ads */}
              <div className="rounded-2xl border border-[#D4AF37]/35 bg-[#0a0a0a] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
                  <div>
                    <span className="inline-block text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded border border-[#D4AF37]/20 mb-3 font-semibold">
                      Serviço Principal
                    </span>
                    <h3 className="font-display text-white text-xl sm:text-2xl lg:text-3xl font-semibold">
                      Gestão de Google Ads e Tráfego Pago
                    </h3>
                  </div>
                  <p className="text-[#c2c2c2] text-sm sm:text-base max-w-[480px] leading-relaxed">
                    Campanhas na rede de pesquisa focadas em quem já procura ativamente pelo seu serviço, com investimento protegido e direcionado a oportunidades reais.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  <div className="border-l border-white/[0.08] pl-4">
                    <h4 className="font-display text-white text-sm sm:text-base font-semibold mb-2 flex items-center gap-2">
                      <IconSearch size={15} className="text-[#D4AF37] shrink-0" />
                      <span>Estrutura e Pesquisa</span>
                    </h4>
                    <p className="text-[#999] text-xs sm:text-sm leading-relaxed">
                      Pesquisa detalhada dos termos com real intenção de contratação, separando buscas casuais de quem está pronto para contratar.
                    </p>
                  </div>

                  <div className="border-l border-white/[0.08] pl-4">
                    <h4 className="font-display text-white text-sm sm:text-base font-semibold mb-2 flex items-center gap-2">
                      <IconShield size={15} className="text-[#D4AF37] shrink-0" />
                      <span>Negativação Contínua</span>
                    </h4>
                    <p className="text-[#999] text-xs sm:text-sm leading-relaxed">
                      Filtragem diária e constante de pesquisas sem valor comercial para evitar desperdício e blindar seu orçamento.
                    </p>
                  </div>

                  <div className="border-l border-white/[0.08] pl-4">
                    <h4 className="font-display text-white text-sm sm:text-base font-semibold mb-2 flex items-center gap-2">
                      <IconTrendingUp size={15} className="text-[#D4AF37] shrink-0" />
                      <span>Otimização Periódica</span>
                    </h4>
                    <p className="text-[#999] text-xs sm:text-sm leading-relaxed">
                      Ajuste de lances e realocação da verba conforme os contatos e atendimentos reais recebidos pelo seu negócio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid com 3 cards menores: Serviços de Apoio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Sites e Landing Pages */}
                <div className="rounded-xl border border-white/[0.08] bg-[#090909] p-6 sm:p-7 hover:border-white/[0.18] transition-colors duration-200">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#D4AF37] mb-5">
                    <IconLayout size={18} />
                  </div>
                  <h3 className="font-display text-white text-lg font-semibold mb-2">
                    Sites e Landing Pages
                  </h3>
                  <p className="text-[#999] text-xs sm:text-sm leading-relaxed mb-6">
                    Páginas específicas desenvolvidas para responder exatamente ao anúncio e converter o visitante em contato.
                  </p>
                  <ul className="space-y-2 text-xs text-[#a3a3a3] list-none p-0 m-0 border-t border-white/[0.06] pt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Carregamento rápido em celulares e computadores</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Comunicação direta focada no serviço anunciado</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Fluxo objetivo para início de conversa no WhatsApp</span>
                    </li>
                  </ul>
                </div>

                {/* 2. Automações de Atendimento */}
                <div className="rounded-xl border border-white/[0.08] bg-[#090909] p-6 sm:p-7 hover:border-white/[0.18] transition-colors duration-200">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#D4AF37] mb-5">
                    <IconWorkflow size={18} />
                  </div>
                  <h3 className="font-display text-white text-lg font-semibold mb-2">
                    Automações de Atendimento
                  </h3>
                  <p className="text-[#999] text-xs sm:text-sm leading-relaxed mb-6">
                    Fluxos de mensagem e integrações para garantir que nenhuma oportunidade fique sem resposta rápida.
                  </p>
                  <ul className="space-y-2 text-xs text-[#a3a3a3] list-none p-0 m-0 border-t border-white/[0.06] pt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Respostas iniciais estruturadas no WhatsApp</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Organização e encaminhamento de contatos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Notificações imediatas a cada novo contato</span>
                    </li>
                  </ul>
                </div>

                {/* 3. SEO Técnico */}
                <div className="rounded-xl border border-white/[0.08] bg-[#090909] p-6 sm:p-7 hover:border-white/[0.18] transition-colors duration-200">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#D4AF37] mb-5">
                    <IconTrendingUp size={18} />
                  </div>
                  <h3 className="font-display text-white text-lg font-semibold mb-2">
                    SEO Técnico
                  </h3>
                  <p className="text-[#999] text-xs sm:text-sm leading-relaxed mb-6">
                    Estruturação técnica do seu site para facilitar a indexação e a visibilidade orgânica pelo Google.
                  </p>
                  <ul className="space-y-2 text-xs text-[#a3a3a3] list-none p-0 m-0 border-t border-white/[0.06] pt-4">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Otimização de títulos, metadados e semântica</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Melhoria na velocidade e estabilidade da página</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>Estrutura clara para serviços e localização</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. MÉTODO EM 4 PASSOS
            ======================================================== */}
        <section
          id="metodo"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="max-w-[760px] mb-14 pb-8 border-b border-white/[0.08]">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                03 // Processo de Trabalho
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
              >
                Como trabalhamos, do diagnóstico ao acompanhamento
              </h2>
              <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                Um fluxo transparente que elimina improvisos e garante alinhamento comercial antes de qualquer clique pago.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Passo 01 */}
              <div className="rounded-xl border border-white/[0.08] bg-[#080808] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                    <span className="font-mono text-xs font-semibold text-[#D4AF37]">01</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">Etapa Inicial</span>
                  </div>
                  <h3 className="font-display text-white text-base sm:text-lg font-semibold mb-2">
                    Diagnóstico
                  </h3>
                  <p className="text-[#a3a3a3] text-xs sm:text-sm leading-relaxed">
                    Entendemos seu modelo de serviço, tíquete médio, região atendida e quem é o decisor da contratação.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] mt-4 text-[11px] font-mono text-[#8a8a8a]">
                  Entendimento de negócio
                </div>
              </div>

              {/* Passo 02 */}
              <div className="rounded-xl border border-white/[0.08] bg-[#080808] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                    <span className="font-mono text-xs font-semibold text-[#D4AF37]">02</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">Planejamento</span>
                  </div>
                  <h3 className="font-display text-white text-base sm:text-lg font-semibold mb-2">
                    Estrutura
                  </h3>
                  <p className="text-[#a3a3a3] text-xs sm:text-sm leading-relaxed">
                    Definimos os termos de pesquisa com intenção de compra, organizamos os anúncios, a lista de negativos e a página de destino.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] mt-4 text-[11px] font-mono text-[#8a8a8a]">
                  Configuração técnica
                </div>
              </div>

              {/* Passo 03 */}
              <div className="rounded-xl border border-white/[0.08] bg-[#080808] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                    <span className="font-mono text-xs font-semibold text-[#D4AF37]">03</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">Ativação</span>
                  </div>
                  <h3 className="font-display text-white text-base sm:text-lg font-semibold mb-2">
                    Lançamento
                  </h3>
                  <p className="text-[#a3a3a3] text-xs sm:text-sm leading-relaxed">
                    Campanhas no ar com acompanhamento próximo nos primeiros dias para calibrar lances e validar os termos pesquisados.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] mt-4 text-[11px] font-mono text-[#8a8a8a]">
                  Ativação monitorada
                </div>
              </div>

              {/* Passo 04 */}
              <div className="rounded-xl border border-white/[0.08] bg-[#080808] p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                    <span className="font-mono text-xs font-semibold text-[#D4AF37]">04</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737373]">Rotina Contínua</span>
                  </div>
                  <h3 className="font-display text-white text-base sm:text-lg font-semibold mb-2">
                    Otimização
                  </h3>
                  <p className="text-[#a3a3a3] text-xs sm:text-sm leading-relaxed">
                    Ajustes periódicos pelos termos de pesquisa e pelos contatos que chegaram, com relatórios mensais e suporte em até 24h úteis.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/[0.06] mt-4 text-[11px] font-mono text-[#8a8a8a]">
                  Relatório & suporte 24h
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. MENSURAÇÃO HONESTA
            ======================================================== */}
        <section
          id="mensuracao"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6">
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  04 // Critério & Transparência
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-6"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
                >
                  Mensuração honesta, sem números inflados
                </h2>
                <p className="text-[#c2c2c2] text-sm sm:text-base leading-relaxed mb-6">
                  Acompanhamos os cliques que geram intenção de conversa no WhatsApp, mas entendemos que o que realmente importa para a sua empresa é o contato que chega, conversa e negocia.
                </p>
                <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                  Por isso, revisamos periodicamente com você os contatos que entraram para calibrar a campanha com base na qualidade real das conversas, sem números inflados ou relatórios confusos.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-white/[0.1] bg-[#090909] p-6 sm:p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 font-mono text-xs font-semibold">
                      01
                    </div>
                    <div>
                      <h3 className="font-display text-white text-sm sm:text-base font-semibold mb-1">
                        Cliques acompanhados
                      </h3>
                      <p className="text-[#888] text-xs sm:text-sm leading-relaxed">
                        Cliques e contatos no WhatsApp acompanhados e revisados, sem métricas fantasmas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-white/[0.06] pt-6">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 font-mono text-xs font-semibold">
                      02
                    </div>
                    <div>
                      <h3 className="font-display text-white text-sm sm:text-base font-semibold mb-1">
                        Qualidade revisada
                      </h3>
                      <p className="text-[#888] text-xs sm:text-sm leading-relaxed">
                        Alinhamento com você sobre quais termos atraíram pessoas com real poder de decisão.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border-t border-white/[0.06] pt-6">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 font-mono text-xs font-semibold">
                      03
                    </div>
                    <div>
                      <h3 className="font-display text-white text-sm sm:text-base font-semibold mb-1">
                        Ajuste de investimento
                      </h3>
                      <p className="text-[#888] text-xs sm:text-sm leading-relaxed">
                        Ajuste de verba conforme os contatos recebidos, fortalecendo termos que trazem retorno.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. FUNDADOR
            ======================================================== */}
        <section
          id="fundador"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
        >
          <div className="max-w-[1000px] mx-auto">
            <div className="rounded-2xl border border-white/[0.1] bg-[#080808] p-6 sm:p-10">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                05 // Sobre o Estúdio
              </span>
              <h2
                className="font-display font-medium text-white tracking-[-0.02em] mb-8"
                style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)', lineHeight: 1.18 }}
              >
                Quem está à frente do seu projeto
              </h2>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Espaço de foto controlado por configuração (oculto se vazio) */}
                {founderConfig.photoUrl ? (
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-white/[0.12] bg-[#111] shrink-0">
                    <img
                      src={founderConfig.photoUrl}
                      alt={`${founderConfig.name}, ${founderConfig.role} da ORVION Studio`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                <div className="space-y-4 text-sm sm:text-base text-[#b8b8b8] leading-relaxed">
                  <div className="mb-2">
                    <div className="font-display text-white text-lg sm:text-xl font-semibold">
                      {founderConfig.name}
                    </div>
                    <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                      {founderConfig.role}
                    </div>
                  </div>

                  {founderConfig.bioParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            8. PROJETOS (CONCEITUAIS REAIS)
            ======================================================== */}
        {projects.length > 0 && (
          <section
            id="projetos"
            className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707]"
          >
            <div className="max-w-[1360px] mx-auto">
              <div className="max-w-[760px] mb-14 pb-8 border-b border-white/[0.08]">
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  06 // Projetos Conceituais
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
                >
                  Padrão visual e estrutural
                </h2>
                <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed">
                  Projetos desenvolvidos internamente para demonstrar a arquitetura de páginas, clareza de comunicação e acabamento entregues pelo estúdio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <article
                    key={proj.id}
                    className="rounded-2xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8 flex flex-col justify-between group hover:border-white/[0.18] transition-colors duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20 font-medium">
                          {proj.category}
                        </span>
                      </div>
                      <h3 className="font-display text-white text-lg sm:text-xl font-semibold mb-2">
                        {proj.title}
                      </h3>
                      <p className="text-[#999] text-xs sm:text-sm leading-relaxed mb-6">
                        {proj.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                      {proj.scope.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-[#888]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Depoimentos: alimentado por testimonials (vazio por padrão, renderiza null) */}
        {testimonials.length > 0 && (
          <section id="depoimentos" className="py-16 px-4">
            {/* Oculto enquanto não houver depoimentos reais */}
          </section>
        )}

        {/* ========================================================
            9. PERGUNTAS FREQUENTES (FAQ REVISADO)
            ======================================================== */}
        <section
          id="faq"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#050505]"
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
                    Em quanto tempo as campanhas começam a gerar contatos?
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
                  Assim que a campanha é ativada, as impressões e os cliques começam a ocorrer de imediato. Os primeiros contatos costumam surgir nos primeiros dias de veiculação. O refinamento de termos e a estabilização de custos se consolidam nas primeiras semanas de operação contínua.
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
                    Preciso ter um site pronto para anunciar?
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
                  É necessário ter uma página de destino para onde o anúncio envia o visitante. Se você já possui um site, avaliamos se ele está adequado para converter visitantes em contatos. Se não tiver, ou se a página atual for lenta, desenvolvemos landing pages específicas alinhadas ao anúncio.
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
                    Qual verba é recomendada para começar?
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
                  A verba depende da concorrência e do custo por clique médio no seu segmento. Na conversa inicial, estimamos o volume de pesquisas no Google para sugerir uma faixa de investimento que faça sentido para o seu momento.
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
                    Como funciona o suporte e o acompanhamento?
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
                  O canal principal é o WhatsApp e o e-mail, com atendimento direto em até 24 horas úteis. No fim de cada mês, enviamos um relatório objetivo resumindo o investimento realizado, os cliques e os termos pesquisados.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            10. FORMULÁRIO CURTO
            ======================================================== */}
        <section
          id="contato"
          className="relative py-20 md:py-28 px-4 sm:px-[5%] lg:px-[8%] border-b border-white/[0.08] bg-[#070707] scroll-mt-20"
        >
          <div className="max-w-[1360px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Coluna descritiva */}
              <div className="lg:col-span-5">
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4AF37] font-mono font-medium mb-3 block">
                  08 // Próximo Passo
                </span>
                <h2
                  className="font-display font-medium text-white tracking-[-0.02em] mb-6"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 1.16 }}
                >
                  Solicite uma proposta para sua empresa
                </h2>
                <p className="text-[#a3a3a3] text-sm sm:text-base leading-relaxed mb-8">
                  Preencha os dados essenciais da sua operação. Avaliamos a viabilidade técnica e estratégica da sua conta no Google e retornamos em até 24 horas úteis.
                </p>

                <div className="space-y-3.5 border-t border-white/[0.08] pt-6 text-xs text-[#8a8a8a] font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <span>Análise prévia de termos de pesquisa</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <span>Sem obrigação ou pressão de contratação</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                    <span>Resposta direta em até 24h úteis</span>
                  </div>
                </div>
              </div>

              {/* Coluna formulário */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/[0.1] bg-[#090909] p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                    {/* Honeypot anti-spam */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor={`${formId}-b_field`}>Não preencha este campo</label>
                      <input
                        id={`${formId}-b_field`}
                        type="text"
                        name="b_field"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Nome Completo */}
                    <div>
                      <label
                        htmlFor={`${formId}-name`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#D4AF37] mb-2 font-mono font-medium"
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
                        className={`w-full bg-[#0a0a0a] border rounded-lg px-4 sm:px-5 py-3 min-h-[48px] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-200 ${
                          formErrors.name ? 'border-red-500/80' : 'border-white/[0.12]'
                        }`}
                        required
                        aria-required="true"
                        aria-invalid={Boolean(formErrors.name)}
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-xs mt-1.5 font-mono">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Empresa (Opcional) */}
                    <div>
                      <label
                        htmlFor={`${formId}-company`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-2 font-mono font-medium"
                      >
                        Empresa <span className="text-[#666]">(opcional)</span>
                      </label>
                      <input
                        id={`${formId}-company`}
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleInputChange}
                        placeholder="Nome da sua empresa ou marca"
                        className="w-full bg-[#0a0a0a] border border-white/[0.12] rounded-lg px-4 sm:px-5 py-3 min-h-[48px] text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-200"
                      />
                    </div>

                    {/* Faixa de Investimento Mensal */}
                    <div>
                      <label
                        htmlFor={`${formId}-investment`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#D4AF37] mb-2 font-mono font-medium"
                      >
                        Faixa de Investimento Mensal Pretendida *
                      </label>
                      <select
                        id={`${formId}-investment`}
                        name="investment"
                        value={form.investment}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0a0a0a] border rounded-lg px-4 sm:px-5 py-3 min-h-[48px] text-white text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-200 ${
                          formErrors.investment ? 'border-red-500/80' : 'border-white/[0.12]'
                        }`}
                        required
                        aria-required="true"
                        aria-invalid={Boolean(formErrors.investment)}
                      >
                        <option value="" disabled className="text-[#666]">
                          Selecione uma faixa estimada de investimento...
                        </option>
                        <option value="R$ 1.500 a R$ 3.000 / mês" className="bg-[#111] text-white">
                          R$ 1.500 a R$ 3.000 / mês em anúncios
                        </option>
                        <option value="R$ 3.000 a R$ 6.000 / mês" className="bg-[#111] text-white">
                          R$ 3.000 a R$ 6.000 / mês em anúncios
                        </option>
                        <option value="R$ 6.000 a R$ 15.000 / mês" className="bg-[#111] text-white">
                          R$ 6.000 a R$ 15.000 / mês em anúncios
                        </option>
                        <option value="Acima de R$ 15.000 / mês" className="bg-[#111] text-white">
                          Acima de R$ 15.000 / mês em anúncios
                        </option>
                        <option value="Ainda quero definir com vocês" className="bg-[#111] text-white">
                          Ainda quero definir com vocês na proposta
                        </option>
                      </select>
                      {formErrors.investment && (
                        <p className="text-red-400 text-xs mt-1.5 font-mono">{formErrors.investment}</p>
                      )}
                    </div>

                    {/* Mensagem Opcional */}
                    <div>
                      <label
                        htmlFor={`${formId}-message`}
                        className="block text-[11px] tracking-[0.18em] uppercase text-[#a3a3a3] mb-2 font-mono font-medium"
                      >
                        Mensagem ou Dúvida <span className="text-[#666]">(opcional)</span>
                      </label>
                      <textarea
                        id={`${formId}-message`}
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleInputChange}
                        placeholder="Conte brevemente sobre o seu serviço ou objetivo"
                        className="w-full bg-[#0a0a0a] border border-white/[0.12] rounded-lg px-4 sm:px-5 py-3 text-white text-sm placeholder-[#737373] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all duration-200 resize-none"
                      />
                    </div>

                    {/* Botão de Envio */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 min-h-[50px] font-semibold text-[#050505] text-sm sm:text-base cursor-pointer border-none transition-all duration-200 shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.5)] hover:brightness-105 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                      }}
                    >
                      <span>Solicitar proposta via WhatsApp</span>
                      <IconSend size={15} aria-hidden="true" className="shrink-0" />
                    </button>

                    <p className="text-[#737373] text-xs text-center leading-relaxed pt-2">
                      Retornamos em até 24h úteis. Seus dados são protegidos pela nossa{' '}
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
      </main>

      {/* ========================================================
          11. RODAPÉ INSTITUCIONAL
          ======================================================== */}
      <footer className="relative bg-[#030303] px-4 sm:px-[5%] lg:px-[8%] py-12 border-t border-white/[0.08] overflow-hidden">
        <div className="relative z-10 max-w-[1360px] mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-lg font-bold tracking-[0.22em] text-white">
                  ORVION
                </span>
                <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] uppercase font-semibold">
                  Studio
                </span>
              </div>
              <p className="text-[#737373] text-xs leading-relaxed max-w-[420px]">
                Google Ads e páginas de alta conversão para empresas que vendem serviços qualificados.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono text-[#8a8a8a]">
              <span className="inline-flex items-center gap-2">
                <IconPhone size={13} className="text-[#D4AF37]" />
                WhatsApp {companyDetails.whatsappFormatted}
              </span>
              <span className="hidden sm:inline text-white/20">•</span>
              <span className="inline-flex items-center gap-2">
                <IconMail size={13} className="text-[#D4AF37]" />
                {companyDetails.email}
              </span>
            </div>
          </div>

          {/* Bloco "Dados da Empresa" — Oculto enquanto vazio */}
          {hasCompanyData && (
            <div className="text-xs font-mono text-[#666] flex flex-wrap gap-4 pb-4 border-b border-white/[0.04]">
              {companyDetails.corporateName && <span>{companyDetails.corporateName}</span>}
              {companyDetails.cnpj && <span>CNPJ: {companyDetails.cnpj}</span>}
              {companyDetails.city && <span>{companyDetails.city}</span>}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#737373]">
            <a
              href="/privacidade"
              onClick={navigateToPrivacy}
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
          BARRA DE CTA FIXA INFERIOR NO CELULAR
          Discreta, não cobre o conteúdo nem o banner de cookies
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
          className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3 min-h-[46px] font-semibold text-[#050505] text-xs cursor-pointer border-none no-underline transition-all duration-200 shadow-[0_4px_20px_rgba(212,175,55,0.35)]"
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

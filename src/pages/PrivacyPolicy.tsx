import { useEffect, lazy, Suspense } from 'react';
import WhatsAppFloatingButton from '@/components/elevare/WhatsAppFloatingButton';
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

const Footer = lazy(() => import('@/components/elevare/Footer'));

export default function PrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Política de Privacidade — ORVION Studio';

    // Update canonical link for this route
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const previousCanonical = canonical ? canonical.href : 'https://orvionstudio.com.br/';

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://orvionstudio.com.br/privacidade';

    return () => {
      document.title = previousTitle;
      if (canonical) {
        canonical.href = previousCanonical;
      }
    };
  }, []);

  const navigateToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 inset-x-0 z-50 h-20 flex items-center justify-between px-[5%] lg:px-[8%] bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.04]">
        <a
          href="/"
          onClick={navigateToHome}
          className="flex items-baseline gap-2 cursor-pointer no-underline"
          aria-label="ORVION Studio — Início"
        >
          <span className="font-display text-xl font-semibold tracking-[0.2em] text-white">
            ORVION
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-medium">
            Studio
          </span>
        </a>

        <a
          href="/"
          onClick={navigateToHome}
          className="inline-flex items-center gap-2 text-sm text-[#BDBDBD] hover:text-white transition-colors duration-300 no-underline cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar para o início</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-[5%] lg:px-[8%]">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
                Privacidade & Proteção de Dados
              </span>
            </div>
            <h1
              className="font-display font-medium text-white tracking-[-0.02em] mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.15 }}
            >
              Política de Privacidade
            </h1>
            <p className="text-white/50 text-xs tracking-wide">
              Última atualização: 27 de setembro de 2026
            </p>
          </div>

          {/* Policy Body */}
          <div className="space-y-10 text-white/80 text-sm leading-relaxed border-t border-white/[0.06] pt-10">
            {/* Section 1 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3 text-white font-medium text-base">
                <Shield size={18} className="text-[#D4AF37]" />
                <h2 className="font-display text-lg text-white">1. Identificação do Controlador</h2>
              </div>
              <p>
                Esta Política de Privacidade aplica-se aos dados tratados por meio do website{' '}
                <a href="https://orvionstudio.com.br/" className="text-[#D4AF37] underline">
                  https://orvionstudio.com.br/
                </a>
                , operado pela <strong>ORVION Studio</strong>.
              </p>
              <p>
                Para dúvidas, esclarecimentos ou exercício dos direitos previstos na Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018), disponibilizamos nosso canal oficial:{' '}
                <a href="mailto:contato@orvionstudio.com.br" className="text-[#D4AF37] hover:underline">
                  contato@orvionstudio.com.br
                </a>{' '}
                ou via WhatsApp no{' '}
                <a href="https://wa.me/5511979991680" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">
                  +55 11 97999-1680
                </a>
                .
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3 text-white font-medium text-base">
                <FileText size={18} className="text-[#D4AF37]" />
                <h2 className="font-display text-lg text-white">2. Dados Coletados pelo Formulário</h2>
              </div>
              <p>
                No formulário de contato do nosso website, coletamos exclusivamente as seguintes informações fornecidas voluntariamente pelo usuário:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-white/75">
                <li><strong>Nome</strong> (obrigatório);</li>
                <li><strong>E-mail</strong> (obrigatório);</li>
                <li><strong>Empresa</strong> (opcional);</li>
                <li><strong>Serviço de interesse</strong> (opcional — seleção de lista);</li>
                <li><strong>Mensagem</strong> (obrigatória — detalhamento sobre o projeto ou objetivo).</li>
              </ul>
              <p className="text-white/60 text-xs italic">
                Nota: O formulário do nosso site não solicita dados sensíveis, número de telefone prévio ou segmento de atuação.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3 text-white font-medium text-base">
                <Lock size={18} className="text-[#D4AF37]" />
                <h2 className="font-display text-lg text-white">3. Finalidade e Fluxo de Envio dos Dados</h2>
              </div>
              <p>
                As informações fornecidas têm a finalidade exclusiva de viabilizar a análise inicial da sua solicitação, retorno de contato e elaboração de proposta comercial para as soluções da ORVION Studio.
              </p>
              <div className="p-4 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.02]">
                <p className="text-white/90 font-medium mb-1">Como funciona o envio:</p>
                <p className="text-white/75 text-xs leading-relaxed">
                  O formulário do nosso site <strong>não salva nem armazena</strong> os seus dados em bancos de dados, servidores web ou sistemas de CRM automatizados. Ao clicar em &ldquo;Solicitar Diagnóstico Gratuito&rdquo;, o formulário estrutura o texto e o encaminha diretamente para o WhatsApp oficial da ORVION Studio através do seu navegador, ocorrendo a interação sob sua iniciativa e controle.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3 text-white font-medium text-base">
                <Eye size={18} className="text-[#D4AF37]" />
                <h2 className="font-display text-lg text-white">4. Cookies e Tecnologias de Métricas</h2>
              </div>
              <p>
                Nosso website utiliza tecnologias mínimas para garantir o funcionamento adequado da aplicação:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-white/75">
                <li>
                  <strong>Cookies e Armazenamento Local (localStorage):</strong> Utilizamos o armazenamento local exclusivamente para memorizar sua preferência referente ao aviso de cookies (<code className="text-xs bg-white/10 px-1 py-0.5 rounded">orvion_cookie_consent</code>), evitando que o banner seja exibido repetidamente.
                </li>
                <li>
                  <strong>Google Ads (Tag de Conversão):</strong> Utilizamos a tag global do Google Ads (ID: <code className="text-xs bg-white/10 px-1 py-0.5 rounded">AW-18470882272</code>) para mensurar a eficácia de nossas campanhas publicitárias. Os eventos de conversão são acionados apenas quando o usuário clica expressamente para iniciar um contato comercial via WhatsApp.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <div className="flex items-center gap-3 text-white font-medium text-base">
                <CheckCircle size={18} className="text-[#D4AF37]" />
                <h2 className="font-display text-lg text-white">5. Seus Direitos (LGPD)</h2>
              </div>
              <p>
                Em conformidade com o artigo 18 da Lei Geral de Proteção de Dados (Lei 13.709/2018), você possui o direito de solicitar a qualquer momento:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-white/75">
                <li>Confirmação da existência de tratamento dos seus dados;</li>
                <li>Acesso aos dados pessoais sob nossa custódia nas conversas de atendimento;</li>
                <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>Eliminação dos dados tratados a partir do seu consentimento;</li>
                <li>Revogação do consentimento para contatos comerciais.</li>
              </ul>
              <p>
                Para exercer qualquer um destes direitos, basta enviar uma mensagem para{' '}
                <a href="mailto:contato@orvionstudio.com.br" className="text-[#D4AF37] hover:underline">
                  contato@orvionstudio.com.br
                </a>
                .
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-display text-lg text-white">6. Alterações desta Política</h2>
              <p>
                A ORVION Studio reserva-se o direito de atualizar esta Política de Privacidade periodicamente para refletir melhorias contínuas em nossos processos ou adequações legais. Qualquer alteração será devidamente publicada nesta página com a respectiva data de atualização.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Floating WhatsApp Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}

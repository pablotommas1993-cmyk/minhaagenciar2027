/**
 * Dados de Prova Social e Projetos — ORVION Studio
 *
 * REGRAS DE INTEGRIDADE:
 * 1. Proibido inventar clientes, métricas, números de faturamento ou depoimentos fictícios.
 * 2. Blocos vazios NÃO renderizam nenhum elemento visual em tela (renderizam null).
 * 3. Projetos conceituais existentes são identificados explicitamente com a categoria "Projeto conceitual".
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  year?: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
}

export interface MetricProof {
  id: string;
  label: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  category: 'Projeto conceitual' | 'Projeto de cliente';
  title: string;
  description: string;
  scope: string[];
  image?: string;
  year?: string;
}

/**
 * Depoimentos de clientes reais.
 * VAZIO: Nenhum depoimento fake é exibido.
 */
export const testimonials: Testimonial[] = [];

/**
 * Logos de empresas atendidas.
 * VAZIO: Nenhuma logo de terceiro não autorizada é exibida.
 */
export const clientLogos: ClientLogo[] = [];

/**
 * Métricas quantitativas de resultado.
 * VAZIO: Nenhuma métrica inflada é exibida.
 */
export const metricProofs: MetricProof[] = [];

/**
 * Projetos do portfólio.
 * Contém os projetos conceituais já desenvolvidos para demonstrar o padrão técnico e visual do estúdio.
 * Todos identificados de forma 100% honesta como "Projeto conceitual".
 */
export const projects: ProjectItem[] = [
  {
    id: 'advocacia-premium',
    category: 'Projeto conceitual',
    title: 'Advocacia Especializada',
    description:
      'Estrutura institucional desenvolvida para escritórios de advocacia que buscam autoridade, navegação clara e páginas específicas para cada área de atuação.',
    scope: ['Interface Institucional', 'Copywriting Estruturado', 'Otimização Técnica'],
    image: '/images/portfolio-1.webp',
  },
  {
    id: 'clinica-renovare',
    category: 'Projeto conceitual',
    title: 'Clínica Médica Integrada',
    description:
      'Página desenhada para clínicas e consultórios privados, alinhando a intenção de agendamento a um fluxo direto e sem atrito para o WhatsApp.',
    scope: ['Landing Page de Conversão', 'Integração de Agendamento', 'Design Direto'],
    image: '/images/portfolio-4.webp',
  },
  {
    id: 'techflow-consultoria',
    category: 'Projeto conceitual',
    title: 'Consultoria de Tecnologia B2B',
    description:
      'Posicionamento de serviços corporativos com detalhamento de escopo, foco em decisores e formulário consultivo para qualificação de reuniões.',
    scope: ['Comunicação B2B', 'Arquitetura de Informação', 'Qualificação de Lead'],
    image: '/images/portfolio-3.webp',
  },
  {
    id: 'maison-beaute',
    category: 'Projeto conceitual',
    title: 'Maison Beauté Estética',
    description:
      'Ambiente digital focado em serviços estéticos de alto padrão, valorizando catálogo de procedimentos e contato ágil.',
    scope: ['Design Visual', 'Apresentação de Serviços', 'Fluxo de Contato'],
    image: '/images/portfolio-2.webp',
  },
];

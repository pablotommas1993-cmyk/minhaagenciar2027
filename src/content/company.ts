/**
 * Informações Institucionais e Fundador — ORVION Studio
 *
 * Configurações reais da operação. Blocos vazios permanecem ocultos.
 */

export interface FounderConfig {
  name: string;
  role: string;
  photoUrl: string; // Se vazio, a foto não é renderizada
  bioParagraphs: string[];
}

export interface CompanyDetails {
  corporateName: string; // Razão Social (oculto se vazio)
  cnpj: string;          // CNPJ (oculto se vazio)
  city: string;          // Cidade/Estado (oculto se vazio)
  email: string;
  phone: string;
  whatsappFormatted: string;
}

export const founderConfig: FounderConfig = {
  name: 'Pablo',
  role: 'Fundador',
  // Foto vazia por padrão até que uma imagem oficial seja fornecida:
  photoUrl: '',
  bioParagraphs: [
    // Placeholder neutro e verdadeiro conforme solicitado:
    'À frente da ORVION Studio, conduzo pessoalmente o planejamento e a operação das campanhas de tráfego pago para empresas prestadoras de serviços.',
    'O objetivo do estúdio é direto: conectar quem já procura seu serviço no Google a conversas comerciais reais, com critério na escolha de termos e rigor com a verba investida.',
    'Aqui você fala diretamente com quem planeja, analisa e otimiza a sua conta no dia a dia, com acompanhamento próximo e relatórios mensais claros.',
  ],
};

export const companyDetails: CompanyDetails = {
  // Dados fiscais/cadastrais: vazios por padrão; a seção é ocultada enquanto não preenchida
  corporateName: '',
  cnpj: '',
  city: '',
  email: 'contato@orvionstudio.com.br',
  phone: '+55 11 97999-1680',
  whatsappFormatted: '+55 11 97999-1680',
};

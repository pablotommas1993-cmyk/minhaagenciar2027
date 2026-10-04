import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// Read the base dist/index.html (Home)
const homeHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(homeHtmlPath)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const homeHtml = fs.readFileSync(homeHtmlPath, 'utf-8');

// ==========================================
// 1. Route: /google-ads/gestao
// ==========================================
const googleAdsDir = path.join(distDir, 'google-ads/gestao');
fs.mkdirSync(googleAdsDir, { recursive: true });

let googleAdsHtml = homeHtml;

// Title
googleAdsHtml = googleAdsHtml.replace(
  /<title>.*?<\/title>/i,
  '<title>Gestão de Google Ads e Tráfego Pago para Empresas | ORVION Studio</title>'
);

// Meta Description
googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
  '<meta name="description" content="Agência de tráfego pago focada em Google Ads para empresas que querem gerar contatos qualificados. Fale com um especialista no WhatsApp." />'
);

// Canonical
googleAdsHtml = googleAdsHtml.replace(
  /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
  '<link rel="canonical" href="https://orvionstudio.com.br/google-ads/gestao" />'
);

// Open Graph
googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:title" content="Gestão de Google Ads e Tráfego Pago para Empresas | ORVION Studio" />'
);

googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:description" content="Agência de tráfego pago focada em Google Ads para empresas que querem gerar contatos qualificados. Fale com um especialista no WhatsApp." />'
);

googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:url" content="https://orvionstudio.com.br/google-ads/gestao" />'
);

// Twitter Cards
googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+property="twitter:title"\s+content=".*?"\s*\/?>/i,
  '<meta property="twitter:title" content="Gestão de Google Ads e Tráfego Pago para Empresas | ORVION Studio" />'
);

googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+property="twitter:description"\s+content=".*?"\s*\/?>/i,
  '<meta property="twitter:description" content="Agência de tráfego pago focada em Google Ads para empresas que querem gerar contatos qualificados. Fale com um especialista no WhatsApp." />'
);

googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+property="twitter:url"\s+content=".*?"\s*\/?>/i,
  '<meta property="twitter:url" content="https://orvionstudio.com.br/google-ads/gestao" />'
);

fs.writeFileSync(path.join(googleAdsDir, 'index.html'), googleAdsHtml, 'utf-8');
const googleAdsParentDir = path.join(distDir, 'google-ads');
fs.writeFileSync(path.join(googleAdsParentDir, 'gestao.html'), googleAdsHtml, 'utf-8');
console.log('✓ Generated dist/google-ads/gestao/index.html and dist/google-ads/gestao.html with route-specific metadata');

// ==========================================
// 2. Route: /privacidade
// ==========================================
const privacidadeDir = path.join(distDir, 'privacidade');
fs.mkdirSync(privacidadeDir, { recursive: true });

let privacidadeHtml = homeHtml;

privacidadeHtml = privacidadeHtml.replace(
  /<title>.*?<\/title>/i,
  '<title>Política de Privacidade | ORVION Studio</title>'
);

privacidadeHtml = privacidadeHtml.replace(
  /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
  '<link rel="canonical" href="https://orvionstudio.com.br/privacidade" />'
);

privacidadeHtml = privacidadeHtml.replace(
  /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:url" content="https://orvionstudio.com.br/privacidade" />'
);

privacidadeHtml = privacidadeHtml.replace(
  /<meta\s+property="twitter:url"\s+content=".*?"\s*\/?>/i,
  '<meta property="twitter:url" content="https://orvionstudio.com.br/privacidade" />'
);

fs.writeFileSync(path.join(privacidadeDir, 'index.html'), privacidadeHtml, 'utf-8');
fs.writeFileSync(path.join(distDir, 'privacidade.html'), privacidadeHtml, 'utf-8');
console.log('✓ Generated dist/privacidade/index.html and dist/privacidade.html with route-specific metadata');


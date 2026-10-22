import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';

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
// Prerender /google-ads/gestao component
// ==========================================
const ssrDir = path.resolve(__dirname, '../dist-ssr');
async function prerender(name) {
  const file = path.join(ssrDir, `${name}.js`);
  const { default: Component } = await import(pathToFileURL(file).href);
  const html = renderToString(React.createElement(Component));
  if (!html) throw new Error(`Empty prerendered route: ${name}`);
  console.log(`✓ Prerendered ${name} (${html.length} chars)`);
  return html;
}
const prerenderedGoogleAdsBody = await prerender('GoogleAdsGestao');

// ==========================================
// Prerender /nova component (Homologação)
// ==========================================
const prerenderedNovaBody = await prerender('Nova');

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

googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:image" content="https://orvionstudio.com.br/orvion-google-ads-og.png" />'
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

googleAdsHtml = googleAdsHtml.replace(
  /<meta\s+property="twitter:image"\s+content=".*?"\s*\/?>/i,
  '<meta property="twitter:image" content="https://orvionstudio.com.br/orvion-google-ads-og.png" />'
);

// Preload Hero Image (responsive srcset/sizes) and prioritize CSS before module scripts
googleAdsHtml = googleAdsHtml.replace(/<link rel="preload" href="\/assets\/outfit-latin-600[^"]+"[^>]*>\s*/i, '');
googleAdsHtml = googleAdsHtml.replace(/<link rel="modulepreload" crossorigin href="\/assets\/motion-[^"]+">\s*/i, '');
const heroPreloadTag = '<link rel="preload" as="image" href="/images/orvion-champagne-metal-mobile.webp" imagesrcset="/images/orvion-champagne-metal-mobile.webp 800w, /images/orvion-champagne-metal.webp 1672w" imagesizes="100vw" type="image/webp" fetchpriority="high" />';
const cssMatch = googleAdsHtml.match(/<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/i);
if (cssMatch) {
  googleAdsHtml = googleAdsHtml.replace(cssMatch[0], '');
  googleAdsHtml = googleAdsHtml.replace(
    '<!-- Preload Critical Hero Fonts -->',
    `${heroPreloadTag}\n    ${cssMatch[0]}\n    <!-- Preload Critical Hero Fonts -->`
  );
} else {
  googleAdsHtml = googleAdsHtml.replace(
    '</head>',
    `    ${heroPreloadTag}\n  </head>`
  );
}

// Inject prerendered component inside <div id="root">
if (prerenderedGoogleAdsBody) {
  googleAdsHtml = googleAdsHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${prerenderedGoogleAdsBody}</div>`
  );
}

fs.writeFileSync(path.join(googleAdsDir, 'index.html'), googleAdsHtml, 'utf-8');
const googleAdsParentDir = path.join(distDir, 'google-ads');
fs.writeFileSync(path.join(googleAdsParentDir, 'gestao.html'), googleAdsHtml, 'utf-8');
console.log('✓ Generated dist/google-ads/gestao/index.html and dist/google-ads/gestao.html with route-specific metadata and prerendered content');

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

// ==========================================
// 3. Route: /nova (Homologação — noindex)
// ==========================================
const novaDir = path.join(distDir, 'nova');
fs.mkdirSync(novaDir, { recursive: true });

let novaHtml = homeHtml;

// Title
novaHtml = novaHtml.replace(
  /<title>.*?<\/title>/i,
  '<title>ORVION Studio | Gestão de Google Ads para Empresas</title>'
);

// Meta Description
novaHtml = novaHtml.replace(
  /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
  '<meta name="description" content="Gestão de Google Ads focada em intenção real de compra e geração de contatos comerciais para empresas. Fale conosco no WhatsApp." />'
);

// Canonical
novaHtml = novaHtml.replace(
  /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
  '<link rel="canonical" href="https://orvionstudio.com.br/nova" />'
);

// Open Graph
novaHtml = novaHtml.replace(
  /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:title" content="ORVION Studio | Gestão de Google Ads para Empresas" />'
);

novaHtml = novaHtml.replace(
  /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:description" content="Gestão de Google Ads focada em intenção real de compra e geração de contatos comerciais para empresas." />'
);

novaHtml = novaHtml.replace(
  /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
  '<meta property="og:url" content="https://orvionstudio.com.br/nova" />'
);

// Twitter Cards
novaHtml = novaHtml.replace(
  /<meta\s+property="twitter:title"\s+content=".*?"\s*\/?>/i,
  '<meta property="twitter:title" content="ORVION Studio | Gestão de Google Ads para Empresas" />'
);

novaHtml = novaHtml.replace(
  /<meta\s+property="twitter:description"\s+content=".*?"\s*\/?>/i,
  '<meta property="twitter:description" content="Gestão de Google Ads focada em intenção real de compra e geração de contatos comerciais para empresas." />'
);

novaHtml = novaHtml.replace(
  /<meta\s+property="twitter:url"\s+content=".*?"\s*\/?>/i,
  '<meta property="twitter:url" content="https://orvionstudio.com.br/nova" />'
);

// Homologation noindex tag
novaHtml = novaHtml.replace(
  /<head>/i,
  '<head>\n    <meta name="robots" content="noindex, nofollow" />'
);

// Inject prerendered component inside <div id="root">
if (prerenderedNovaBody) {
  novaHtml = novaHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${prerenderedNovaBody}</div>`
  );
}

fs.writeFileSync(path.join(novaDir, 'index.html'), novaHtml, 'utf-8');
fs.writeFileSync(path.join(distDir, 'nova.html'), novaHtml, 'utf-8');
console.log('✓ Generated dist/nova/index.html and dist/nova.html with route-specific metadata and prerendered content');

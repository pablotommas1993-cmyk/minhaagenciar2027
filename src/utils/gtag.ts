/**
 * Google Ads conversion tracking + WhatsApp helpers for ORVION Studio.
 *
 * The gtag base script is loaded globally in index.html.
 * This module provides a thin wrapper to fire the conversion event
 * and open WhatsApp in a single call.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONVERSION_ID = 'AW-18470882272';
const CONVERSION_LABEL = 'BOi5CJLuoocdEOCXzedE';
export const WHATSAPP_NUMBER = '5511979991680';
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WHATSAPP_GESTÃO_URL =
  'https://wa.me/5511979991680?text=Ol%C3%A1!%20Vim%20pelo%20Google%20e%20quero%20uma%20proposta%20de%20gest%C3%A3o%20de%20Google%20Ads.';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;

export function getCampaignParams(): Record<(typeof UTM_KEYS)[number], string> {
  const result = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
  };
  if (typeof window === 'undefined') return result;

  const searchParams = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const fromUrl = searchParams.get(key) || '';
    if (fromUrl) {
      result[key] = fromUrl;
      try {
        sessionStorage.setItem(`orvion_${key}`, fromUrl);
      } catch {
        // Ignore sessionStorage errors
      }
    } else {
      try {
        result[key] = sessionStorage.getItem(`orvion_${key}`) || '';
      } catch {
        // Ignore sessionStorage errors
      }
    }
  }
  return result;
}

export function appendUtmLines(baseMessage: string, params = getCampaignParams()): string {
  const lines = [baseMessage];
  if (params.utm_source && !baseMessage.includes('utm_source:')) {
    lines.push(`Origem: ${params.utm_source}`);
  }
  for (const key of UTM_KEYS) {
    const label = key === 'gclid' ? 'GCLID' : key;
    if (params[key] && !baseMessage.includes(`${label}:`)) {
      lines.push(`${label}: ${params[key]}`);
    }
  }
  return lines.join('\n');
}

export function buildWhatsAppUrl(
  baseMessage = 'Olá! Vim pelo site da Orvion e gostaria de solicitar um diagnóstico.'
): string {
  const fullMessage = appendUtmLines(baseMessage);
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(fullMessage)}`;
}

/**
 * Fire a Google Ads conversion event for WhatsApp contact.
 * Safe to call even if gtag hasn't loaded yet (no-op).
 */
export function trackWhatsAppConversion(): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${CONVERSION_ID}/${CONVERSION_LABEL}`,
    });
  }
}

/**
 * NOTA DE ARQUITETURA:
 * O site atualmente não possui backend/CRM conectado para confirmar o recebimento de leads por formulário.
 * O fluxo de envio do formulário encaminha os dados diretamente para o WhatsApp oficial.
 * Portanto, nenhuma conversão específica de formulário deve ser disparada no Google Ads.
 *
 * Uma conversão específica de formulário (ex: "Envio de formulario - gestao google ads")
 * somente poderá ser ativada quando existir um backend/CRM real confirmando o recebimento.
 */
export function trackFormConversion(): void {
  // DESATIVADO: Enquanto o formulário direcionar para o WhatsApp, a mensuração
  // é realizada unicamente via trackWhatsAppConversion().
}

/**
 * Track the conversion and then open WhatsApp.
 * @param message – optional pre-filled message (will be URI-encoded).
 */
export function openWhatsAppWithTracking(message?: string): void {
  trackWhatsAppConversion();

  const url = buildWhatsAppUrl(
    message || 'Olá! Vim pelo site da Orvion e gostaria de solicitar um diagnóstico.'
  );

  window.open(url, '_blank', 'noopener,noreferrer');
}

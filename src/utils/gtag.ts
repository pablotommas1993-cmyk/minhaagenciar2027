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

/**
 * Fire a Google Ads conversion event.
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
 * Track the conversion and then open WhatsApp.
 * @param message – optional pre-filled message (will be URI-encoded).
 */
export function openWhatsAppWithTracking(message?: string): void {
  trackWhatsAppConversion();

  const url = message
    ? `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`
    : WHATSAPP_BASE_URL;

  window.open(url, '_blank', 'noopener,noreferrer');
}

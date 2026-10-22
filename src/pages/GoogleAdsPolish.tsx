import { useEffect, useRef, useState } from 'react';

export function useLandingPolish() {
  const [quickContact, setQuickContact] = useState(false);
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('./GoogleAdsPolishRuntime').then(({ mountLandingPolish }) => {
      if (!cancelled) cleanup = mountLandingPolish(setQuickContact);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  return quickContact;
}

function Counter({ value, decimals = 0, prefix = '', suffix = '', label }: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const format = (number: number) => `${prefix}${number.toFixed(decimals).replace('.', ',')}${suffix}`;
  const finalValue = format(value);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import('./GoogleAdsPolishRuntime').then(({ mountCounter }) => {
      if (!cancelled) cleanup = mountCounter(node, value, decimals, prefix, suffix, finalValue);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [value, decimals, prefix, suffix, finalValue]);
  return <div className="orvion-stat"><dt>{label}</dt><dd><span ref={element}>{finalValue}</span></dd></div>;
}

export function ResultsBand() {
  return <section id="resultados" className="orvion-results" aria-labelledby="orvion-results-title">
    <div className="orvion-results-heading"><h2 id="orvion-results-title">Resultados reais. Contexto transparente.</h2><span>01 JUL — 27 SET / 2026</span></div>
    <dl className="orvion-stats"><Counter value={245} label="contatos gerados" /><Counter value={2.36} decimals={2} prefix="R$ " suffix=" mil" label="investidos" /><Counter value={9.63} decimals={2} prefix="R$ " label="custo por contato" /><Counter value={5.21} decimals={2} suffix=" mil" label="impressões" /></dl>
    <p className="orvion-results-note">Resultados de campanhas gerenciadas pela Orvion em contas de clientes (dados anonimizados). Período: 1 jul a 27 set de 2026. Resultados variam conforme segmento e investimento.</p>
  </section>;
}

export function JourneyLine() {
  return <svg className="orvion-journey-line" viewBox="0 0 1000 2" preserveAspectRatio="none" aria-hidden="true"><path d="M0 1H1000" pathLength="1" /></svg>;
}

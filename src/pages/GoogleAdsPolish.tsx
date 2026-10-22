import { useEffect, useRef, useState } from 'react';

export function useLandingPolish() {
  const [quickContact, setQuickContact] = useState(false);
  useEffect(() => {
    const page = document.querySelector('.orvion-landing');
    const hero = page?.querySelector('#topo');
    if (!page || !hero) return;
    const header = page.querySelector('header');
    const image = page.querySelector<HTMLElement>('.orvion-hero-background picture');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 900px)');
    const visibleActions = new Set<Element>();
    let pastHero = false;
    const contact = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        else if (entry.isIntersecting) visibleActions.add(entry.target);
        else visibleActions.delete(entry.target);
      });
      setQuickContact(pastHero && visibleActions.size === 0);
    }, { rootMargin: '-76px 0px 0px' });
    contact.observe(hero);
    page.querySelectorAll('.orvion-primary-action, #proposta').forEach(node => contact.observe(node));
    let frame = 0;
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        header?.classList.toggle('is-scrolled', window.scrollY > 16);
        if (image) image.style.transform = !reduced.matches && desktop.matches && !pastHero ? `translate3d(0,${Math.min(window.scrollY * 0.07, 35)}px,0) scale(1.035)` : '';
        frame = 0;
      });
    };
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); reveal.unobserve(entry.target); }
    }), { rootMargin: '0px 0px 40px', threshold: 0.05 });
    if (!reduced.matches) {
      const vh = window.innerHeight;
      const nodes = Array.from(page.querySelectorAll<HTMLElement>('[data-reveal]'));
      const belowFold = nodes.map(node => ({ node, hide: node.getBoundingClientRect().top > vh }));
      belowFold.forEach(({ node, hide }, index) => {
        if (hide) {
          node.style.setProperty('--reveal-delay', `${(index % 3) * 55}ms`);
          node.classList.add('will-reveal');
        }
        reveal.observe(node);
      });
    }
    const focus = (event: Event) => (event.target as HTMLElement).closest('[data-reveal]')?.classList.add('is-revealed');
    const motionChanged = () => {
      if (reduced.matches) page.querySelectorAll('.will-reveal').forEach(node => node.classList.add('is-revealed'));
      scroll();
    };
    window.addEventListener('scroll', scroll, { passive: true });
    page.addEventListener('focusin', focus);
    reduced.addEventListener('change', motionChanged);
    scroll();
    return () => {
      contact.disconnect(); reveal.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scroll); page.removeEventListener('focusin', focus);
      reduced.removeEventListener('change', motionChanged);
      page.querySelectorAll('.will-reveal').forEach(node => node.classList.remove('will-reveal'));
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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!node || reduced.matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = reduced.matches ? 1 : Math.min((now - start) / 950, 1);
        node.textContent = `${prefix}${(value * (1 - Math.pow(1 - progress, 3))).toFixed(decimals).replace('.', ',')}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); node.textContent = finalValue; };
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

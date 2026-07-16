import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  {
    number: '01',
    title: 'Diagnóstico Estratégico',
    description:
      'Analisamos mercado e concorrência. Identificamos oportunidades e definimos a estratégia para posicioná-lo como referência.',
    duration: '1–2 dias',
  },
  {
    number: '02',
    title: 'Arquitetura & Design',
    description:
      'Desenvolvemos a arquitetura e design. Cada decisão é guiada por dados e focada em conversão.',
    duration: '5–10 dias',
  },
  {
    number: '03',
    title: 'Desenvolvimento Premium',
    description:
      'Engenharia de alta performance. Código limpo, automações e integrações com padrão de produção.',
    duration: '2–6 semanas',
  },
  {
    number: '04',
    title: 'Lançamento & Crescimento',
    description:
      'Lançamento com acompanhamento em tempo real. Otimização contínua para crescimento e retorno previsível.',
    duration: 'Contínuo',
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-[#050505] py-32 md:py-40 px-[5%] lg:px-[8%] overflow-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
              Processo
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="font-display font-medium text-white tracking-[-0.02em] max-w-[520px]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Da estratégia ao{' '}
              <span className="text-[#BDBDBD]">resultado em semanas.</span>
            </h2>
            <p className="text-[#BDBDBD] text-sm leading-relaxed max-w-[360px] lg:text-right">
              Nosso processo elimina incerteza e entrega previsibilidade. Você sabe exatamente o
              que acontece em cada etapa.
            </p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: easeOut }}
              className="group relative flex flex-col md:flex-row md:items-start gap-6 md:gap-12 py-12 md:py-16 border-t border-white/[0.06] hover:border-white/[0.12] luxury-transition"
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-14 md:w-20">
                <span
                  className="font-display font-semibold text-white/10 group-hover:text-[#D4AF37]/20 transition-colors duration-500"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                >
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <h3 className="font-display font-medium text-white/90 text-xl group-hover:text-white luxury-transition">
                    {step.title}
                  </h3>
                  <span className="inline-flex items-center text-[10px] tracking-[0.3em] uppercase text-[#D4AF37]/70 border border-[#D4AF37]/20 rounded-full px-4 py-1.5 w-fit">
                    {step.duration}
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed max-w-[520px] group-hover:text-white/75 luxury-transition">
                  {step.description}
                </p>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute left-[2.75rem] top-full w-px h-8 bg-gradient-to-b from-white/[0.06] to-transparent" />
              )}
            </motion.div>
          ))}
          {/* Last border */}
          <div className="border-t border-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}

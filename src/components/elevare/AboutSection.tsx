import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const differentiators = [
  'Equipe sênior com mais de 10 anos de experiência',
  'Metodologia exclusiva orientada a resultados',
  'Código proprietário sem dependências de templates',
  'Relatórios de performance mensais detalhados',
  'Suporte prioritário com resposta em até 24h',
  'Garantia de satisfação em todos os projetos',
];

const values = [
  {
    label: 'Excelência',
    text: 'Entregamos o extraordinário. Nenhum projeto é concluído sem passar pelo nosso mais alto padrão técnico.',
  },
  {
    label: 'Transparência',
    text: 'Comunicação direta em cada etapa. Você sabe exatamente o que está sendo construído e quais resultados esperar.',
  },
  {
    label: 'Impacto',
    text: 'Decisões guiadas por dados. Estética sem performance não faz parte do nosso vocabulário.',
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[#050505] py-24 lg:py-40 px-[5%] lg:px-[8%] overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 90% 40%, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
                Sobre
              </span>
            </div>

            <h2
              className="font-display font-medium text-white tracking-[-0.02em] mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Criados para o{' '}
              <span className="text-[#BDBDBD]">mercado premium.</span>
            </h2>

            <div className="space-y-5 text-[#BDBDBD] text-sm leading-relaxed">
              <p>
                Nascemos da convicção de que o mercado merece agências à altura das melhores do mundo.
                Sem templates e sem promessas vagas — construímos soluções exclusivas com impacto mensurável.
              </p>
              <p>
                Atendemos um número seleto de clientes simultâneos. Isso não é escassez — é comprometimento.
                Todo projeto recebe foco integral da nossa equipe sênior.
              </p>
              <p>
                Nossos clientes entendem que produtos digitais acessíveis e premium não são o mesmo serviço.
                São soluções distintas que entregam resultados radicalmente diferentes.
              </p>
            </div>

            {/* Differentiators */}
            <div className="mt-10 space-y-3">
              {differentiators.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: easeOut }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={15}
                    className="text-[#D4AF37] flex-shrink-0"
                    strokeWidth={1.5}
                  />
                  <span className="text-[#BDBDBD] text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column — Values */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
            className="space-y-5"
          >
            {values.map((value, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] shadow-[0_20px_40px_rgba(0,0,0,0.4)] luxury-transition"
              >
                {/* Accent top line */}
                <div
                  className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: 'linear-gradient(to right, transparent, #D4AF37, transparent)' }}
                />

                <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-4">
                  {value.label}
                </p>
                <p className="text-[#BDBDBD] text-sm leading-relaxed">{value.text}</p>
              </div>
            ))}

            {/* Decorative image element */}
            <div className="relative p-8 rounded-2xl border border-white/[0.05] overflow-hidden min-h-[200px] flex items-center justify-center group luxury-transition hover:border-white/[0.1]">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?auto=format&fit=crop&w=800&q=80"
                  alt="Premium Creative Studio"
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 luxury-transition"
                />
                <div className="absolute inset-0 bg-[#050505]/50" />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 100%)',
                  }}
                />
              </div>

              <div className="relative z-10 text-center">
                <p className="font-display text-[3rem] font-semibold gold-shimmer leading-none mb-2 drop-shadow-2xl">
                  Top 1%
                </p>
                <p className="text-[#BDBDBD] text-sm font-medium tracking-wide">
                  Qualidade global de engenharia e design.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

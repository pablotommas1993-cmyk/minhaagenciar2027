import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const testimonials = [
  {
    quote:
      'A ELEVARE entregou muito além do que esperávamos. O site novo aumentou nossa taxa de conversão em mais de três vezes nos primeiros três meses. É a melhor decisão de investimento que tomamos neste ano.',
    name: 'Ricardo Mendonça',
    role: 'CEO, Castellano Advocacia',
    stars: 5,
  },
  {
    quote:
      'Trabalhar com a ELEVARE foi uma experiência diferente de tudo que já tivemos com agências. Eles entenderam nosso posicionamento de luxo e traduziram isso em uma plataforma que nossos clientes adoram.',
    name: 'Isabella Ferreira',
    role: 'Diretora, Maison Beauté',
    stars: 5,
  },
  {
    quote:
      'As automações que implementaram economizaram mais de 40 horas por semana da nossa equipe. O ROI foi imediato e o suporte é impecável. Não consigo imaginar nosso negócio sem essas soluções.',
    name: 'Marcelo Santos',
    role: 'COO, TechFlow Consultoria',
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-40 px-[5%] lg:px-[8%] overflow-hidden"
      style={{ background: '#060606' }}
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-16 md:mb-20 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6 justify-center">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
              Depoimentos
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <h2
            className="font-display font-medium text-white tracking-[-0.02em]"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.1 }}
          >
            O que nossos clientes dizem.
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: easeOut }}
              className="group relative p-10 rounded-2xl premium-glass hover:bg-white/[0.03] luxury-transition"
            >
              {/* Accent top line */}
              <div
                className="absolute top-0 left-10 right-10 h-px opacity-0 group-hover:opacity-100 luxury-transition"
                style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)' }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-[#D4AF37] text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 text-sm leading-[1.8] mb-10 italic luxury-transition group-hover:text-white/95">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-[#050505]"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F4E0A1)' }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white/90 text-sm font-medium">{t.name}</p>
                  <p className="text-white/50 text-xs tracking-wide">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

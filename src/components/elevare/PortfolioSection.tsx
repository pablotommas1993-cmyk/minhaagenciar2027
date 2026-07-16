import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const projects = [
  {
    category: 'Projeto Conceitual',
    title: 'Advocacia Premium',
    description:
      'Website institucional de alto impacto. Design editorial, performance máxima e posicionamento de autoridade.',
    result: 'Performance Maximizada',
    tags: ['Next.js', 'Design', 'SEO'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    color: '#1a1a1a',
    accent: '#D4AF37',
    size: 'large',
  },
  {
    category: 'Projeto Conceitual',
    title: 'Maison Beauté',
    description:
      'E-commerce premium focado em conversão, com integração completa de pagamentos e logística.',
    result: 'Otimização de Conversão',
    tags: ['React', 'Stripe', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    color: '#111111',
    accent: '#C5A028',
    size: 'small',
  },
  {
    category: 'Projeto Conceitual',
    title: 'TechFlow Consultoria',
    description:
      'Automações com IA. Atendimento escalável, qualificação de leads e CRM inteligente.',
    result: 'Atendimento Inteligente',
    tags: ['n8n', 'GPT-4', 'CRM'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    color: '#0d0d0d',
    accent: '#D4AF37',
    size: 'small',
  },
  {
    category: 'Projeto Conceitual',
    title: 'Clínica Renovare',
    description:
      'Estratégia integrada de Ads e SEO. Posicionamento líder nas buscas e campanhas de alta performance.',
    result: 'SEO Local Estratégico',
    tags: ['Google Ads', 'SEO', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=800&q=80',
    color: '#0f0f0f',
    accent: '#C5A028',
    size: 'large',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="relative py-32 md:py-40 px-[5%] lg:px-[8%] overflow-hidden"
      style={{ background: '#060606' }}
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 20% 60%, rgba(212,175,55,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-16 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-[520px]">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
                Portfólio
              </span>
            </div>
            <h2
              className="font-display font-medium text-white tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Projetos que{' '}
              <span className="text-[#BDBDBD]">geram resultados reais.</span>
            </h2>
          </div>
          <p className="text-[#BDBDBD] text-sm leading-relaxed max-w-[320px] lg:text-right">
            Cada projeto é uma história de transformação. Veja como elevamos negócios reais.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative rounded-2xl border border-white/[0.06] overflow-hidden cursor-default luxury-transition hover:scale-[1.02] ${
                project.size === 'large' ? 'md:row-span-1' : ''
              }`}
              style={{
                background: project.color,
                borderColor: hovered === i ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.06)',
              }}
            >
              {/* Background Mockup Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 luxury-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/90 via-[#060606]/70 to-[#060606] mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent" />
              </div>

              {/* Inner glow on hover */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${project.accent}15 0%, transparent 70%)`,
                    }}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-20 p-8 md:p-10 h-full flex flex-col min-h-[280px]">
                {/* Category */}
                <div className="flex items-center justify-between mb-auto">
                  <span
                    className="text-[10px] tracking-[0.3em] uppercase font-medium"
                    style={{ color: `${project.accent}99` }}
                  >
                    {project.category}
                  </span>
                  <motion.div
                    animate={hovered === i ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -4, y: 4 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center"
                    style={{
                      background: hovered === i ? `${project.accent}15` : 'transparent',
                      borderColor: hovered === i ? `${project.accent}30` : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    <ArrowUpRight size={14} style={{ color: project.accent }} />
                  </motion.div>
                </div>

                {/* Bottom content */}
                <div className="mt-12 md:mt-16">
                  <h3 className="font-display font-medium text-white text-2xl mb-3 tracking-[-0.02em]">
                    {project.title}
                  </h3>
                  <p className="text-[#BDBDBD] text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Result */}
                  <div
                    className="inline-flex items-center gap-2 text-xs font-medium rounded-full px-4 py-1.5 mb-5"
                    style={{
                      background: `${project.accent}12`,
                      color: project.accent,
                      border: `1px solid ${project.accent}20`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                    {project.result}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[10px] tracking-[0.15em] uppercase text-[#BDBDBD]/50 border border-white/[0.06] rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
          className="mt-12 text-center"
        >
          <p className="text-[#BDBDBD] text-sm mb-6">
            Pronto para ser o próximo caso de sucesso?
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#F4E0A1] border border-[#D4AF37]/20 rounded-full px-6 py-3 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/40 luxury-transition cursor-pointer"
          >
            Iniciar um Projeto
            <ArrowUpRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Cpu, Zap, Search, BarChart2, Layers } from 'lucide-react';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  {
    icon: Globe,
    title: 'Websites Premium',
    description:
      'Presença digital de nível mundial. Arquitetura sólida, performance máxima e design focado em conversão.',
    detail: 'Next.js · React · TypeScript · Headless CMS',
    highlight: true,
  },
  {
    icon: Cpu,
    title: 'Inteligência Artificial',
    description:
      'Integramos IA ao seu negócio. Chatbots, automação de atendimento e análise preditiva em escala.',
    detail: 'GPT-4 · Claude · Automação · Machine Learning',
    highlight: false,
  },
  {
    icon: Zap,
    title: 'Automações',
    description:
      'Eliminamos tarefas repetitivas. Sua equipe foca no essencial enquanto a tecnologia trabalha.',
    detail: 'n8n · Make · Zapier · APIs · Webhooks',
    highlight: false,
  },
  {
    icon: Search,
    title: 'SEO Avançado',
    description:
      'Posicionamos sua empresa no topo do Google com estratégias técnicas para tráfego qualificado e consistente.',
    detail: 'Core Web Vitals · Schema · Link Building · Conteúdo',
    highlight: false,
  },
  {
    icon: BarChart2,
    title: 'Google Ads',
    description:
      'Campanhas de performance focadas em ROI. Cada centavo é rastreado e otimizado para o máximo retorno.',
    detail: 'Search · Display · YouTube · Remarketing · Shopping',
    highlight: false,
  },
  {
    icon: Layers,
    title: 'Estratégia Digital',
    description:
      'A estratégia completa do seu negócio. Posicionamento, identidade e ecossistema integrado de crescimento.',
    detail: 'Branding · Funis · Analytics · Growth Hacking',
    highlight: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-[#050505] py-32 md:py-40 px-[5%] lg:px-[8%] overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={headerVariants}
        className="mb-16 md:mb-20 max-w-[680px]"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
            Serviços
          </span>
        </div>
        <h2
          className="font-display font-medium text-white tracking-[-0.02em] mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
        >
          Tudo que seu negócio digital{' '}
          <span className="text-[#BDBDBD]">precisa para crescer.</span>
        </h2>
        <p className="text-[#BDBDBD] text-base leading-relaxed max-w-[520px]">
          Cada serviço é executado por especialistas com metodologia própria, entregando resultados
          mensuráveis e sustentáveis para o seu negócio.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px premium-glass rounded-2xl overflow-hidden"
      >
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`group relative p-8 md:p-10 bg-transparent hover:bg-white/[0.02] luxury-transition cursor-default`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 100%)',
                }}
              />

              {/* Icon */}
              <div className="mb-8 inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/[0.05] bg-white/[0.02] group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/[0.05] luxury-transition">
                <Icon
                  size={20}
                  className="text-white/60 group-hover:text-[#D4AF37] luxury-transition"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className="font-display font-medium text-white/90 text-lg mb-4 group-hover:text-white luxury-transition">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-8 luxury-transition group-hover:text-white/70">
                {service.description}
              </p>

              {/* Tech detail */}
              <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase font-medium group-hover:text-[#D4AF37]/80 transition-colors duration-300">
                {service.detail}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37]/20 transition-all duration-700"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

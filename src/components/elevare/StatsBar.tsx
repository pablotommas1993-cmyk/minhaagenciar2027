import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { value: 4, suffix: '+', label: 'Projetos em andamento' },
  { value: 100, suffix: '%', label: 'Foco no cliente' },
  { value: 24, suffix: 'h', label: 'Suporte estratégico' },
  { value: 100, suffix: '%', label: 'Projetos personalizados' },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (val: number) => setDisplay(Math.round(val)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="font-display font-semibold text-white tracking-[-0.02em]"
      style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}
    >
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
      className="relative z-10 w-full border-t border-white/[0.06] backdrop-blur-xl"
      style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
      }}
    >
      <div className="px-[5%] lg:px-[8%] py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`px-4 md:px-8 ${i > 0 ? 'md:border-l border-white/[0.06]' : ''}`}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-1.5 text-[11px] md:text-xs text-[#BDBDBD] tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  {
    value: '245',
    rawValue: 245,
    prefix: '',
    suffix: '',
    decimals: 0,
    label: 'contatos gerados',
  },
  {
    value: 'R$ 2,36 mil',
    rawValue: 2.36,
    prefix: 'R$ ',
    suffix: ' mil',
    decimals: 2,
    label: 'investidos',
  },
  {
    value: 'R$ 9,63',
    rawValue: 9.63,
    prefix: 'R$ ',
    suffix: '',
    decimals: 2,
    label: 'custo por contato',
  },
  {
    value: '5,21 mil',
    rawValue: 5.21,
    prefix: '',
    suffix: ' mil',
    decimals: 2,
    label: 'impressões',
  },
];

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Counter({
  value,
  rawValue,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: string;
  rawValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || rawValue === undefined) return;
    const controls = animate(0, rawValue, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (val: number) => {
        const formatted =
          decimals > 0
            ? val.toFixed(decimals).replace('.', ',')
            : Math.round(val).toString();
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, rawValue, prefix, suffix, decimals]);

  return (
    <span
      ref={ref}
      className="font-display font-semibold text-white tracking-[-0.02em]"
      style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontVariantNumeric: 'tabular-nums' }}
    >
      {display}
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
              <Counter
                value={stat.value}
                rawValue={stat.rawValue}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
              <p className="mt-1.5 text-[11px] md:text-xs text-[#BDBDBD] tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 px-4 md:px-8 text-[10px] md:text-[11px] text-[#BDBDBD]/80 tracking-wide">
          Resultados de campanhas gerenciadas pela Orvion em contas de clientes (dados anonimizados). Período: 1 jul a 27 set de 2026. Resultados variam conforme segmento e investimento.
        </p>
      </div>
    </motion.div>
  );
}

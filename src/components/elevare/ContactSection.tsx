import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, MessageSquare, Phone } from 'lucide-react';

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

const contactItems = [
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contato@orvionstudio.com.br',
    href: 'mailto:contato@orvionstudio.com.br',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+55 11 97999-1680',
    href: 'https://wa.me/5511979991680',
  },
  {
    icon: MessageSquare,
    label: 'Resposta em',
    value: 'Até 24 horas úteis',
    href: null,
  },
];

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  service: string;
};

const services = [
  'Website Premium',
  'Inteligência Artificial',
  'Automações',
  'SEO Avançado',
  'Google Ads',
  'Estratégia Digital',
  'Múltiplos Serviços',
];

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: '',
    service: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'O nome é obrigatório.';
    if (!form.email.trim()) {
      newErrors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Insira um endereço de e-mail válido.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'A mensagem deve ter pelo menos 10 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const getInputClass = (hasError?: boolean) =>
    `w-full bg-white/[0.02] border ${
      hasError ? 'border-red-500/50' : 'border-white/[0.06]'
    } rounded-xl px-5 py-4 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/40 focus:bg-white/[0.04] focus:shadow-[0_0_20px_rgba(212,175,55,0.05)] luxury-transition`;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-[#050505] py-16 lg:py-40 px-[5%] lg:px-[8%] overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-16 md:mb-20 max-w-[640px]"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] font-medium">
              Contato
            </span>
          </div>
          <h2
            className="font-display font-medium text-white tracking-[-0.02em] mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Pronto para elevar{' '}
            <span className="text-[#BDBDBD]">seu negócio?</span>
          </h2>
          <p className="text-[#BDBDBD] text-sm leading-relaxed">
            Agende uma conversa estratégica gratuita. Vamos analisar seu negócio e apresentar como
            podemos transformá-lo em uma referência digital no seu mercado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form — takes 3 of 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.03]">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F4E0A1)' }}
                >
                  <ArrowRight size={20} className="text-[#050505]" />
                </div>
                <h3 className="font-display text-white text-xl font-medium mb-3">
                  Mensagem enviada!
                </h3>
                <p className="text-[#BDBDBD] text-sm max-w-[320px] leading-relaxed">
                  Recebemos sua solicitação. Nossa equipe entrará em contato em até 24 horas úteis.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[11px] tracking-[0.2em] uppercase text-[#BDBDBD]/60 mb-2 font-medium">
                      Nome *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className={getInputClass(!!errors.name)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      required
                    />
                    {errors.name && <p id="name-error" className="text-red-400 text-xs mt-2">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] tracking-[0.2em] uppercase text-[#BDBDBD]/60 mb-2 font-medium">
                      E-mail *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className={getInputClass(!!errors.email)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email && <p id="email-error" className="text-red-400 text-xs mt-2">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-[11px] tracking-[0.2em] uppercase text-[#BDBDBD]/60 mb-2 font-medium">
                      Empresa
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Nome da empresa"
                      className={getInputClass()}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-[11px] tracking-[0.2em] uppercase text-[#BDBDBD]/60 mb-2 font-medium">
                      Serviço de interesse
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`${getInputClass()} cursor-pointer`}
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-[#0a0a0a]">
                        Selecione...
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-[#0a0a0a]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] tracking-[0.2em] uppercase text-[#BDBDBD]/60 mb-2 font-medium">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Conte-nos sobre seu projeto, objetivos e desafios..."
                    rows={5}
                    className={`${getInputClass(!!errors.message)} resize-none`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    required
                  />
                  {errors.message && <p id="message-error" className="text-red-400 text-xs mt-2">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-xl py-4 font-medium text-[#050505] text-sm flex items-center justify-center gap-2 luxury-transition disabled:opacity-70 cursor-pointer border-none relative overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_6px_20px_rgba(0,0,0,0.2)]"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E0A1 50%, #D4AF37 100%)',
                  }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 luxury-transition pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)' }}
                  />
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full"
                        style={{ animation: 'spin 0.7s linear infinite' }}
                      />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      Solicitar Diagnóstico Gratuito
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact info — takes 2 of 5 cols */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
            className="lg:col-span-2 space-y-6"
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group flex items-start gap-5 p-8 rounded-2xl premium-glass hover:bg-white/[0.03] luxury-transition"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/[0.05] luxury-transition">
                    <Icon size={18} className="text-[#BDBDBD] group-hover:text-[#D4AF37] luxury-transition" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#BDBDBD]/50 font-medium mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-white text-sm hover:text-[#F4E0A1] transition-colors duration-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Promise box */}
            <div
              className="relative p-6 rounded-2xl border border-[#D4AF37]/10 overflow-hidden"
              style={{ background: 'rgba(212,175,55,0.03)' }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 100%)',
                }}
              />
              <div className="relative z-10">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-medium mb-3">
                  Nossa promessa
                </p>
                <p className="text-[#BDBDBD] text-sm leading-relaxed">
                  A primeira conversa é sempre estratégica e gratuita. Sem obrigação. Sem pressão.
                  Só valor real para o seu negócio.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

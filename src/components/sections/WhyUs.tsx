'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Globe, Tag, FileCheck, Quote } from 'lucide-react';

const VALUE_ICONS = [Shield, Globe, Tag, FileCheck];
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STATS = [
  { value: 100, suffix: '+', key: 'clients'   },
  { value: 79,  suffix: '',  key: 'austria'   },
  { value: 5,   suffix: '',  key: 'team'      },
  { value: 100, suffix: '%', key: 'aiPowered' },
] as const;

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const raf = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, labelKey }: { value: number; suffix: string; labelKey: string }) {
  const t = useTranslations('whyUs');
  const { count, ref } = useCountUp(value);

  return (
    <div className="bg-navy-muted/40 px-8 py-9 flex flex-col gap-1.5">
      <span className="font-serif font-bold text-offwhite leading-none tracking-tighter"
            style={{ fontSize: 'clamp(2.25rem,3.5vw,3.25rem)' }}>
        <span ref={ref}>{count}</span>
        <span className="text-gold">{suffix}</span>
      </span>
      <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/25">
        {t(`stats.${labelKey}`)}
      </p>
    </div>
  );
}

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const testimonial = t.raw('testimonial') as { quote: string; author: string; detail: string };

  return (
    <section id="why-us" className="py-32 bg-navy overflow-hidden relative">
      {/* Subtle side gradient */}
      <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-navy-light/20 to-transparent pointer-events-none" />
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── Header ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gold/50 mb-5">
              03 · Why BBH
            </p>
            <h2 className="font-serif text-4xl md:text-[2.75rem] font-bold text-offwhite leading-tight">
              {t('title')}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[0.9375rem] text-offwhite/55 leading-[1.75] font-light max-w-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease }}
          className="grid grid-cols-2 md:grid-cols-4 mb-20"
          style={{ border: '0.5px solid rgba(255,255,255,0.07)' }}
        >
          {STATS.map((s) => (
            <div key={s.key} style={{ border: '0.5px solid rgba(255,255,255,0.07)' }}>
              <StatCard value={s.value} suffix={s.suffix} labelKey={s.key} />
            </div>
          ))}
        </motion.div>

        {/* ── Values + Testimonial — two-col layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {(t.raw('values') as Array<{ title: string; description: string }>).map((item, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, ease, delay: i * 0.08 }}
                  className="flex flex-col gap-3.5"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ border: '0.5px solid rgba(184,151,90,0.25)' }}
                  >
                    <Icon size={16} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-[1.0625rem] font-semibold text-offwhite leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed font-light">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <div
              className="relative p-8 bg-navy-muted/30"
              style={{ border: '0.5px solid rgba(184,151,90,0.18)' }}
            >
              {/* Opening quote mark */}
              <Quote
                size={32}
                className="text-gold/20 mb-5 -ml-1"
                strokeWidth={1}
              />

              <blockquote className="font-serif text-xl font-medium text-offwhite leading-[1.55] tracking-tight mb-6">
                "{testimonial.quote}"
              </blockquote>

              <div
                className="pt-5"
                style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-[13px] font-semibold text-gold">
                  {testimonial.author}
                </p>
                <p className="text-[11px] text-white/30 mt-0.5 font-light">
                  {testimonial.detail}
                </p>
              </div>

              {/* Gold corner accent */}
              <div className="absolute top-0 right-0 w-6 h-6">
                <div className="absolute top-0 right-0 w-px h-6 bg-gold/30" />
                <div className="absolute top-0 right-0 w-6 h-px bg-gold/30" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

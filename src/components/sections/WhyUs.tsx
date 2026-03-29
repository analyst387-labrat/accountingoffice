'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Globe, Tag, FileCheck } from 'lucide-react';

const VALUE_ICONS = [Shield, Globe, Tag, FileCheck];

const STATS = [
  { value: 100, suffix: '+', key: 'clients' },
  { value: 79, suffix: '', key: 'austria' },
  { value: 10, suffix: '+', key: 'years' },
  { value: 100, suffix: '%', key: 'compliance' },
] as const;

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const raf = requestAnimationFrame(function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, labelKey }: { value: number; suffix: string; labelKey: string }) {
  const t = useTranslations('whyUs');
  const { count, ref } = useCountUp(value);

  return (
    <div className="bg-navy px-8 py-10 flex flex-col gap-2">
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className="font-serif text-5xl md:text-6xl font-bold text-navy tabular-nums"
      >
        <span className="text-offwhite">
          {count}{suffix}
        </span>
      </span>
      <p className="text-xs font-medium tracking-[0.1em] uppercase text-offwhite/30">
        {t(`stats.${labelKey}`)}
      </p>
    </div>
  );
}

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <section id="why-us" className="py-32 bg-navy overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-light/30 to-transparent pointer-events-none" />
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-gold/60 mb-4">
              03 · Why BBH
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-offwhite leading-tight">
              {t('title')}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base text-offwhite/50 leading-relaxed font-light max-w-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-offwhite/5 rounded-sm overflow-hidden mb-20"
        >
          {STATS.map((stat) => (
            <StatCard
              key={stat.key}
              value={stat.value}
              suffix={stat.suffix}
              labelKey={stat.key}
            />
          ))}
        </motion.div>

        {/* Value props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {(t.raw('values') as Array<{ title: string; description: string }>).map((item, i) => {
            const Icon = VALUE_ICONS[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-sm border border-gold/20 flex items-center justify-center">
                  <Icon size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-offwhite leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-offwhite/40 leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

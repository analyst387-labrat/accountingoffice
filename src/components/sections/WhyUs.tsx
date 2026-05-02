'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Shield, Globe, Tag, FileCheck, Quote } from 'lucide-react';
import { RevealOnScroll, SectionLabel, SectionHeading } from '@/components/ui/reveal';

const VALUE_ICONS = [Shield, Globe, Tag, FileCheck];

const STATS = [
  { value: 100, suffix: '+', key: 'clients'   },
  { value: 79,  suffix: '',  key: 'austria'   },
  { value: 7,   suffix: '',  key: 'team'      },
  { value: 100, suffix: '%', key: 'aiPowered' },
] as const;

function useCountUp(target: number, duration = 1400) {
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
      <span
        className="font-sans font-black text-offwhite leading-none"
        style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.05em' }}
      >
        <span ref={ref}>{count}</span>
        <span className="text-gold">{suffix}</span>
      </span>
      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-white/25">
        {t(`stats.${labelKey}`)}
      </p>
    </div>
  );
}

type PracticeItem = { k: string; v: string };

function PracticeStrip() {
  const t = useTranslations('whyUs');
  const practice = t.raw('practice') as { title: string; items: PracticeItem[] };

  return (
    <div className="mt-24 -mx-6 lg:-mx-10">
      {/* Bridge illustration band */}
      <div className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-muted/60 border-t border-white/[0.06]">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to right, var(--color-navy) 0%, transparent 25%)' }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{ background: 'linear-gradient(to top, var(--color-navy) 0%, transparent 30%)' }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', mass: 0.5, damping: 32, stiffness: 65, delay: 0.2 }}
            className="flex justify-end"
          >
            <Image
              src="/images/office/Sarajevo Bridge.png"
              alt=""
              width={900}
              height={320}
              className="w-[70%] h-auto"
              style={{ filter: 'invert(1) brightness(0.7)', mixBlendMode: 'screen', opacity: 0.18 }}
              aria-hidden
            />
          </motion.div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-10 py-10 flex items-end justify-between gap-4 flex-wrap">
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-offwhite/30 font-sans">
            Bridging EU practice with BiH capacity
          </span>
          <span className="text-[10px] font-mono tracking-[0.18em] text-offwhite/20">
            Latin Bridge · Sarajevo
          </span>
        </div>
      </div>

      {/* Practice grid */}
      <div className="border-t border-white/[0.06] bg-navy-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <RevealOnScroll direction="up" delay={0.04}>
            <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-gold/60 font-sans mb-3">
              /Practice card
            </p>
            <h3
              className="font-serif font-semibold text-offwhite tracking-tight mb-10"
              style={{ fontSize: 'clamp(1.375rem, 2.5vw, 2rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              {practice.title}
            </h3>
          </RevealOnScroll>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ border: '0.5px solid rgba(255,255,255,0.06)' }}
          >
            {practice.items.map((item, i) => (
              <RevealOnScroll
                key={i}
                direction="up"
                delay={i * 0.06}
                className="flex flex-col gap-3 px-7 py-7"
                style={{ borderRight: '0.5px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase font-mono"
                  style={{ color: '#7fa9c4' }}>
                  {String(i + 1).padStart(2, '0')} · {item.k}
                </p>
                <p className="text-[13.5px] text-offwhite/60 leading-relaxed font-light">
                  {item.v}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const testimonial = t.raw('testimonial') as { quote: string; author: string; detail: string };

  return (
    <section id="why-us" className="py-20 lg:py-[120px] bg-navy overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-navy-light/15 to-transparent pointer-events-none" />
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <RevealOnScroll direction="left">
            <SectionLabel light>03 · Operating Principles</SectionLabel>
            <SectionHeading light>{t('title')}</SectionHeading>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.08} className="flex items-end">
            <p className="text-[0.9375rem] text-offwhite/55 leading-relaxed font-light max-w-lg">
              {t('subtitle')}
            </p>
          </RevealOnScroll>
        </div>

        {/* Stats row */}
        <RevealOnScroll
          direction="up"
          delay={0.04}
          className="grid grid-cols-2 md:grid-cols-4 mb-20"
          style={{ border: '0.5px solid rgba(255,255,255,0.06)' }}
        >
          {STATS.map((s) => (
            <div key={s.key} style={{ border: '0.5px solid rgba(255,255,255,0.06)' }}>
              <StatCard value={s.value} suffix={s.suffix} labelKey={s.key} />
            </div>
          ))}
        </RevealOnScroll>

        {/* Values + Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            {(t.raw('values') as Array<{ title: string; description: string }>).map((item, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <RevealOnScroll key={i} direction="up" delay={i * 0.07} className="flex flex-col gap-3.5">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ border: '0.5px solid rgba(184,151,90,0.22)' }}
                  >
                    <Icon size={16} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-[1.0625rem] font-semibold text-offwhite leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed font-light">
                    {item.description}
                  </p>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Testimonial */}
          <RevealOnScroll direction="right" delay={0.12} className="flex flex-col justify-center">
            <div
              className="relative p-8 bg-navy-muted/30"
              style={{ border: '0.5px solid rgba(184,151,90,0.15)' }}
            >
              <Quote size={32} className="text-gold/18 mb-5 -ml-1" strokeWidth={1} />
              <blockquote className="font-serif text-xl font-medium text-offwhite leading-[1.55] tracking-tight mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="pt-5" style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
                <p className="text-[13px] font-semibold text-gold">{testimonial.author}</p>
                <p className="text-[11px] text-white/30 mt-0.5 font-light">{testimonial.detail}</p>
              </div>
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-6 h-6">
                <div className="absolute top-0 right-0 w-px h-6 bg-gold/25" />
                <div className="absolute top-0 right-0 w-6 h-px bg-gold/25" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Practice strip — full bleed below the padded container */}
      <PracticeStrip />
    </section>
  );
}
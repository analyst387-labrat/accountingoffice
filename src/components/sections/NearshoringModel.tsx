'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Phone, Layers, CheckSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RevealOnScroll, SectionLabel, SectionHeading, spring } from '@/components/ui/reveal';

const STEP_ICONS = [Phone, Layers, CheckSquare] as const;
type StepKey = 'intro' | 'pilot' | 'scale';
const STEPS: StepKey[] = ['intro', 'pilot', 'scale'];

function TimelineBar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="hidden md:block absolute top-[3.25rem] left-[8%] right-[8%] h-px z-0">
      <div className="absolute inset-0 bg-navy/8" />
      <motion.div className="absolute inset-y-0 left-0 right-0 origin-left timeline-track" style={{ scaleX }} />
    </div>
  );
}

function StepCard({ stepKey, index }: { stepKey: StepKey; index: number }) {
  const t = useTranslations('nearshoring');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = STEP_ICONS[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.14 }}
      className="relative z-10 flex flex-col items-start px-6 lg:px-8 pt-0 pb-10 group"
    >
      {/* Node circle */}
      <div className="relative mb-8">
        <div className={cn(
          'w-[52px] h-[52px] flex items-center justify-center transition-colors duration-500',
          'bg-offwhite group-hover:bg-gold',
          'shadow-[0_0_0_1px_rgba(0,31,63,0.08)] group-hover:shadow-[0_0_0_1px_rgba(184,151,90,0.45)]'
        )}>
          <Icon size={20} className="text-navy transition-colors duration-500" strokeWidth={1.5} />
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-ping bg-gold/12 rounded-full" />
        </div>
      </div>

      <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-gold mb-2">
        {t(`steps.${stepKey}.detail`)}
      </span>
      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-light mb-2 font-sans">
        {t(`steps.${stepKey}.label`)}
      </p>
      <h3 className="font-serif text-[1.25rem] font-bold text-navy leading-snug tracking-tight mb-3">
        {t(`steps.${stepKey}.title`)}
      </h3>
      <p className="text-[13.5px] text-slate leading-relaxed font-light max-w-[280px]">
        {t(`steps.${stepKey}.description`)}
      </p>

      {index < STEPS.length - 1 && (
        <div className="md:hidden mt-8 w-px h-10 bg-gradient-to-b from-gold/35 to-transparent ml-[26px]" />
      )}
    </motion.div>
  );
}

export default function NearshoringModel() {
  const t = useTranslations('nearshoring');

  return (
    <section id="nearshoring" className="py-20 lg:py-[120px] bg-offwhite-warm relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-navy/6 to-transparent" />

      {/* Sarajevo Bridge — ink illustration ghost, bottom-right */}
      <div className="absolute bottom-0 right-0 w-[66%] md:w-[53%] pointer-events-none select-none">
        {/* Fade mask: left edge fades to transparent so the bridge bleeds in naturally */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to right, var(--color-offwhite-warm) 0%, transparent 30%)',
          }}
        />
        {/* Bottom fade so it sits flush with section edge */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to top, var(--color-offwhite-warm) 0%, transparent 18%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', mass: 0.5, damping: 30, stiffness: 70, delay: 0.35 }}
        >
          <Image
            src="/images/office/Sarajevo Bridge.png"
            alt=""
            width={900}
            height={420}
            className="w-full h-auto"
            style={{ mixBlendMode: 'multiply', opacity: 0.1 }}
            aria-hidden
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <RevealOnScroll direction="left">
            <SectionLabel>04 · Process</SectionLabel>
            <SectionHeading className="line-accent">{t('title')}</SectionHeading>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.08} className="flex items-end">
            <p className="text-[0.9375rem] text-slate leading-relaxed font-light max-w-lg">
              {t('subtitle')}
            </p>
          </RevealOnScroll>
        </div>

        {/* Timeline */}
        <div className="relative">
          <TimelineBar />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {STEPS.map((key, i) => (
              <StepCard key={key} stepKey={key} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <RevealOnScroll direction="up" delay={0.2} className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-navy text-offwhite text-[13px] font-semibold tracking-wide px-8 py-4 hover:bg-navy-light active:opacity-80 transition-colors duration-500"
          >
            {t('cta')}
            <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
          <p className="text-[12px] text-slate-light font-light tracking-wide">
            Three stages. Documented, supervised, SLA-governed.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Phone, Layers, CheckSquare, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
const STEP_ICONS = [Phone, Layers, CheckSquare] as const;

type StepKey = 'intro' | 'pilot' | 'scale';
const STEPS: StepKey[] = ['intro', 'pilot', 'scale'];

/* ── Animated gold timeline bar ── */
function TimelineBar() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="hidden md:block absolute top-[3.25rem] left-[8%] right-[8%] h-px z-0">
      {/* Track */}
      <div className="absolute inset-0 bg-navy/10" />
      {/* Animated fill */}
      <motion.div
        className="absolute inset-y-0 left-0 right-0 origin-left timeline-track"
        style={{ scaleX }}
      />
    </div>
  );
}

/* ── Single step card ── */
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
      transition={{ duration: 0.65, ease, delay: index * 0.16 }}
      className="relative z-10 flex flex-col items-start px-6 lg:px-8 pt-0 pb-10 group"
    >
      {/* Node circle on timeline */}
      <div className="relative mb-8">
        {/* Outer ring — animates gold on hover */}
        <div
          className={cn(
            'w-[52px] h-[52px] flex items-center justify-center transition-colors duration-400',
            'bg-offwhite group-hover:bg-gold',
            'shadow-[0_0_0_1px_rgba(0,31,63,0.10)] group-hover:shadow-[0_0_0_1px_rgba(184,151,90,0.5)]'
          )}
        >
          <Icon
            size={20}
            className="text-navy group-hover:text-navy transition-colors duration-400"
            strokeWidth={1.5}
          />
        </div>
        {/* Active pulse on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 animate-ping bg-gold/15 rounded-full" />
        </div>
      </div>

      {/* Detail pill */}
      <span
        className="text-[9px] font-bold tracking-[0.2em] uppercase text-gold mb-2"
        style={{ letterSpacing: '0.18em' }}
      >
        {t(`steps.${stepKey}.detail`)}
      </span>

      {/* Label */}
      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-light mb-2">
        {t(`steps.${stepKey}.label`)}
      </p>

      {/* Title */}
      <h3 className="font-serif text-[1.375rem] font-bold text-navy leading-snug tracking-tight mb-3 group-hover:text-navy transition-colors">
        {t(`steps.${stepKey}.title`)}
      </h3>

      {/* Description */}
      <p className="text-[13.5px] text-slate leading-[1.72] font-light max-w-[280px]">
        {t(`steps.${stepKey}.description`)}
      </p>

      {/* Separator (mobile) */}
      {index < STEPS.length - 1 && (
        <div className="md:hidden mt-8 w-px h-10 bg-gradient-to-b from-gold/40 to-transparent ml-[26px]" />
      )}
    </motion.div>
  );
}

export default function NearshoringModel() {
  const t = useTranslations('nearshoring');

  return (
    <section id="nearshoring" className="py-32 bg-offwhite-warm relative overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-navy/8 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ── Header ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-light mb-5">
              04 · Process
            </p>
            <h2 className="font-serif text-4xl md:text-[2.75rem] font-bold text-navy leading-tight line-accent">
              {t('title')}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-[0.9375rem] text-slate leading-[1.75] font-light max-w-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          <TimelineBar />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {STEPS.map((key, i) => (
              <StepCard key={key} stepKey={key} index={i} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: 0.55 }}
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-navy text-offwhite text-[13px] font-semibold tracking-wide px-8 py-4 hover:bg-navy-light transition-colors duration-200"
          >
            {t('cta')}
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <p className="text-[12px] text-slate-light font-light tracking-wide">
            Seamless onboarding process with clear milestones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

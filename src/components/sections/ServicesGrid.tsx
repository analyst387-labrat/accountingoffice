'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { RevealOnScroll, SectionLabel, SectionHeading } from '@/components/ui/reveal';

// ── Types ────────────────────────────────────────────────────────────
type ServiceKey = 'accounting' | 'payroll' | 'austrian' | 'strategy' | 'feasibility' | 'grants';

// ── Layout config ────────────────────────────────────────────────────
// Each entry: col span classes + optional vertical offset (asymmetric break)
const LAYOUT: Record<ServiceKey, { span: string; offset?: string }> = {
  accounting:  { span: 'md:col-span-8' },
  payroll:     { span: 'md:col-span-4' },
  austrian:    { span: 'md:col-span-4' },
  strategy:    { span: 'md:col-span-4', offset: 'md:-mt-12' },
  feasibility: { span: 'md:col-span-4' },
  grants:      { span: 'md:col-span-7' },
};

const SERVICE_KEYS: ServiceKey[] = [
  'accounting', 'payroll',
  'austrian', 'strategy', 'feasibility',
  'grants',
];

const AUSTRIAN_PILLS = ['Steuerberater Support', 'Digital Archiving', 'DSGVO/GDPR'];

// ── Stagger entrance ─────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const entranceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, mass: 0.4, damping: 28, stiffness: 85 },
  },
};

// ── Hover sub-variants (propagated from inner hover manager) ─────────
const topBorderVariants = {
  rest:  { backgroundColor: 'rgba(0,0,0,0.08)' },
  hover: { backgroundColor: '#B8975A', transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const contentShiftVariants = {
  rest:  { x: 0 },
  hover: { x: 4, transition: { type: 'spring' as const, mass: 0.35, damping: 26, stiffness: 100 } },
};

// ── Card component ───────────────────────────────────────────────────
function ServiceCard({ serviceKey, index }: { serviceKey: ServiceKey; index: number }) {
  const t = useTranslations('services');
  const { span, offset } = LAYOUT[serviceKey];
  const isAustrian = serviceKey === 'austrian';
  const num = String(index + 1).padStart(2, '0');

  return (
    // Outer: participates in entrance stagger
    <motion.article
      variants={entranceVariants}
      className={cn('col-span-12 relative', span, offset)}
    >
      {/* Inner: manages hover state, propagates to children */}
      <motion.div
        className="relative h-full pt-7 pb-10 pr-8 overflow-hidden cursor-default"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Animated top border line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[0.5px]"
          variants={topBorderVariants}
        />

        {/* Ghost index number — large serif, faint */}
        <span
          className="absolute right-4 top-2 font-serif font-bold select-none pointer-events-none leading-none"
          style={{
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            opacity: 0.04,
            color: '#001F3F',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
          aria-hidden
        >
          {num}
        </span>

        {/* Content — shifts 4px right on hover */}
        <motion.div
          variants={contentShiftVariants}
          className="relative z-10 flex flex-col gap-4"
        >
          {/* Tag — bare, no box */}
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-slate-400 font-sans">
            {t(`items.${serviceKey}.tag`)}
          </span>

          {/* Title */}
          <h3
            className={cn(
              'font-serif font-semibold tracking-tighter text-navy leading-snug',
              // Wider cards get larger title
              serviceKey === 'accounting'
                ? 'text-[1.625rem] md:text-[1.875rem]'
                : 'text-[1.25rem] md:text-[1.375rem]'
            )}
          >
            {t(`items.${serviceKey}.title`)}
          </h3>

          {/* Description */}
          <p className="text-[13.5px] text-slate leading-relaxed font-light max-w-[42ch]">
            {t(`items.${serviceKey}.description`)}
          </p>

          {/* Austrian feature pills — bare text labels, gold */}
          {isAustrian && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {AUSTRIAN_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="text-[10px] font-medium tracking-[0.15em] uppercase text-gold/75 font-sans"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

// ── Section ──────────────────────────────────────────────────────────
export default function ServicesGrid() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-20 lg:py-[120px] bg-offwhite">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <RevealOnScroll direction="left">
            <SectionLabel>02 · Services</SectionLabel>
            <SectionHeading className="line-accent">{t('title')}</SectionHeading>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.08} className="flex items-end">
            <p className="text-[0.9375rem] text-slate leading-relaxed font-light max-w-lg">
              {t('subtitle')}
            </p>
          </RevealOnScroll>
        </div>

        {/* 12-col asymmetric editorial grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-12 gap-x-0 gap-y-0"
        >
          {SERVICE_KEYS.map((key, i) => (
            <ServiceCard key={key} serviceKey={key} index={i} />
          ))}

          {/* Active white space after Grants — col-span-5 */}
          <div className="hidden md:block md:col-span-5" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
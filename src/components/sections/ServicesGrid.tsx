'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { RevealOnScroll, SectionLabel, SectionHeading } from '@/components/ui/reveal';

type ServiceKey = 'accounting' | 'payroll' | 'austrian' | 'strategy' | 'feasibility' | 'grants';

// Left column: 01, 03, 05 — Right column (staggered): 02, 04, 06
const LEFT_KEYS:  ServiceKey[] = ['accounting', 'austrian',  'feasibility'];
const RIGHT_KEYS: ServiceKey[] = ['payroll',    'strategy',  'grants'];

const ALL_KEYS: ServiceKey[] = [
  'accounting', 'payroll', 'austrian', 'strategy', 'feasibility', 'grants',
];

const AUSTRIAN_PILLS = ['Steuerberater Support', 'Digital Archiving', 'DSGVO/GDPR'];

// ── Stagger entrance ──────────────────────────────────────────────────
const columnVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const entranceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, mass: 0.4, damping: 28, stiffness: 85 },
  },
};

// ── Hover variants — 0.6s border, spring content shift ───────────────
const topBorderVariants = {
  rest:  { backgroundColor: 'rgba(203,213,225,0.7)' }, // slate-200 equivalent
  hover: {
    backgroundColor: '#001F3F',
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const contentShiftVariants = {
  rest:  { x: 0 },
  hover: {
    x: 4,
    transition: { type: 'spring' as const, mass: 0.35, damping: 26, stiffness: 100 },
  },
};

// ── Card ──────────────────────────────────────────────────────────────
function ServiceCard({ serviceKey }: { serviceKey: ServiceKey }) {
  const t    = useTranslations('services');
  const idx  = ALL_KEYS.indexOf(serviceKey);
  const num  = String(idx + 1).padStart(2, '0');
  const isAustrian = serviceKey === 'austrian';
  const isWide     = serviceKey === 'accounting';

  return (
    <motion.article variants={entranceVariants} className="relative">
      <motion.div
        className="relative pt-8 pb-12 overflow-hidden cursor-default"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Animated top border — full width, 0.5px */}
        <motion.div
          className="absolute top-0 left-0 right-0"
          style={{ height: '0.5px' }}
          variants={topBorderVariants}
        />

        {/* Ghost number — pushed to far right edge, larger */}
        <span
          className="absolute right-0 top-0 font-serif font-bold select-none pointer-events-none leading-none"
          style={{
            fontSize: 'clamp(5.5rem, 11vw, 9rem)',
            opacity: 0.035,
            color: '#001F3F',
            letterSpacing: '-0.04em',
            lineHeight: 0.85,
          }}
          aria-hidden
        >
          {num}
        </span>

        {/* Content — shifts 4px right on hover */}
        <motion.div
          variants={contentShiftVariants}
          className="relative z-10 flex flex-col"
        >
          {/* Micro-label — 9px, bold, wide tracking, plenty of space below */}
          <span
            className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400/80 font-sans mb-5"
          >
            {t(`items.${serviceKey}.tag`)}
          </span>

          {/* Title */}
          <h3
            className={cn(
              'font-serif font-semibold tracking-tighter text-navy leading-snug mb-4',
              isWide
                ? 'text-[1.625rem] md:text-[2rem]'
                : 'text-[1.25rem] md:text-[1.375rem]'
            )}
          >
            {t(`items.${serviceKey}.title`)}
          </h3>

          {/* Description */}
          <p className="text-[13.5px] text-slate leading-relaxed font-light max-w-[44ch]">
            {t(`items.${serviceKey}.description`)}
          </p>

          {/* Austrian pills */}
          {isAustrian && (
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4">
              {AUSTRIAN_PILLS.map((pill) => (
                <span
                  key={pill}
                  className="text-[9px] font-bold tracking-[0.22em] uppercase text-gold/70 font-sans"
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

// ── Section ───────────────────────────────────────────────────────────
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

        {/* Two-column staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 lg:gap-x-32">
          {/* Left column — baseline */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {LEFT_KEYS.map((key) => (
              <ServiceCard key={key} serviceKey={key} />
            ))}
          </motion.div>

          {/* Right column — offset downward for asymmetric stagger */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="md:translate-y-24"
          >
            {RIGHT_KEYS.map((key) => (
              <ServiceCard key={key} serviceKey={key} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
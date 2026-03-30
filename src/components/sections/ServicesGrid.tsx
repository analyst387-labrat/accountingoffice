'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { RevealOnScroll, SectionLabel, SectionHeading } from '@/components/ui/reveal';

type ServiceKey = 'accounting' | 'payroll' | 'austrian' | 'strategy' | 'feasibility' | 'grants';

const SERVICE_KEYS: ServiceKey[] = [
  'accounting', 'payroll', 'austrian', 'strategy', 'feasibility', 'grants',
];

const AUSTRIAN_PILLS = ['Steuerberater Support', 'Digital Archiving', 'DSGVO/GDPR'];

// ── Row component ────────────────────────────────────────────────────
function ServiceRow({
  serviceKey,
  index,
  isHovered,
  anyHovered,
  onEnter,
  onLeave,
}: {
  serviceKey: ServiceKey;
  index: number;
  isHovered: boolean;
  anyHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const t = useTranslations('services');
  const num = String(index + 1).padStart(2, '0');
  const isAustrian = serviceKey === 'austrian';

  return (
    <motion.div
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      animate={{ opacity: anyHovered && !isHovered ? 0.35 : 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative cursor-default group"
    >
      {/* Top border — animates to deep navy on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{ height: '0.5px' }}
        animate={{ backgroundColor: isHovered ? '#001F3F' : 'rgba(203,213,225,0.8)' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Row background — faint cream on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundColor: isHovered ? 'rgba(240,237,230,0.65)' : 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      <div className="relative z-10 flex items-start justify-between gap-12 py-8 px-0">
        {/* Left: meta + title + description */}
        <motion.div
          className="flex flex-col gap-3 min-w-0"
          animate={{ x: isHovered ? 20 : 0 }}
          transition={{ type: 'spring', mass: 0.35, damping: 26, stiffness: 100 }}
        >
          {/* Metadata label */}
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans font-medium text-slate-400">
            {t(`items.${serviceKey}.tag`)}
          </span>

          {/* Title — large elegant serif */}
          <h3
            className="font-serif font-semibold tracking-tighter leading-tight"
            style={{ color: '#1a1a1a', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
          >
            {t(`items.${serviceKey}.title`)}
          </h3>

          {/* Description — hidden by default, fades in on hover */}
          <AnimatePresence initial={false}>
            {isHovered && (
              <motion.div
                key="desc"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col gap-3"
              >
                <p
                  className="text-[13.5px] leading-relaxed font-light max-w-[56ch]"
                  style={{ color: '#666666' }}
                >
                  {t(`items.${serviceKey}.description`)}
                </p>
                {isAustrian && (
                  <div className="flex flex-wrap gap-x-5 gap-y-1">
                    {AUSTRIAN_PILLS.map((pill) => (
                      <span
                        key={pill}
                        className="text-[9px] font-bold tracking-[0.25em] uppercase text-gold/70 font-sans"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right: delicate serif number */}
        <span
          className="font-serif font-normal shrink-0 mt-1 select-none"
          style={{
            fontSize: '0.8125rem',
            color: '#1a1a1a',
            opacity: isHovered ? 0.5 : 0.2,
            letterSpacing: '0.05em',
            transition: 'opacity 0.4s ease',
          }}
        >
          {num}
        </span>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────
export default function ServicesGrid() {
  const t = useTranslations('services');
  const [hoveredKey, setHoveredKey] = useState<ServiceKey | null>(null);

  return (
    <section id="services" className="py-20 lg:py-[120px] bg-offwhite">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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

        {/* Editorial list */}
        <RevealOnScroll direction="up" delay={0.05}>
          {/* Bottom border on the last item */}
          <div style={{ borderBottom: '0.5px solid rgba(203,213,225,0.8)' }}>
            {SERVICE_KEYS.map((key, i) => (
              <ServiceRow
                key={key}
                serviceKey={key}
                index={i}
                isHovered={hoveredKey === key}
                anyHovered={hoveredKey !== null}
                onEnter={() => setHoveredKey(key)}
                onLeave={() => setHoveredKey(null)}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
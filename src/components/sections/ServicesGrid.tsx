'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BookOpen, Users, Globe, TrendingUp, FileSearch, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RevealOnScroll, SectionLabel, SectionHeading } from '@/components/ui/reveal';

const ICONS = {
  accounting: BookOpen,
  payroll: Users,
  austrian: Globe,
  strategy: TrendingUp,
  feasibility: FileSearch,
  grants: Award,
} as const;

type ServiceKey = keyof typeof ICONS;

const CARD_SPANS: Record<ServiceKey, string> = {
  accounting:  'md:col-span-2 lg:col-span-2',
  payroll:     'md:col-span-1 lg:col-span-1',
  austrian:    'md:col-span-1 lg:col-span-1',
  strategy:    'md:col-span-1 lg:col-span-1',
  feasibility: 'md:col-span-1 lg:col-span-1',
  grants:      'md:col-span-2 lg:col-span-2',
};

const SERVICE_KEYS: ServiceKey[] = [
  'accounting', 'payroll', 'austrian', 'strategy', 'feasibility', 'grants',
];

const AUSTRIAN_PILLS = ['Steuerberater Support', 'Digital Archiving', 'DSGVO/GDPR'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, mass: 0.4, damping: 28, stiffness: 90 },
  },
};

export default function ServicesGrid() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-20 lg:py-[120px] bg-offwhite">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
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

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
          style={{ border: '0.5px solid rgba(0,31,63,0.08)' }}
        >
          {SERVICE_KEYS.map((key, i) => {
            const Icon = ICONS[key];
            const isWide = key === 'accounting' || key === 'grants';
            const isAustrian = key === 'austrian';

            return (
              <motion.div
                key={key}
                variants={cardVariants}
                className={cn(
                  'group relative bg-offwhite hover:bg-navy active:bg-navy-light',
                  'transition-colors duration-500 cursor-default overflow-hidden h-full',
                  'border-[0.5px] border-navy/8 hover:border-gold/25',
                  CARD_SPANS[key]
                )}
              >
                {/* Hover shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.015] to-transparent" />

                <div
                  className={cn(
                    'relative z-10 p-8 md:p-9 h-full flex flex-col gap-5',
                    isWide ? 'md:flex-row md:items-start md:gap-12' : ''
                  )}
                >
                  {/* Icon */}
                  <div className="shrink-0">
                    <div
                      className="w-10 h-10 flex items-center justify-center transition-colors duration-500"
                      style={{ border: '0.5px solid rgba(0,31,63,0.10)' }}
                    >
                      <Icon
                        size={18}
                        className="text-slate-light group-hover:text-gold transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <h3 className="font-serif text-xl font-semibold text-navy group-hover:text-offwhite transition-colors duration-500 leading-snug">
                        {t(`items.${key}.title`)}
                      </h3>
                      <span
                        className="shrink-0 text-[9px] font-semibold tracking-[0.18em] uppercase text-slate-light group-hover:text-gold/50 transition-colors duration-500 px-2 py-0.5"
                        style={{ border: '0.5px solid currentColor' }}
                      >
                        {t(`items.${key}.tag`)}
                      </span>
                    </div>

                    <p className="text-[13.5px] text-slate group-hover:text-offwhite/55 transition-colors duration-500 leading-relaxed font-light">
                      {t(`items.${key}.description`)}
                    </p>

                    {isAustrian && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {AUSTRIAN_PILLS.map((pill) => (
                          <span
                            key={pill}
                            className="text-[9px] font-medium tracking-[0.12em] uppercase text-gold/70 group-hover:text-gold/50 transition-colors duration-500 px-2 py-0.5"
                            style={{ border: '0.5px solid currentColor' }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Index */}
                <span className="absolute bottom-5 right-6 font-mono text-[10px] text-navy/[0.05] group-hover:text-white/[0.05] transition-colors duration-500 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
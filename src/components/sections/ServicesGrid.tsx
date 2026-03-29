'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BookOpen, Users, Globe, TrendingUp, FileSearch, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = {
  accounting: BookOpen,
  payroll: Users,
  austrian: Globe,
  strategy: TrendingUp,
  feasibility: FileSearch,
  grants: Award,
} as const;

type ServiceKey = keyof typeof ICONS;

// Bento: on md (2-col), accounting/grants span both cols; on lg (3-col), they span 2
const CARD_SPANS: Record<ServiceKey, string> = {
  accounting: 'md:col-span-2 lg:col-span-2',
  payroll:    'md:col-span-1 lg:col-span-1',
  austrian:   'md:col-span-1 lg:col-span-1',
  strategy:   'md:col-span-1 lg:col-span-1',
  feasibility:'md:col-span-1 lg:col-span-1',
  grants:     'md:col-span-2 lg:col-span-2',
};

const SERVICE_KEYS: ServiceKey[] = [
  'accounting', 'payroll', 'austrian', 'strategy', 'feasibility', 'grants',
];

// Pill tags for the Austrian card showing the 3 specific features
const AUSTRIAN_PILLS = ['Steuerberater Support', 'Digital Archiving', 'DSGVO/GDPR'];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

export default function ServicesGrid() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-32 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-light mb-5">
              02 · Services
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

        {/* Bento grid — thin 0.5px borders */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ border: '0.5px solid rgba(0,31,63,0.10)' }}
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
                  'group relative bg-offwhite hover:bg-navy transition-all duration-500 cursor-default overflow-hidden',
                  'border-[0.5px] border-navy/10 hover:border-gold/30',
                  CARD_SPANS[key]
                )}
              >
                {/* Hover shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.02] to-transparent" />

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
                      style={{ border: '0.5px solid rgba(0,31,63,0.12)' }}
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
                        className="shrink-0 text-[9px] font-semibold tracking-[0.15em] uppercase text-slate-light group-hover:text-gold/50 transition-colors duration-500 px-2 py-0.5"
                        style={{ border: '0.5px solid currentColor' }}
                      >
                        {t(`items.${key}.tag`)}
                      </span>
                    </div>

                    <p className="text-[13.5px] text-slate group-hover:text-offwhite/55 transition-colors duration-500 leading-[1.7] font-light">
                      {t(`items.${key}.description`)}
                    </p>

                    {/* Austrian-specific feature pills */}
                    {isAustrian && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {AUSTRIAN_PILLS.map((pill) => (
                          <span
                            key={pill}
                            className="text-[9px] font-medium tracking-[0.1em] uppercase text-gold/70 group-hover:text-gold/50 transition-colors duration-500 px-2 py-0.5"
                            style={{ border: '0.5px solid currentColor', borderRadius: 0 }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Index */}
                <span className="absolute bottom-5 right-6 font-mono text-[10px] text-navy/[0.06] group-hover:text-white/[0.06] transition-colors duration-500 select-none">
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

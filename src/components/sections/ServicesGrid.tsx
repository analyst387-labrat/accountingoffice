'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  BookOpen,
  Users,
  Globe,
  TrendingUp,
  FileSearch,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ICONS = {
  accounting: BookOpen,
  payroll: Users,
  austrian: Globe,
  strategy: TrendingUp,
  feasibility: FileSearch,
  grants: Award,
} as const;

// Bento layout: first card spans 2 cols, last spans 2 cols, rest 1 col
const CARD_SPANS: Record<string, string> = {
  accounting: 'md:col-span-2',
  payroll: 'md:col-span-1',
  austrian: 'md:col-span-1',
  strategy: 'md:col-span-1',
  feasibility: 'md:col-span-1',
  grants: 'md:col-span-2',
};

const SERVICE_KEYS = [
  'accounting',
  'payroll',
  'austrian',
  'strategy',
  'feasibility',
  'grants',
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function ServicesGrid() {
  const t = useTranslations('services');

  return (
    <section id="services" className="py-32 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-light mb-4">
              02 · Services
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy leading-tight line-accent">
              {t('title')}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base text-slate leading-relaxed font-light max-w-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-navy/10 rounded-sm overflow-hidden"
        >
          {SERVICE_KEYS.map((key, i) => {
            const Icon = ICONS[key];
            const isWide = key === 'accounting' || key === 'grants';

            return (
              <motion.div
                key={key}
                variants={cardVariants}
                className={cn(
                  'group relative bg-offwhite hover:bg-navy transition-colors duration-500 cursor-default',
                  CARD_SPANS[key]
                )}
              >
                <div className={cn('p-8 h-full flex flex-col gap-5', isWide ? 'md:flex-row md:items-start md:gap-10' : '')}>
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-11 h-11 rounded-sm border border-navy/10 group-hover:border-gold/30 flex items-center justify-center transition-colors duration-500">
                      <Icon
                        size={20}
                        className="text-slate group-hover:text-gold transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-xl font-semibold text-navy group-hover:text-offwhite transition-colors duration-500 leading-tight">
                        {t(`items.${key}.title`)}
                      </h3>
                      <span className="shrink-0 text-[10px] font-medium tracking-[0.12em] uppercase text-slate-light group-hover:text-gold/60 transition-colors duration-500 border border-current rounded-sm px-2 py-0.5">
                        {t(`items.${key}.tag`)}
                      </span>
                    </div>
                    <p className="text-sm text-slate group-hover:text-offwhite/60 transition-colors duration-500 leading-relaxed font-light">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </div>

                {/* Index number */}
                <span className="absolute bottom-5 right-6 font-mono text-xs text-navy/10 group-hover:text-offwhite/10 transition-colors duration-500">
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

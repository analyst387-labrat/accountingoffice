'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Phone, Layers, CheckSquare, ArrowRight } from 'lucide-react';

const STEP_ICONS = [Phone, Layers, CheckSquare];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay: i * 0.15 },
  }),
};

export default function NearshoringModel() {
  const t = useTranslations('nearshoring');
  const steps = ['intro', 'pilot', 'scale'] as const;

  return (
    <section id="nearshoring" className="py-32 bg-offwhite-warm relative">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-slate-light mb-4">
              04 · Process
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

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-navy/20 via-gold/40 to-navy/20 z-0" />

          {steps.map((key, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <motion.div
                key={key}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="relative z-10 flex flex-col items-start px-8 py-10 group"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-6 w-full">
                  <div className="w-11 h-11 rounded-sm bg-navy flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-300">
                    <Icon size={18} className="text-offwhite group-hover:text-navy transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  {/* Arrow between steps (desktop only) */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex flex-1 justify-end pr-4">
                      <ArrowRight size={16} className="text-gold/40" />
                    </div>
                  )}
                </div>

                {/* Label */}
                <p className="text-xs font-medium tracking-[0.15em] uppercase text-slate-light mb-2">
                  {t(`steps.${key}.label`)}
                </p>

                {/* Title */}
                <h3 className="font-serif text-2xl font-semibold text-navy mb-3 leading-tight">
                  {t(`steps.${key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate leading-relaxed font-light">
                  {t(`steps.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-navy text-offwhite text-sm font-semibold px-8 py-4 rounded-sm hover:bg-navy-light transition-colors duration-200"
          >
            {t('cta')}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

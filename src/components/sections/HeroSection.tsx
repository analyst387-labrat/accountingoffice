'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy">
      {/* Abstract grid background */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Decorative geometric lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 right-0 w-px h-[140vh] bg-gradient-to-b from-transparent via-gold/20 to-transparent"
          style={{ transform: 'rotate(-12deg) translateX(-20vw)' }}
        />
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-offwhite/5 to-transparent" />
        <div className="absolute -bottom-64 -right-32 w-[600px] h-[600px] rounded-full border border-gold/10" />
        <div className="absolute -bottom-96 -right-64 w-[800px] h-[800px] rounded-full border border-gold/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase text-gold/80 border border-gold/20 rounded-sm px-3 py-1.5">
              <span className="w-1 h-1 rounded-full bg-gold animate-pulse" />
              {t('badge')}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-sm font-medium tracking-[0.12em] uppercase text-offwhite/40"
          >
            {t('tagline')}
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-offwhite leading-[1.05] tracking-tight"
          >
            {t('headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.35 }}
            className="text-base md:text-lg text-offwhite/50 leading-relaxed max-w-lg font-light"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 bg-gold text-navy text-sm font-semibold px-7 py-3.5 rounded-sm hover:bg-gold-light transition-colors duration-200"
            >
              {t('cta_primary')}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 border border-offwhite/20 text-offwhite/70 hover:text-offwhite hover:border-offwhite/40 text-sm font-medium px-7 py-3.5 rounded-sm transition-all duration-200"
            >
              {t('cta_secondary')}
            </a>
          </motion.div>
        </div>

        {/* Right: Stats panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
          className="hidden lg:block"
        >
          <div className="glass rounded-md p-8 space-y-1 border-gold/10">
            <div className="flex items-start justify-between mb-8">
              <div className="space-y-1">
                <div className="w-8 h-0.5 bg-gold" />
                <div className="w-5 h-0.5 bg-gold/40" />
                <div className="w-3 h-0.5 bg-gold/20" />
              </div>
              <span className="text-xs text-offwhite/20 font-mono tracking-widest">BBH.01</span>
            </div>

            <div className="grid grid-cols-2 gap-px bg-offwhite/5 rounded-sm overflow-hidden">
              {[
                { value: '100+', label: 'Active Clients' },
                { value: '79', label: 'Austrian Partners' },
                { value: '10+', label: 'Years Practice' },
                { value: '100%', label: 'SLA Compliance' },
              ].map((stat) => (
                <div key={stat.label} className="bg-navy/60 p-6 flex flex-col gap-1">
                  <span className="font-serif text-4xl font-bold text-offwhite">{stat.value}</span>
                  <span className="text-xs text-offwhite/40 uppercase tracking-[0.1em]">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 flex items-center gap-3 text-xs text-offwhite/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              MSFI · IFRS · GDPR compliant
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-offwhite/20"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

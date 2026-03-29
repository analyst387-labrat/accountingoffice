'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

type StatItem = { value: string; suffix: string; label: string };

export default function HeroSection() {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as StatItem[];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy noise">
      {/* Architectural grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary diagonal */}
        <div
          className="absolute -top-40 -right-20 w-px h-[160vh] bg-gradient-to-b from-transparent via-gold/15 to-transparent"
          style={{ transform: 'rotate(-14deg)' }}
        />
        {/* Secondary vertical */}
        <div className="absolute top-0 left-[38%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
        {/* Concentric arcs */}
        <div className="absolute -bottom-80 -right-40 w-[700px] h-[700px] rounded-full border border-gold/[0.08]" />
        <div className="absolute -bottom-[30rem] -right-60 w-[900px] h-[900px] rounded-full border border-gold/[0.04]" />
        {/* Horizontal accent at 70% height */}
        <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 xl:gap-24 items-center">
        {/* ── Left: Copy ── */}
        <div className="space-y-7 lg:space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0 }}
          >
            <span className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-gold/70 border border-gold/15 px-3.5 py-1.5">
              <span className="w-1 h-1 rounded-full bg-gold/70 animate-pulse" />
              {t('badge')}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="text-[11px] font-medium tracking-[0.18em] uppercase text-offwhite/30"
          >
            {t('tagline')}
          </motion.p>

          {/* H1 — editorial scale */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.18 }}
            className="font-serif font-bold text-offwhite leading-[1.02] tracking-tighter
                       text-[clamp(2.75rem,6vw,5.5rem)]"
          >
            {t('headline')}
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.32 }}
            className="text-base md:text-[1.0625rem] text-offwhite/45 leading-[1.75] max-w-[520px] font-light"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.46 }}
            className="flex flex-wrap gap-3.5 pt-1"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 bg-gold text-navy text-[13px] font-semibold tracking-wide px-7 py-3.5 hover:bg-gold-light transition-colors duration-200"
            >
              {t('cta_primary')}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 border border-white/15 text-offwhite/55 hover:text-offwhite hover:border-white/30 text-[13px] font-medium px-7 py-3.5 transition-all duration-200"
            >
              {t('cta_secondary')}
            </a>
          </motion.div>
        </div>

        {/* ── Right: Stats panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.38 }}
          className="hidden lg:flex flex-col"
        >
          <div className="glass border-0 p-0 overflow-hidden">
            {/* Panel header bar */}
            <div className="flex items-center justify-between px-7 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-0.5 bg-gold" />
                <div className="w-3 h-0.5 bg-gold/40" />
                <div className="w-1.5 h-0.5 bg-gold/20" />
              </div>
              <span className="text-[10px] text-white/15 font-mono tracking-[0.2em]">BBH · 2016</span>
            </div>

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06]">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
                  className="px-7 py-7 flex flex-col gap-1.5"
                >
                  <span className="font-serif text-[2.375rem] font-bold text-offwhite leading-none tracking-tighter">
                    {stat.value}
                    <span className="text-gold text-2xl">{stat.suffix}</span>
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-white/30 leading-tight">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Panel footer */}
            <div className="px-7 py-4 border-t border-white/[0.06] flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] tracking-[0.14em] uppercase text-white/20">
                MSFI · IFRS · GDPR · SLA-backed
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/15"
      >
        <span className="text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

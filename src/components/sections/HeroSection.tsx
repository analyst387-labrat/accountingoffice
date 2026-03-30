'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ease } from '@/components/ui/reveal';

type StatItem = { value: string; suffix: string; label: string };

function MagneticButton({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22 });
  const springY = useSpring(y, { stiffness: 280, damping: 22 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  }
  function onMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group inline-flex items-center gap-2.5 bg-gold text-navy text-[13px] font-semibold tracking-wide px-7 py-4 min-h-[44px] hover:bg-gold-light active:opacity-80 transition-colors duration-500 cursor-pointer select-none"
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection() {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as StatItem[];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-navy noise">
      {/* Subtle grid — left half only */}
      <div className="absolute inset-0 lg:right-1/2 bg-grid opacity-70" />

      {/* Decorative hairlines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 left-[42%] w-px h-[160vh] bg-gradient-to-b from-transparent via-gold/8 to-transparent"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <div className="absolute top-[65%] left-0 right-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-2 min-h-screen">
        {/* ── Left: Copy ── */}
        <div className="flex flex-col justify-center px-6 lg:px-14 xl:px-20 pt-36 pb-20 lg:py-0 space-y-8 lg:space-y-9">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...{ type: 'spring', mass: 0.4, damping: 28, stiffness: 90 }, delay: 0 }}
          >
            <span className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.28em] uppercase text-gold/65 border border-gold/15 px-3.5 py-1.5">
              <span className="w-1 h-1 rounded-full bg-gold/65 animate-pulse" />
              {t('badge')}
            </span>
          </motion.div>

          {/* Tagline — overline style */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', mass: 0.4, damping: 28, stiffness: 90, delay: 0.06 }}
            className="text-[11px] font-semibold tracking-[0.28em] uppercase text-offwhite/25 font-sans"
          >
            {t('tagline')}
          </motion.p>

          {/* H1 — Inter bold, -0.05em, fluid */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', mass: 0.4, damping: 28, stiffness: 90, delay: 0.1 }}
            className="font-sans font-black text-offwhite max-w-[16ch]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.05em', lineHeight: 1.0, fontWeight: 900 }}
          >
            {t('headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', mass: 0.4, damping: 28, stiffness: 90, delay: 0.18 }}
            className="text-base md:text-[1.0625rem] text-offwhite/60 leading-[1.75] max-w-[460px] font-light"
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', mass: 0.4, damping: 28, stiffness: 90, delay: 0.26 }}
            className="flex flex-wrap gap-3.5 pt-1"
          >
            <MagneticButton href="#contact">
              {t('cta_primary')}
              <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1" />
            </MagneticButton>
            <a
              href="#services"
              className="inline-flex items-center gap-2 border border-white/12 text-offwhite/55 hover:text-offwhite hover:border-white/25 active:opacity-70 text-[13px] font-medium px-7 py-4 min-h-[44px] transition-all duration-500"
            >
              {t('cta_secondary')}
            </a>
          </motion.div>

          {/* Mobile stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', mass: 0.4, damping: 28, stiffness: 90, delay: 0.34 }}
            className="lg:hidden grid grid-cols-2 gap-px pt-5 border-t border-white/[0.07]"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5 py-4 pr-4">
                <span
                  className="font-sans font-black text-offwhite leading-none"
                  style={{ fontSize: 'clamp(1.5rem,5vw,2rem)', letterSpacing: '-0.04em' }}
                >
                  {stat.value}
                  <span className="text-gold">{stat.suffix}</span>
                </span>
                <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/30 leading-tight mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Sarajevo photo + floating stats ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="hidden lg:block relative overflow-hidden"
        >
          {/* Photo — object-bottom anchors to the bridge/river foreground */}
          <Image
            src="/images/office/Headline Photo Townhall Sarajevo.png"
            alt="Vijećnica — Sarajevo City Hall"
            fill
            className="object-cover object-center grayscale"
            priority
            sizes="50vw"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/55 to-navy/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/25" />

          {/* Floating stats panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', mass: 0.4, damping: 28, stiffness: 90, delay: 0.5 }}
            className="absolute bottom-12 left-10 right-10"
          >
            <div className="glass overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-0.5 bg-gold" />
                  <div className="w-3 h-0.5 bg-gold/40" />
                  <div className="w-1.5 h-0.5 bg-gold/20" />
                </div>
                <span className="text-[10px] text-white/15 font-mono tracking-[0.2em]">BBH · 2016</span>
              </div>

              {/* Stats 2×2 */}
              <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06]">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.62 + i * 0.08 }}
                    className="px-6 py-5 flex flex-col gap-1"
                  >
                    <span
                      className="font-sans font-black text-offwhite leading-none"
                      style={{ fontSize: '1.875rem', letterSpacing: '-0.04em' }}
                    >
                      {stat.value}
                      <span className="text-gold" style={{ fontSize: '1.25rem' }}>{stat.suffix}</span>
                    </span>
                    <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/30 leading-tight mt-0.5">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Panel footer */}
              <div className="px-6 py-3 border-t border-white/[0.06] flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] tracking-[0.14em] uppercase text-white/20 font-mono">
                  MSFI · IFRS · GDPR · SLA-backed
                </span>
              </div>
            </div>
          </motion.div>

          {/* Watermark */}
          <span className="absolute top-6 right-6 text-[9px] tracking-[0.22em] uppercase text-white/12 font-mono">
            Vijećnica · Sarajevo
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/4 -translate-x-1/2 flex flex-col items-center gap-2 text-white/15"
      >
        <span className="text-[9px] tracking-[0.28em] uppercase font-sans">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
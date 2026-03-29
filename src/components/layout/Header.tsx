'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const LOCALES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'de', label: 'DE', full: 'Deutsch' },
  { code: 'bs', label: 'BS', full: 'Bosanski' },
] as const;

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function switchLocale(next: string) {
    const withoutLocale = pathname.replace(/^\/(en|de|bs)/, '');
    router.push(`/${next}${withoutLocale || '/'}`);
  }

  const navLinks = [
    { href: '#services', label: t('services') },
    { href: '#why-us', label: t('whyUs') },
    { href: '#nearshoring', label: t('nearshoring') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-navy shadow-[0_2px_32px_oklch(0_0_0/0.25)] py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="relative h-8 w-28">
              <Image
                src="/images/logo/BBH Linear Logo Black.png"
                alt="Bosnia Business Hub"
                fill
                className="object-contain object-left"
                style={{ filter: 'brightness(0) invert(1)' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors duration-200',
                  'hover:text-gold',
                  scrolled ? 'text-offwhite/80' : 'text-offwhite/70'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-xs font-medium tracking-widest text-offwhite/50">
              {LOCALES.map((loc, i) => (
                <span key={loc.code} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-1.5 opacity-30 text-offwhite">/</span>
                  )}
                  <button
                    onClick={() => switchLocale(loc.code)}
                    className={cn(
                      'transition-colors duration-150 hover:text-gold min-h-[44px] px-1',
                      locale === loc.code ? 'text-offwhite font-semibold' : ''
                    )}
                    aria-label={`Switch to ${loc.full}`}
                  >
                    {loc.label}
                  </button>
                </span>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="text-sm font-medium px-5 py-2.5 min-h-[44px] flex items-center rounded-sm border border-gold/60 text-gold hover:bg-gold hover:text-navy transition-all duration-200"
            >
              {t('cta')}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-offwhite w-11 h-11 flex items-center justify-center transition-colors hover:text-gold"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{
              background: 'linear-gradient(160deg, oklch(0.10 0.045 240 / 0.98) 0%, oklch(0.07 0.03 240 / 0.99) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Top padding to clear the header */}
            <div className="h-20 shrink-0" />

            {/* Nav links — large serif */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease, delay: 0.05 + i * 0.07 }}
                  className="group flex items-center justify-between py-5 border-b border-white/[0.07] min-h-[72px]"
                >
                  <span className="font-serif text-3xl font-bold text-offwhite/90 group-hover:text-gold transition-colors duration-300 leading-tight">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] text-white/20 tracking-[0.2em] group-hover:text-gold/40 transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.a>
              ))}

              {/* CTA link */}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease, delay: 0.33 }}
                className="mt-8 inline-flex items-center justify-center bg-gold text-navy text-sm font-semibold tracking-wide px-8 py-4 min-h-[56px] hover:bg-gold-light transition-colors duration-200"
              >
                {t('cta')}
              </motion.a>
            </nav>

            {/* Bottom: locale switcher */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.38 }}
              className="px-8 pb-10 flex items-center gap-6 border-t border-white/[0.07] pt-6"
            >
              {LOCALES.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => {
                    switchLocale(loc.code);
                    setMobileOpen(false);
                  }}
                  className={cn(
                    'text-sm font-medium tracking-widest transition-colors min-h-[44px] px-2',
                    locale === loc.code
                      ? 'text-gold font-semibold'
                      : 'text-offwhite/50 hover:text-offwhite'
                  )}
                >
                  {loc.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

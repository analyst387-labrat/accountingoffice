'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const LOCALES = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'de', label: 'DE', full: 'Deutsch' },
  { code: 'bs', label: 'BS', full: 'Bosanski' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    // Check immediately on mount in case page is already scrolled
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function switchLocale(next: string) {
    // Replace locale prefix in current path
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
          <span className="w-8 h-8 rounded-sm bg-gold flex items-center justify-center">
            <span className="font-serif font-bold text-navy text-sm leading-none">B</span>
          </span>
          <span
            className={cn(
              'font-serif font-semibold text-lg tracking-tight transition-colors',
              scrolled ? 'text-offwhite' : 'text-navy'
            )}
          >
            Bosnia<span className="text-gold">·</span>BH
          </span>
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
                scrolled ? 'text-offwhite/80' : 'text-slate'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium tracking-widest',
              scrolled ? 'text-offwhite/60' : 'text-slate-light'
            )}
          >
            {LOCALES.map((loc, i) => (
              <span key={loc.code} className="flex items-center">
                {i > 0 && (
                  <span
                    className={cn(
                      'mx-1.5 opacity-30',
                      scrolled ? 'text-offwhite' : 'text-slate'
                    )}
                  >
                    /
                  </span>
                )}
                <button
                  onClick={() => switchLocale(loc.code)}
                  className={cn(
                    'transition-colors duration-150 hover:text-gold',
                    locale === loc.code
                      ? scrolled
                        ? 'text-offwhite font-semibold'
                        : 'text-navy font-semibold'
                      : ''
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
            className={cn(
              'text-sm font-medium px-5 py-2 rounded-sm border transition-all duration-200',
              scrolled
                ? 'border-gold/60 text-gold hover:bg-gold hover:text-navy'
                : 'border-navy text-navy hover:bg-navy hover:text-offwhite'
            )}
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            'md:hidden transition-colors',
            scrolled ? 'text-offwhite' : 'text-navy'
          )}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-navy border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-offwhite/80 hover:text-gold font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-white/10">
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => {
                  switchLocale(loc.code);
                  setMobileOpen(false);
                }}
                className={cn(
                  'text-xs font-medium tracking-widest transition-colors',
                  locale === loc.code
                    ? 'text-gold font-semibold'
                    : 'text-offwhite/50 hover:text-offwhite'
                )}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

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

  const [mobileOpen, setMobileOpen] = useState(false);

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
    { href: '#services',    label: t('services') },
    { href: '#why-us',      label: t('whyUs') },
    { href: '#nearshoring', label: t('nearshoring') },
    { href: '#contact',     label: t('contact') },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0c0e10]/80 backdrop-blur-lg border-b border-[#23282d]">
        <div className="px-10 h-14 grid grid-cols-[1fr_auto_1fr] items-center gap-6">

          {/* LEFT: Logo + brand name */}
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0 py-1 group">
            <div className="relative h-7 w-24 shrink-0">
              <Image
                src="/images/logo/wlb%20white.png"
                alt="White Label Backbone Office"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
            <span
              className="hidden lg:block text-[10px] font-mono tracking-[0.18em] uppercase text-[#6a6c6a] group-hover:text-[#a4a4a0] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              WHITE LABEL BACKBONE OFFICE
            </span>
          </Link>

          {/* CENTER: Nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] text-[#a4a4a0] hover:text-[#f3f1ea] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* RIGHT: Language switcher + CTA */}
          <div className="hidden md:flex items-center gap-3 justify-end">
            {/* Pill language switcher */}
            <div
              className="flex items-center border border-[#2d3239] rounded-full overflow-hidden"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {LOCALES.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => switchLocale(loc.code)}
                  aria-label={`Switch to ${loc.full}`}
                  className={cn(
                    'px-3 py-1.5 text-[11px] font-mono tracking-widest transition-colors duration-150 min-h-[32px]',
                    locale === loc.code
                      ? 'bg-[#f3f1ea] text-[#0c0e10]'
                      : 'text-[#6a6c6a] hover:text-[#a4a4a0]'
                  )}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            {/* CTA pill */}
            <a
              href="#contact"
              className="rounded-full border border-[#f3f1ea] bg-[#f3f1ea] text-[#0c0e10] px-4 py-2 text-[13px] font-medium hover:bg-transparent hover:text-[#f3f1ea] transition-all duration-200 min-h-[36px] flex items-center"
            >
              {t('cta')}
            </a>
          </div>

          {/* Mobile toggle — right-aligned via justify-self */}
          <div className="flex md:hidden justify-end">
            <button
              className="text-[#a4a4a0] w-10 h-10 flex items-center justify-center hover:text-[#f3f1ea] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-[#0c0e10]"
          >
            <div className="h-14 shrink-0 border-b border-[#23282d]" />

            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, ease, delay: 0.04 + i * 0.06 }}
                  className="group flex items-center justify-between py-5 border-b border-[#23282d] min-h-[64px]"
                >
                  <span
                    className="text-2xl text-[#f3f1ea]/90 group-hover:text-[#7fa9c4] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-newsreader), Georgia, serif' }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="text-[10px] text-[#6a6c6a] tracking-[0.2em] group-hover:text-[#a4a4a0] transition-colors duration-200"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease, delay: 0.28 }}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#f3f1ea] text-[#0c0e10] text-sm font-medium px-8 py-4 min-h-[52px]"
              >
                {t('cta')}
              </motion.a>
            </nav>

            {/* Locale switcher bottom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease, delay: 0.32 }}
              className="px-8 pb-10 flex items-center gap-2 border-t border-[#23282d] pt-6"
            >
              <div className="flex items-center border border-[#2d3239] rounded-full overflow-hidden">
                {LOCALES.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => { switchLocale(loc.code); setMobileOpen(false); }}
                    className={cn(
                      'px-4 py-2 text-[11px] tracking-widest transition-colors duration-150',
                      locale === loc.code
                        ? 'bg-[#f3f1ea] text-[#0c0e10]'
                        : 'text-[#6a6c6a] hover:text-[#a4a4a0]'
                    )}
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

const SERVICE_KEYS = [
  'accounting',
  'payroll',
  'austrian',
  'strategy',
  'feasibility',
  'grants',
] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-offwhite/80">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand col */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center">
              <div className="relative h-9 w-36">
                <Image
                  src="/images/logo/Logo Linear - BBH.png"
                  alt="Bosnia Business Hub"
                  fill
                  className="object-contain object-left"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-offwhite/50 font-light italic max-w-xs">
              {t('tagline')}
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="text-offwhite/60">{t('address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <a
                  href={`tel:${t('phone').replace(/\s/g, '')}`}
                  className="text-offwhite/60 hover:text-gold transition-colors"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <a
                  href={`mailto:${t('email')}`}
                  className="text-offwhite/60 hover:text-gold transition-colors"
                >
                  {t('email')}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2" />

          {/* Services col */}
          <div className="md:col-span-3 space-y-5">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-offwhite/30">
              {tNav('services')}
            </p>
            <ul className="space-y-3 text-sm">
              {SERVICE_KEYS.map((key) => (
                <li key={key}>
                  <a
                    href="#services"
                    className="flex items-center gap-1.5 text-offwhite/50 hover:text-gold transition-colors group"
                  >
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {tServices(`items.${key}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal col */}
          <div className="md:col-span-3 space-y-5">
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-offwhite/30">
              Legal
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-offwhite/50 hover:text-gold transition-colors"
                >
                  {t('links.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/imprint`}
                  className="text-offwhite/50 hover:text-gold transition-colors"
                >
                  {t('links.imprint')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-offwhite/30">
            {t('copyright').replace('{year}', String(year))}
          </p>
          <p className="text-xs text-offwhite/20 font-light">BiH · DE · EN</p>
        </div>
      </div>
    </footer>
  );
}

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

const SERVICE_KEYS = [
  'accounting',
  'payroll',
  'austrian',
  'investor',
  'fpa',
  'grants',
] as const;

const COMPLIANCE_TAGS = ['MSFI', 'IFRS', 'DSGVO', 'ISO'];

export default function Footer() {
  const t = useTranslations('footer');
  const tServices = useTranslations('services');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0c0e10] border-t border-[#23282d]">
      {/* Main 3-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] border-b border-[#23282d]">

        {/* Brand column */}
        <div
          className="flex flex-col gap-6 md:border-r md:border-[#23282d]"
          style={{ padding: '48px 40px' }}
        >
          <div className="relative h-8 w-28 shrink-0">
            <Image
              src="/images/logo/BBH Linear Logo Black.png"
              alt="Bosnia Business Hub"
              fill
              className="object-contain object-left"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          <p
            className="text-[14px] text-[#6a6c6a] leading-relaxed italic max-w-xs"
            style={{ fontFamily: 'var(--font-newsreader), Georgia, serif' }}
          >
            {t('tagline')}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {COMPLIANCE_TAGS.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a]"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Contact column */}
        <div
          className="flex flex-col gap-4 md:border-r md:border-[#23282d]"
          style={{ padding: '48px 40px' }}
        >
          <h6
            className="text-[10px] tracking-[0.22em] uppercase text-[#6a6c6a] mb-2"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            CONTACT
          </h6>
          <address className="not-italic space-y-3">
            <p className="text-[14px] text-[#a4a4a0] leading-relaxed">{t('address')}</p>
            <a
              href={`tel:${t('phone').replace(/\s/g, '')}`}
              className="block text-[14px] text-[#a4a4a0] hover:text-[#f3f1ea] transition-colors duration-200"
            >
              {t('phone')}
            </a>
            <a
              href={`mailto:${t('email')}`}
              className="block text-[14px] text-[#a4a4a0] hover:text-[#f3f1ea] transition-colors duration-200"
            >
              {t('email')}
            </a>
          </address>
        </div>

        {/* Practice column */}
        <div style={{ padding: '48px 40px' }}>
          <h6
            className="text-[10px] tracking-[0.22em] uppercase text-[#6a6c6a] mb-4"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            PRACTICE
          </h6>
          <ul className="space-y-3">
            {SERVICE_KEYS.map((key) => (
              <li key={key}>
                <a
                  href="#services"
                  className="text-[14px] text-[#a4a4a0] hover:text-[#f3f1ea] transition-colors duration-200"
                >
                  {tServices(`items.${key}.title`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-10 py-5">
        <p
          className="text-[11px] text-[#6a6c6a]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {t('copyright').replace('{year}', String(year))}
        </p>
        <div className="flex items-center gap-5">
          <Link
            href={`/${locale}/privacy`}
            className="text-[11px] text-[#6a6c6a] hover:text-[#a4a4a0] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            {t('links.privacy')}
          </Link>
          <span className="text-[#23282d]">·</span>
          <Link
            href={`/${locale}/imprint`}
            className="text-[11px] text-[#6a6c6a] hover:text-[#a4a4a0] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            {t('links.imprint')}
          </Link>
        </div>
      </div>
    </footer>
  );
}

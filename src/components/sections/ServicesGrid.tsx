'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type ServiceKey = 'accounting' | 'payroll' | 'austrian' | 'investor' | 'fpa' | 'grants';

const SERVICE_KEYS: ServiceKey[] = [
  'accounting', 'payroll',
  'austrian', 'investor', 'fpa',
  'grants',
];

// 6-item grid: md:grid-cols-2, lg:grid-cols-3
// right border = has a card to its right in THAT breakpoint's layout
const CARD_RIGHT_BORDER: Record<number, string> = {
  0: 'md:border-r border-[#23282d]',         // col 1 at md & lg
  1: 'lg:border-r border-[#23282d]',         // col 2 at lg only (last col at md)
  2: 'md:border-r lg:border-r-0 border-[#23282d]', // col 1 at md, last col at lg
  3: 'md:border-r border-[#23282d]',         // col 1 at md & lg
  4: 'lg:border-r border-[#23282d]',         // col 2 at lg only
  5: '',                                      // always last col
};

function ServiceCard({ serviceKey, index }: { serviceKey: ServiceKey; index: number }) {
  const t = useTranslations('services');
  const [hovered, setHovered] = useState(false);
  const num = `/${String(index + 1).padStart(2, '0')}`;

  return (
    <article
      className={`relative flex flex-col border-t border-[#23282d] transition-colors duration-200 ${CARD_RIGHT_BORDER[index] ?? ''}`}
      style={{
        padding: '36px 32px',
        minHeight: '320px',
        background: hovered ? '#14171a' : '#0c0e10',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-6">
        <span
          className="text-[10px] tracking-[0.18em] text-[#f3f1ea]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          aria-hidden
        >
          {num}
        </span>
        <span
          className="text-[10px] tracking-[0.14em] uppercase text-[#6a6c6a]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {t(`items.${serviceKey}.tag`)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[#f3f1ea] font-normal mb-4"
        style={{
          fontSize: '26px',
          letterSpacing: '-0.015em',
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          lineHeight: 1.2,
        }}
      >
        {t(`items.${serviceKey}.title`)}
      </h3>

      {/* Body */}
      <p className="text-[14px] text-[#a4a4a0] leading-relaxed flex-1">
        {t(`items.${serviceKey}.description`)}
      </p>

      {/* Learn more */}
      <div className="mt-6">
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-[#6a6c6a] transition-colors duration-200 flex items-center gap-2"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', color: hovered ? '#a4a4a0' : '#6a6c6a' }}
        >
          LEARN MORE
          <span
            className="transition-transform duration-200"
            style={{ transform: hovered ? 'translateX(4px)' : 'none' }}
          >
            →
          </span>
        </span>
      </div>
    </article>
  );
}

export default function ServicesGrid() {
  const t = useTranslations('services');

  return (
    <section id="services" className="bg-[#0c0e10] border-b border-[#23282d]">
      {/* Section header */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] border-b border-[#23282d]">
        <div className="px-10 pt-20 pb-12 flex items-center">
          <span
            className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            02 — PRACTICE AREAS
          </span>
        </div>
        <div className="px-10 pt-20 pb-12">
          <h2
            className="text-[#f3f1ea] font-normal mb-4"
            style={{
              fontSize: 'clamp(36px, 4.2vw, 60px)',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              lineHeight: 1.0,
            }}
          >
            {t('title')}
          </h2>
          <p className="text-[16px] text-[#a4a4a0] leading-relaxed max-w-[60ch]">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Services grid — 3 columns desktop, 1 column mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {SERVICE_KEYS.map((key, i) => (
          <ServiceCard key={key} serviceKey={key} index={i} />
        ))}
      </div>
    </section>
  );
}

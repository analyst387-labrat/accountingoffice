'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type ServiceKey = 'accounting' | 'payroll' | 'austrian' | 'investor' | 'fpa' | 'grants';

const SERVICE_KEYS: ServiceKey[] = [
  'accounting', 'payroll',
  'austrian', 'investor', 'fpa',
  'grants',
];

function ServiceCard({ serviceKey, index }: { serviceKey: ServiceKey; index: number }) {
  const t = useTranslations('services');
  const [hovered, setHovered] = useState(false);
  const num = `/${String(index + 1).padStart(2, '0')}`;

  return (
    <article
      className="relative flex flex-col border-t border-[#23282d] transition-colors duration-200"
      style={{
        padding: '36px 32px',
        minHeight: '320px',
        background: hovered ? '#14171a' : '#0c0e10',
        borderRight: '1px solid #23282d',
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
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#23282d]">
        {/* Left: eyebrow */}
        <div className="px-8 py-10 lg:border-r lg:border-[#23282d] flex items-center">
          <span
            className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            02 — PRACTICE AREAS
          </span>
        </div>
        {/* Right: heading + lede */}
        <div className="px-8 py-10">
          <h2
            className="text-[#f3f1ea] font-normal mb-4"
            style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              lineHeight: 1.1,
            }}
          >
            {t('title')}
          </h2>
          <p className="text-[15px] text-[#a4a4a0] leading-relaxed max-w-lg">
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

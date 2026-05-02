'use client';

import { useTranslations } from 'next-intl';

type StatItem = { value: string; suffix: string; label: string };

export default function KpiStrip() {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as StatItem[];

  return (
    <div className="bg-[#0c0e10] border-b border-[#23282d]">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="relative px-8 py-7 border-[#23282d]"
            style={{
              borderRightWidth: i < stats.length - 1 ? '1px' : '0',
              borderRightStyle: 'solid',
              borderRightColor: '#23282d',
              borderTopWidth: i >= 2 ? '1px' : '0',
              borderTopStyle: 'solid',
              borderTopColor: '#23282d',
            }}
          >
            {/* top-right tag */}
            <span
              className="absolute top-4 right-5 text-[10px] tracking-[0.18em] text-[#6a6c6a]"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              aria-hidden
            >
              /{String(i + 1).padStart(2, '0')}
            </span>

            {/* Number */}
            <div
              className="text-[#f3f1ea] leading-none mb-2"
              style={{
                fontSize: '56px',
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-newsreader), Georgia, serif',
              }}
            >
              {stat.value}
              {stat.suffix && (
                <span
                  className="italic text-[#7fa9c4]"
                  style={{ fontSize: '0.55em' }}
                >
                  {stat.suffix}
                </span>
              )}
            </div>

            {/* Label */}
            <p
              className="text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a] leading-snug"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

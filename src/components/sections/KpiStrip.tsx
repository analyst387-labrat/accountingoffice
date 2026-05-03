'use client';

import { useTranslations } from 'next-intl';

type StatItem = { value: string; suffix: string; label: string };

// Border classes per cell: 2-col mobile, 4-col desktop
const CELL_BORDERS = [
  'border-r border-[#23282d]',                                         // 0: right always (col 1 in both layouts)
  'lg:border-r border-[#23282d]',                                      // 1: right only at lg+ (last col in mobile 2-col)
  'border-r border-[#23282d] border-t border-[#23282d] lg:border-t-0', // 2: right always, top on mobile only
  'border-t border-[#23282d] lg:border-t-0',                          // 3: no right, top on mobile only
];

export default function KpiStrip() {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as StatItem[];

  return (
    <div className="bg-[#0c0e10] border-b border-[#23282d]">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`relative px-8 py-7 ${CELL_BORDERS[i] ?? ''}`}
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
              className="text-[11px] tracking-[0.18em] uppercase text-[#6a6c6a] leading-snug"
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

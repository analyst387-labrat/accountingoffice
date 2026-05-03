'use client';

import { useTranslations } from 'next-intl';

type StepKey = 'intro' | 'pilot' | 'scale';
const STEPS: StepKey[] = ['intro', 'pilot', 'scale'];

// Progress bar widths for each step
const STEP_PROGRESS = ['33%', '66%', '100%'];

// Pill tags for each step
const STEP_TAGS = ['COMPLIMENTARY', '10–20 PACKAGES', 'CONTRACTUAL SLA'];

function StepCard({ stepKey, index }: { stepKey: StepKey; index: number }) {
  const t = useTranslations('nearshoring');
  const isLast = index === STEPS.length - 1;

  return (
    <article
      className={`flex flex-col border-t border-[#23282d] ${!isLast ? 'lg-divider-r' : ''}`}
      style={{ padding: '40px 32px 48px' }}
    >
      {/* Top row: step label + pill tag */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="text-[10px] tracking-[0.22em] uppercase text-[#6a6c6a]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          STEP {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="text-[9px] tracking-[0.18em] uppercase text-[#7fa9c4] border border-[#2d3239] rounded-full px-3 py-1"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {STEP_TAGS[index]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-px bg-[#23282d] mb-8">
        <div
          className="absolute inset-y-0 left-0 bg-[#7fa9c4]"
          style={{ width: STEP_PROGRESS[index] }}
        />
      </div>

      {/* Title */}
      <h3
        className="text-[#f3f1ea] font-normal mb-4"
        style={{
          fontSize: '28px',
          letterSpacing: '-0.015em',
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          lineHeight: 1.2,
        }}
      >
        {t(`steps.${stepKey}.title`)}
      </h3>

      {/* Body */}
      <p className="text-[14px] text-[#a4a4a0] leading-relaxed flex-1">
        {t(`steps.${stepKey}.description`)}
      </p>
    </article>
  );
}

export default function NearshoringModel() {
  const t = useTranslations('nearshoring');

  return (
    <section id="nearshoring" className="bg-[#0c0e10] border-b border-[#23282d]">
      {/* Section header */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] border-b border-[#23282d] px-6 lg:px-10 pt-12 lg:pt-20 pb-8 lg:pb-12"
        style={{ columnGap: '60px' }}
      >
        <div className="mb-4 lg:mb-0">
          <span
            className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            04 — ENGAGEMENT MODEL
          </span>
        </div>
        <div>
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

      {/* Step cards — 3-col desktop, stacked mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {STEPS.map((key, i) => (
          <StepCard key={key} stepKey={key} index={i} />
        ))}
      </div>

      {/* CTA row */}
      <div className="px-8 py-10 border-t border-[#23282d] flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <a
          href="#contact"
          className="rounded-full bg-[#f3f1ea] text-[#0c0e10] px-6 py-3 text-[13px] font-medium hover:bg-[#d4c8a6] transition-colors duration-200 min-h-[44px] flex items-center"
        >
          {t('cta')}
        </a>
        <p
          className="text-[12px] text-[#6a6c6a] tracking-wide"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          Three stages. Documented, supervised, SLA-governed.
        </p>
      </div>
    </section>
  );
}

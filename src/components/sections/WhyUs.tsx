'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type PracticeItem = { k: string; v: string };
type PracticeData = { title: string; items: PracticeItem[] };
type ValueItem = { title: string; description: string };
type TestimonialData = { quote: string; author: string; detail: string };

const PRACTICE_LABELS = ['License', 'Software', 'Team', 'Reporting'];

// 2×2 pillar grid (sm:grid-cols-2), borders per cell
const PILLAR_BORDERS = [
  'border-b border-[#23282d] sm:border-r border-[#23282d]',          // 0: bottom always, right at sm+
  'border-b border-[#23282d]',                                         // 1: bottom always
  'border-b border-[#23282d] sm:border-b-0 sm:border-r border-[#23282d]', // 2: bottom mobile only, right sm+
  '',                                                                   // 3: last — no borders
];

// 4-col practice strip borders: grid-cols-1 mobile / sm:grid-cols-2 / lg:grid-cols-4
const PRACTICE_BORDERS = [
  'border-b border-[#23282d] sm:border-r lg:border-b-0',
  'border-b border-[#23282d] lg:border-r lg:border-b-0',
  'border-b border-[#23282d] sm:border-b-0 sm:border-r',
  '',
];

function PillarsGrid({ values }: { values: ValueItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {values.map((item, i) => (
        <div key={i} className={`flex flex-col gap-3 px-8 py-9 ${PILLAR_BORDERS[i]}`}>
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-[#7fa9c4]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            /{String(i + 1).padStart(2, '0')}
          </span>
          <h3
            className="text-[#f3f1ea] font-normal"
            style={{
              fontSize: '22px',
              letterSpacing: '-0.015em',
              fontFamily: 'var(--font-newsreader), Georgia, serif',
            }}
          >
            {item.title}
          </h3>
          <p className="text-[14px] text-[#a4a4a0] leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function QuoteBlock({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <div className="flex flex-col justify-center h-full px-10 py-12">
      <div
        className="text-[96px] leading-none text-[#7fa9c4] mb-4 select-none"
        aria-hidden
        style={{ fontFamily: 'var(--font-newsreader), Georgia, serif', lineHeight: 0.6 }}
      >
        &ldquo;
      </div>
      <blockquote
        className="text-[#f3f1ea] font-normal leading-[1.3] mb-6"
        style={{
          fontSize: '26px',
          letterSpacing: '-0.015em',
          fontFamily: 'var(--font-newsreader), Georgia, serif',
        }}
      >
        {testimonial.quote}
      </blockquote>
      <div className="border-t border-[#23282d] pt-4 mt-auto">
        <p
          className="text-[11px] tracking-[0.04em] uppercase text-[#6a6c6a]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          — {testimonial.author} · {testimonial.detail}
        </p>
      </div>
    </div>
  );
}

function BridgeBand() {
  return (
    <div
      className="relative overflow-hidden border-t border-[#23282d]"
      style={{ background: 'linear-gradient(180deg, #0c0e10 0%, #14171a 100%)', padding: '60px 40px 40px' }}
    >
      <Image
        src="/images/office/Sarajevo Bridge.png"
        alt=""
        width={1200}
        height={400}
        className="block w-full max-w-[1200px] mx-auto h-auto"
        style={{ filter: 'invert(1) brightness(0.9)', mixBlendMode: 'screen', opacity: 0.85 }}
        aria-hidden
        sizes="100vw"
      />
      <div
        className="flex flex-col sm:flex-row sm:justify-between max-w-[1200px] mx-auto mt-6 pt-5 gap-2 border-t border-[#23282d]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        <span className="text-[11px] tracking-[0.06em] uppercase text-[#a4a4a0]">
          Bridging EU practice with BiH capacity
        </span>
        <span className="text-[11px] tracking-[0.06em] uppercase text-[#6a6c6a]">
          Latin Bridge · Sarajevo
        </span>
      </div>
    </div>
  );
}

function PracticeStrip({ practice }: { practice: PracticeData }) {
  return (
    <div className="bg-[#14171a] border-t border-[#23282d]">
      {/* Practice head: eyebrow + title */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]"
        style={{ padding: '56px 40px 32px', gap: '60px' }}
      >
        <span
          className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          /PRACTICE CARD
        </span>
        <h3
          className="text-[#f3f1ea] font-normal"
          style={{
            fontSize: 'clamp(28px, 3vw, 40px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-newsreader), Georgia, serif',
          }}
        >
          {practice.title}
        </h3>
      </div>

      {/* 4-col practice grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#23282d]">
        {practice.items.map((item, i) => (
          <div
            key={i}
            className={`px-7 py-8 ${PRACTICE_BORDERS[i] ?? ''}`}
          >
            <p
              className="text-[11px] tracking-[0.06em] uppercase text-[#7fa9c4] mb-3"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {String(i + 1).padStart(2, '0')} · {PRACTICE_LABELS[i] ?? item.k}
            </p>
            <p className="text-[15px] text-[#a4a4a0] leading-relaxed">
              {item.v}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const values = t.raw('values') as ValueItem[];
  const testimonial = t.raw('testimonial') as TestimonialData;
  const practice = t.raw('practice') as PracticeData;

  return (
    <section id="why-us" className="bg-[#0c0e10]">
      {/* Section header */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] border-b border-[#23282d]">
        <div className="px-10 pt-20 pb-12 flex items-center">
          <span
            className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            03 — OPERATING PRINCIPLES
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

      {/* Main body: pillars left | quote right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border-b border-[#23282d]">
        <div className="lg-divider-r">
          <PillarsGrid values={values} />
        </div>
        <div className="bg-[#14171a]">
          <QuoteBlock testimonial={testimonial} />
        </div>
      </div>

      {/* Bridge band */}
      <BridgeBand />

      {/* Practice strip */}
      <PracticeStrip practice={practice} />
    </section>
  );
}
'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type PracticeItem = { k: string; v: string };
type PracticeData = { title: string; items: PracticeItem[] };
type ValueItem = { title: string; description: string };
type TestimonialData = { quote: string; author: string; detail: string };

const PRACTICE_LABELS = ['License', 'Software', 'Team', 'Reporting'];

function PillarsGrid({ values }: { values: ValueItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {values.map((item, i) => (
        <div key={i} className="flex flex-col gap-3">
          <span
            className="text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            /{String(i + 1).padStart(2, '0')}
          </span>
          <h3
            className="text-[#f3f1ea] font-normal"
            style={{
              fontSize: '20px',
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
    <div className="flex flex-col justify-center h-full">
      {/* Large quote mark */}
      <div
        className="text-[96px] leading-none text-[#7fa9c4] mb-4 select-none"
        aria-hidden
        style={{ fontFamily: 'var(--font-newsreader), Georgia, serif', lineHeight: 0.8 }}
      >
        &ldquo;
      </div>
      <blockquote
        className="text-[#f3f1ea] font-normal leading-[1.5] mb-6"
        style={{
          fontSize: '26px',
          letterSpacing: '-0.01em',
          fontFamily: 'var(--font-newsreader), Georgia, serif',
        }}
      >
        {testimonial.quote}
      </blockquote>
      <div className="border-t border-[#23282d] pt-4">
        <p
          className="text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {testimonial.author} · {testimonial.detail}
        </p>
      </div>
    </div>
  );
}

function BridgeBand() {
  return (
    <div className="relative overflow-hidden border-t border-[#23282d]" style={{ height: '180px' }}>
      {/* Dark overlay sides */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0c0e10 0%, transparent 20%, transparent 80%, #0c0e10 100%)' }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0c0e10 0%, transparent 30%)' }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #0c0e10 0%, transparent 30%)' }}
      />
      <Image
        src="/images/office/Sarajevo Bridge.png"
        alt=""
        fill
        className="object-cover object-center"
        style={{ filter: 'invert(1) brightness(0.9)', mixBlendMode: 'screen', opacity: 0.12 }}
        aria-hidden
        sizes="100vw"
      />
      <div className="absolute bottom-4 left-8 z-20">
        <span
          className="text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          Latin Bridge · Sarajevo — Bridging EU practice with BiH capacity
        </span>
      </div>
    </div>
  );
}

// Border classes per cell for grid-cols-1 mobile / sm:grid-cols-2 / lg:grid-cols-4
const PRACTICE_BORDERS = [
  'border-b border-[#23282d] sm:border-r lg:border-b-0',         // 0
  'border-b border-[#23282d] lg:border-r lg:border-b-0',         // 1
  'border-b border-[#23282d] sm:border-b-0 sm:border-r',         // 2
  '',                                                              // 3: last — no borders
];

function PracticeStrip({ practice }: { practice: PracticeData }) {
  return (
    <div className="bg-[#14171a] border-t border-[#23282d]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {practice.items.map((item, i) => (
          <div
            key={i}
            className={`px-8 py-8 ${PRACTICE_BORDERS[i] ?? ''}`}
          >
            <p
              className="text-[10px] tracking-[0.18em] uppercase text-[#7fa9c4] mb-3"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              {String(i + 1).padStart(2, '0')} · {PRACTICE_LABELS[i] ?? item.k}
            </p>
            <p className="text-[13px] text-[#a4a4a0] leading-relaxed">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#23282d]">
        <div className="px-8 py-10 lg:border-r lg:border-[#23282d] flex items-center">
          <span
            className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            03 — OPERATING PRINCIPLES
          </span>
        </div>
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

      {/* Main body: pillars left | quote right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] border-b border-[#23282d]">
        <div className="px-8 py-16 lg:border-r lg:border-[#23282d]">
          <PillarsGrid values={values} />
        </div>
        <div className="px-8 py-16">
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

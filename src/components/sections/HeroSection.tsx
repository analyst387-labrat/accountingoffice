'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const COMPLIANCE_TAGS = [
  'LICENSED IN BiH',
  'MSFI',
  'IFRS',
  'HGB',
  'DSGVO',
  'BMD NTCS',
  'PANTHEON',
];

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section
      id="hero"
      className="relative flex flex-col bg-[#0c0e10] overflow-hidden"
    >
      {/* Two-column grid on desktop */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] min-h-[640px] lg:min-h-0 lg:h-[calc(100vh-200px)] border-b border-[#23282d]">

        {/* ── LEFT: Copy ── */}
        <div className="flex flex-col px-6 lg:px-14 xl:px-20 pt-28 pb-12 lg-divider-r">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7fa9c4] animate-pulse shrink-0" />
            <span
              className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a]"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              ESTABLISHED 2016 · MARŠALA TITA 3, SARAJEVO
            </span>
          </div>

          {/* Badge */}
          <div className="mb-8">
            <span
              className="inline-flex items-center gap-2.5 border border-[#2d3239] rounded-full px-4 py-1.5 text-[11px] tracking-[0.18em] uppercase text-[#a4a4a0]"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7fa9c4] shrink-0" />
              {t('tagline')}
            </span>
          </div>

          {/* H1 — three styled lines */}
          <h1
            className="mb-8 max-w-[14ch]"
            style={{
              fontSize: 'clamp(48px, 6.4vw, 96px)',
              lineHeight: 0.96,
              letterSpacing: '-0.025em',
              fontFamily: 'var(--font-newsreader), Georgia, serif',
            }}
          >
            <span className="block text-[#f3f1ea] font-normal">Quiet capacity</span>
            <span className="block italic text-[#d4c8a6] font-normal">for serious</span>
            <span className="block italic text-[#7fa9c4] font-normal">tax &amp; accounting practices.</span>
          </h1>

          {/* Lede */}
          <p className="text-[16px] text-[#a4a4a0] leading-[1.65] max-w-[480px] mb-10 font-light">
            {t('subheadline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#contact"
              className="rounded-full bg-[#f3f1ea] text-[#0c0e10] px-6 py-3 text-[13px] font-medium hover:bg-[#d4c8a6] transition-colors duration-200 min-h-[44px] flex items-center"
            >
              {t('cta_primary')}
            </a>
            <a
              href="#services"
              className="rounded-full border border-[#23282d] text-[#a4a4a0] px-6 py-3 text-[13px] hover:border-[#2d3239] hover:text-[#f3f1ea] transition-colors duration-200 min-h-[44px] flex items-center"
            >
              {t('cta_secondary')}
            </a>
          </div>

          {/* Compliance strip */}
          <div className="mt-auto border-t border-[#23282d] pt-5">
            <div className="flex flex-wrap items-center gap-y-2">
              {COMPLIANCE_TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="text-[10.5px] tracking-[0.18em] uppercase text-[#6a6c6a]"
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    ...(i > 0 ? { paddingLeft: '18px', marginLeft: '18px', borderLeft: '1px solid #23282d' } : {}),
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Photo ── */}
        <div className="relative overflow-hidden h-[360px] lg:h-auto">
          {/* Photo */}
          <Image
            src="/images/office/Headline Photo Townhall Sarajevo.png"
            alt="Vijećnica — Sarajevo City Hall"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            style={{
              filter: 'contrast(1.05) brightness(0.7) saturate(0.5) sepia(0.15)',
            }}
          />

          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e10]/80 via-transparent to-[#0c0e10]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e10]/30 to-transparent lg:hidden" />

          {/* Top-right meta */}
          <div
            className="absolute top-6 right-6 flex flex-col items-end gap-1"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            <span className="text-[10px] tracking-[0.18em] text-[#6a6c6a]">43.8563° N · 18.4131° E</span>
            <span className="text-[10px] tracking-[0.18em] text-[#6a6c6a]">UTC+1 · CET</span>
            <span className="text-[10px] tracking-[0.18em] text-[#6a6c6a]">EST. 2016</span>
          </div>

          {/* Bottom-left caption */}
          <div className="absolute bottom-6 left-6 flex items-start gap-3">
            <div className="w-6 h-px bg-[#6a6c6a] mt-2.5 shrink-0" />
            <span
              className="text-[10px] tracking-[0.14em] text-[#6a6c6a] leading-relaxed"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              — Vijećnica — Sarajevo City Hall · est. 1896
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

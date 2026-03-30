'use client';

import { useTranslations } from 'next-intl';
import { Shield, Award, Cpu } from 'lucide-react';
import { RevealOnScroll } from '@/components/ui/reveal';

const ICON_MAP: Record<string, React.ElementType> = {
  shield: Shield,
  award: Award,
  cpu: Cpu,
};

type TrustItem = { icon: string; label: string; sub: string };

export default function TrustBar() {
  const t = useTranslations('trustBar');
  const items = t.raw('items') as TrustItem[];

  return (
    <section className="relative bg-navy-muted overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">
          {/* Headline */}
          <RevealOnScroll direction="left">
            <p
              className="font-serif font-bold text-offwhite leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              {t('headline')}
            </p>
            <p className="text-sm text-white/40 mt-2 font-light">{t('subline')}</p>
          </RevealOnScroll>

          {/* Trust items */}
          <RevealOnScroll
            direction="right"
            delay={0.1}
            className="flex flex-col sm:flex-row gap-0"
            style={{ border: '0.5px solid rgba(255,255,255,0.07)' }}
          >
            {items.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Shield;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 px-7 py-5 hover:bg-white/[0.03] active:bg-white/[0.05] transition-colors duration-500"
                  style={{
                    borderRight: i < items.length - 1 ? '0.5px solid rgba(255,255,255,0.07)' : undefined,
                  }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ border: '0.5px solid rgba(184,151,90,0.22)' }}
                  >
                    <Icon size={16} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-offwhite/90 tracking-wide whitespace-nowrap">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-white/30 font-light mt-0.5 whitespace-nowrap">
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </RevealOnScroll>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </section>
  );
}
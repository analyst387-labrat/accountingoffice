'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Award, Cpu } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

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
      {/* Gold rule on top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">
          {/* ── Headline ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
          >
            <p className="font-serif text-3xl md:text-4xl font-bold text-offwhite leading-tight tracking-tight">
              {t('headline')}
            </p>
            <p className="text-sm text-white/35 mt-2 font-light">
              {t('subline')}
            </p>
          </motion.div>

          {/* ── Trust items ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.12 }}
            className="flex flex-col sm:flex-row gap-0"
            style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
          >
            {items.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Shield;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 px-7 py-5 group hover:bg-white/[0.03] transition-colors duration-300"
                  style={{
                    borderRight: i < items.length - 1 ? '0.5px solid rgba(255,255,255,0.08)' : undefined,
                  }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ border: '0.5px solid rgba(184,151,90,0.25)' }}
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
          </motion.div>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  );
}

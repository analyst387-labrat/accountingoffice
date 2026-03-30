'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { RevealOnScroll, SectionLabel } from '@/components/ui/reveal';

function ContactDetail({ icon: Icon, label, value, href }: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-9 h-9 rounded-sm border border-gold/18 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={15} className="text-gold" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-[10px] text-offwhite/30 uppercase tracking-[0.2em] font-sans mb-1">{label}</p>
        {href ? (
          <a href={href} className="text-offwhite/70 text-sm hover:text-gold active:opacity-70 transition-colors duration-500">
            {value}
          </a>
        ) : (
          <p className="text-offwhite/70 text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}

const inputClass =
  'w-full bg-offwhite/[0.04] border border-offwhite/8 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/18 focus:outline-none focus:border-gold/35 hover:border-offwhite/15 transition-colors duration-500 resize-none';

export default function ContactSection() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tNear = useTranslations('nearshoring');

  return (
    <section id="contact" className="py-20 lg:py-[120px] bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <RevealOnScroll direction="left" className="space-y-8">
            <div>
              <SectionLabel light>05 · {tNav('contact')}</SectionLabel>
              <h2
                className="font-sans font-black text-offwhite leading-none"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.05em' }}
              >
                {tNear('cta')}
              </h2>
            </div>
            <div className="space-y-5">
              <ContactDetail icon={MapPin} label="Address" value={tFooter('address')} />
              <ContactDetail
                icon={Phone}
                label="Phone"
                value={tFooter('phone')}
                href={`tel:${tFooter('phone').replace(/\s/g, '')}`}
              />
              <ContactDetail
                icon={Mail}
                label="Email"
                value={tFooter('email')}
                href={`mailto:${tFooter('email')}`}
              />
            </div>
          </RevealOnScroll>

          {/* Right: Form */}
          <RevealOnScroll direction="right" delay={0.1}>
            <form
              className="glass p-8 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-offwhite/55 uppercase tracking-[0.2em] font-sans">Name</label>
                  <input type="text" className={inputClass} placeholder="Max Mustermann" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-offwhite/55 uppercase tracking-[0.2em] font-sans">Company</label>
                  <input type="text" className={inputClass} placeholder="Kanzlei Mustermann GmbH" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-offwhite/55 uppercase tracking-[0.2em] font-sans">Email</label>
                <input type="email" className={inputClass} placeholder="max@kanzlei.at" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-offwhite/55 uppercase tracking-[0.2em] font-sans">Message</label>
                <textarea rows={4} className={inputClass} placeholder="Tell us about your capacity needs…" />
              </div>
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2.5 bg-gold text-navy text-sm font-semibold px-6 py-3.5 hover:bg-gold-light active:opacity-80 transition-colors duration-500"
              >
                Send Message
                <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
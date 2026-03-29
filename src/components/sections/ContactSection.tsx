'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const tNear = useTranslations('nearshoring');

  return (
    <section id="contact" className="py-32 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: heading + details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="space-y-8"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-gold/60 mb-4">
                05 · {tNav('contact')}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-offwhite leading-tight">
                {tNear('cta')}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm border border-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-offwhite/30 uppercase tracking-widest mb-1">Address</p>
                  <p className="text-offwhite/70 text-sm">{tFooter('address')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm border border-gold/20 flex items-center justify-center shrink-0">
                  <Phone size={15} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-offwhite/30 uppercase tracking-widest mb-1">Phone</p>
                  <a href={`tel:${tFooter('phone').replace(/\s/g, '')}`} className="text-offwhite/70 text-sm hover:text-gold transition-colors">
                    {tFooter('phone')}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm border border-gold/20 flex items-center justify-center shrink-0">
                  <Mail size={15} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-offwhite/30 uppercase tracking-widest mb-1">Email</p>
                  <a href={`mailto:${tFooter('email')}`} className="text-offwhite/70 text-sm hover:text-gold transition-colors">
                    {tFooter('email')}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.15 }}
          >
            <form
              className="glass rounded-sm p-8 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs text-offwhite/40 uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    className="w-full bg-offwhite/5 border border-offwhite/10 rounded-sm px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="Max Mustermann"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-offwhite/40 uppercase tracking-widest">Company</label>
                  <input
                    type="text"
                    className="w-full bg-offwhite/5 border border-offwhite/10 rounded-sm px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-gold/40 transition-colors"
                    placeholder="Kanzlei Mustermann GmbH"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-offwhite/40 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  className="w-full bg-offwhite/5 border border-offwhite/10 rounded-sm px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-gold/40 transition-colors"
                  placeholder="max@kanzlei.at"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-offwhite/40 uppercase tracking-widest">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-offwhite/5 border border-offwhite/10 rounded-sm px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/20 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                  placeholder="Tell us about your capacity needs…"
                />
              </div>
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2.5 bg-gold text-navy text-sm font-semibold px-6 py-3.5 rounded-sm hover:bg-gold-light transition-colors duration-200"
              >
                Send Message
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

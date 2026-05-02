'use client';

import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const tNear = useTranslations('nearshoring');
  const tFooter = useTranslations('footer');

  return (
    <section id="contact" className="bg-[#0c0e10] border-b border-[#23282d]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* LEFT */}
        <div
          className="lg:border-r lg:border-[#23282d] flex flex-col justify-between"
          style={{ padding: '80px 40px' }}
        >
          <div>
            {/* Eyebrow */}
            <p
              className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a] mb-6"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              05 — CONTACT
            </p>

            {/* Serif title */}
            <h2
              className="text-[#f3f1ea] font-normal mb-5"
              style={{
                fontSize: 'clamp(40px, 4vw, 56px)',
                letterSpacing: '-0.025em',
                fontFamily: 'var(--font-newsreader), Georgia, serif',
                lineHeight: 0.96,
              }}
            >
              Begin the conversation.
            </h2>

            {/* Lede */}
            <p className="text-[15px] text-[#a4a4a0] leading-relaxed max-w-md mb-10">
              {tNear('subtitle')}
            </p>

            {/* Info rows */}
            <dl className="space-y-0">
              {[
                { label: 'ADDRESS', value: tFooter('address'), href: undefined },
                { label: 'PHONE', value: tFooter('phone'), href: `tel:${tFooter('phone').replace(/\s/g, '')}` },
                { label: 'EMAIL', value: tFooter('email'), href: `mailto:${tFooter('email')}` },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:grid sm:grid-cols-[100px_1fr] gap-2 py-4 border-t border-[#23282d]"
                >
                  <dt
                    className="text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a] pt-0.5"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {row.label}
                  </dt>
                  <dd>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="text-[14px] text-[#a4a4a0] hover:text-[#f3f1ea] transition-colors duration-200"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-[14px] text-[#a4a4a0]">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Italic tagline */}
          <p
            className="mt-10 text-[15px] text-[#6a6c6a] italic"
            style={{ fontFamily: 'var(--font-newsreader), Georgia, serif' }}
          >
            Ihr verlängerter Arm in Sarajevo
          </p>
        </div>

        {/* RIGHT: Form */}
        <div
          className="bg-[#14171a] flex flex-col justify-center"
          style={{ padding: '80px 40px' }}
        >
          <form onSubmit={(e) => e.preventDefault()} className="space-y-7 max-w-lg w-full">
            {/* Name + Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label
                  className="block text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a] mb-2"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  NAME
                </label>
                <input
                  type="text"
                  placeholder="Max Mustermann"
                  className="w-full bg-transparent border-b border-[#2d3239] pb-2.5 text-[14px] text-[#f3f1ea] placeholder:text-[#6a6c6a] focus:outline-none focus:border-[#7fa9c4] transition-colors duration-200"
                />
              </div>
              <div>
                <label
                  className="block text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a] mb-2"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  COMPANY
                </label>
                <input
                  type="text"
                  placeholder="Kanzlei Mustermann GmbH"
                  className="w-full bg-transparent border-b border-[#2d3239] pb-2.5 text-[14px] text-[#f3f1ea] placeholder:text-[#6a6c6a] focus:outline-none focus:border-[#7fa9c4] transition-colors duration-200"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a] mb-2"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                EMAIL
              </label>
              <input
                type="email"
                placeholder="max@kanzlei.at"
                className="w-full bg-transparent border-b border-[#2d3239] pb-2.5 text-[14px] text-[#f3f1ea] placeholder:text-[#6a6c6a] focus:outline-none focus:border-[#7fa9c4] transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-[10px] tracking-[0.18em] uppercase text-[#6a6c6a] mb-2"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                MESSAGE
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your capacity needs…"
                className="w-full bg-transparent border-b border-[#2d3239] pb-2.5 text-[14px] text-[#f3f1ea] placeholder:text-[#6a6c6a] focus:outline-none focus:border-[#7fa9c4] transition-colors duration-200 resize-none"
              />
            </div>

            {/* Bottom row: compliance tags + submit */}
            <div className="flex items-center justify-between pt-2 gap-4 flex-wrap">
              <span
                className="text-[10px] tracking-[0.15em] uppercase text-[#6a6c6a]"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                DSGVO · ENCRYPTED · 24H REPLY
              </span>
              <button
                type="submit"
                className="rounded-full bg-[#f3f1ea] text-[#0c0e10] px-6 py-2.5 text-[13px] font-medium hover:bg-[#d4c8a6] transition-colors duration-200 min-h-[40px]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

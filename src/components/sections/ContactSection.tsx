'use client';

import { useTranslations } from 'next-intl';

const FIELD_STYLE = 'var(--font-jetbrains-mono), monospace';

export default function ContactSection() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('footer');

  return (
    <section id="contact" className="bg-[#0c0e10] border-b border-[#23282d]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* LEFT */}
        <div
          className="lg-divider-r flex flex-col justify-between"
          style={{ padding: '80px 40px' }}
        >
          <div>
            <p
              className="text-[11px] tracking-[0.22em] uppercase text-[#6a6c6a] mb-6"
              style={{ fontFamily: FIELD_STYLE }}
            >
              05 — CONTACT
            </p>

            <h2
              className="text-[#f3f1ea] font-normal mb-5"
              style={{
                fontSize: 'clamp(40px, 4vw, 56px)',
                letterSpacing: '-0.025em',
                fontFamily: 'var(--font-newsreader), Georgia, serif',
                lineHeight: 0.96,
              }}
            >
              {t('heading')}
            </h2>

            <p className="text-[15px] text-[#a4a4a0] leading-relaxed max-w-md mb-10">
              {t('lede')}
            </p>

            <dl className="space-y-0">
              {[
                { label: 'ADDRESS', value: tFooter('address'), href: undefined },
                { label: 'PHONE',   value: tFooter('phone'),   href: `tel:${tFooter('phone').replace(/\s/g, '')}` },
                { label: 'EMAIL',   value: tFooter('email'),   href: `mailto:${tFooter('email')}` },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:grid sm:grid-cols-[110px_1fr] gap-2 py-4 border-t border-[#23282d]"
                >
                  <dt
                    className="text-[11px] tracking-[0.04em] uppercase text-[#6a6c6a] pt-0.5"
                    style={{ fontFamily: FIELD_STYLE }}
                  >
                    {row.label}
                  </dt>
                  <dd>
                    {row.href ? (
                      <a href={row.href} className="text-[15px] text-[#f3f1ea] hover:text-[#a4a4a0] transition-colors duration-200">
                        {row.value}
                      </a>
                    ) : (
                      <span className="text-[15px] text-[#f3f1ea]">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p
            className="mt-10 text-[18px] text-[#6a6c6a] italic"
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
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8 max-w-lg w-full">

            <div>
              <label className="block text-[11px] tracking-[0.06em] uppercase text-[#6a6c6a] mb-2" style={{ fontFamily: FIELD_STYLE }}>
                {t('form.name')}
              </label>
              <input
                type="text"
                placeholder={t('form.namePlaceholder')}
                className="w-full bg-transparent border-b border-[#2d3239] pb-2.5 text-[15px] text-[#f3f1ea] placeholder:text-[#6a6c6a] focus:outline-none focus:border-[#7fa9c4] transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.06em] uppercase text-[#6a6c6a] mb-2" style={{ fontFamily: FIELD_STYLE }}>
                {t('form.company')}
              </label>
              <input
                type="text"
                placeholder={t('form.companyPlaceholder')}
                className="w-full bg-transparent border-b border-[#2d3239] pb-2.5 text-[15px] text-[#f3f1ea] placeholder:text-[#6a6c6a] focus:outline-none focus:border-[#7fa9c4] transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.06em] uppercase text-[#6a6c6a] mb-2" style={{ fontFamily: FIELD_STYLE }}>
                {t('form.email')}
              </label>
              <input
                type="email"
                placeholder={t('form.emailPlaceholder')}
                className="w-full bg-transparent border-b border-[#2d3239] pb-2.5 text-[15px] text-[#f3f1ea] placeholder:text-[#6a6c6a] focus:outline-none focus:border-[#7fa9c4] transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.06em] uppercase text-[#6a6c6a] mb-2" style={{ fontFamily: FIELD_STYLE }}>
                {t('form.notes')}
              </label>
              <textarea
                rows={4}
                placeholder={t('form.notesPlaceholder')}
                className="w-full bg-transparent border-b border-[#2d3239] pb-2.5 text-[15px] text-[#f3f1ea] placeholder:text-[#6a6c6a] focus:outline-none focus:border-[#7fa9c4] transition-colors duration-200 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2 gap-4 flex-wrap">
              <span
                className="text-[11px] tracking-[0.04em] uppercase text-[#6a6c6a]"
                style={{ fontFamily: FIELD_STYLE }}
              >
                {t('form.trust')}
              </span>
              <button
                type="submit"
                className="rounded-full bg-[#f3f1ea] text-[#0c0e10] px-6 py-2.5 text-[13px] font-medium hover:bg-[#d4c8a6] transition-colors duration-200 min-h-[40px]"
              >
                {t('form.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

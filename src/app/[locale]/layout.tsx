import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const descriptions: Record<string, string> = {
    en: 'Bosnia Business Hub — Strategic accounting, payroll, and business advisory for BiH and EU firms.',
    de: 'Bosnia Business Hub — Strategisches Rechnungswesen, Lohnbuchhaltung und Unternehmensberatung für BiH und EU-Firmen.',
    bs: 'Bosnia Business Hub — Strateško računovodstvo, obračun plaća i poslovno savjetovanje za BiH i EU firme.',
  };

  return {
    title: {
      default: 'Bosnia Business Hub',
      template: '%s · BBH',
    },
    description: descriptions[locale] ?? descriptions.en,
    keywords: ['accounting', 'BiH', 'Steuerberater', 'nearshoring', 'MSFI', 'payroll', 'Bosnia'],
    metadataBase: new URL('https://bbh.ba'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        de: '/de',
        bs: '/bs',
      },
    },
    openGraph: {
      title: 'Bosnia Business Hub',
      description: t('subheadline'),
      locale: locale === 'bs' ? 'bs_BA' : locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-offwhite text-navy antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

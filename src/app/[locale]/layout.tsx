import type { Metadata } from 'next';
import { Inter, Newsreader, JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  const descriptions: Record<string, string> = {
    en: 'White Label Backbone Office — Strategic accounting, payroll, and business advisory for BiH and EU firms.',
    de: 'White Label Backbone Office — Strategisches Rechnungswesen, Lohnbuchhaltung und Unternehmensberatung für BiH und EU-Firmen.',
    bs: 'White Label Backbone Office — Strateško računovodstvo, obračun plaća i poslovno savjetovanje za BiH i EU firme.',
  };

  return {
    title: {
      default: 'White Label Backbone Office',
      template: '%s · WLB',
    },
    description: descriptions[locale] ?? descriptions.en,
    keywords: ['accounting', 'BiH', 'Steuerberater', 'nearshoring', 'MSFI', 'payroll', 'Bosnia', 'white label'],
    metadataBase: new URL('https://wlboffice.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        de: '/de',
        bs: '/bs',
      },
    },
    openGraph: {
      title: 'White Label Backbone Office',
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
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0c0e10] text-[#f3f1ea] antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

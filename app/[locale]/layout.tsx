import type { Metadata } from 'next';
import Script from 'next/script';
import { Locale, getTranslations, locales } from '@/lib/i18n';
import '../globals.css';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params as { locale: Locale };
  const t = getTranslations(locale);

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    openGraph: {
      title: t.metadata.ogTitle,
      description: t.metadata.ogDescription,
      url: locale === 'fr' ? 'https://bramdev.ca/' : 'https://bramdev.ca/en/',
      type: 'website',
    },
    alternates: {
      canonical: locale === 'fr' ? 'https://bramdev.ca/' : 'https://bramdev.ca/en/',
      languages: {
        'fr': 'https://bramdev.ca/',
        'en': 'https://bramdev.ca/en/',
        'x-default': 'https://bramdev.ca/',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params as { locale: Locale };

  return (
    <html lang={locale}>
      <body>
        {children}

        {/* Google Analytics - loaded after interactive for better performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NXP72RMC0T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NXP72RMC0T');
          `}
        </Script>
      </body>
    </html>
  );
}

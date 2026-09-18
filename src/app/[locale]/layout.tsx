import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://www.kongenshave.com';
  const ogImage = `${baseUrl}/gallery/images%20(1).jpg`;

  const localeUrls: Record<string, string> = {
    en: `${baseUrl}/`,
    zh: `${baseUrl}/zh`,
    de: `${baseUrl}/de`,
    da: `${baseUrl}/da`,
  };
  const selfUrl = localeUrls[locale] ?? localeUrls.en;

  const ogLocale = locale === 'zh' ? 'zh_CN' : locale === 'de' ? 'de_DE' : locale === 'da' ? 'da_DK' : 'en_US';

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: [
      "The King's Garden",
      'Kongens Have',
      'Kongens Have Copenhagen',
      'Rosenborg Castle',
      'Copenhagen royal garden',
      '哥本哈根国王花园',
      '丹麦皇家园林',
      'Kongens Have Kopenhagen',
      'Kongens Have København',
    ],
    alternates: {
      canonical: selfUrl,
      languages: {
        'en': localeUrls.en,
        'zh': localeUrls.zh,
        'de': localeUrls.de,
        'da': localeUrls.da,
        'x-default': localeUrls.en,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "The King's Garden",
      locale: ogLocale,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 800, alt: "The King's Garden (Kongens Have), Copenhagen" }],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [ogImage],
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
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : locale === 'de' ? 'de' : locale === 'da' ? 'da' : 'en'} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

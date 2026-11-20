import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const origin = 'https://www.kongenshave.com';
  const path = '/cookie-settings';
  const en = origin + path;
  const languages: Record<string, string> = {
    en,
    zh: origin + '/zh' + path,
    de: origin + '/de' + path,
    da: origin + '/da' + path,
    'x-default': en,
  };

  return {
    alternates: {
      canonical: languages[locale] ?? en,
      languages,
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}

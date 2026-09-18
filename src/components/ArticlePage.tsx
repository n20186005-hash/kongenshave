import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import type { Metadata } from 'next';

export type ArticleNamespace = 'articles.picnicSpots' | 'articles.thingsToDo';

const baseUrl = 'https://www.kongenshave.com';

function articlePaths(path: string) {
  return {
    en: `${baseUrl}${path}`,
    zh: `${baseUrl}/zh${path}`,
    de: `${baseUrl}/de${path}`,
    da: `${baseUrl}/da${path}`,
  };
}

export async function buildArticleMetadata(
  locale: string,
  namespace: ArticleNamespace,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const urls = articlePaths(path);
  const selfUrl = urls[locale as Locale] ?? urls.en;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: selfUrl,
      languages: {
        en: urls.en,
        zh: urls.zh,
        de: urls.de,
        da: urls.da,
        'x-default': urls.en,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: selfUrl,
      type: 'article',
    },
  };
}

export default async function ArticlePage({
  locale,
  namespace,
  path,
}: {
  locale: string;
  namespace: ArticleNamespace;
  path: string;
}) {
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations(namespace);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const sections = (t.raw('sections') as { heading: string; body: string }[]) ?? [];
  const spots = (t.raw('spots') as { name: string; desc: string }[]) ?? [];
  const tips = (t.raw('tips') as string[]) ?? [];

  return (
    <main className="section-padding">
      <article className="max-w-3xl mx-auto">
        <a href={prefix || '/'} className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
          ← {t('back')}
        </a>

        <h1
          className="font-display text-4xl sm:text-5xl font-semibold mt-4 mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h1>
        <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('description')}
        </p>
        <p className="leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        {sections.map((s, i) => (
          <section key={i} className="mb-8">
            <h2
              className="font-display text-2xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {s.heading}
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {s.body}
            </p>
          </section>
        ))}

        <h2
          className="font-display text-2xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('spotsTitle')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {spots.map((spot, i) => (
            <div
              key={i}
              className="rounded-xl p-5"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                {spot.name}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {spot.desc}
              </p>
            </div>
          ))}
        </div>

        <h2
          className="font-display text-2xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('tipsTitle')}
        </h2>
        <ul className="list-disc pl-5 space-y-2 mb-10" style={{ color: 'var(--text-secondary)' }}>
          {tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>

        <div
          className="rounded-xl p-6 text-center"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <p className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
            {t('ctaText')}
          </p>
          <a
            href={prefix || '/'}
            className="inline-block px-5 py-2.5 rounded-lg text-white font-medium"
            style={{ background: 'var(--accent)' }}
          >
            {t('ctaButton')}
          </a>
        </div>
      </article>
    </main>
  );
}

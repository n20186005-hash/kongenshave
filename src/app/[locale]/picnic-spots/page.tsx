import type { Metadata } from 'next';
import ArticlePage, { buildArticleMetadata } from '@/components/ArticlePage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildArticleMetadata(locale, 'articles.picnicSpots', '/picnic-spots');
}

export default async function PicnicSpotsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ArticlePage locale={locale} namespace="articles.picnicSpots" path="/picnic-spots" />
  );
}

import type { Metadata } from 'next';
import ArticlePage, { buildArticleMetadata } from '@/components/ArticlePage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildArticleMetadata(locale, 'articles.thingsToDo', '/things-to-do');
}

export default async function ThingsToDoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <ArticlePage locale={locale} namespace="articles.thingsToDo" path="/things-to-do" />
  );
}

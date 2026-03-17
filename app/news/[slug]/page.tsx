import { notFound } from 'next/navigation'
import { getArticle, getSlugsFornews } from '@/lib/articles'
import { ArticlePage } from '@/components/ArticlePage'
import type { Articlenews } from '@/lib/articles'

const CAT = 'news' as Articlenews

export async function generateStaticParams() {
  return getSlugsFornews(CAT).map(slug => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(CAT, slug)
  if (!article) notFound()
  return <ArticlePage article={article} />
}
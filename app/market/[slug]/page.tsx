import { notFound } from 'next/navigation'
import { getArticle, getSlugsFormarket } from '@/lib/articles'
import { ArticlePage } from '@/components/ArticlePage'
import type { Articlemarket } from '@/lib/articles'

const CAT = 'market' as Articlemarket

export async function generateStaticParams() {
  return getSlugsFormarket(CAT).map(slug => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(CAT, slug)
  if (!article) notFound()
  return <ArticlePage article={article} />
}
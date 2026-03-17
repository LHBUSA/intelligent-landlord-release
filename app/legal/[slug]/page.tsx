import { notFound } from 'next/navigation'
import { getArticle, getSlugsForlegal } from '@/lib/articles'
import { ArticlePage } from '@/components/ArticlePage'
import type { Articlelegal } from '@/lib/articles'

const CAT = 'legal' as Articlelegal

export async function generateStaticParams() {
  return getSlugsForlegal(CAT).map(slug => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(CAT, slug)
  if (!article) notFound()
  return <ArticlePage article={article} />
}
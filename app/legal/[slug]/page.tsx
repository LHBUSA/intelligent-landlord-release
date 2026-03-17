import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticle, getSlugsForCategory } from '@/lib/articles'
import { ArticleLayout } from '@/components/ArticleLayout'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getSlugsForCategory('legal').map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle('legal', slug)
  if (!article) return {}
  return { title: article.seoTitle || article.title, description: article.seoDescription || article.excerpt }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle('legal', slug)
  if (!article) notFound()
  return <ArticleLayout article={article} />
}

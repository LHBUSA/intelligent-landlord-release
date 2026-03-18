import { notFound } from 'next/navigation'
import { getArticle, getSlugsForCategory } from '@/lib/articles'
import { fetchSupabaseArticles, supabaseToArticle } from '@/lib/supabase-articles'
import { ArticlePage } from '@/components/ArticlePage'
import type { ArticleCategory } from '@/lib/articles'

const CAT = 'market' as ArticleCategory

export async function generateStaticParams() {
  const staticSlugs = getSlugsForCategory(CAT).map(slug => ({ slug }))
  try {
    const remote = await fetchSupabaseArticles()
    const remoteSlugs = remote
      .filter(a => a.category === CAT)
      .map(a => ({ slug: a.slug }))
    const all = [...staticSlugs]
    for (const r of remoteSlugs) {
      if (!all.find(s => s.slug === r.slug)) all.push(r)
    }
    return all
  } catch { return staticSlugs }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let article = getArticle(CAT, slug)
  if (!article) {
    try {
      const remote = await fetchSupabaseArticles()
      const found = remote.find(a => a.category === CAT && a.slug === slug)
      if (found) article = supabaseToArticle(found) as any
    } catch {}
  }
  if (!article) notFound()
  return <ArticlePage article={article} />
}

import { notFound } from 'next/navigation'
import { getSlugsForCategory } from '@/lib/articles'
import { fetchSupabaseArticles, supabaseToArticle } from '@/lib/supabase-articles'
import { ArticlePage } from '@/components/ArticlePage'
import type { ArticleCategory } from '@/lib/articles'

const CAT = 'guides' as ArticleCategory

export async function generateStaticParams() {
  try {
    const remote = await fetchSupabaseArticles()
    const remoteSlugs = remote
      .filter((a: any) => a.category === CAT)
      .map((a: any) => ({ slug: a.slug }))
    if (remoteSlugs.length > 0) return remoteSlugs
  } catch {}
  // fallback to static slugs
  const staticSlugs = await getSlugsForCategory(CAT)
  return staticSlugs.map(slug => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const remote = await fetchSupabaseArticles()
    const found = remote.find((a: any) => a.category === CAT && a.slug === slug)
    if (found) return <ArticlePage article={supabaseToArticle(found) as any} />
  } catch {}
  notFound()
}

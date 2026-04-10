import { notFound } from 'next/navigation'
import { fetchSupabaseArticles, supabaseToArticle } from '@/lib/supabase-articles'
import { ArticlePage } from '@/components/ArticlePage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const remote = await fetchSupabaseArticles()
    const found = remote.find((a: any) => a.slug === slug)
    if (found) return {
      title: `${found.title} — Intelligent Landlord`,
      description: found.excerpt || '',
    }
  } catch {}
  return { title: 'Article — Intelligent Landlord' }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  try {
    const remote = await fetchSupabaseArticles()
    const found = remote.find((a: any) => a.slug === slug)
    if (found) return <ArticlePage article={supabaseToArticle(found) as any} />
  } catch {}
  notFound()
}

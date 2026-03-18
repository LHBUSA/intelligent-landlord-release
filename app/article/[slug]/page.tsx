import { notFound } from "next/navigation"
import { fetchSupabaseArticles } from "@/lib/supabase-articles"

export const dynamic = "force-dynamic"

export default async function FullPageArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const articles = await fetchSupabaseArticles()
    const article = articles.find((a: any) => a.slug === slug)
    if (!article) notFound()
    return (
      <div
        dangerouslySetInnerHTML={{ __html: (article as any).body || "" }}
        style={{ minHeight: "100vh" }}
      />
    )
  } catch {
    notFound()
  }
}
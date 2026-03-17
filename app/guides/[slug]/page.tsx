import { notFound } from "next/navigation"
import { getArticle, getSlugsForCategory } from "@/lib/articles"
import { ArticlePage } from "@/components/ArticlePage"
import type { ArticleCategory } from "@/lib/articles"

const CAT = "guides" as ArticleCategory

export async function generateStaticParams() {
  return getSlugsForCategory(CAT).map(slug => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(CAT, slug)
  if (!article) notFound()
  return <ArticlePage article={article} />
}
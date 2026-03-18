// lib/supabase-articles.ts
// Fetches published articles from Supabase at build time
// Falls back gracefully if Supabase is unavailable

export interface SupabaseArticle {
  id: string
  title: string
  slug: string
  category: string
  category_label: string
  excerpt: string
  pill: string
  read_time: string
  tags: string[]
  author: string
  featured: boolean
  body: string
  published_at: string
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rlfyavnhbngwbldebrid.supabase.co'
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export async function fetchSupabaseArticles(): Promise<SupabaseArticle[]> {
  if (!SUPABASE_ANON_KEY) return []
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/il_articles?select=*&order=published_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        next: { revalidate: 60 },
      }
    )
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

export function supabaseToArticle(a: SupabaseArticle) {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || '',
    category: a.category as 'guides' | 'market' | 'legal' | 'news',
    categoryLabel: a.category_label || a.category,
    pill: a.pill || 'Article',
    tags: a.tags || [],
    publishedAt: a.published_at?.split('T')[0] || '',
    readTime: a.read_time || '5 min',
    author: a.author || 'IL Editorial',
    body: a.body || '',
    featured: a.featured || false,
    seoTitle: a.title,
    seoDescription: a.excerpt,
  }
}

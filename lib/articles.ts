// ─────────────────────────────────────────────
//  lib/articles.ts
//  Reads from Supabase il_articles table.
//  Falls back to STATIC_ARTICLES if fetch fails.
// ─────────────────────────────────────────────

export type ArticleCategory = 'guides' | 'market' | 'legal' | 'news'

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: ArticleCategory
  categoryLabel: string
  pill: string
  tags: string[]
  publishedAt: string
  readTime: string
  author: string
  body: string
  image?: string
  featured?: boolean
  seoTitle?: string
  seoDescription?: string
  faqs?: { q: string; a: string }[]
}

// ─────────────────────────────────────────────
//  Supabase config — set these in Vercel env vars
//  NEXT_PUBLIC_SUPABASE_URL
//  NEXT_PUBLIC_SUPABASE_ANON_KEY
// ─────────────────────────────────────────────
const SB_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const SB_KEY  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const TABLE   = 'il_articles'
const SELECT  = 'id,title,slug,category,category_label,excerpt,pill,read_time,tags,author,featured,body,published_at,created_at,is_full_page'

// Row from Supabase → Article shape
function rowToArticle(r: Record<string, unknown>): Article {
  return {
    slug:          String(r.slug         ?? ''),
    title:         String(r.title        ?? ''),
    excerpt:       String(r.excerpt      ?? ''),
    category:      (r.category as ArticleCategory) ?? 'news',
    categoryLabel: String(r.category_label ?? r.category ?? ''),
    pill:          String(r.pill         ?? ''),
    tags:          Array.isArray(r.tags) ? (r.tags as string[]) : [],
    publishedAt:   String(r.published_at ?? r.created_at ?? ''),
    readTime:      String(r.read_time    ?? ''),
    author:        String(r.author       ?? 'IL Editorial'),
    body:          String(r.body         ?? ''),
    featured:      Boolean(r.featured),
  }
}

// ─────────────────────────────────────────────
//  Core fetch — server-side, cached 1 hour
// ─────────────────────────────────────────────
async function fetchAllArticles(): Promise<Article[]> {
  if (!SB_URL || !SB_KEY) {
    console.warn('[articles] Supabase env vars missing — using static fallback')
    return STATIC_ARTICLES
  }
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/${TABLE}?select=${SELECT}&order=published_at.desc`,
      {
        headers: {
          apikey:        SB_KEY,
          Authorization: `Bearer ${SB_KEY}`,
          Accept:        'application/json',
        },
        next: { revalidate: 3600 }, // Next.js ISR — refresh every hour
      }
    )
    if (!res.ok) {
      console.error('[articles] Supabase error', res.status, await res.text())
      return STATIC_ARTICLES
    }
    const rows = (await res.json()) as Record<string, unknown>[]
    if (!Array.isArray(rows) || rows.length === 0) return STATIC_ARTICLES
    return rows.map(rowToArticle)
  } catch (err) {
    console.error('[articles] fetch failed', err)
    return STATIC_ARTICLES
  }
}

// ─────────────────────────────────────────────
//  Public API — all async, all server-safe
// ─────────────────────────────────────────────
export async function getAllArticles(): Promise<Article[]> {
  return fetchAllArticles()
}

export async function getFeaturedArticle(): Promise<Article | undefined> {
  const articles = await fetchAllArticles()
  return articles.find(a => a.featured) ?? articles[0]
}

export async function getRecentArticles(limit = 6, excludeSlug?: string): Promise<Article[]> {
  const articles = await fetchAllArticles()
  return articles.filter(a => a.slug !== excludeSlug).slice(0, limit)
}

export async function getArticlesByCategory(category: ArticleCategory): Promise<Article[]> {
  const articles = await fetchAllArticles()
  return articles.filter(a => a.category === category)
}

export async function getArticle(category: ArticleCategory, slug: string): Promise<Article | undefined> {
  const articles = await fetchAllArticles()
  return articles.find(a => a.category === category && a.slug === slug)
}

export async function getSlugsForCategory(category: ArticleCategory): Promise<string[]> {
  const articles = await fetchAllArticles()
  return articles.filter(a => a.category === category).map(a => a.slug)
}

export async function getRelatedArticles(category: ArticleCategory, slug: string, limit = 3): Promise<Article[]> {
  const articles = await fetchAllArticles()
  return articles.filter(a => a.category === category && a.slug !== slug).slice(0, limit)
}

export async function getLatestNews(limit = 5): Promise<Article[]> {
  const articles = await fetchAllArticles()
  return articles.filter(a => a.category === 'news').slice(0, limit)
}

export async function getSearchIndex() {
  const articles = await fetchAllArticles()
  return articles.map(a => ({
    slug:          a.slug,
    title:         a.title,
    excerpt:       a.excerpt,
    category:      a.category,
    categoryLabel: a.categoryLabel,
    tags:          a.tags,
  }))
}

// ─────────────────────────────────────────────
//  Derived counts — computed from live data
// ─────────────────────────────────────────────
export async function getArticleCount(): Promise<number> {
  const articles = await fetchAllArticles()
  return articles.length
}

export async function getCategoryCounts(): Promise<Record<ArticleCategory, number>> {
  const articles = await fetchAllArticles()
  return {
    guides: articles.filter(a => a.category === 'guides').length,
    market: articles.filter(a => a.category === 'market').length,
    legal:  articles.filter(a => a.category === 'legal').length,
    news:   articles.filter(a => a.category === 'news').length,
  }
}

// Keep these for any legacy sync code still referencing them
// They will return stale static counts — migrate callers to the async versions above
export const ARTICLE_COUNT    = STATIC_ARTICLES.length
export const CATEGORY_COUNTS  = {
  guides: STATIC_ARTICLES.filter(a => a.category === 'guides').length,
  market: STATIC_ARTICLES.filter(a => a.category === 'market').length,
  legal:  STATIC_ARTICLES.filter(a => a.category === 'legal').length,
  news:   STATIC_ARTICLES.filter(a => a.category === 'news').length,
}

// ─────────────────────────────────────────────
//  Static fallback — used when Supabase is
//  unavailable or env vars are not set
// ─────────────────────────────────────────────
const STATIC_ARTICLES: Article[] = [
  {
    slug: 'landlord-tenant-law-complete-guide',
    title: 'Landlord-Tenant Law: What Every Landlord Must Know in 2026',
    excerpt: 'State laws vary dramatically. Security deposits, entry notice, habitability standards, and eviction procedures differ by jurisdiction -- and getting it wrong is expensive.',
    category: 'guides',
    categoryLabel: 'Landlord Guides',
    pill: 'Essential Reading',
    tags: ['landlord-tenant law', 'legal', 'lease', 'eviction'],
    publishedAt: '2026-03-01',
    readTime: '12 min',
    author: 'IL Editorial',
    featured: true,
    body: '',
  },
  {
    slug: 'rental-market-outlook-2026',
    title: 'Rental Market Outlook 2026: What Landlords Need to Know',
    excerpt: 'New supply is peaking, mortgage rates are keeping renters in place, and market performance is diverging sharply by geography.',
    category: 'market',
    categoryLabel: 'Rental Market',
    pill: 'Market Analysis',
    tags: ['rental market', 'vacancy rates', 'rent growth'],
    publishedAt: '2026-03-08',
    readTime: '10 min',
    author: 'IL Editorial',
    featured: false,
    body: '',
  },
  {
    slug: 'eviction-process-by-state',
    title: 'The Eviction Process by State: Timelines, Requirements, and Common Mistakes',
    excerpt: 'Eviction is a court process in every state. Here are the steps, timelines, and the procedural errors that get landlord cases dismissed.',
    category: 'legal',
    categoryLabel: 'State Laws',
    pill: 'Legal Guide',
    tags: ['eviction', 'unlawful detainer', 'eviction timeline'],
    publishedAt: '2026-03-05',
    readTime: '12 min',
    author: 'IL Editorial',
    featured: false,
    body: '',
  },
  {
    slug: 'weekly-landlord-intel-march-10-2026',
    title: 'Weekly Landlord Intel: March 10, 2026',
    excerpt: 'Mortgage rates back to 6.11%, apartment absorption data from major markets, and what the Fed is signaling for the second half of 2026.',
    category: 'news',
    categoryLabel: 'Weekly Intel',
    pill: 'Weekly Brief',
    tags: ['mortgage rates', 'rental market', 'weekly intel'],
    publishedAt: '2026-03-10',
    readTime: '5 min',
    author: 'IL Editorial',
    featured: false,
    body: '',
  },
]

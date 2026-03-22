import Link from "next/link"
import type { Metadata } from "next"
import { ARTICLES } from "@/lib/articles"
import { fetchSupabaseArticles } from "@/lib/supabase-articles"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Landlord News & Weekly Intel",
  description: "Weekly landlord market intelligence: mortgage rate updates, eviction law changes, rental market data, and everything landlords need to stay ahead.",
}

const mono = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"
const PER_PAGE = 12

// Light theme tokens
const BG       = "#F7F8FA"
const BG2      = "#FFFFFF"
const BORDER   = "#E2E8F0"
const TEXT     = "#1A2332"
const MUTED    = "#5A6A7E"
const TEAL     = "#0D9488"

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || "1"))

  let remoteArticles: any[] = []
  try { remoteArticles = await fetchSupabaseArticles() } catch {}

  const staticItems = ARTICLES.map(a => ({ ...a, isFullPage: false, href: `/${a.category}/${a.slug}` }))
  const remoteItems = remoteArticles.map((a: any) => ({
    slug: a.slug, title: a.title, excerpt: a.excerpt || "",
    category: a.category, categoryLabel: a.category_label || a.category,
    pill: a.pill || "Article", publishedAt: (a.published_at || "").split("T")[0],
    readTime: a.read_time || "5 min", isFullPage: a.is_full_page || false,
    href: a.is_full_page ? `/article/${a.slug}` : `/${a.category}/${a.slug}`,
  }))

  const slugsSeen = new Set<string>()
  const all = [...remoteItems, ...staticItems].filter(a => {
    if (slugsSeen.has(a.slug)) return false
    slugsSeen.add(a.slug)
    return true
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  const newsArticles = all.filter(a => a.category === "news")
  const otherArticles = all.filter(a => a.category !== "news")
  const latest = newsArticles[0]
  const recentNews = newsArticles.slice(1, 4)

  const totalPages = Math.ceil(otherArticles.length / PER_PAGE)
  const paginated = otherArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ padding: "clamp(48px,6vw,80px) var(--page-pad)", borderBottom: `1px solid ${BORDER}`, background: BG2 }}>
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: TEAL, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 24, height: 1, background: TEAL, display: "block" }} />
            Published Every Week
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 600, lineHeight: 1.12, marginBottom: 18, color: TEXT }}>
            Landlord Intelligence.<br />
            <span style={{ color: TEAL }}>Every Week. Always Free.</span>
          </h1>
          <p style={{ color: MUTED, maxWidth: "58ch", lineHeight: 1.75, fontSize: 17, marginBottom: 0 }}>
            Mortgage rate moves, eviction law changes, rental market data, and state law updates — curated for landlords weekly. No fluff. No paywall.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "clamp(44px,5vw,68px) var(--page-pad)" }}>

        {/* Latest issue */}
        {latest && (
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Latest Issue</div>
            <Link href={(latest as any).href} style={{ display: "block", background: BG2, border: `1px solid ${BORDER}`, padding: "clamp(28px,4vw,48px)", position: "relative", overflow: "hidden", textDecoration: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${TEAL}, transparent)` }} />
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FFFFFF", background: TEAL, padding: "4px 10px" }}>{latest.pill}</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: MUTED, letterSpacing: "0.06em" }}>{formatDate(latest.publishedAt)} — {latest.readTime} read</span>
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 600, lineHeight: 1.2, maxWidth: "28ch", marginBottom: 16, color: TEXT }}>{latest.title}</h2>
              <p style={{ color: MUTED, maxWidth: "64ch", lineHeight: 1.75, fontSize: 16 }}>{latest.excerpt}</p>
              <div style={{ marginTop: 24, fontFamily: mono, fontSize: 12, color: TEAL, letterSpacing: "0.06em" }}>Read this week's issue →</div>
            </Link>
          </div>
        )}

        {/* Previous issues */}
        {recentNews.length > 0 && (
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED, marginBottom: 20 }}>Previous Issues</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {recentNews.map((a: any) => (
                <Link key={a.slug} href={a.href} style={{ display: "block", background: BG2, border: `1px solid ${BORDER}`, padding: "24px 26px", textDecoration: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: "0.08em", marginBottom: 10 }}>{formatDate(a.publishedAt)}</div>
                  <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, lineHeight: 1.3, marginBottom: 10, color: TEXT }}>{a.title}</div>
                  <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{a.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)`, opacity: 0.25, marginBottom: 56 }} />

        {/* All stories */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>
              All Stories
              <span style={{ marginLeft: 12, color: TEAL }}>{otherArticles.length} articles</span>
            </div>
            {totalPages > 1 && (
              <div style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: "0.06em" }}>Page {page} of {totalPages}</div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, marginBottom: 48 }}>
            {paginated.map((a: any) => (
              <Link key={a.slug} href={a.href} style={{ display: "block", background: BG2, border: `1px solid ${BORDER}`, padding: "24px 26px", textDecoration: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: TEAL }}>{a.categoryLabel}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: "0.06em", flexShrink: 0, marginLeft: 12 }}>{a.readTime}</span>
                </div>
                <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, lineHeight: 1.3, marginBottom: 10, color: TEXT }}>{a.title}</div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 14 }}>{a.excerpt.slice(0, 140)}…</div>
                <div style={{ fontFamily: mono, fontSize: 10, color: MUTED, opacity: 0.7, letterSpacing: "0.06em" }}>{formatDate(a.publishedAt)}</div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>

              {page > 1 && (
                <Link href={`/news?page=${page - 1}`} style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: TEXT, background: BG2, border: `1px solid ${BORDER}`, padding: "9px 18px", textDecoration: "none" }}>
                  ← Prev
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1]
                  return (
                    <span key={p} style={{ display: "contents" }}>
                      {prev && p - prev > 1 && (
                        <span style={{ fontFamily: mono, fontSize: 12, color: MUTED, padding: "9px 6px" }}>…</span>
                      )}
                      <Link href={`/news?page=${p}`} style={{ fontFamily: mono, fontSize: 11, color: p === page ? "#FFFFFF" : TEXT, background: p === page ? TEAL : BG2, border: `1px solid ${p === page ? TEAL : BORDER}`, padding: "9px 14px", textDecoration: "none", minWidth: 38, textAlign: "center" as const, display: "inline-block" }}>
                        {p}
                      </Link>
                    </span>
                  )
                })}

              {page < totalPages && (
                <Link href={`/news?page=${page + 1}`} style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: TEXT, background: BG2, border: `1px solid ${BORDER}`, padding: "9px 18px", textDecoration: "none" }}>
                  Next →
                </Link>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

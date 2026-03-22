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

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export default async function NewsPage({ searchParams }: { searchParams: { page?: string } }) {
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

  const page = Math.max(1, parseInt(searchParams.page || "1"))
  const totalPages = Math.ceil(otherArticles.length / PER_PAGE)
  const paginated = otherArticles.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <>
      {/* Hero */}
      <section style={{ padding: "clamp(48px,6vw,80px) var(--page-pad)", borderBottom: "1px solid var(--border2)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 24, height: 1, background: "var(--teal)", display: "block" }} />
            Published Every Week
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 600, lineHeight: 1.12, marginBottom: 18, color: "var(--text)" }}>
            Landlord Intelligence.<br />
            <span style={{ color: "var(--teal)" }}>Every Week. Always Free.</span>
          </h1>
          <p style={{ color: "var(--text)", opacity: 0.68, maxWidth: "58ch", lineHeight: 1.75, fontSize: 17 }}>
            Mortgage rate moves, eviction law changes, rental market data, and state law updates — curated for landlords weekly. No fluff. No paywall.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "clamp(44px,5vw,68px) var(--page-pad)" }}>

        {/* Latest issue */}
        {latest && (
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text)", opacity: 0.5, marginBottom: 20 }}>Latest Issue</div>
            <Link href={(latest as any).href} style={{ display: "block", background: "var(--bg2)", border: "1px solid var(--border)", padding: "clamp(28px,4vw,48px)", position: "relative", overflow: "hidden", textDecoration: "none" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--teal), transparent)" }} />
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#080D14", background: "var(--teal)", padding: "4px 10px" }}>{latest.pill}</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text)", opacity: 0.55, letterSpacing: "0.06em" }}>{formatDate(latest.publishedAt)} — {latest.readTime} read</span>
              </div>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 600, lineHeight: 1.2, maxWidth: "28ch", marginBottom: 16, color: "var(--text)" }}>{latest.title}</h2>
              <p style={{ color: "var(--text)", opacity: 0.68, maxWidth: "64ch", lineHeight: 1.75, fontSize: 16 }}>{latest.excerpt}</p>
              <div style={{ marginTop: 24, fontFamily: mono, fontSize: 12, color: "var(--teal)", letterSpacing: "0.06em" }}>Read this week's issue →</div>
            </Link>
          </div>
        )}

        {/* Previous issues */}
        {recentNews.length > 0 && (
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text)", opacity: 0.5, marginBottom: 20 }}>Previous Issues</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {recentNews.map((a: any) => (
                <Link key={a.slug} href={a.href} style={{ display: "block", background: "var(--bg2)", border: "1px solid var(--border2)", padding: "24px 26px", textDecoration: "none" }}>
                  <div style={{ fontFamily: mono, fontSize: 10, color: "var(--text)", opacity: 0.45, letterSpacing: "0.08em", marginBottom: 10 }}>{formatDate(a.publishedAt)}</div>
                  <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, lineHeight: 1.3, marginBottom: 10, color: "var(--text)" }}>{a.title}</div>
                  <div style={{ fontSize: 14, color: "var(--text)", opacity: 0.65, lineHeight: 1.7 }}>{a.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--teal), transparent)", opacity: 0.2, marginBottom: 56 }} />

        {/* All stories */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text)", opacity: 0.5 }}>
              All Stories
              <span style={{ marginLeft: 12, color: "var(--teal)", opacity: 1 }}>{otherArticles.length} articles</span>
            </div>
            {totalPages > 1 && (
              <div style={{ fontFamily: mono, fontSize: 10, color: "var(--text)", opacity: 0.45, letterSpacing: "0.06em" }}>
                Page {page} of {totalPages}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, marginBottom: 48 }}>
            {paginated.map((a: any) => (
              <Link key={a.slug} href={a.href} style={{ display: "block", background: "var(--bg2)", border: "1px solid var(--border2)", padding: "24px 26px", textDecoration: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--teal)" }}>{a.categoryLabel}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, color: "var(--text)", opacity: 0.4, letterSpacing: "0.06em", flexShrink: 0, marginLeft: 12 }}>{a.readTime}</span>
                </div>
                <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, lineHeight: 1.3, marginBottom: 10, color: "var(--text)" }}>{a.title}</div>
                <div style={{ fontSize: 14, color: "var(--text)", opacity: 0.65, lineHeight: 1.7, marginBottom: 14 }}>{a.excerpt.slice(0, 140)}…</div>
                <div style={{ fontFamily: mono, fontSize: 10, color: "var(--text)", opacity: 0.35, letterSpacing: "0.06em" }}>{formatDate(a.publishedAt)}</div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, paddingTop: 16, borderTop: "1px solid var(--border2)" }}>
              {page > 1 && (
                <Link href={`/news?page=${page - 1}`} style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text)", opacity: 0.6, border: "1px solid var(--border2)", padding: "8px 16px", textDecoration: "none" }}>
                  ← Prev
                </Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2).map((p, idx, arr) => {
                const prev = arr[idx - 1]
                return (
                  <span key={p} style={{ display: "contents" }}>
                    {prev && p - prev > 1 && (
                      <span style={{ fontFamily: mono, fontSize: 11, color: "var(--text)", opacity: 0.3, padding: "8px 4px" }}>…</span>
                    )}
                    <Link href={`/news?page=${p}`} style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: p === page ? "#080D14" : "var(--text)", background: p === page ? "var(--teal)" : "transparent", border: `1px solid ${p === page ? "var(--teal)" : "var(--border2)"}`, padding: "8px 14px", textDecoration: "none", opacity: p === page ? 1 : 0.6, minWidth: 36, textAlign: "center" as const, display: "inline-block" }}>
                      {p}
                    </Link>
                  </span>
                )
              })}

              {page < totalPages && (
                <Link href={`/news?page=${page + 1}`} style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text)", opacity: 0.6, border: "1px solid var(--border2)", padding: "8px 16px", textDecoration: "none" }}>
                  Next →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

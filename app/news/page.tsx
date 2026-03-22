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

// Editorial dark tokens — deep slate, not black
const BG      = "#1A2130"
const BG2     = "#212A3A"
const BG3     = "#263044"
const BORDER  = "rgba(255,255,255,0.09)"
const TEXT     = "#E8EDF4"
const MUTED    = "#8FA4B8"
const TEAL     = "#2DD4BF"

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
      <section style={{ padding: "clamp(56px,7vw,96px) var(--page-pad)", borderBottom: `1px solid ${BORDER}`, background: BG2, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: "48px 48px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -60, right: "10%", width: 400, height: 400, background: `radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: TEAL, marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 28, height: 1, background: TEAL, display: "block" }} />
            Published Every Week
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.6rem,5vw,4.4rem)", fontWeight: 600, lineHeight: 1.1, marginBottom: 20, color: TEXT, letterSpacing: "-0.01em" }}>
            Landlord Intelligence.<br />
            <span style={{ color: TEAL }}>Every Week. Always Free.</span>
          </h1>
          <p style={{ color: MUTED, maxWidth: "56ch", lineHeight: 1.8, fontSize: 17 }}>
            Mortgage rate moves, eviction law changes, rental market data, and state law updates — curated for landlords weekly. No fluff. No paywall.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "clamp(48px,5vw,72px) var(--page-pad)" }}>

        {/* Latest issue — editorial full-width feature */}
        {latest && (
          <div style={{ marginBottom: 72 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>Latest Issue</span>
              <span style={{ flex: 1, height: 1, background: BORDER }} />
            </div>
            <Link href={(latest as any).href} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: BG2, border: `1px solid ${BORDER}`, textDecoration: "none", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: TEAL }} />
              <div style={{ padding: "clamp(28px,4vw,52px)", borderRight: `1px solid ${BORDER}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#080D14", background: TEAL, padding: "4px 12px" }}>{latest.pill}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: "0.06em" }}>{latest.readTime} read</span>
                </div>
                <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 600, lineHeight: 1.15, marginBottom: 0, color: TEXT }}>{latest.title}</h2>
              </div>
              <div style={{ padding: "clamp(28px,4vw,52px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p style={{ color: MUTED, lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>{latest.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: "0.06em" }}>{formatDate(latest.publishedAt)}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: TEAL, letterSpacing: "0.06em" }}>Read now →</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Previous issues */}
        {recentNews.length > 0 && (
          <div style={{ marginBottom: 72 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>Previous Issues</span>
              <span style={{ flex: 1, height: 1, background: BORDER }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 1, background: BORDER }}>
              {recentNews.map((a: any) => (
                <Link key={a.slug} href={a.href} style={{ display: "block", background: BG2, padding: "28px 30px", textDecoration: "none" }}>
                  <div style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: "0.08em", marginBottom: 12 }}>{formatDate(a.publishedAt)}</div>
                  <div style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, lineHeight: 1.25, marginBottom: 12, color: TEXT }}>{a.title}</div>
                  <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.75 }}>{a.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All stories */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>All Stories</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: TEAL }}>{otherArticles.length} articles</span>
            <span style={{ flex: 1, height: 1, background: BORDER }} />
            {totalPages > 1 && (
              <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: "0.06em" }}>Page {page} of {totalPages}</span>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 1, background: BORDER, marginBottom: 48 }}>
            {paginated.map((a: any) => (
              <Link key={a.slug} href={a.href} style={{ display: "block", background: BG2, padding: "26px 28px", textDecoration: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: TEAL }}>{a.categoryLabel}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: "0.06em" }}>{a.readTime}</span>
                </div>
                <div style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, lineHeight: 1.25, marginBottom: 12, color: TEXT }}>{a.title}</div>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.75, marginBottom: 16 }}>{a.excerpt.slice(0, 140)}…</div>
                <div style={{ fontFamily: mono, fontSize: 10, color: MUTED, opacity: 0.6, letterSpacing: "0.06em" }}>{formatDate(a.publishedAt)}</div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}>
              {page > 1 && (
                <Link href={`/news?page=${page - 1}`} style={{ fontFamily: mono, fontSize: 11, color: TEXT, background: BG2, border: `1px solid ${BORDER}`, padding: "10px 20px", textDecoration: "none", letterSpacing: "0.06em" }}>← Prev</Link>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1]
                  return (
                    <span key={p} style={{ display: "contents" }}>
                      {prev && p - prev > 1 && (
                        <span style={{ fontFamily: mono, fontSize: 12, color: MUTED, padding: "10px 8px" }}>…</span>
                      )}
                      <Link href={`/news?page=${p}`} style={{ fontFamily: mono, fontSize: 11, color: p === page ? "#080D14" : TEXT, background: p === page ? TEAL : BG2, border: `1px solid ${p === page ? TEAL : BORDER}`, padding: "10px 16px", textDecoration: "none", minWidth: 40, textAlign: "center" as const, display: "inline-block" }}>
                        {p}
                      </Link>
                    </span>
                  )
                })}

              {page < totalPages && (
                <Link href={`/news?page=${page + 1}`} style={{ fontFamily: mono, fontSize: 11, color: TEXT, background: BG2, border: `1px solid ${BORDER}`, padding: "10px 20px", textDecoration: "none", letterSpacing: "0.06em" }}>Next →</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

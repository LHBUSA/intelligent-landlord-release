import Link from 'next/link'
import type { Metadata } from 'next'
import { getArticleBySlug, getRecentArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import { AdSlot } from '@/components/AdSlot'

export const revalidate = 3600

const mono  = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: `${article.title} — Intelligent Landlord`,
    description: article.excerpt || '',
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug)
  if (!article) notFound()

  const related = await getRecentArticles(4, params.slug)

  const categoryLabel: Record<string, string> = {
    guides: 'Landlord Guides',
    market: 'Rental Market',
    legal:  'State Laws',
    news:   'News',
  }

  return (
    <>
      {/* ── Article dark theme reset ── */}
      <style>{`
        .il-article-body {
          color: var(--text) !important;
          background: transparent !important;
        }
        .il-article-body * {
          color: inherit !important;
          background-color: transparent !important;
          border-color: var(--border) !important;
        }
        .il-article-body h1,
        .il-article-body h2,
        .il-article-body h3,
        .il-article-body h4 {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          color: var(--text) !important;
          margin-top: 2em;
          margin-bottom: 0.5em;
          line-height: 1.25;
        }
        .il-article-body h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); }
        .il-article-body h3 { font-size: clamp(1.15rem, 2vw, 1.45rem); }
        .il-article-body p  { line-height: 1.8; margin-bottom: 1.25em; opacity: 0.88; }
        .il-article-body a  { color: var(--teal) !important; text-decoration: underline; text-underline-offset: 3px; }
        .il-article-body a:hover { opacity: 0.8; }
        .il-article-body ul,
        .il-article-body ol  { padding-left: 1.5em; margin-bottom: 1.25em; }
        .il-article-body li  { line-height: 1.75; margin-bottom: 0.4em; }
        .il-article-body blockquote {
          border-left: 3px solid var(--teal) !important;
          padding-left: 1.2em;
          margin: 1.5em 0;
          opacity: 0.8;
          font-style: italic;
        }
        .il-article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
          font-size: 0.9rem;
        }
        .il-article-body th,
        .il-article-body td {
          padding: 10px 14px;
          border: 1px solid var(--border) !important;
          text-align: left;
        }
        .il-article-body th {
          background: var(--bg2) !important;
          font-weight: 700;
        }
        .il-article-body code {
          background: var(--bg2) !important;
          color: var(--teal) !important;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.88em;
          font-family: 'JetBrains Mono', monospace;
        }
        .il-article-body pre {
          background: var(--bg2) !important;
          padding: 1.2em;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .il-article-body pre code {
          padding: 0;
          background: transparent !important;
        }
        .il-article-body img {
          max-width: 100%;
          border-radius: 6px;
          margin: 1.5em 0;
        }
        .il-article-body hr {
          border: none !important;
          border-top: 1px solid var(--border) !important;
          margin: 2em 0;
        }
        /* Kill any white boxes that came from publisher */
        .il-article-body [style*="background: white"],
        .il-article-body [style*="background:#fff"],
        .il-article-body [style*="background: #fff"],
        .il-article-body [style*="background-color: white"],
        .il-article-body [style*="background-color:#fff"],
        .il-article-body [style*="background-color: #fff"] {
          background: transparent !important;
        }
        .il-article-body [style*="color: #000"],
        .il-article-body [style*="color:#000"],
        .il-article-body [style*="color: black"],
        .il-article-body [style*="color: rgb(0"],
        .il-article-body [style*="color:#333"] {
          color: var(--text) !important;
        }
      `}</style>

      {/* ── Breadcrumb ── */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border2)', padding: '12px var(--page-pad)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center', fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          <Link href="/" style={{ color: 'var(--text)', opacity: 0.5, textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.3 }}>›</span>
          <Link href={`/${article.category}`} style={{ color: 'var(--text)', opacity: 0.5, textDecoration: 'none' }}>
            {categoryLabel[article.category] || article.category}
          </Link>
          <span style={{ opacity: 0.3 }}>›</span>
          <span style={{ color: 'var(--teal)', opacity: 0.9 }}>{article.title}</span>
        </div>
      </div>

      {/* ── Article header ── */}
      <header style={{
        background: 'var(--bg)', borderBottom: '1px solid var(--border2)',
        padding: 'clamp(40px,6vw,72px) var(--page-pad)',
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{
            fontFamily: mono, fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 20,
            display: 'flex', gap: 16, alignItems: 'center',
          }}>
            <span>{article.pill || categoryLabel[article.category]}</span>
            {article.readTime && <><span style={{ opacity: 0.3 }}>·</span><span>{article.readTime} read</span></>}
            {article.publishedAt && (
              <><span style={{ opacity: 0.3 }}>·</span>
              <span style={{ opacity: 0.7 }}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span></>
            )}
          </div>

          <h1 style={{
            fontFamily: serif, fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
            fontWeight: 700, lineHeight: 1.15, color: 'var(--text)',
            marginBottom: 24, letterSpacing: '-0.01em',
          }}>{article.title}</h1>

          {article.excerpt && (
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: 'var(--text)',
              opacity: 0.7, lineHeight: 1.75, marginBottom: 0,
            }}>{article.excerpt}</p>
          )}
        </div>
      </header>

      {/* ── Article body + sidebar ── */}
      <div style={{
        maxWidth: 'var(--max-w)', margin: '0 auto',
        padding: 'clamp(40px,5vw,64px) var(--page-pad)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 300px',
        gap: 56,
        alignItems: 'start',
      }}>
        {/* Main content */}
        <article>
          <div
            className="il-article-body"
            style={{ fontSize: 'clamp(1rem, 1.6vw, 1.08rem)', lineHeight: 1.8, color: 'var(--text)' }}
            dangerouslySetInnerHTML={{ __html: (article as any).body || '' }}
          />

          {/* Article footer */}
          <div style={{
            marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
          }}>
            <Link href={`/${article.category}`} style={{
              fontFamily: mono, fontSize: 11, color: 'var(--teal)',
              letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
            }}>← Back to {categoryLabel[article.category] || 'Articles'}</Link>
            <div style={{ fontFamily: mono, fontSize: 10, color: 'var(--text)', opacity: 0.4, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              IntelligentLandlord.com — Free Resource
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Table of contents placeholder */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: 24 }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>In This Article</div>
            <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--text)', opacity: 0.55 }}>
              Use the headings in the article to navigate sections.
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: 24 }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>Related Guides</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {related.slice(0, 4).map(r => (
                  <Link key={r.slug} href={`/${r.category}/${r.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 4 }}>
                      {categoryLabel[r.category] || r.category}
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.4, borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
                      {r.title} →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <AdSlot size="rectangle" />
        </aside>
      </div>

      <div style={{ padding: '0 var(--page-pad) 48px', display: 'flex', justifyContent: 'center' }}>
        <AdSlot size="leaderboard" />
      </div>
    </>
  )
}

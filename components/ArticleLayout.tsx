import Link from 'next/link'
import type { Article } from '@/lib/articles'
import { getRelatedArticles } from '@/lib/articles'
import { AdSlot } from './AdSlot'

export function ArticleLayout({ article }: { article: Article }) {
  const related = getRelatedArticles(article.category, article.slug, 3)
  const catPath = `/${article.category}`

  const PILL_COLOR: Record<string, string> = {
    guides: 'var(--teal)',
    market: 'var(--gold)',
    legal:  'var(--blue)',
  }

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border2)', padding: 'clamp(32px,6vw,64px) var(--page-pad)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Link href={catPath} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: PILL_COLOR[article.category] || 'var(--teal)' }}>{article.categoryLabel}</Link>
            <span style={{ color: 'var(--border2)' }}>·</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{article.readTime} read</span>
            <span style={{ color: 'var(--border2)' }}>·</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{article.publishedAt}</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.2, maxWidth: '22ch', marginBottom: 16 }}>{article.title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.65 }}>{article.excerpt}</p>
          <div style={{ marginTop: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)' }}>By {article.author}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px var(--page-pad)', display: 'grid', gridTemplateColumns: '1fr clamp(260px,28%,320px)', gap: 48, alignItems: 'start' }}>
        <div>
          <article className="prose" dangerouslySetInnerHTML={{ __html: article.body }} />

          {/* FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', fontWeight: 600, marginBottom: 24 }}>Frequently Asked Questions</h2>
              {article.faqs.map((faq, i) => (
                <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border2)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text)' }}>{faq.q}</div>
                  <div style={{ color: 'rgba(238,242,247,0.78)', lineHeight: 1.65 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 80 }}>
          <AdSlot size="rectangle" />
          {related.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>Related Articles</div>
              {related.map(r => (
                <Link key={r.slug} href={`/${r.category}/${r.slug}`} style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid var(--border2)' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 6 }}>{r.categoryLabel}</div>
                  <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.4, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16 }}>{r.title}</div>
                </Link>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* Bottom ad */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', padding: '20px var(--page-pad)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AdSlot size="leaderboard" />
      </div>
    </>
  )
}

export default ArticleLayout

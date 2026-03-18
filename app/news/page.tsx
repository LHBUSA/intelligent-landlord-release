import Link from 'next/link'
import type { Metadata } from 'next'
import { ARTICLES } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Landlord News & Weekly Intel',
  description: 'Weekly landlord market intelligence: mortgage rate updates, eviction law changes, rental market data, and everything landlords need to stay ahead.',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function NewsPage() {
  const sorted = [...ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  const newsArticles = sorted.filter(a => a.category === 'news')
  const otherArticles = sorted.filter(a => a.category !== 'news')
  const latest = newsArticles[0]
  const recentNews = newsArticles.slice(1, 4)

  return (
    <>
      {/* Hero */}
      <section style={{ padding: 'clamp(40px,6vw,72px) var(--page-pad)', borderBottom: '1px solid var(--border2)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,212,191,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 20, height: 1, background: 'var(--teal)' }} />
            Published Every Week
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: 14 }}>
            Landlord Intelligence.<br />
            <span style={{ color: 'var(--teal)' }}>Every Week. Always Free.</span>
          </h1>
          <p style={{ color: 'var(--muted)', maxWidth: '58ch', lineHeight: 1.7, fontSize: 16 }}>
            Mortgage rate moves, eviction law changes, rental market data, and state law updates â€” curated for landlords and delivered weekly. No fluff. No paywall.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,5vw,64px) var(--page-pad)' }}>

        {/* Latest issue â€” featured */}
        {latest && (
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>Latest Issue</div>
            <Link href={`/news/${latest.slug}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border)', padding: 'clamp(24px,4vw,44px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--teal), transparent)' }} />
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#080D14', background: 'var(--teal)', padding: '3px 8px' }}>
                  {latest.pill}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>
                  {formatDate(latest.publishedAt)} Â· {latest.readTime} read
                </span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.4rem,2.8vw,2.2rem)', fontWeight: 600, lineHeight: 1.25, maxWidth: '28ch', marginBottom: 12 }}>
                {latest.title}
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '64ch', lineHeight: 1.65, fontSize: 15 }}>{latest.excerpt}</p>
              <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--teal)', letterSpacing: '0.06em' }}>Read this week's issue â†’</div>
            </Link>
          </div>
        )}

        {/* Previous issues */}
        {recentNews.length > 0 && (
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>Previous Issues</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1 }}>
              {recentNews.map(a => (
                <Link key={a.slug} href={`/news/${a.slug}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '20px 22px' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 8 }}>{formatDate(a.publishedAt)}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{a.excerpt}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--teal), transparent)', opacity: 0.15, marginBottom: 56 }} />

        {/* All other articles */}
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 24 }}>All Stories</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 1 }}>
            {otherArticles.map(a => (
              <Link key={a.slug} href={`/${a.category}/${a.slug}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '22px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal)' }}>{a.categoryLabel}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.06em', flexShrink: 0, marginLeft: 8 }}>{a.readTime}</span>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>{a.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{a.excerpt}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

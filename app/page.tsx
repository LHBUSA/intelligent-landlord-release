import Link from 'next/link'
import type { Metadata } from 'next'
import { getFeaturedArticle, getRecentArticles, getLatestNews, CATEGORY_COUNTS, ARTICLE_COUNT } from '@/lib/articles'
import { AdSlot } from '@/components/AdSlot'
import { PillarCards, ArticleCards } from '@/components/HoverCards'
import { LiveTickerClient as LiveTicker } from '@/components/LiveTickerClient'
import { NewsStrip } from '@/components/NewsStrip'

export const metadata: Metadata = {
  title: 'Intelligent Landlord -- Free Rental Property Intelligence',
  description: 'Landlord-tenant laws for all 50 states, live rental market data, lease guides, and free calculators. No signup, no paywall, no agenda.',
}

export default function Home() {
  const featured = getFeaturedArticle()
  const recent = getRecentArticles(6, featured?.slug)
  const latestNews = getLatestNews(3)

  const STATS = [
    { value: '50',                        label: 'State Law Guides' },
    { value: String(ARTICLE_COUNT) + '+', label: 'Free Articles' },
    { value: '7',                         label: 'Free Calculators' },
    { value: '0',                         label: 'Paywalls' },
  ]

  const PILLARS = [
    { cat: 'guides', label: 'Landlord Guides',  desc: 'Lease agreements, tenant screening, habitability, security deposits -- written in plain English.', color: 'var(--teal)', count: CATEGORY_COUNTS.guides, href: '/guides' },
    { cat: 'market', label: 'Rental Market',    desc: 'Cap rates, vacancy trends, rent growth by market, and the data landlords need to price correctly.', color: 'var(--gold)', count: CATEGORY_COUNTS.market, href: '/market' },
    { cat: 'legal',  label: 'State Laws',       desc: 'Eviction timelines, deposit limits, notice requirements, and rent control -- all 50 states.', color: 'var(--blue)', count: CATEGORY_COUNTS.legal, href: '/legal' },
  ]

  const newsItems = latestNews.map(a => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    publishedAt: a.publishedAt,
  }))

  return (
    <>
      <section style={{ padding: 'clamp(48px,8vw,96px) var(--page-pad)', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -100, right: '10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 24, height: 1, background: 'var(--teal)' }} />
            Free Rental Property Intelligence
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.12, maxWidth: '18ch', marginBottom: 24 }}>
            Know the law.<br />
            Know the market.<br />
            <span style={{ color: 'var(--teal)' }}>Be the informed landlord.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--muted)', maxWidth: '55ch', lineHeight: 1.7, marginBottom: 36 }}>
            Landlord-tenant laws for all 50 states, live rental market data, lease guides, and 7 free calculators. No account required. No paywall. No agenda.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/legal" style={{ background: 'var(--teal)', color: '#080D14', padding: '12px 28px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
              Find My State Laws
            </Link>
            <Link href="/tools" style={{ border: '1px solid var(--border)', color: 'var(--muted)', padding: '12px 28px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Free Calculators
            </Link>
            <Link href="/news" style={{ border: '1px solid rgba(45,212,191,0.2)', color: 'var(--teal)', padding: '12px 28px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Weekly Intel
            </Link>
          </div>
        </div>
      </section>

      <LiveTicker />

      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--page-pad)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '20px 0', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border2)' : 'none' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--teal)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--page-pad)' }}>
        <PillarCards pillars={PILLARS} />
      </section>

      {newsItems.length > 0 && <NewsStrip items={newsItems} />}

      {featured && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--page-pad) 0' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>Featured</div>
          <Link href={`/${featured.category}/${featured.slug}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border)', padding: 'clamp(24px,4vw,48px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, transparent 100%)' }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>
              {featured.pill} · {featured.readTime} read
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.25, maxWidth: '26ch', marginBottom: 14 }}>
              {featured.title}
            </h2>
            <p style={{ color: 'var(--muted)', maxWidth: '62ch', lineHeight: 1.65 }}>{featured.excerpt}</p>
            <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--teal)', letterSpacing: '0.06em' }}>Read article</div>
          </Link>
        </section>
      )}

      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,5vw,64px) var(--page-pad)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Recent Articles</div>
          <Link href="/news" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--teal)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>All Stories</Link>
        </div>
        <ArticleCards articles={recent} />
      </section>

      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)', padding: 'clamp(40px,5vw,64px) var(--page-pad)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 12 }}>All 50 States + DC</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 600, marginBottom: 10 }}>Find the landlord laws for your state</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '55ch', lineHeight: 1.65, fontSize: 15 }}>Security deposit limits, eviction timelines, required notices, rent control status -- every state, always free.</p>
          </div>
          <Link href="/legal" style={{ background: 'var(--teal)', color: '#080D14', padding: '14px 32px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
            Browse All States
          </Link>
        </div>
      </section>

      <div style={{ padding: '32px var(--page-pad)', display: 'flex', justifyContent: 'center' }}>
        <AdSlot size="leaderboard" />
      </div>
    </>
  )
}

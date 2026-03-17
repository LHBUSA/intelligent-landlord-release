import Link from 'next/link'
import type { Metadata } from 'next'
import { getFeaturedArticle, getRecentArticles, CATEGORY_COUNTS, ARTICLE_COUNT } from '@/lib/articles'
import { AdSlot } from '@/components/AdSlot'

export const metadata: Metadata = {
  title: 'Intelligent Landlord — Free Rental Property Intelligence',
  description: 'Landlord-tenant laws for all 50 states, rental market data, lease guides, and free calculators. No signup, no paywall, no agenda.',
}

export default function Home() {
  const featured = getFeaturedArticle()
  const recent = getRecentArticles(6, featured?.slug)

  const STATS = [
    { value: '50', label: 'State Law Guides' },
    { value: String(ARTICLE_COUNT) + '+', label: 'Free Articles' },
    { value: '7', label: 'Free Calculators' },
    { value: '0', label: 'Paywalls' },
  ]

  const PILLARS = [
    { cat: 'guides', label: 'Landlord Guides', desc: 'Lease agreements, tenant screening, habitability, security deposits, and everything in between — written in plain English.', color: 'var(--teal)', count: CATEGORY_COUNTS.guides, href: '/guides' },
    { cat: 'market', label: 'Rental Market', desc: 'Cap rates, vacancy trends, rent growth by market, and the data landlords need to price and time the market correctly.', color: 'var(--gold)', count: CATEGORY_COUNTS.market, href: '/market' },
    { cat: 'legal', label: 'State Laws', desc: 'Landlord-tenant law varies dramatically by state. Eviction timelines, deposit limits, notice requirements, and rent control — all 50 states.', color: 'var(--blue)', count: CATEGORY_COUNTS.legal, href: '/legal' },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{ padding: 'clamp(48px,8vw,96px) var(--page-pad)', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        {/* Background grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        {/* Glow */}
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
            Landlord-tenant laws for all 50 states, live rental market data, lease guides, and 7 free calculators. No account required. No paywall. No agenda — just the information you need to protect your investment.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/legal" style={{ background: 'var(--teal)', color: '#080D14', padding: '12px 28px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, transition: 'opacity 0.2s' }}>Find My State Laws</Link>
            <Link href="/tools" style={{ border: '1px solid var(--border)', color: 'var(--muted)', padding: '12px 28px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s' }}>Free Calculators →</Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
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

      {/* Content pillars */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--page-pad)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1 }}>
          {PILLARS.map(p => (
            <Link key={p.cat} href={p.href} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: 32, transition: 'border-color 0.2s, background 0.2s' }} } }>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{p.label}</span>
                <span style={{ opacity: 0.5 }}>{p.count} articles</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.65 }}>{p.desc}</p>
              <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, letterSpacing: '0.06em' }}>Browse {p.label} →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--page-pad) clamp(48px,6vw,80px)' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>Featured</div>
          <Link href={`/${featured.category}/${featured.slug}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border)', padding: 'clamp(24px,4vw,48px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, transparent 100%)' }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>
              {featured.pill} · {featured.readTime} read
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.25, maxWidth: '26ch', marginBottom: 14 }}>{featured.title}</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '62ch', lineHeight: 1.65 }}>{featured.excerpt}</p>
            <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--teal)', letterSpacing: '0.06em' }}>Read article →</div>
          </Link>
        </section>
      )}

      {/* Recent articles grid */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--page-pad) clamp(48px,6vw,80px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>Recent Articles</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1 }}>
          {recent.map(a => {
            const color = a.category === 'market' ? 'var(--gold)' : a.category === 'legal' ? 'var(--blue)' : 'var(--teal)'
            return (
              <Link key={a.slug} href={`/${a.category}/${a.slug}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: 24, transition: 'border-color 0.2s' }}  >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 10 }}>{a.categoryLabel}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: 10, color: 'var(--text)' }}>{a.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{a.excerpt.slice(0, 120)}…</div>
                <div style={{ marginTop: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{a.readTime} read</div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 50 State CTA */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)', padding: 'clamp(40px,5vw,64px) var(--page-pad)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 12 }}>All 50 States + DC</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 600, marginBottom: 10 }}>Find the landlord laws for your state</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '55ch', lineHeight: 1.65, fontSize: 15 }}>Security deposit limits, eviction timelines, required notices, rent control status, and the key facts every landlord in your state needs to know.</p>
          </div>
          <Link href="/legal" style={{ background: 'var(--teal)', color: '#080D14', padding: '14px 32px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>Browse All States →</Link>
        </div>
      </section>

      {/* Ad */}
      <div style={{ padding: '32px var(--page-pad)', display: 'flex', justifyContent: 'center' }}>
        <AdSlot size="leaderboard" />
      </div>
    </>
  )
}

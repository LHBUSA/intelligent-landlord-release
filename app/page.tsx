import Link from 'next/link'
import type { Metadata } from 'next'
import {
  getFeaturedArticle,
  getRecentArticles,
  getLatestNews,
  getArticleCount,
  getCategoryCounts,
} from '@/lib/articles'
import { AdSlot } from '@/components/AdSlot'
import { PillarCards, ArticleCards } from '@/components/HoverCards'
import { LiveTickerClient as LiveTicker } from '@/components/LiveTickerClient'
import { NewsStrip } from '@/components/NewsStrip'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Intelligent Landlord — Free Rental Property Intelligence',
  description: 'Landlord-tenant laws for all 50 states, live rental market data, lease guides, and free calculators. No signup, no paywall, no agenda.',
}

const mono  = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

export default async function Home() {
  const [featured, articleCount, categoryCounts, latestNews] = await Promise.all([
    getFeaturedArticle(),
    getArticleCount(),
    getCategoryCounts(),
    getLatestNews(3),
  ])
  const recent = await getRecentArticles(6, featured?.slug)

  const STATS = [
    { value: '50',                       label: 'State Law Guides' },
    { value: String(articleCount) + '+', label: 'Free Articles' },
    { value: '7',                        label: 'Free Calculators' },
    { value: '0',                        label: 'Paywalls' },
  ]

  const PILLARS = [
    { cat: 'guides', label: 'Landlord Guides', desc: 'Lease agreements, tenant screening, habitability, security deposits — written in plain English.', color: 'var(--teal)', count: categoryCounts.guides, href: '/guides' },
    { cat: 'market', label: 'Rental Market',   desc: 'Cap rates, vacancy trends, rent growth by market, and the data landlords need to price correctly.', color: 'var(--gold)', count: categoryCounts.market, href: '/market' },
    { cat: 'legal',  label: 'State Laws',      desc: 'Eviction timelines, deposit limits, notice requirements, and rent control — all 50 states.', color: 'var(--blue)', count: categoryCounts.legal, href: '/legal' },
  ]

  const newsItems = latestNews.map(a => ({
    slug: a.slug, title: a.title, excerpt: a.excerpt, publishedAt: a.publishedAt,
  }))

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        padding: 'clamp(56px,8vw,100px) var(--page-pad)',
        background: 'var(--bg)', position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px', pointerEvents: 'none',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -80, right: '8%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
          {/* Eyebrow */}
          <div style={{
            fontFamily: mono, fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 22,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ width: 28, height: 1, background: 'var(--teal)', display: 'block' }} />
            Free Rental Property Intelligence
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: serif, fontSize: 'clamp(2.6rem,5.5vw,4.8rem)',
            fontWeight: 600, lineHeight: 1.1, maxWidth: '18ch',
            marginBottom: 28, color: 'var(--text)', letterSpacing: '-0.01em',
          }}>
            Know the law.<br />
            Know the market.<br />
            <span style={{ color: 'var(--teal)' }}>Be the informed landlord.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem,2vw,1.25rem)', color: 'var(--text)',
            opacity: 0.72, maxWidth: '54ch', lineHeight: 1.75, marginBottom: 40,
          }}>
            Landlord-tenant laws for all 50 states, live rental market data, lease guides,
            and 7 free calculators. No account required. No paywall. No agenda.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
            <Link href="/legal" style={{
              background: 'var(--teal)', color: '#080D14', padding: '14px 32px',
              fontFamily: mono, fontSize: 12, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', display: 'inline-block',
            }}>Find My State Laws</Link>
            <Link href="/tools" style={{
              border: '1px solid var(--border)', color: 'var(--text)', padding: '14px 32px',
              fontFamily: mono, fontSize: 12, letterSpacing: '0.08em',
              textTransform: 'uppercase', opacity: 0.85, textDecoration: 'none', display: 'inline-block',
            }}>Free Calculators</Link>
            <Link href="/news" style={{
              border: '1px solid rgba(45,212,191,0.3)', color: 'var(--teal)', padding: '14px 32px',
              fontFamily: mono, fontSize: 12, letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
            }}>Weekly Intel</Link>
          </div>

          {/* Trust bar */}
          <div style={{
            display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center',
            paddingTop: 28, borderTop: '1px solid var(--border)',
          }}>
            {[
              { val: '50',    lbl: 'States covered' },
              { val: 'Daily', lbl: 'Data refresh' },
              { val: 'Free',  lbl: 'Always' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: 'var(--teal)' }}>{t.val}</div>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', lineHeight: 1.4 }}>{t.lbl}</div>
              </div>
            ))}
            <div style={{ marginLeft: 'auto' }}>
              <a
                href="https://propdata.proptechusa.ai/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: mono, fontSize: 9, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--muted)',
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5,
                  opacity: 0.6, transition: 'opacity 0.2s',
                }}
              >
                Powered by <span style={{ color: 'var(--teal)', marginLeft: 3 }}>PropData API ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Ticker ── */}
      <LiveTicker />

      {/* ── Stats bar ── */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)' }}>
        <div style={{
          maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--page-pad)',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              padding: '24px 0', textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--border2)' : 'none',
            }}>
              <div style={{
                fontFamily: serif, fontSize: 'clamp(1.8rem,3vw,2.6rem)',
                fontWeight: 700, color: 'var(--teal)', lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontFamily: mono, fontSize: 11, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--text)', opacity: 0.6, marginTop: 6,
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pillars ── */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(52px,6vw,84px) var(--page-pad)' }}>
        <PillarCards pillars={PILLARS} />
      </section>

      {newsItems.length > 0 && <NewsStrip items={newsItems} />}

      {/* ── Featured article ── */}
      {featured && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(48px,6vw,80px) var(--page-pad) 0' }}>
          <div style={{
            fontFamily: mono, fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--text)', opacity: 0.5, marginBottom: 20,
          }}>Featured</div>
          <Link
            href={`/${featured.category}/${featured.slug}`}
            style={{
              display: 'block', background: 'var(--bg2)', border: '1px solid var(--border)',
              padding: 'clamp(28px,4vw,52px)', position: 'relative', overflow: 'hidden', textDecoration: 'none',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, transparent 100%)' }} />
            <div style={{
              fontFamily: mono, fontSize: 11, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 18,
            }}>{featured.pill} · {featured.readTime} read</div>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(1.6rem,3vw,2.6rem)',
              fontWeight: 600, lineHeight: 1.2, maxWidth: '26ch', marginBottom: 16, color: 'var(--text)',
            }}>{featured.title}</h2>
            <p style={{ color: 'var(--text)', opacity: 0.68, maxWidth: '62ch', lineHeight: 1.7, fontSize: 16 }}>
              {featured.excerpt}
            </p>
            <div style={{ marginTop: 24, fontFamily: mono, fontSize: 12, color: 'var(--teal)', letterSpacing: '0.06em' }}>
              Read article →
            </div>
          </Link>
        </section>
      )}

      {/* ── Recent articles ── */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(44px,5vw,68px) var(--page-pad)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
          <div style={{
            fontFamily: mono, fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--text)', opacity: 0.55,
          }}>Recent Articles</div>
          <Link href="/news" style={{
            fontFamily: mono, fontSize: 11, color: 'var(--teal)',
            letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none',
          }}>All Stories</Link>
        </div>
        <ArticleCards articles={recent} />
      </section>

      {/* ── State law CTA ── */}
      <section style={{
        background: 'var(--bg2)', borderTop: '1px solid var(--border2)',
        borderBottom: '1px solid var(--border2)', padding: 'clamp(44px,5vw,68px) var(--page-pad)',
      }}>
        <div style={{
          maxWidth: 'var(--max-w)', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: mono, fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14,
            }}>All 50 States + DC</div>
            <h2 style={{
              fontFamily: serif, fontSize: 'clamp(1.6rem,3vw,2.3rem)',
              fontWeight: 600, marginBottom: 12, color: 'var(--text)', lineHeight: 1.25,
            }}>Find the landlord laws for your state</h2>
            <p style={{ color: 'var(--text)', opacity: 0.65, maxWidth: '55ch', lineHeight: 1.7, fontSize: 16 }}>
              Security deposit limits, eviction timelines, required notices, rent control status — every state, always free.
            </p>
          </div>
          <Link href="/legal" style={{
            background: 'var(--teal)', color: '#080D14', padding: '16px 36px',
            fontFamily: mono, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
            fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0, textDecoration: 'none', display: 'inline-block',
          }}>Browse All States</Link>
        </div>
      </section>

      <div style={{ padding: '32px var(--page-pad)', display: 'flex', justifyContent: 'center' }}>
        <AdSlot size="leaderboard" />
      </div>
    </>
  )
}

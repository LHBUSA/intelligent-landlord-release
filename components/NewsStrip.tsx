'use client'

import Link from 'next/link'
import { useState } from 'react'

export interface NewsItem {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function NewsCard({ article: a, isLatest }: { article: NewsItem; isLatest: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={`/news/${a.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: isLatest ? 'var(--bg3)' : 'var(--bg)',
        border: `1px solid ${hovered ? 'rgba(45,212,191,0.25)' : 'rgba(255,255,255,0.06)'}`,
        padding: '18px 20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {isLatest && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--teal), transparent)' }} />
      )}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: 8 }}>
        {formatDate(a.publishedAt)}{isLatest ? ' · LATEST' : ''}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>
        {a.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
        {a.excerpt}
      </div>
    </Link>
  )
}

export function NewsStrip({ items }: { items: NewsItem[] }) {
  return (
    <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)', padding: 'clamp(32px,4vw,52px) var(--page-pad)' }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px var(--green)', flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text)' }}>
              Weekly Landlord Intel
            </span>
          </div>
          <Link href="/news" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--teal)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            All Issues →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1 }}>
          {items.map((a, i) => (
            <NewsCard key={a.slug} article={a} isLatest={i === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

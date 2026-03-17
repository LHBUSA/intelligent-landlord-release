import Link from 'next/link'
import type { Metadata } from 'next'
import { getArticlesByCategory } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Landlord Guides',
  description: 'Everything landlords need to know — from lease agreements to eviction procedure, written in plain English.',
}

export default function CategoryPage() {
  const articles = getArticlesByCategory('guides' as const)
  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,6vw,72px) var(--page-pad)' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>Landlord Guides</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 600, marginBottom: 14 }}>Landlord Guides</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.65, marginBottom: 48 }}>Everything landlords need to know — from lease agreements to eviction procedure, written in plain English.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1 }}>
        {articles.map(a => (
          <Link key={a.slug} href={`/guides/${a.slug}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: 28 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 10 }}>{a.pill} · {a.readTime}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.1rem,2vw,1.35rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: 10 }}>{a.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{a.excerpt.slice(0,130)}…</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { getArticlesByCategory } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Legal & State Law',
  description: 'Landlord-tenant law by state. Know your rights and obligations before you need a lawyer.',
}

export default function CategoryPage() {
  const articles = getArticlesByCategory('legal' as const)
  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,6vw,72px) var(--page-pad)' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 16 }}>Legal & State Law</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 600, marginBottom: 14 }}>Legal & State Law</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.65, marginBottom: 48 }}>Landlord-tenant law by state. Know your rights and obligations before you need a lawyer.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1 }}>
        {articles.map(a => (
          <Link key={a.slug} href={`/legal/${a.slug}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: 28 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 10 }}>{a.pill} · {a.readTime}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.1rem,2vw,1.35rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: 10 }}>{a.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{a.excerpt.slice(0,130)}…</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

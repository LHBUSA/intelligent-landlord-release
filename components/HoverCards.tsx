'use client'
import Link from 'next/link'
type Pillar = { cat: string; label: string; desc: string; color: string; count: number; href: string }
type Article = { slug: string; category: string; categoryLabel: string; title: string; excerpt: string; readTime: string }
export function PillarCards({ pillars }: { pillars: Pillar[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1 }}>
      {pillars.map(p => (
        <Link key={p.cat} href={p.href}
          style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: 32, transition: 'border-color 0.2s, background 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = p.color; (e.currentTarget as HTMLElement).style.background = 'var(--bg3)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg2)' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.color, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{p.label}</span>
            <span style={{ opacity: 0.5 }}>{p.count} articles</span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.65 }}>{p.desc}</p>
          <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.color, letterSpacing: '0.06em' }}>Browse {p.label} →</div>
        </Link>
      ))}
    </div>
  )
}
export function ArticleCards({ articles }: { articles: Article[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1 }}>
      {articles.map(a => {
        const color = a.category === 'market' ? 'var(--gold)' : a.category === 'legal' ? 'var(--blue)' : 'var(--teal)'
        return (
          <Link key={a.slug} href={`/${a.category}/${a.slug}`}
            style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: 24, transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = color}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color, marginBottom: 10 }}>{a.categoryLabel}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.05rem, 2vw, 1.25rem)', fontWeight: 600, lineHeight: 1.3, marginBottom: 10, color: 'var(--text)' }}>{a.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55 }}>{a.excerpt.slice(0, 120)}…</div>
            <div style={{ marginTop: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{a.readTime} read</div>
          </Link>
        )
      })}
    </div>
  )
}
import Link from 'next/link'
import type { Article } from '@/lib/articles'

const SITE_URL = 'https://www.intelligentlandlord.com'

export function ArticlePage({ article: a }: { article: Article }) {
  const color = a.category === 'market' ? 'var(--gold)' : a.category === 'legal' ? 'var(--blue)' : 'var(--teal)'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.excerpt,
    author: { '@type': 'Organization', name: 'Intelligent Landlord' },
    publisher: { '@type': 'Organization', name: 'Intelligent Landlord', logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` } },
    datePublished: a.publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${a.category}/${a.slug}` },
  }

  const faqSchema = a.faqs && a.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: a.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,6vw,80px) var(--page-pad)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div style={{ marginBottom: 32 }}>
        <Link href={`/${a.category}`} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{a.categoryLabel}</Link>
        <span style={{ color: 'var(--muted)', margin: '0 8px' }}>·</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{a.readTime} read</span>
      </div>

      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.2, maxWidth: '30ch', marginBottom: 20 }}>{a.title}</h1>
      <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--muted)', maxWidth: '62ch', lineHeight: 1.7, marginBottom: 48 }}>{a.excerpt}</p>

      <div className="prose" style={{ borderTop: '1px solid var(--border2)', paddingTop: 48 }}
        dangerouslySetInnerHTML={{ __html: a.body }} />

      {a.faqs && a.faqs.length > 0 && (
        <div style={{ marginTop: 64, maxWidth: '72ch' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 600, marginBottom: 24 }}>Frequently Asked Questions</h2>
          {a.faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border2)' }}>
              <div style={{ fontWeight: 600, marginBottom: 8, color }}>{faq.q}</div>
              <div style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
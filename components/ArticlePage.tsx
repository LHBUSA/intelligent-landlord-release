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

      {/* ── Dark theme override for Supabase-sourced HTML ── */}
      <style>{`
        .il-prose {
          color: var(--text) !important;
          background: transparent !important;
        }
        .il-prose * {
          color: inherit !important;
          background-color: transparent !important;
          border-color: var(--border2) !important;
        }
        .il-prose h1, .il-prose h2, .il-prose h3, .il-prose h4, .il-prose h5 {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          color: var(--text) !important;
          font-weight: 600;
          line-height: 1.25;
          margin-top: 2em;
          margin-bottom: 0.5em;
        }
        .il-prose h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); }
        .il-prose h3 { font-size: clamp(1.15rem, 2vw, 1.45rem); }
        .il-prose p  { line-height: 1.8; margin-bottom: 1.25em; opacity: 0.88; }
        .il-prose a  { color: var(--teal) !important; text-decoration: underline; text-underline-offset: 3px; }
        .il-prose a:hover { opacity: 0.8; }
        .il-prose ul, .il-prose ol { padding-left: 1.5em; margin-bottom: 1.25em; }
        .il-prose li { line-height: 1.75; margin-bottom: 0.4em; }
        .il-prose blockquote {
          border-left: 3px solid var(--teal) !important;
          padding-left: 1.2em; margin: 1.5em 0;
          opacity: 0.8; font-style: italic;
        }
        .il-prose table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 0.9rem; }
        .il-prose th, .il-prose td { padding: 10px 14px; border: 1px solid var(--border2) !important; text-align: left; }
        .il-prose th { background: var(--bg2) !important; font-weight: 700; }
        .il-prose code {
          background: var(--bg2) !important;
          color: var(--teal) !important;
          padding: 2px 6px; border-radius: 4px;
          font-size: 0.88em; font-family: 'JetBrains Mono', monospace;
        }
        .il-prose pre { background: var(--bg2) !important; padding: 1.2em; border-radius: 6px; overflow-x: auto; margin: 1.5em 0; }
        .il-prose pre code { padding: 0; background: transparent !important; }
        .il-prose img { max-width: 100%; border-radius: 6px; margin: 1.5em 0; }
        .il-prose hr { border: none !important; border-top: 1px solid var(--border2) !important; margin: 2em 0; }
        /* Kill hardcoded light-mode inline styles from publisher HTML */
        .il-prose [style*="background:#fff"],
        .il-prose [style*="background: #fff"],
        .il-prose [style*="background:white"],
        .il-prose [style*="background: white"],
        .il-prose [style*="background-color:#fff"],
        .il-prose [style*="background-color: #fff"],
        .il-prose [style*="background-color:white"],
        .il-prose [style*="background-color: white"] { background: transparent !important; }
        .il-prose [style*="color:#000"],
        .il-prose [style*="color: #000"],
        .il-prose [style*="color:black"],
        .il-prose [style*="color: black"],
        .il-prose [style*="color:#333"],
        .il-prose [style*="color: #333"],
        .il-prose [style*="color:rgb(0,"],
        .il-prose [style*="color: rgb(0,"] { color: var(--text) !important; }
      `}</style>

      {/* Breadcrumb / meta */}
      <div style={{ marginBottom: 32 }}>
        <Link href={`/${a.category}`} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {a.categoryLabel}
        </Link>
        <span style={{ color: 'var(--muted)', margin: '0 8px' }}>·</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>
          {a.readTime} read
        </span>
      </div>

      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.2, maxWidth: '30ch', marginBottom: 20, color: 'var(--text)' }}>
        {a.title}
      </h1>

      <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--muted)', maxWidth: '62ch', lineHeight: 1.7, marginBottom: 48 }}>
        {a.excerpt}
      </p>

      {/* Article body — dark-mode scoped */}
      <div
        className="il-prose"
        style={{ borderTop: '1px solid var(--border2)', paddingTop: 48 }}
        dangerouslySetInnerHTML={{ __html: a.body }}
      />

      {/* FAQs */}
      {a.faqs && a.faqs.length > 0 && (
        <div style={{ marginTop: 64, maxWidth: '72ch' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 600, marginBottom: 24, color: 'var(--text)' }}>
            Frequently Asked Questions
          </h2>
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

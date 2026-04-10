import { notFound } from 'next/navigation'
import { fetchSupabaseArticles, supabaseToArticle } from '@/lib/supabase-articles'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const mono  = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

function extractBody(html: string): string {
  if (!html) return ''
  // Try to get just the .prose div content
  const proseMatch = html.match(/<div[^>]*class="[^"]*prose[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<\/div>|<aside|<footer|<script)/i)
  if (proseMatch) return proseMatch[1]
  // Fallback: get the body and strip nav/header/footer/aside/script/style tags
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  if (!bodyMatch) return html
  return bodyMatch[1]
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<link[^>]*>/gi, '')
    .replace(/class="(ph|wrap|pm|pm|ps|nmc|nl |nlt|nlm|nav)[^"]*"/gi, '')
    .trim()
}

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const remote = await fetchSupabaseArticles()
    const found = remote.find((a) => a.slug === slug)
    if (found) return {
      title: `${found.title} — Intelligent Landlord`,
      description: found.excerpt || '',
    }
  } catch {}
  return { title: 'Article — Intelligent Landlord' }
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  let article: ReturnType<typeof supabaseToArticle> | null = null

  try {
    const remote = await fetchSupabaseArticles()
    const found = remote.find((a) => a.slug === slug)
    if (found) article = supabaseToArticle(found)
  } catch {}

  if (!article) notFound()

  const a = article!
  const color = a.category === 'market' ? 'var(--gold)' : a.category === 'legal' ? 'var(--blue)' : 'var(--teal)'

  return (
    <>
      <style>{`
        .il-prose { color: var(--text) !important; background: transparent !important; }
        .il-prose * { color: inherit !important; background-color: transparent !important; }
        .il-prose h1,.il-prose h2,.il-prose h3,.il-prose h4 {
          font-family: 'Cormorant Garamond', Georgia, serif !important;
          color: var(--text) !important; font-weight: 600; line-height: 1.25;
          margin-top: 2em; margin-bottom: 0.5em;
        }
        .il-prose h2 { font-size: clamp(1.4rem,2.5vw,1.9rem); }
        .il-prose h3 { font-size: clamp(1.15rem,2vw,1.45rem); }
        .il-prose p  { line-height: 1.8; margin-bottom: 1.25em; opacity: 0.88; }
        .il-prose a  { color: var(--teal) !important; text-decoration: underline; }
        .il-prose ul,.il-prose ol { padding-left: 1.5em; margin-bottom: 1.25em; }
        .il-prose li { line-height: 1.75; margin-bottom: 0.4em; }
        .il-prose blockquote { border-left: 3px solid var(--teal) !important; padding-left: 1.2em; margin: 1.5em 0; opacity: 0.8; }
        .il-prose table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
        .il-prose th,.il-prose td { padding: 10px 14px; border: 1px solid var(--border2) !important; text-align: left; }
        .il-prose th { background: var(--bg2) !important; font-weight: 700; }
        .il-prose img { max-width: 100%; border-radius: 6px; margin: 1.5em 0; }
        .il-prose hr { border: none !important; border-top: 1px solid var(--border2) !important; margin: 2em 0; }
      `}</style>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,6vw,80px) var(--page-pad)' }}>

        {/* Meta row */}
        <div style={{ marginBottom: 32, fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <span style={{ color }}>{a.categoryLabel}</span>
          <span style={{ color: 'var(--muted)', margin: '0 8px' }}>·</span>
          <span style={{ color: 'var(--muted)' }}>{a.readTime} read</span>
          {a.publishedAt && (
            <>
              <span style={{ color: 'var(--muted)', margin: '0 8px' }}>·</span>
              <span style={{ color: 'var(--muted)' }}>
                {new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 600, lineHeight: 1.2, maxWidth: '30ch', marginBottom: 20, color: 'var(--text)' }}>
          {a.title}
        </h1>

        {/* Excerpt */}
        <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'var(--muted)', maxWidth: '62ch', lineHeight: 1.7, marginBottom: 48 }}>
          {a.excerpt}
        </p>

        {/* Body */}
        <div
          className="il-prose"
          style={{ borderTop: '1px solid var(--border2)', paddingTop: 48 }}
          dangerouslySetInnerHTML={{ __html: extractBody(a.body) }}
        />

      </div>
    </>
  )
}

import Link from 'next/link'

const GUIDES = [
  { text: 'Landlord-Tenant Law', href: '/guides' },
  { text: 'Tenant Screening', href: '/guides' },
  { text: 'Lease Agreements', href: '/guides' },
  { text: 'Security Deposits', href: '/guides' },
  { text: 'Eviction Process', href: '/guides' },
]

const STATE_LAWS = [
  { text: 'California', href: '/legal/states/california' },
  { text: 'Texas', href: '/legal/states/texas' },
  { text: 'Florida', href: '/legal/states/florida' },
  { text: 'New York', href: '/legal/states/new-york' },
  { text: 'Ohio', href: '/legal/states/ohio' },
]

const TOOLS = [
  { text: 'Rental ROI Calculator', href: '/tools' },
  { text: 'Deposit Limit Lookup', href: '/tools' },
  { text: 'Rent Increase Calculator', href: '/tools' },
  { text: 'Cash Flow Analyzer', href: '/tools' },
  { text: 'Eviction Cost Estimator', href: '/tools' },
]

const RESOURCES = [
  { text: 'Landlord FAQ', href: '/resources' },
  { text: 'Rent Trends', href: '/resources' },
  { text: 'Market Data', href: '/resources' },
  { text: 'Property Analysis', href: '/resources' },
  { text: 'Legal Templates', href: '/resources' },
]

const NAV_COLS: { label: string; links: { text: string; href: string }[] }[] = [
  { label: 'Guides', links: GUIDES },
  { label: 'State Laws', links: STATE_LAWS },
  { label: 'Tools', links: TOOLS },
  { label: 'Resources', links: RESOURCES },
]

const NETWORK = [
  { label: 'IntelligentLandlord.com', sub: 'Rental property intelligence', href: 'https://www.intelligentlandlord.com/' },
  { label: 'IntelligentHomeBuying.com', sub: 'Home buyer data & guidance', href: 'https://www.intelligenthomebuying.com/' },
]

const TAGS = ['Free Forever', 'Not Legal Advice', 'Landlord-Built']
const LEGAL_LINKS = ['Privacy', 'Terms', 'Contact']

export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', marginTop: 80, position: 'relative', overflow: 'hidden' }}>

      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--teal) 0%, transparent 60%)' }} />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '64px var(--page-pad) 40px' }}>

        {/* Brand + Network row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, marginBottom: 56, paddingBottom: 48, borderBottom: '1px solid var(--border2)' }}>

          {/* Brand */}
          <div style={{ maxWidth: 380 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontWeight: 700, color: '#080D14' }}>IL</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.01em' }}>
                Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>
              The free intelligence layer for independent landlords. Real rent data, real state law, real answers — no paywall, no signup, no BS.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TAGS.map(tag => (
                <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', color: 'var(--teal)', border: '1px solid var(--teal)', padding: '3px 8px', opacity: 0.7 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Network box */}
          <div style={{ border: '1px solid var(--border2)', padding: '24px 28px', minWidth: 240 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>
              Our Network
            </div>
            {NETWORK.map(site => (
              <a key={site.label} href={site.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginBottom: 16, textDecoration: 'none' }}>
                <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 2 }}>{site.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.04em' }}>{site.sub}</div>
              </a>
            ))}
          </div>

        </div>

        {/* Nav columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 40, marginBottom: 56 }}>
          {NAV_COLS.map(col => (
            <div key={col.label}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--border2)' }}>
                {col.label}
              </div>
              {col.links.map(link => (
                <div key={link.text} style={{ marginBottom: 10 }}>
                  <Link href={link.href} style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', lineHeight: 1.4, display: 'block' }}>
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              © {new Date().getFullYear()} IntelligentLandlord.com — Free resource. Not legal advice.
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em', opacity: 0.5 }}>
              Powered by PropTechUSA.ai
            </span>
          </div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {LEGAL_LINKS.map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', textDecoration: 'none' }}>
                {l}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default SiteFooter

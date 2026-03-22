import Link from 'next/link'

const NETWORK = [
  { label: 'IntelligentLandlord.com', sub: 'Rental property intelligence', href: 'https://www.intelligentlandlord.com/' },
  { label: 'IntelligentHomeBuying.com', sub: 'Home buyer data & guidance', href: 'https://www.intelligenthomebuying.com/' },
  { label: 'IntelligentSTR.com', sub: 'Short-term rental intelligence', href: 'https://www.intelligentstr.com/' },
]

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

const NETWORK_NAV = [
  { text: 'IntelligentLandlord.com', href: 'https://www.intelligentlandlord.com/' },
  { text: 'IntelligentHomeBuying.com', href: 'https://www.intelligenthomebuying.com/' },
  { text: 'IntelligentSTR.com', href: 'https://www.intelligentstr.com/' },
  { text: 'LocalHomeBuyersUSA.com', href: 'https://www.localhomebuyersusa.com/' },
  { text: 'PropTechUSA.ai', href: 'https://www.proptechusa.ai/' },
]

const NAV_COLS: { label: string; links: { text: string; href: string }[] }[] = [
  { label: 'Guides', links: GUIDES },
  { label: 'State Laws', links: STATE_LAWS },
  { label: 'Tools', links: TOOLS },
  { label: 'Network', links: NETWORK_NAV },
]

const LEGAL_LINKS = ['Privacy', 'Terms', 'Contact']

const mono = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', marginTop: 80 }}>

      {/* Top accent */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, transparent 50%)' }} />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '60px var(--page-pad) 36px' }}>

        {/* Main row: brand left, columns right */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 64, marginBottom: 48, alignItems: 'start' }}>

          {/* Brand block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: '#080D14' }}>IL</span>
              </div>
              <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.01em' }}>
                Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span>
              </span>
            </div>

            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 24 }}>
              Free rental intelligence for independent landlords. Real rent data, real state law — no paywall, no signup.
            </p>

            <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 20, marginBottom: 20 }}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 12 }}>
                Part of the Intelligent Network
              </div>
              {NETWORK.map(site => (
                <a key={site.label} href={site.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, textDecoration: 'none', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500 }}>{site.label}</span>
                  <span style={{ fontFamily: mono, fontSize: 9, color: 'var(--muted)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {NAV_COLS.map(col => (
              <div key={col.label}>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--border2)' }}>
                  {col.label}
                </div>
                {col.links.map(link => (
                  <div key={link.text} style={{ marginBottom: 9 }}>
                    {link.href.startsWith('http') ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', lineHeight: 1.4, display: 'block' }}>
                        {link.text}
                      </a>
                    ) : (
                      <Link href={link.href} style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', lineHeight: 1.4, display: 'block' }}>
                        {link.text}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              © {new Date().getFullYear()} IntelligentLandlord.com — Free resource. Not legal advice.
            </span>
            <span style={{ fontFamily: mono, fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em', opacity: 0.45 }}>
              Part of the PropTechUSA.ai Network
            </span>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {LEGAL_LINKS.map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontFamily: mono, fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', textDecoration: 'none' }}>
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

import Link from 'next/link'

const mono = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

const NETWORK = [
  { label: 'IntelligentLandlord.com',   sub: 'Rental property intelligence',   href: 'https://www.intelligentlandlord.com/' },
  { label: 'IntelligentHomeBuying.com', sub: 'Home buyer data & guidance',     href: 'https://www.intelligenthomebuying.com/' },
  { label: 'IntelligentSTR.com',        sub: 'Short-term rental intelligence', href: 'https://www.intelligentstr.com/' },
]

const NAV_COLS: { label: string; links: { text: string; href: string }[] }[] = [
  {
    label: 'Guides',
    links: [
      { text: 'Landlord-Tenant Law', href: '/guides' },
      { text: 'Tenant Screening', href: '/guides' },
      { text: 'Lease Agreements', href: '/guides' },
      { text: 'Security Deposits', href: '/guides' },
      { text: 'Eviction Process', href: '/guides' },
    ],
  },
  {
    label: 'State Laws',
    links: [
      { text: 'California', href: '/legal/states/california' },
      { text: 'Texas', href: '/legal/states/texas' },
      { text: 'Florida', href: '/legal/states/florida' },
      { text: 'New York', href: '/legal/states/new-york' },
      { text: 'Ohio', href: '/legal/states/ohio' },
    ],
  },
  {
    label: 'Tools',
    links: [
      { text: 'Rental ROI Calculator', href: '/tools' },
      { text: 'Deposit Limit Lookup', href: '/tools' },
      { text: 'Rent Increase Calculator', href: '/tools' },
      { text: 'Cash Flow Analyzer', href: '/tools' },
      { text: 'Eviction Cost Estimator', href: '/tools' },
    ],
  },
]

const TAGS = ['Free Forever', 'All 50 States', 'No Signup']
const LEGAL_LINKS = ['Privacy', 'Terms', 'Contact']

export function SiteFooter() {
  return (
    <footer style={{ background: '#111820', borderTop: '1px solid rgba(45,212,191,0.2)', marginTop: 80 }}>
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, transparent 55%)' }} />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '56px var(--page-pad) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 300px) 1fr', gap: 64, marginBottom: 48, alignItems: 'start' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: '#080D14' }}>IL</span>
              </div>
              <span style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, color: '#F0F4F8', letterSpacing: '0.01em' }}>
                Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: '#B8CDD9', lineHeight: 1.75, marginBottom: 28 }}>
              Free rental intelligence for independent landlords. Real rent data, real state law — no paywall, no signup, no agenda.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
              {TAGS.map(tag => (
                <span key={tag} style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.1em', color: 'var(--teal)', border: '1px solid rgba(45,212,191,0.35)', padding: '4px 10px', background: 'rgba(45,212,191,0.06)' }}>{tag}</span>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
              <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>Our Network</div>
              {NETWORK.map(site => (
                <a key={site.label} href={site.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, textDecoration: 'none', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#D4E2EC', fontWeight: 500, marginBottom: 2 }}>{site.label}</div>
                    <div style={{ fontFamily: mono, fontSize: 9, color: '#7A95A8', letterSpacing: '0.04em' }}>{site.sub}</div>
                  </div>
                  <span style={{ color: 'var(--teal)', fontSize: 12, opacity: 0.7 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {NAV_COLS.map(col => (
              <div key={col.label}>
                <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  {col.label}
                </div>
                {col.links.map(link => (
                  <div key={link.text} style={{ marginBottom: 11 }}>
                    <Link href={link.href} style={{ fontSize: 14, color: '#B8CDD9', textDecoration: 'none', lineHeight: 1.4, display: 'block' }}>{link.text}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 0 28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: mono, fontSize: 11, color: '#8AAABB', letterSpacing: '0.06em' }}>© {new Date().getFullYear()} IntelligentLandlord.com — Free resource. Not legal advice.</span>
            <span style={{ fontFamily: mono, fontSize: 10, color: '#4E6675', letterSpacing: '0.06em' }}>Part of the PropTechUSA.ai Network</span>
          </div>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {LEGAL_LINKS.map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontFamily: mono, fontSize: 11, color: '#8AAABB', letterSpacing: '0.06em', textDecoration: 'none' }}>{l}</Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default SiteFooter

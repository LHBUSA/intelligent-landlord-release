import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', marginTop: 80 }}>
      <style>{`
        .il-footer-link { color: var(--muted); text-decoration: none; font-size: 13px; display: block; transition: color .2s; }
        .il-footer-link:hover { color: var(--teal); }
        .il-network-link { display: block; text-decoration: none; transition: all .2s; }
        .il-network-link:hover { opacity: .85; }
      `}</style>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px var(--page-pad) 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, fontWeight: 700, color: '#080D14' }}>IL</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
                Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 220, marginBottom: 16 }}>
              Free rental property intelligence for landlords across all 50 states. No signup. No paywall. Just answers.
            </p>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Part of the Network</div>
            <a className="il-network-link" href="https://www.intelligenthomebuying.com" target="_blank" rel="noopener">
              <div style={{ background: 'rgba(232,55,45,.08)', border: '1px solid rgba(232,55,45,.2)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 20, height: 20, background: '#E8372D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'white', fontSize: 10, fontWeight: 800 }}>IH</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#F0F2F5', lineHeight: 1 }}>IntelligentHomeBuying.com</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 9, color: '#E8372D', letterSpacing: '.1em', marginTop: 3 }}>Home Buyer Intelligence →</div>
                </div>
              </div>
            </a>
          </div>

          {/* Guides */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14 }}>Landlord Guides</div>
            {[
              { label: 'Landlord-Tenant Law', href: '/guides/landlord-tenant-law-complete-guide' },
              { label: 'Tenant Screening', href: '/guides/tenant-screening-guide' },
              { label: 'Lease Agreements', href: '/guides/lease-agreement-guide' },
              { label: 'Security Deposits', href: '/guides/security-deposit-laws' },
              { label: 'Eviction Process', href: '/guides/eviction-process-guide' },
              { label: 'All Guides', href: '/guides' },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: 8 }}>
                <Link href={l.href} className="il-footer-link">{l.label}</Link>
              </div>
            ))}
          </div>

          {/* State Laws */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14 }}>State Laws</div>
            {[
              { label: 'California', href: '/legal/california-landlord-tenant-law' },
              { label: 'Texas', href: '/legal/texas-landlord-tenant-law' },
              { label: 'Florida', href: '/legal/florida-landlord-tenant-law' },
              { label: 'New York', href: '/legal/new-york-landlord-tenant-law' },
              { label: 'Ohio', href: '/legal/ohio-landlord-tenant-law' },
              { label: 'All 50 States', href: '/legal' },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: 8 }}>
                <Link href={l.href} className="il-footer-link">{l.label}</Link>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14 }}>Tools & Resources</div>
            {[
              { label: 'Rental ROI Calculator', href: '/tools' },
              { label: 'Deposit Limit Lookup', href: '/tools' },
              { label: 'Rent Increase Calculator', href: '/tools' },
              { label: 'Weekly Intel', href: '/news' },
              { label: 'Connect', href: '/connect' },
              { label: 'Market Data', href: '/market' },
            ].map(l => (
              <div key={l.label} style={{ marginBottom: 8 }}>
                <Link href={l.href} className="il-footer-link">{l.label}</Link>
              </div>
            ))}
          </div>

        </div>

        {/* Cross-link banner */}
        <div style={{ background: 'rgba(232,55,45,.05)', border: '1px solid rgba(232,55,45,.15)', padding: '16px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: '#E8372D', marginBottom: 4 }}>Buying or Selling a Home?</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Visit our sister site for free home buyer and seller intelligence across all 50 states.</div>
          </div>
          <a href="https://www.intelligenthomebuying.com" target="_blank" rel="noopener" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#E8372D', textDecoration: 'none', letterSpacing: '.08em', whiteSpace: 'nowrap' }}>
            IntelligentHomeBuying.com →
          </a>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '.06em' }}>
            © {new Date().getFullYear()} IntelligentLandlord.com — Free resource. Not legal advice.
          </span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[{ l: 'Privacy', h: '/privacy' }, { l: 'Terms', h: '/terms' }, { l: 'Connect', h: '/connect' }, { l: 'News', h: '/news' }].map(l => (
              <Link key={l.h} href={l.h} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '.06em', textDecoration: 'none' }}>{l.l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

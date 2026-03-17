import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', marginTop: 80 }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px var(--page-pad) 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13, fontWeight: 700, color: '#080D14' }}>IL</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span></span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 220 }}>Free rental property intelligence. No signup. No paywall. Just answers.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14 }}>Guides</div>
            {['Landlord-Tenant Law', 'Tenant Screening', 'Lease Agreements', 'Security Deposits', 'Eviction Process'].map(t => (
              <div key={t} style={{ marginBottom: 8 }}><Link href="/guides" style={{ fontSize: 13, color: 'var(--muted)', transition: 'color 0.2s' }}>{t}</Link></div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14 }}>State Laws</div>
            {['California', 'Texas', 'Florida', 'New York', 'Ohio'].map(s => (
              <div key={s} style={{ marginBottom: 8 }}><Link href={`/legal/states/${s.toLowerCase().replace(' ', '-')}`} style={{ fontSize: 13, color: 'var(--muted)' }}>{s}</Link></div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 14 }}>Tools</div>
            {['Rental ROI Calculator', 'Deposit Limit Lookup', 'Rent Increase Calculator', 'Cash Flow Analyzer', 'Eviction Cost Estimator'].map(t => (
              <div key={t} style={{ marginBottom: 8 }}><Link href="/tools" style={{ fontSize: 13, color: 'var(--muted)' }}>{t}</Link></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border2)', paddingTop: 24, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} IntelligentLandlord.com — Free resource. Not legal advice.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter

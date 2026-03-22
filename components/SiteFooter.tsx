import Link from 'next/link'

// ─── Nav Data ────────────────────────────────────────────────

const NAV_COLS = [
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
  {
    label: 'Resources',
    links: [
      { text: 'Landlord FAQ', href: '/resources' },
      { text: 'Rent Trends', href: '/resources' },
      { text: 'Market Data', href: '/resources' },
      { text: 'Property Analysis', href: '/resources' },
      { text: 'Legal Templates', href: '/resources' },
    ],
  },
]

const NETWORK = [
  {
    initials: 'IL',
    label: 'IntelligentLandlord',
    tld: '.com',
    sub: 'Rental property intelligence',
    detail: 'Free state law · Lease tools · Rent data',
    href: 'https://www.intelligentlandlord.com/',
    tag: 'CURRENT SITE',
    tagColor: 'var(--teal)',
    current: true,
  },
  {
    initials: 'STR',
    label: 'IntelligentSTR',
    tld: '.com',
    sub: 'Short-term rental intelligence',
    detail: 'Regulations · Market data · ROI · 50 states',
    href: 'https://www.intelligentstr.com/',
    tag: 'LIVE',
    tagColor: '#3fb950',
    current: false,
  },
  {
    initials: 'IH',
    label: 'IntelligentHomeBuying',
    tld: '.com',
    sub: 'Home buyer data & guidance',
    detail: 'Market trends · Buyer tools · Analysis',
    href: 'https://www.intelligenthomebuying.com/',
    tag: 'LIVE',
    tagColor: '#3fb950',
    current: false,
  },
]

const TAGS = ['Free Forever', 'Not Legal Advice', 'Landlord-Built']
const LEGAL_LINKS = ['Privacy', 'Terms', 'Contact']

// ─── Component ───────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer style={{
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border2)',
      marginTop: 80,
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Injected hover styles */}
      <style>{`
        .footer-nav-link {
          position: relative;
          display: inline-block;
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          line-height: 1.4;
          transition: color 0.2s ease;
        }
        .footer-nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--teal);
          transition: width 0.25s ease;
        }
        .footer-nav-link:hover {
          color: var(--text);
        }
        .footer-nav-link:hover::after {
          width: 100%;
        }

        .network-card {
          position: relative;
          border: 1px solid var(--border2);
          padding: 28px 28px 24px;
          text-decoration: none;
          display: block;
          transition: border-color 0.25s ease, transform 0.25s ease, background 0.25s ease;
          cursor: pointer;
          overflow: hidden;
        }
        .network-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--teal);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .network-card:hover {
          border-color: color-mix(in srgb, var(--teal) 40%, transparent);
          background: color-mix(in srgb, var(--teal) 4%, transparent);
          transform: translateY(-2px);
        }
        .network-card:hover::before {
          transform: scaleX(1);
        }
        .network-card.current-site {
          border-color: color-mix(in srgb, var(--teal) 30%, var(--border2));
        }
        .network-card.current-site::before {
          transform: scaleX(1);
          opacity: 0.5;
        }

        .footer-legal-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s, color 0.2s;
        }
        .footer-legal-link:hover {
          color: var(--teal);
          opacity: 1;
        }

        .footer-poweredby-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--teal);
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .footer-poweredby-link:hover {
          opacity: 1;
        }

        .footer-watermark {
          position: absolute;
          bottom: -20px;
          right: -20px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(80px, 12vw, 160px);
          font-weight: 700;
          color: var(--teal);
          opacity: 0.025;
          pointer-events: none;
          user-select: none;
          letter-spacing: -0.04em;
          line-height: 1;
          white-space: nowrap;
        }
      `}</style>

      {/* Top accent */}
      <div style={{
        height: 3,
        background: 'linear-gradient(90deg, var(--teal) 0%, color-mix(in srgb, var(--teal) 20%, transparent) 70%, transparent 100%)',
      }} />

      {/* Watermark */}
      <div className="footer-watermark" aria-hidden="true">INTELLIGENT</div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '72px var(--page-pad) 44px', position: 'relative' }}>

        {/* ── Brand row ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 64, paddingBottom: 56, borderBottom: '1px solid var(--border2)' }}>

          {/* Brand identity */}
          <div style={{ maxWidth: 360 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{
                width: 36, height: 36,
                background: 'var(--teal)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 17, fontWeight: 700, color: '#080D14' }}>IL</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.01em', lineHeight: 1 }}>
                Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span>
              </span>
            </div>

            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 24, maxWidth: 320 }}>
              The free intelligence layer for independent landlords. Real rent data, real state law, real answers — no paywall, no signup, no BS.
            </p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TAGS.map(tag => (
                <span key={tag} style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  color: 'var(--teal)',
                  border: '1px solid var(--teal)',
                  padding: '4px 10px',
                  opacity: 0.65,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Powered by / PropTech badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', gap: 6 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', opacity: 0.5 }}>
              Powered by
            </span>
            <a href="https://www.proptechusa.ai" target="_blank" rel="noopener noreferrer" className="footer-poweredby-link">
              PropTechUSA.ai ↗
            </a>
          </div>
        </div>

        {/* ── Intelligent Network ── */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--teal)' }}>
              The Intelligent Network
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border2)' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', opacity: 0.4 }}>3 PROPERTIES</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {NETWORK.map(site => (
              <a
                key={site.label}
                href={site.href}
                target={site.current ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`network-card${site.current ? ' current-site' : ''}`}
              >
                {/* Status tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{
                    width: 40, height: 40,
                    border: '1px solid var(--border2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: site.initials.length > 2 ? 11 : 14, fontWeight: 700, color: 'var(--teal)', letterSpacing: '-0.02em' }}>
                      {site.initials}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    letterSpacing: '0.12em',
                    color: site.tagColor,
                    border: `1px solid ${site.tagColor}`,
                    padding: '3px 8px',
                    opacity: 0.8,
                  }}>
                    {site.tag}
                  </span>
                </div>

                {/* Domain */}
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.01em' }}>
                    {site.label}
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 19, fontWeight: 400, color: 'var(--teal)' }}>
                    {site.tld}
                  </span>
                </div>

                {/* Sub + detail */}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.04em', marginBottom: 8 }}>
                  {site.sub}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.03em', opacity: 0.55, lineHeight: 1.6 }}>
                  {site.detail}
                </div>

                {/* Arrow */}
                <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--teal)', opacity: 0.7 }}>
                  {site.current ? '← You are here' : 'Visit →'}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Nav columns ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px 40px', marginBottom: 64, paddingBottom: 56, borderBottom: '1px solid var(--border2)' }}>
          {NAV_COLS.map(col => (
            <div key={col.label}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--teal)',
                marginBottom: 18,
                paddingBottom: 12,
                borderBottom: '1px solid var(--border2)',
              }}>
                {col.label}
              </div>
              {col.links.map(link => (
                <div key={link.text} style={{ marginBottom: 12 }}>
                  <Link href={link.href} className="footer-nav-link">
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>

          {/* Copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em' }}>
              © {new Date().getFullYear()} IntelligentLandlord.com — Free resource. Not legal advice.
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.04em', opacity: 0.35 }}>
              Part of the Intelligent Network · Built on PropTechUSA.ai
            </span>
          </div>

          {/* Legal links */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {LEGAL_LINKS.map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="footer-legal-link">
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

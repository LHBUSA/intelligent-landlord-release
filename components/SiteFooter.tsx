import Link from 'next/link'

// ─── Data ─────────────────────────────────────────────────────

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
    index: '01',
    initials: 'IL',
    name: 'IntelligentLandlord',
    tld: '.com',
    tagline: 'Rental property intelligence',
    bullets: [
      'Free state landlord-tenant law',
      'Lease tools & templates',
      'Rent data & market trends',
    ],
    href: 'https://www.intelligentlandlord.com/',
    current: true,
  },
  {
    index: '02',
    initials: 'STR',
    name: 'IntelligentSTR',
    tld: '.com',
    tagline: 'Short-term rental intelligence',
    bullets: [
      'STR regulations — all 50 states',
      'Live market data & ROI tools',
      'Host compliance guidance',
    ],
    href: 'https://www.intelligentstr.com/',
    current: false,
  },
  {
    index: '03',
    initials: 'IHB',
    name: 'IntelligentHomeBuying',
    tld: '.com',
    tagline: 'Home buyer data & guidance',
    bullets: [
      'Real-time market analysis',
      'Buyer decision tools',
      'Neighborhood intelligence',
    ],
    href: 'https://www.intelligenthomebuying.com/',
    current: false,
  },
]

const LEGAL_LINKS = ['Privacy', 'Terms', 'Contact']

// ─── Component ────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer className="sf-root">

      <style>{`
        .sf-root {
          background: var(--bg2);
          border-top: 1px solid var(--border2);
          margin-top: 80px;
          position: relative;
          overflow: hidden;
        }
        .sf-accent {
          height: 3px;
          background: linear-gradient(90deg, var(--teal) 0%, var(--teal) 18%, transparent 60%);
        }
        .sf-inner {
          max-width: var(--max-w);
          margin: 0 auto;
          padding: 0 var(--page-pad);
        }
        .sf-brand-band {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: end;
          padding: 72px 0 56px;
          border-bottom: 1px solid var(--border2);
        }
        @media (max-width: 700px) {
          .sf-brand-band { grid-template-columns: 1fr; gap: 32px; padding: 48px 0 40px; }
        }
        .sf-wordmark {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0 0 20px;
        }
        .sf-wordmark-accent { color: var(--teal); }
        .sf-tagline {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.7;
          max-width: 340px;
          margin: 0 0 24px;
        }
        .sf-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .sf-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--teal);
          border: 1px solid var(--teal);
          padding: 4px 10px;
          opacity: 0.6;
        }
        .sf-brand-right {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 4px;
          padding-bottom: 2px;
        }
        .sf-network-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 12px;
          opacity: 0.8;
        }
        .sf-network-statement {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 400;
          font-style: italic;
          color: var(--text);
          line-height: 1.3;
          margin: 0 0 24px;
          opacity: 0.55;
        }
        .sf-network-stats { display: flex; gap: 32px; }
        .sf-stat-item { display: flex; flex-direction: column; gap: 4px; }
        .sf-stat-num {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 600;
          color: var(--text);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .sf-stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          opacity: 0.55;
        }
        .sf-network-section { border-bottom: 1px solid var(--border2); }
        .sf-network-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-left: 1px solid var(--border2);
        }
        @media (max-width: 800px) {
          .sf-network-cols { grid-template-columns: 1fr; border-left: none; }
        }
        .sf-net-card {
          display: block;
          text-decoration: none;
          border-right: 1px solid var(--border2);
          border-bottom: 1px solid var(--border2);
          padding: 40px 36px 36px;
          position: relative;
          overflow: hidden;
          transition: background 0.22s ease;
        }
        .sf-net-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--teal);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .sf-net-card:hover { background: color-mix(in srgb, var(--teal) 4%, transparent); }
        .sf-net-card:hover::after { transform: scaleX(1); }
        .sf-net-card.sf-current { background: color-mix(in srgb, var(--teal) 3%, transparent); }
        .sf-net-card.sf-current::after { transform: scaleX(0.25); opacity: 0.6; }
        .sf-net-index {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 72px;
          font-weight: 300;
          color: var(--teal);
          line-height: 1;
          letter-spacing: -0.04em;
          opacity: 0.18;
          margin-bottom: 20px;
          display: block;
          transition: opacity 0.22s ease;
        }
        .sf-net-card:hover .sf-net-index,
        .sf-net-card.sf-current .sf-net-index { opacity: 0.38; }
        .sf-net-domain { margin-bottom: 6px; }
        .sf-net-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: 0.01em;
        }
        .sf-net-tld {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 400;
          color: var(--teal);
        }
        .sf-current-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: var(--teal);
          border: 1px solid var(--teal);
          padding: 2px 6px;
          opacity: 0.55;
          vertical-align: middle;
          margin-left: 8px;
        }
        .sf-net-tagline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--muted);
          text-transform: uppercase;
          opacity: 0.65;
          margin: 4px 0 24px;
        }
        .sf-net-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .sf-net-bullet {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.4;
          display: flex;
          gap: 10px;
          align-items: baseline;
        }
        .sf-net-bullet::before {
          content: '—';
          color: var(--teal);
          opacity: 0.45;
          font-size: 11px;
          flex-shrink: 0;
        }
        .sf-net-action {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--teal);
          opacity: 0.6;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: opacity 0.2s, gap 0.2s;
        }
        .sf-net-card:hover .sf-net-action { opacity: 1; gap: 10px; }
        .sf-nav-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0 40px;
          padding: 56px 0;
          border-bottom: 1px solid var(--border2);
        }
        @media (max-width: 700px) {
          .sf-nav-section { grid-template-columns: repeat(2, 1fr); gap: 40px 24px; padding: 40px 0; }
        }
        .sf-nav-col-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border2);
          opacity: 0.9;
        }
        .sf-nav-link-wrap { margin-bottom: 12px; }
        .sf-nav-link {
          position: relative;
          display: inline-block;
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          line-height: 1.4;
          transition: color 0.2s;
        }
        .sf-nav-link::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: var(--teal);
          transition: width 0.22s ease;
        }
        .sf-nav-link:hover { color: var(--text); }
        .sf-nav-link:hover::after { width: 100%; }
        .sf-bottom {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
          padding: 28px 0 36px;
        }
        @media (max-width: 700px) {
          .sf-bottom { grid-template-columns: 1fr; text-align: center; }
          .sf-bottom-center { order: -1; }
          .sf-bottom-right { justify-content: center; }
        }
        .sf-copy {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.05em;
          opacity: 0.5;
        }
        .sf-bottom-center { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .sf-powered-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          opacity: 0.3;
        }
        .sf-powered-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: var(--teal);
          text-decoration: none;
          opacity: 0.5;
          transition: opacity 0.2s;
        }
        .sf-powered-link:hover { opacity: 1; }
        .sf-bottom-right { display: flex; gap: 24px; justify-content: flex-end; }
        .sf-legal-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.06em;
          text-decoration: none;
          opacity: 0.45;
          transition: opacity 0.2s, color 0.2s;
        }
        .sf-legal-link:hover { color: var(--teal); opacity: 1; }
        .sf-bg-ring {
          position: absolute;
          border: 1px solid var(--teal);
          border-radius: 50%;
          opacity: 0.03;
          pointer-events: none;
        }
      `}</style>

      {/* Geometric bg rings */}
      <div className="sf-bg-ring" style={{ width: 500, height: 500, bottom: -120, right: -120 }} aria-hidden="true" />
      <div className="sf-bg-ring" style={{ width: 320, height: 320, bottom: -60, right: -60 }} aria-hidden="true" />

      <div className="sf-accent" />

      <div className="sf-inner">

        {/* ── Brand Band ── */}
        <div className="sf-brand-band">
          <div>
            <h2 className="sf-wordmark">
              Intelligent<span className="sf-wordmark-accent">Landlord</span>
            </h2>
            <p className="sf-tagline">
              The free intelligence layer for independent landlords. Real rent data, real state law, real answers — no paywall, no signup, no BS.
            </p>
            <div className="sf-pills">
              {['Free Forever', 'Not Legal Advice', 'Landlord-Built'].map(tag => (
                <span key={tag} className="sf-pill">{tag}</span>
              ))}
            </div>
          </div>

          <div className="sf-brand-right">
            <div className="sf-network-label">The Intelligent Network</div>
            <p className="sf-network-statement">
              Three properties.<br />One mission. Free intelligence, always.
            </p>
            <div className="sf-network-stats">
              <div className="sf-stat-item">
                <span className="sf-stat-num">3</span>
                <span className="sf-stat-label">Properties</span>
              </div>
              <div className="sf-stat-item">
                <span className="sf-stat-num">50</span>
                <span className="sf-stat-label">States covered</span>
              </div>
              <div className="sf-stat-item">
                <span className="sf-stat-num">$0</span>
                <span className="sf-stat-label">Forever free</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Network Columns ── */}
        <div className="sf-network-section">
          <div className="sf-network-cols">
            {NETWORK.map(site => (
              <a
                key={site.name}
                href={site.href}
                target={site.current ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`sf-net-card${site.current ? ' sf-current' : ''}`}
              >
                <span className="sf-net-index" aria-hidden="true">{site.index}</span>

                <div className="sf-net-domain">
                  <span className="sf-net-name">{site.name}</span>
                  <span className="sf-net-tld">{site.tld}</span>
                  {site.current && (
                    <span className="sf-current-badge" aria-label="Current site">HERE</span>
                  )}
                </div>

                <div className="sf-net-tagline">{site.tagline}</div>

                <ul className="sf-net-bullets">
                  {site.bullets.map(b => (
                    <li key={b} className="sf-net-bullet">{b}</li>
                  ))}
                </ul>

                <div className="sf-net-action">
                  {site.current ? 'You are here' : 'Visit site'}
                  {!site.current && <span aria-hidden="true">→</span>}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Nav ── */}
        <div className="sf-nav-section">
          {NAV_COLS.map(col => (
            <div key={col.label}>
              <div className="sf-nav-col-label">{col.label}</div>
              {col.links.map(link => (
                <div key={link.text} className="sf-nav-link-wrap">
                  <Link href={link.href} className="sf-nav-link">
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div className="sf-bottom">
          <div className="sf-copy">
            © {new Date().getFullYear()} IntelligentLandlord.com — Free resource. Not legal advice.
          </div>

          <div className="sf-bottom-center">
            <span className="sf-powered-label">Powered by</span>
            <a
              href="https://www.proptechusa.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="sf-powered-link"
            >
              PropTechUSA.ai ↗
            </a>
          </div>

          <div className="sf-bottom-right">
            {LEGAL_LINKS.map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="sf-legal-link">
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

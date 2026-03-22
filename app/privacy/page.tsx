// app/privacy/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How IntelligentLandlord.com handles your data. Short version: we collect almost nothing.',
}

const mono = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

const SECTIONS = [
  {
    title: 'The Short Version',
    content: `IntelligentLandlord.com is a free resource. We don't require an account, we don't sell your data, and we don't run advertising networks that track you across the web. You come here to get answers about landlord law and rental markets — we give you those answers and that's it.`,
  },
  {
    title: 'What We Collect',
    content: `We collect almost nothing. When you visit the site, standard server logs are generated automatically by our hosting provider. These logs may include your IP address, browser type, referring URL, and the pages you visited. These logs exist for security and performance purposes only and are not used to identify you personally. We do not use tracking cookies. We do not build user profiles. We do not fingerprint your device.`,
  },
  {
    title: 'Cookies',
    content: `We do not use advertising cookies or third-party tracking cookies. We may use a minimal session cookie to support site functionality (such as remembering your preferences within a single visit). This cookie contains no personal information and expires when you close your browser. If you use our calculators or tools, any data you enter stays in your browser and is never sent to our servers.`,
  },
  {
    title: 'Analytics',
    content: `We may use privacy-respecting analytics to understand aggregate traffic patterns — things like which state law pages are most visited, or how people navigate the site. Any analytics we use are configured to anonymize IP addresses and are not used to track individuals. We do not use Google Analytics' advertising features or remarketing tools.`,
  },
  {
    title: 'Third-Party Services',
    content: `IntelligentLandlord.com pulls live rental market data from third-party data providers to power our rent estimates and market pages. These requests are made server-side — your browser never directly contacts these providers. We use Vercel for hosting. Their infrastructure may process request metadata as part of normal CDN operations. You can review Vercel's privacy policy at vercel.com/legal/privacy-policy.`,
  },
  {
    title: 'Our Network',
    content: `IntelligentLandlord.com is part of the PropTechUSA.ai network, which also operates IntelligentHomeBuying.com and IntelligentSTR.com. Each site operates independently with the same no-tracking, no-paywall philosophy. Visiting one site does not result in tracking across the others.`,
  },
  {
    title: 'Children',
    content: `This site is not directed at children under 13. We do not knowingly collect any information from children. If you believe a child has submitted personal information to us, contact us and we will delete it.`,
  },
  {
    title: 'Your Rights',
    content: `Because we collect so little data, there is very little to request, correct, or delete. If you have questions about what data we may hold related to your visit, contact us at the address below and we will respond within 30 days.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this policy as the site evolves. Changes will be posted on this page with an updated effective date. We will never make changes that introduce data collection practices that conflict with the principles above without prominent notice.`,
  },
  {
    title: 'Contact',
    content: `Questions about this privacy policy? Reach us through the Connect page at intelligentlandlord.com/connect. We read every message.`,
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: '#1A2130', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#212A3A', padding: 'clamp(48px,6vw,80px) var(--page-pad)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2DD4BF', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: '#2DD4BF', display: 'block' }} />
            Legal
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2rem,4vw,3.4rem)', fontWeight: 600, lineHeight: 1.12, color: '#E8EDF4', marginBottom: 16 }}>Privacy Policy</h1>
          <p style={{ fontFamily: mono, fontSize: 11, color: '#8FA4B8', letterSpacing: '0.06em' }}>Effective date: January 1, 2025 · Last updated: March 2026</p>
        </div>
      </section>

      {/* TL;DR pill */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 var(--page-pad)' }}>
        <div style={{ margin: '40px 0', background: 'rgba(45,212,191,0.08)', border: '1px solid rgba(45,212,191,0.25)', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#080D14', background: '#2DD4BF', padding: '3px 8px', flexShrink: 0, marginTop: 2 }}>TL;DR</span>
          <p style={{ fontSize: 15, color: '#E8EDF4', lineHeight: 1.7, margin: 0 }}>
            We don't sell your data, we don't track you, and we don't require an account. This site is a free public resource — we make money when it helps landlords, not by monetizing their behavior.
          </p>
        </div>

        {/* Sections */}
        <div style={{ paddingBottom: 80 }}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < SECTIONS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 600, color: '#E8EDF4', marginBottom: 16, lineHeight: 1.2 }}>
                <span style={{ color: '#2DD4BF', fontFamily: mono, fontSize: 11, marginRight: 12, verticalAlign: 'middle' }}>{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </h2>
              <p style={{ fontSize: 16, color: '#8FA4B8', lineHeight: 1.85, margin: 0 }}>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

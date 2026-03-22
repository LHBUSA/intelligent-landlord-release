// app/terms/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for IntelligentLandlord.com. Free resource. Not legal advice.',
}

const mono = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing IntelligentLandlord.com, you agree to these terms. If you do not agree, please do not use the site. We reserve the right to update these terms at any time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.`,
  },
  {
    title: 'Not Legal Advice',
    content: `This is the most important section. Everything on IntelligentLandlord.com — including state law summaries, eviction guides, lease information, security deposit rules, and all other content — is provided for general informational purposes only. None of it constitutes legal advice, and none of it creates an attorney-client relationship. Laws change. Local ordinances vary. Court interpretations differ. You must consult a licensed attorney in your jurisdiction before taking any legal action or making any legal decision. We make no representations that the information on this site is accurate, complete, or current. Reliance on anything on this site is strictly at your own risk.`,
  },
  {
    title: 'Not Financial Advice',
    content: `Rental market data, ROI calculators, rent estimates, cap rate figures, and any other financial information on this site are provided for educational and informational purposes only. They do not constitute financial, investment, or tax advice. Market conditions change rapidly. Always conduct your own due diligence and consult a licensed financial advisor before making investment decisions.`,
  },
  {
    title: 'Accuracy of Information',
    content: `We work to keep the information on this site accurate and up to date, but we make no guarantees. State landlord-tenant laws change through legislation, court decisions, and regulatory action. Local rent control ordinances may differ from state law. We strongly recommend verifying any information with official government sources or a licensed attorney before relying on it.`,
  },
  {
    title: 'Free to Use',
    content: `IntelligentLandlord.com is and will remain free to access. No account is required. No paywall exists. You may use the site for personal, non-commercial landlord research purposes without charge. Commercial use — including reselling, republishing, or building products using our content — requires written permission.`,
  },
  {
    title: 'Intellectual Property',
    content: `All original content on this site — including articles, guides, calculators, and design — is the property of IntelligentLandlord.com and PropTechUSA.ai. You may share links to our content freely. You may not reproduce, republish, scrape, or redistribute our content without written permission. Data displayed from third-party providers (rent estimates, market data) is subject to those providers' respective terms.`,
  },
  {
    title: 'User Conduct',
    content: `You agree not to use this site to scrape or harvest data in bulk, attempt to access systems or data you are not authorized to access, disrupt or interfere with site operations, submit false or misleading information through any contact forms, or use the site for any unlawful purpose. We reserve the right to block access for violations of these terms.`,
  },
  {
    title: 'Third-Party Links',
    content: `This site may link to external resources including court websites, state government pages, legal aid organizations, and other landlord resources. We do not control these sites and are not responsible for their content, accuracy, or availability. Links are provided for convenience only and do not constitute endorsement.`,
  },
  {
    title: 'Disclaimer of Warranties',
    content: `This site is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components. We disclaim all warranties including implied warranties of merchantability and fitness for a particular purpose.`,
  },
  {
    title: 'Limitation of Liability',
    content: `To the maximum extent permitted by law, IntelligentLandlord.com and PropTechUSA.ai shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this site or reliance on its content. This includes but is not limited to losses arising from legal decisions made based on information found on this site.`,
  },
  {
    title: 'Governing Law',
    content: `These terms are governed by the laws of the State of Minnesota, without regard to conflict of law principles. Any disputes arising from these terms or your use of the site shall be resolved in the courts of Minnesota.`,
  },
  {
    title: 'Contact',
    content: `Questions about these terms? Reach us through the Connect page at intelligentlandlord.com/connect.`,
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: '#1A2130', minHeight: '100vh' }}>

      {/* Header */}
      <section style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#212A3A', padding: 'clamp(48px,6vw,80px) var(--page-pad)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#2DD4BF', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 1, background: '#2DD4BF', display: 'block' }} />
            Legal
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2rem,4vw,3.4rem)', fontWeight: 600, lineHeight: 1.12, color: '#E8EDF4', marginBottom: 16 }}>Terms of Use</h1>
          <p style={{ fontFamily: mono, fontSize: 11, color: '#8FA4B8', letterSpacing: '0.06em' }}>Effective date: January 1, 2025 · Last updated: March 2026</p>
        </div>
      </section>

      {/* Warning pill */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 var(--page-pad)' }}>
        <div style={{ margin: '40px 0', background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.25)', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#080D14', background: '#F59E0B', padding: '3px 8px', flexShrink: 0, marginTop: 2 }}>Important</span>
          <p style={{ fontSize: 15, color: '#E8EDF4', lineHeight: 1.7, margin: 0 }}>
            IntelligentLandlord.com is a free informational resource. Nothing on this site is legal advice. Always consult a licensed attorney in your jurisdiction before making legal decisions.
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

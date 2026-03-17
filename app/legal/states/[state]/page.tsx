import { notFound } from 'next/navigation';
import Link from 'next/link';
import { STATE_LAWS, scoreToColor, scoreToLabel } from '@/lib/state-laws';
import type { Metadata } from 'next';

const SITE_URL = 'https://www.intelligentlandlord.com'
const RENT_WORKER = process.env.RENT_WORKER_URL || 'https://il-rent-worker.sales-fd3.workers.dev'

interface Props {
  params: Promise<{ state: string }>;
}

// ── RentCast types ────────────────────────────────────────────────────────────
interface MetroRent {
  city: string
  zip: string
  medianRent: number | null
  totalListings: number | null
  daysOnMarket: number | null
  yoyChange: number | null
  bedrooms: Record<number, { medianRent: number | null }>
}

interface RentPayload {
  statewide: {
    median1BR: number | null
    median2BR: number | null
    median3BR: number | null
    avgYoY: number | null
    avgDaysOnMarket: number | null
  }
  metros: MetroRent[]
  updatedAt: string
}

async function getRentData(abbr: string): Promise<RentPayload | null> {
  try {
    const res = await fetch(`${RENT_WORKER}/rent?state=${abbr}`, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

const usd = (n: number | null) =>
  n != null
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
    : '—'

const yoyColor = (n: number | null) => {
  if (n == null) return '#64748B'
  if (n > 5) return '#EF4444'
  if (n > 2) return '#D4A843'
  return '#22C55E'
}

// ── Static params & metadata ──────────────────────────────────────────────────
export async function generateStaticParams() {
  return STATE_LAWS.map(s => ({ state: s.code.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const stateData = STATE_LAWS.find(s => s.code === stateCode);
  if (!stateData) return { title: 'State Not Found' };

  const title = `${stateData.name} Landlord Laws 2026 — Eviction, Deposits & Rent Control`
  const description = `Complete ${stateData.name} landlord-tenant law guide. Eviction process (${stateData.evictionTotalDays} days avg), security deposit rules (${stateData.securityDepositMax}), entry notice ${stateData.entryNoticeHours}hrs, rent control: ${stateData.rentControl ? 'Yes' : 'No'}. Free — no paywall.`
  const url = `${SITE_URL}/legal/states/${stateCode.toLowerCase()}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
    },
    twitter: { title, description, card: 'summary_large_image' },
    alternates: { canonical: url },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function StateLawPage({ params }: Props) {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const stateData = STATE_LAWS.find(s => s.code === stateCode);
  if (!stateData) notFound();

  const color = scoreToColor(stateData.landlordScore);
  const label = scoreToLabel(stateData.landlordScore);
  const rent = await getRentData(stateCode)

  const allSorted = [...STATE_LAWS].sort((a, b) => b.landlordScore - a.landlordScore);
  const rank = allSorted.findIndex(s => s.code === stateCode) + 1;

  const similarStates = STATE_LAWS
    .filter(s => s.code !== stateCode && Math.abs(s.landlordScore - stateData.landlordScore) <= 1)
    .slice(0, 4);

  const pageUrl = `${SITE_URL}/legal/states/${stateCode.toLowerCase()}`

  // ── JSON-LD schemas ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'State Laws', item: `${SITE_URL}/legal/states` },
      { '@type': 'ListItem', position: 3, name: `${stateData.name} Landlord Laws`, item: pageUrl },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${stateData.name} Landlord Laws 2026 — Complete Guide`,
    description: `Eviction process, security deposits, entry notice, and rent control laws in ${stateData.name}. Free landlord resource.`,
    url: pageUrl,
    author: { '@type': 'Organization', name: 'Intelligent Landlord', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Intelligent Landlord', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How long does eviction take in ${stateData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The average eviction timeline in ${stateData.name} is ${stateData.evictionTotalDays} days from notice to possession. The pay-or-quit notice period is ${stateData.evictionNoticeDays} days.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the security deposit limit in ${stateData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${stateData.name}, the security deposit maximum is ${stateData.securityDepositMax}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Does ${stateData.name} have rent control?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: stateData.rentControl
            ? `Yes, ${stateData.name} has rent control in certain cities: ${stateData.rentControlCities.join(', ')}.`
            : `No, ${stateData.name} does not have statewide rent control. You can raise rents by any amount with proper notice.`,
        },
      },
      {
        '@type': 'Question',
        name: `How much notice must a landlord give before entering in ${stateData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: stateData.entryNoticeHours === 0
            ? `${stateData.name} does not require advance notice before entering a rental unit by statute.`
            : `Landlords in ${stateData.name} must provide at least ${stateData.entryNoticeHours} hours notice before entering a rental unit.`,
        },
      },
    ],
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#080D14', minHeight: '100vh', color: '#E2E8F0' }}>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* BREADCRUMB */}
      <div style={{ background: '#0D1520', borderBottom: '1px solid #1E2A3A', padding: '12px 16px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontSize: 13, color: '#475569', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#2DD4BF', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/legal/states" style={{ color: '#2DD4BF', textDecoration: 'none' }}>State Laws</Link>
          <span>›</span>
          <span>{stateData.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ position: 'relative', padding: 'clamp(32px,6vw,60px) 16px clamp(28px,5vw,50px)', background: `linear-gradient(135deg, #0D1520 0%, #080D14 100%)`, borderBottom: '1px solid #1E2A3A', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 15% 50%, ${color}08 0%, transparent 50%)` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${color}, transparent)` }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'start', flexWrap: 'wrap' }}>

            {/* Left: title */}
            <div style={{ flex: '1 1 300px', minWidth: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${color}15`, border: `1px solid ${color}40`, borderRadius: 20, padding: '5px 14px', marginBottom: 20, fontSize: 12, color, fontWeight: 700, letterSpacing: '0.08em' }}>
                {label} · Rank #{rank} of 51
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: 700, margin: '0 0 16px', color: '#F1F5F9', lineHeight: 1.1 }}>
                {stateData.name}<br />
                <span style={{ color }}>Landlord Laws</span><br />
                <span style={{ fontSize: '0.55em', color: '#64748B' }}>2026 Complete Guide</span>
              </h1>
              <p style={{ fontSize: 'clamp(14px,2vw,16px)', color: '#94A3B8', lineHeight: 1.7, marginBottom: 28, maxWidth: 540 }}>
                Everything a landlord needs to know about {stateData.name} law — eviction process, security deposits, entry rights, rent control status, and local court resources.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {stateData.localCourts.map(court => (
                  <a key={court.name} href={court.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: color, color: '#080D14', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                    {court.name} →
                  </a>
                ))}
                <Link href="/eviction" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'transparent', border: `1px solid ${color}`, color, padding: '10px 18px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  Eviction Guide
                </Link>
              </div>
            </div>

            {/* Right: score card — hidden on very small screens via CSS workaround */}
            <div style={{ flex: '0 1 auto', width: '100%', maxWidth: 320 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: `2px solid ${color}50`, borderRadius: 20, padding: 'clamp(16px,3vw,28px)' }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px,10vw,80px)', fontWeight: 700, color, lineHeight: 1 }}>{stateData.landlordScore}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>out of 10 · {label}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'Notice Period', value: `${stateData.evictionNoticeDays} days`, icon: '📋' },
                    { label: 'Full Eviction', value: `~${stateData.evictionTotalDays} days`, icon: '⏱️' },
                    { label: 'Deposit Max', value: stateData.securityDepositMax, icon: '💰' },
                    { label: 'Entry Notice', value: stateData.entryNoticeHours === 0 ? 'None req.' : `${stateData.entryNoticeHours} hrs`, icon: '🔑' },
                    { label: 'Late Fee Cap', value: stateData.lateFeeCap, icon: '💳' },
                    { label: 'Rent Control', value: stateData.rentControl ? 'Yes' : 'No', icon: stateData.rentControl ? '🔴' : '✅' },
                  ].map(item => (
                    <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: 16, marginBottom: 2 }}>{item.icon}</div>
                      <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', marginTop: 2 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px' }}>

        {/* ── LIVE RENT DATA ── */}
        <section style={{ padding: 'clamp(32px,5vw,50px) 0 32px' }}>
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: rent ? '#22C55E' : '#475569', boxShadow: rent ? '0 0 8px #22C55E' : 'none', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: rent ? '#22C55E' : '#475569', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{rent ? 'Live Market Data · RentCast' : 'Market Data'}</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 700, margin: '0 0 4px', color: '#F1F5F9' }}>{stateData.name} Rental Market</h2>
              <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>Current rents by bedroom · top metro breakdowns · YoY trend</p>
            </div>
            {rent?.updatedAt && (
              <div style={{ fontSize: 11, color: '#475569', fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
                {new Date(rent.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            )}
          </div>

          {rent ? (
            <>
              {/* Statewide medians */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10, marginBottom: 10 }}>
                {[
                  { label: '1 Bedroom', value: usd(rent.statewide.median1BR) },
                  { label: '2 Bedrooms', value: usd(rent.statewide.median2BR) },
                  { label: '3 Bedrooms', value: usd(rent.statewide.median3BR) },
                  {
                    label: 'YoY Trend',
                    value: rent.statewide.avgYoY != null
                      ? `${rent.statewide.avgYoY > 0 ? '+' : ''}${rent.statewide.avgYoY}%`
                      : '—',
                    valueColor: yoyColor(rent.statewide.avgYoY),
                  },
                  {
                    label: 'Days on Market',
                    value: rent.statewide.avgDaysOnMarket != null ? `${rent.statewide.avgDaysOnMarket}d` : '—',
                  },
                ].map(item => (
                  <div key={item.label} style={{ background: `${color}08`, border: `1px solid ${color}25`, borderRadius: 10, padding: '16px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, color: (item as any).valueColor || color, lineHeight: 1 }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Metro breakdown */}
              {rent.metros?.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                  {rent.metros.map(metro => (
                    <div key={metro.zip} style={{ background: '#0D1220', border: '1px solid #1A2435', borderRadius: 10, padding: '16px 18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 700, color: '#F1F5F9' }}>{metro.city}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#475569' }}>{metro.zip}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 12 }}>
                        {[1, 2, 3].map(br => (
                          <div key={br} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}>{br}BR</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: '#E2E8F0', fontFamily: "'JetBrains Mono', monospace" }}>
                              {usd(metro.bedrooms?.[br]?.medianRent ?? null)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div style={{ borderTop: '1px solid #1A2435', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>YoY</div>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: yoyColor(metro.yoyChange) }}>
                            {metro.yoyChange != null ? `${metro.yoyChange > 0 ? '+' : ''}${metro.yoyChange}%` : '—'}
                          </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>DOM</div>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>
                            {metro.daysOnMarket != null ? `${metro.daysOnMarket}d` : '—'}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 9, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Listings</div>
                          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#94A3B8' }}>
                            {metro.totalListings ?? '—'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 14, color: '#475569' }}>Live rent data loading — check back shortly.</div>
            </div>
          )}
        </section>

        {/* EVICTION PROCESS */}
        <section style={{ padding: 'clamp(28px,4vw,50px) 0 32px', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title={`${stateData.name} Eviction Process`} subtitle={`Complete timeline for removing a non-paying or violating tenant in ${stateData.name}`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14, marginBottom: 24 }}>
            {[
              { step: '01', title: 'Serve Notice', detail: `${stateData.evictionNoticeDays}-day written notice for non-payment of rent. ${stateData.entryNoticeHours > 0 ? 'Must be delivered personally or posted on door.' : 'No special delivery method required by statute.'}`, color },
              { step: '02', title: 'File Complaint', detail: `If tenant fails to pay or vacate after ${stateData.evictionNoticeDays} days, file an eviction complaint at your local court. Filing fee: ${stateData.evictionFilingFee}.`, color },
              { step: '03', title: 'Court Hearing', detail: `Hearing typically scheduled 7–14 days after filing. Bring your lease, all notices, rent ledger, and any communications with the tenant.`, color },
              { step: '04', title: 'Judgment & Possession', detail: `If you win, the court issues a judgment for possession. Tenant typically has 24–72 hours to vacate. If not, obtain a writ of possession.`, color },
            ].map(item => (
              <div key={item.step} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 12, padding: 18, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: item.color }} />
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: `${item.color}20`, position: 'absolute', top: 10, right: 14 }}>{item.step}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: '#F1F5F9' }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>

          {/* Timeline bar */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#94A3B8', marginBottom: 14 }}>ESTIMATED TOTAL TIMELINE</div>
            <div style={{ display: 'flex', height: 36, borderRadius: 6, overflow: 'hidden', marginBottom: 10 }}>
              {[
                { label: 'Notice', days: stateData.evictionNoticeDays, color: '#2DD4BF' },
                { label: 'Filing + Hearing', days: 14, color: '#D4A843' },
                { label: 'Judgment', days: 7, color },
                { label: 'Writ', days: Math.max(stateData.evictionTotalDays - stateData.evictionNoticeDays - 21, 3), color: '#475569' },
              ].map((phase, i) => {
                const pct = (phase.days / stateData.evictionTotalDays) * 100;
                return (
                  <div key={i} style={{ width: `${pct}%`, background: phase.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#080D14', overflow: 'hidden', whiteSpace: 'nowrap', padding: '0 4px' }}>
                    {pct > 18 ? `${phase.label} (${phase.days}d)` : pct > 8 ? `${phase.days}d` : ''}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 13, color: '#64748B' }}>
              Average total: <strong style={{ color }}>{stateData.evictionTotalDays} days</strong> from notice to possession. US average is ~50 days.
            </div>
          </div>
        </section>

        {/* SECURITY DEPOSITS */}
        <section style={{ padding: 'clamp(24px,4vw,40px) 0', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title="Security Deposit Rules" subtitle={`${stateData.name} security deposit laws, limits, and return requirements`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { label: 'Maximum Deposit', value: stateData.securityDepositMax, icon: '💰', note: 'Per current statutes' },
              { label: 'Return Deadline', value: '14–45 days', icon: '📅', note: 'After tenant vacates' },
              { label: 'Itemization Required', value: 'Yes', icon: '📋', note: 'Written itemization of deductions' },
              { label: 'Interest Required', value: stateData.landlordScore <= 3 ? 'Yes (check locally)' : 'No', icon: '📈', note: 'Required in some high-reg states' },
            ].map(item => (
              <InfoCard key={item.label} {...item} color={color} />
            ))}
          </div>
        </section>

        {/* RIGHTS */}
        <section style={{ padding: 'clamp(24px,4vw,40px) 0', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title="Rights & Responsibilities" subtitle={`What both parties are entitled to under ${stateData.name} law`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#22C55E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>✅ Landlord Rights</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {stateData.keyLandlordRights.map((right, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'start', background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)', borderRadius: 8, padding: '10px 14px' }}>
                    <span style={{ color: '#22C55E', flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.5 }}>{right}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>⚖️ Tenant Rights</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {stateData.keyTenantRights.map((right, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'start', background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.12)', borderRadius: 8, padding: '10px 14px' }}>
                    <span style={{ color: '#F97316', flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.5 }}>{right}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DISCLOSURES */}
        <section style={{ padding: 'clamp(24px,4vw,40px) 0', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title="Required Disclosures" subtitle={`Items you must disclose to tenants in ${stateData.name} before or at lease signing`} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {stateData.requiredDisclosures.map((d, i) => (
              <div key={i} style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: 8, padding: '8px 14px', fontSize: 13, color: '#D4A843', fontWeight: 600 }}>
                📄 {d}
              </div>
            ))}
          </div>
        </section>

        {/* RENT CONTROL */}
        <section style={{ padding: 'clamp(24px,4vw,40px) 0', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title="Rent Control Status" subtitle={`${stateData.name} rent increase and rent control laws`} />
          {stateData.rentControl ? (
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: 'clamp(18px,3vw,28px)' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 36 }}>⚠️</div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 700, fontSize: 'clamp(16px,2vw,18px)', color: '#EF4444', marginBottom: 8 }}>{stateData.name} Has Rent Control</div>
                  <div style={{ fontSize: 15, color: '#94A3B8', marginBottom: 12, lineHeight: 1.7 }}>
                    Rent control laws apply in {stateData.rentControlCities.join(', ')}.
                    {stateData.lateFeeCap !== 'None' && ` Late fees are capped at ${stateData.lateFeeCap}.`}
                  </div>
                  <div style={{ fontSize: 14, color: '#EF4444', fontWeight: 600 }}>⚠️ Consult a local attorney before raising rents in affected jurisdictions.</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: 'clamp(18px,3vw,28px)' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 36 }}>✅</div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontWeight: 700, fontSize: 'clamp(16px,2vw,18px)', color: '#22C55E', marginBottom: 8 }}>No Rent Control in {stateData.name}</div>
                  <div style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.7 }}>
                    {stateData.name} has no statewide rent control law. You can raise rents by any amount with proper notice (typically 30 days for month-to-month, or at lease end for fixed terms).
                    {stateData.lateFeeCap !== 'None' && ` Late fees are subject to a cap: ${stateData.lateFeeCap}.`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* FAQ (matches JSON-LD above for rich results) */}
        <section style={{ padding: 'clamp(24px,4vw,40px) 0', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title={`${stateData.name} Landlord FAQs`} subtitle="Common questions answered — also powers Google rich results" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                q: `How long does eviction take in ${stateData.name}?`,
                a: `The average eviction timeline in ${stateData.name} is ${stateData.evictionTotalDays} days from notice to possession. The pay-or-quit notice period is ${stateData.evictionNoticeDays} days. Filing fee is ${stateData.evictionFilingFee}.`,
              },
              {
                q: `What is the security deposit limit in ${stateData.name}?`,
                a: `In ${stateData.name}, the security deposit maximum is ${stateData.securityDepositMax}. Landlords must return the deposit with an itemized statement of deductions.`,
              },
              {
                q: `Does ${stateData.name} have rent control?`,
                a: stateData.rentControl
                  ? `Yes. Rent control applies in ${stateData.rentControlCities.join(', ')}. Consult a local attorney before raising rents in those jurisdictions.`
                  : `No. ${stateData.name} has no statewide rent control. You can raise rents by any amount with proper notice — typically 30 days for month-to-month tenancies.`,
              },
              {
                q: `How much entry notice is required in ${stateData.name}?`,
                a: stateData.entryNoticeHours === 0
                  ? `${stateData.name} does not require advance notice before entering a rental unit by statute, though best practice is always to notify tenants.`
                  : `Landlords in ${stateData.name} must provide at least ${stateData.entryNoticeHours} hours written notice before entering a rental unit.`,
              },
            ].map((item, i) => (
              <details key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 10, padding: '14px 18px', cursor: 'pointer' }}>
                <summary style={{ fontWeight: 700, fontSize: 15, color: '#F1F5F9', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  {item.q}
                  <span style={{ color: color, flexShrink: 0, fontSize: 18 }}>+</span>
                </summary>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.7, marginTop: 12 }}>{item.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* SIMILAR STATES */}
        {similarStates.length > 0 && (
          <section style={{ padding: 'clamp(24px,4vw,40px) 0', borderTop: '1px solid #1E2A3A' }}>
            <SectionHeader title="Compare Similar States" subtitle="States with comparable landlord-friendliness scores" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {similarStates.map(s => {
                const c = scoreToColor(s.landlordScore);
                return (
                  <Link key={s.code} href={`/legal/states/${s.code.toLowerCase()}`} style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 10, padding: 16, display: 'block' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, color: '#F1F5F9', fontSize: 15 }}>{s.name}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: c }}>{s.landlordScore}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{s.evictionTotalDays}d eviction · {s.securityDepositMax}</div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* BACK NAV */}
        <div style={{ padding: 'clamp(24px,4vw,40px) 0 clamp(40px,8vw,80px)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/legal/states" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid #1E2A3A', color: '#94A3B8', padding: '10px 18px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            ← All States
          </Link>
          <Link href="/eviction" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: color, color: '#080D14', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Eviction Resources →
          </Link>
        </div>

      </div>

      <style>{`
        details summary::-webkit-details-marker { display: none; }
        details[open] summary span { transform: rotate(45deg); display: inline-block; }
        @media (max-width: 600px) {
          details { padding: 12px 14px !important; }
        }
      `}</style>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 700, margin: '0 0 4px', color: '#F1F5F9' }}>{title}</h2>
      <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>{subtitle}</p>
    </div>
  );
}

function InfoCard({ label, value, icon, note, color }: { label: string; value: string; icon: string; note: string; color: string }) {
  return (
    <div style={{ background: `${color}06`, border: `1px solid ${color}20`, borderRadius: 10, padding: 18 }}>
      <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 10, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,3vw,24px)', fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>{note}</div>
    </div>
  );
}

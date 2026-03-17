import { notFound } from 'next/navigation';
import Link from 'next/link';
import { STATE_LAWS, scoreToColor, scoreToLabel } from '@/lib/state-laws';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return STATE_LAWS.map(s => ({ state: s.code.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const stateData = STATE_LAWS.find(s => s.code === stateCode);
  if (!stateData) return { title: 'State Not Found' };
  return {
    title: `${stateData.name} Landlord Laws 2026 | Eviction Process, Tenant Rights & Security Deposits`,
    description: `Complete ${stateData.name} landlord-tenant law guide. Eviction process (${stateData.evictionTotalDays} days avg), security deposit rules (${stateData.securityDepositMax}), entry requirements, and local court resources.`,
  };
}

const OTHER_STATES_COUNT = 5;

export default async function StateLawPage({ params }: Props) {
  const { state } = await params;
  const stateCode = state.toUpperCase();
  const stateData = STATE_LAWS.find(s => s.code === stateCode);
  if (!stateData) notFound();

  const color = scoreToColor(stateData.landlordScore);
  const label = scoreToLabel(stateData.landlordScore);

  // Neighboring scores for comparison
  const allSorted = [...STATE_LAWS].sort((a, b) => b.landlordScore - a.landlordScore);
  const rank = allSorted.findIndex(s => s.code === stateCode) + 1;

  // Similar states (nearby score)
  const similarStates = STATE_LAWS
    .filter(s => s.code !== stateCode && Math.abs(s.landlordScore - stateData.landlordScore) <= 1)
    .slice(0, 4);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#080D14', minHeight: '100vh', color: '#E2E8F0' }}>

      {/* BREADCRUMB */}
      <div style={{ background: '#0D1520', borderBottom: '1px solid #1E2A3A', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontSize: 13, color: '#475569', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#2DD4BF', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/legal/states" style={{ color: '#2DD4BF', textDecoration: 'none' }}>State Laws</Link>
          <span>›</span>
          <span>{stateData.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ position: 'relative', padding: '60px 24px 50px', background: `linear-gradient(135deg, #0D1520 0%, #080D14 100%)`, borderBottom: '1px solid #1E2A3A', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 15% 50%, ${color}08 0%, transparent 50%)` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${color}, transparent)` }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'start', flexWrap: 'wrap' }}>
            {/* Left: title */}
            <div style={{ flex: '1 1 400px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${color}15`, border: `1px solid ${color}40`, borderRadius: 20, padding: '5px 14px', marginBottom: 20, fontSize: 12, color, fontWeight: 700, letterSpacing: '0.08em' }}>
                {label} · Rank #{rank} of 51
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, margin: '0 0 16px', color: '#F1F5F9', lineHeight: 1.1 }}>
                {stateData.name}<br />
                <span style={{ color }}>Landlord Laws</span><br />
                <span style={{ fontSize: '0.55em', color: '#64748B' }}>2026 Complete Guide</span>
              </h1>
              <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7, marginBottom: 28, maxWidth: 540 }}>
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

            {/* Right: score card */}
            <div style={{ flex: '0 0 auto' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: `2px solid ${color}50`, borderRadius: 20, padding: 28, minWidth: 280 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 80, fontWeight: 700, color, lineHeight: 1 }}>{stateData.landlordScore}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>out of 10 · {label}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

        {/* EVICTION PROCESS */}
        <section style={{ padding: '50px 0 40px' }}>
          <SectionHeader title={`${stateData.name} Eviction Process`} subtitle={`Complete timeline for removing a non-paying or violating tenant in ${stateData.name}`} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { step: '01', title: 'Serve Notice', detail: `${stateData.evictionNoticeDays}-day written notice for non-payment of rent. ${stateData.entryNoticeHours > 0 ? `Must be delivered personally or posted on door.` : 'No special delivery method required by statute.'}`, color },
              { step: '02', title: 'File Complaint', detail: `If tenant fails to pay or vacate after ${stateData.evictionNoticeDays} days, file an eviction complaint at your local court. Filing fee: ${stateData.evictionFilingFee}.`, color },
              { step: '03', title: 'Court Hearing', detail: `Hearing typically scheduled 7–14 days after filing. Bring your lease, all notices, rent ledger, and any communications with the tenant.`, color },
              { step: '04', title: 'Judgment & Possession', detail: `If you win, the court issues a judgment for possession. Tenant typically has 24–72 hours to vacate. If not, obtain a writ of possession.`, color },
            ].map(item => (
              <div key={item.step} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: item.color }} />
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, color: `${item.color}20`, position: 'absolute', top: 12, right: 16 }}>{item.step}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F1F5F9' }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>

          {/* Timeline bar */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 14, padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#94A3B8', marginBottom: 16 }}>ESTIMATED TOTAL TIMELINE</div>
            <div style={{ display: 'flex', gap: 0, height: 40, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
              {[
                { label: 'Notice', days: stateData.evictionNoticeDays, color: '#2DD4BF' },
                { label: 'Filing + Hearing', days: 14, color: '#D4A843' },
                { label: 'Judgment', days: 7, color: color },
                { label: 'Writ', days: Math.max(stateData.evictionTotalDays - stateData.evictionNoticeDays - 21, 3), color: '#475569' },
              ].map((phase, i) => {
                const total = stateData.evictionTotalDays;
                const pct = (phase.days / total) * 100;
                return (
                  <div key={i} style={{ width: `${pct}%`, background: phase.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#080D14', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {pct > 15 ? `${phase.label} (${phase.days}d)` : ''}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 13, color: '#64748B' }}>
              Average total: <strong style={{ color }}>{stateData.evictionTotalDays} days</strong> from notice to possession. Compare to US average of 50 days.
            </div>
          </div>
        </section>

        {/* SECURITY DEPOSITS */}
        <section style={{ padding: '40px 0', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title="Security Deposit Rules" subtitle={`${stateData.name} security deposit laws, limits, and return requirements`} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { label: 'Maximum Deposit', value: stateData.securityDepositMax, icon: '💰', note: 'Per the most recent statutes' },
              { label: 'Return Deadline', value: '14–45 days', icon: '📅', note: 'After tenant vacates (varies by city)' },
              { label: 'Itemization Required', value: 'Yes', icon: '📋', note: 'Written itemization of any deductions' },
              { label: 'Interest Required', value: stateData.landlordScore <= 3 ? 'Yes (check locally)' : 'No', icon: '📈', note: 'Some high-regulation states require it' },
            ].map(item => (
              <InfoCard key={item.label} {...item} color={color} />
            ))}
          </div>
        </section>

        {/* LANDLORD & TENANT RIGHTS */}
        <section style={{ padding: '40px 0', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title="Rights & Responsibilities" subtitle={`What both parties are entitled to under ${stateData.name} law`} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#22C55E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>✅ Landlord Rights</div>
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
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>⚖️ Tenant Rights</div>
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

        {/* REQUIRED DISCLOSURES */}
        <section style={{ padding: '40px 0', borderTop: '1px solid #1E2A3A' }}>
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
        <section style={{ padding: '40px 0', borderTop: '1px solid #1E2A3A' }}>
          <SectionHeader title="Rent Control Status" subtitle={`${stateData.name} rent increase and rent control laws`} />
          {stateData.rentControl ? (
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 40 }}>⚠️</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#EF4444', marginBottom: 8 }}>{stateData.name} Has Rent Control</div>
                  <div style={{ fontSize: 15, color: '#94A3B8', marginBottom: 12, lineHeight: 1.7 }}>
                    Rent control laws apply in {stateData.rentControlCities.join(', ')}. 
                    {stateData.lateFeeCap !== 'None' && ` Late fees are capped at ${stateData.lateFeeCap}.`}
                  </div>
                  <div style={{ fontSize: 14, color: '#EF4444', fontWeight: 600 }}>
                    ⚠️ Consult a local attorney before raising rents in affected jurisdictions.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 16, padding: 28 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ fontSize: 40 }}>✅</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#22C55E', marginBottom: 8 }}>No Rent Control in {stateData.name}</div>
                  <div style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.7 }}>
                    {stateData.name} has no statewide rent control law. You can raise rents by any amount with proper notice (typically 30 days for month-to-month, or at lease end for fixed terms).
                    {stateData.lateFeeCap !== 'None' && ` Late fees are subject to a cap: ${stateData.lateFeeCap}.`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SIMILAR STATES COMPARISON */}
        {similarStates.length > 0 && (
          <section style={{ padding: '40px 0', borderTop: '1px solid #1E2A3A' }}>
            <SectionHeader title="Compare Similar States" subtitle={`States with comparable landlord-friendliness scores`} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {similarStates.map(s => {
                const c = scoreToColor(s.landlordScore);
                return (
                  <Link key={s.code} href={`/legal/states/${s.code.toLowerCase()}`} style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 12, padding: 18, display: 'block' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ fontWeight: 700, color: '#F1F5F9' }}>{s.name}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: c }}>{s.landlordScore}</div>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{s.evictionTotalDays}d eviction · {s.securityDepositMax} deposit</div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* BACK NAVIGATION */}
        <div style={{ padding: '40px 0 80px', display: 'flex', gap: 12 }}>
          <Link href="/legal/states" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid #1E2A3A', color: '#94A3B8', padding: '10px 18px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
            ← All States
          </Link>
          <Link href="/eviction" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: color, color: '#080D14', padding: '10px 18px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
            Eviction Resources →
          </Link>
        </div>

      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: '#F1F5F9' }}>{title}</h2>
      <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>{subtitle}</p>
    </div>
  );
}

function InfoCard({ label, value, icon, note, color }: { label: string; value: string; icon: string; note: string; color: string }) {
  return (
    <div style={{ background: `${color}06`, border: `1px solid ${color}20`, borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>{note}</div>
    </div>
  );
}

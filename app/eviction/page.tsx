'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STATE_LAWS, scoreToColor, scoreToLabel } from '@/lib/state-laws';

const EVICTION_STEPS = [
  { step: 1, title: 'Serve Notice', icon: '📋', desc: 'Deliver written notice to tenant per your state\'s requirements. Non-payment, lease violation, or no-cause depending on state laws.' },
  { step: 2, title: 'Wait Notice Period', icon: '⏱️', desc: 'Allow the legally required notice period to expire. Tenant may pay, cure the violation, or vacate during this time.' },
  { step: 3, title: 'File Complaint', icon: '⚖️', desc: 'If tenant hasn\'t complied, file an eviction complaint at your local court. Attach your lease, notices, and any evidence.' },
  { step: 4, title: 'Serve Court Papers', icon: '📬', desc: 'The court will serve the tenant with summons. In some states you handle service; in others the court or sheriff does.' },
  { step: 5, title: 'Attend Hearing', icon: '🏛️', desc: 'Present your case to the judge. Bring all documentation: lease, notices, photos, rent ledger, communications.' },
  { step: 6, title: 'Get Judgment', icon: '✅', desc: 'If you win, the court issues a judgment for possession. Tenant may have days to appeal depending on your state.' },
  { step: 7, title: 'Writ of Possession', icon: '🔑', desc: 'If tenant hasn\'t left, obtain a writ of possession. The sheriff will post notice and enforce removal.' },
  { step: 8, title: 'Lockout', icon: '🔐', desc: 'Sheriff or marshal executes the writ. You may now legally change locks and take possession of the property.' },
];

const ILLEGAL_ACTIONS = [
  'Changing locks without court order',
  'Removing tenant\'s belongings without order',
  'Shutting off utilities to force tenant out',
  'Threatening or harassing the tenant',
  'Entering without proper notice during eviction',
  'Refusing to accept rent to create grounds for eviction (in most states)',
];

const TIPS_BY_CATEGORY = [
  {
    category: 'Documentation',
    icon: '📁',
    color: '#2DD4BF',
    tips: [
      'Keep a detailed rent ledger from day one',
      'Document all maintenance requests and your responses',
      'Save all text messages and emails with tenants',
      'Photograph the unit at move-in and move-out',
      'Send all legal notices via certified mail AND email',
    ]
  },
  {
    category: 'Prevention',
    icon: '🛡️',
    color: '#D4A843',
    tips: [
      'Screen tenants thoroughly — credit, criminal, eviction history',
      'Require a co-signer for borderline applicants',
      'Conduct quarterly inspections (with proper notice)',
      'Set up automatic rent collection through a portal',
      'Enforce lease terms consistently from day one',
    ]
  },
  {
    category: 'Legal Strategy',
    icon: '⚖️',
    color: '#84CC16',
    tips: [
      'Start the process early — delay costs money',
      'Consult an eviction attorney in tenant-friendly states',
      'Consider a cash-for-keys offer to avoid court entirely',
      'File for money judgment alongside possession',
      'Know your state\'s specific notice requirements exactly',
    ]
  },
];

export default function EvictionPage() {
  const [selectedRegion, setSelectedRegion] = useState<'fast' | 'medium' | 'slow' | null>(null);

  const fastStates = STATE_LAWS.filter(s => s.evictionTotalDays <= 30).sort((a,b) => a.evictionTotalDays - b.evictionTotalDays);
  const mediumStates = STATE_LAWS.filter(s => s.evictionTotalDays > 30 && s.evictionTotalDays <= 60).sort((a,b) => a.evictionTotalDays - b.evictionTotalDays);
  const slowStates = STATE_LAWS.filter(s => s.evictionTotalDays > 60).sort((a,b) => a.evictionTotalDays - b.evictionTotalDays);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#080D14', minHeight: '100vh', color: '#E2E8F0' }}>

      {/* HERO */}
      <section style={{ position: 'relative', padding: '80px 24px 60px', background: 'linear-gradient(180deg, #0D1520 0%, #080D14 100%)', borderBottom: '1px solid #1E2A3A', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(239,68,68,0.06) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(212,168,67,0.04) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 20, padding: '6px 16px', marginBottom: 24, fontSize: 13, color: '#EF4444', fontWeight: 600, letterSpacing: '0.05em' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            EVICTION RESOURCES · ALL 50 STATES
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 20px', color: '#F1F5F9' }}>
            Eviction Resources<br />
            <span style={{ color: '#EF4444' }}>& State-by-State Guide</span>
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Everything you need to navigate the eviction process — timelines by state, notice requirements, court resources, and step-by-step guidance.
          </p>
          {/* Key stats */}
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Fastest State', value: `${Math.min(...STATE_LAWS.map(s => s.evictionTotalDays))}d`, sublabel: STATE_LAWS.sort((a,b) => a.evictionTotalDays - b.evictionTotalDays)[0].name },
              { label: 'Slowest State', value: `${Math.max(...STATE_LAWS.map(s => s.evictionTotalDays))}d`, sublabel: STATE_LAWS.sort((a,b) => b.evictionTotalDays - a.evictionTotalDays)[0].name },
              { label: 'US Average', value: `${Math.round(STATE_LAWS.reduce((a,b) => a + b.evictionTotalDays, 0) / STATE_LAWS.length)}d`, sublabel: 'median timeline' },
              { label: 'Just Cause Required', value: '6', sublabel: 'states + DC' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, color: '#EF4444', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 11, color: '#475569' }}>{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* EVICTION SPEED HEATMAP */}
        <section style={{ padding: '60px 0 40px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
            Eviction Speed by State
          </h2>
          <p style={{ color: '#64748B', marginBottom: 32, fontSize: 15 }}>
            Select a speed tier to see which states fall in that range. Click a state to visit its full law page.
          </p>

          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {[
              { key: 'fast', label: '⚡ Fast (≤30 days)', count: fastStates.length, color: '#22C55E' },
              { key: 'medium', label: '⏱ Medium (31–60 days)', count: mediumStates.length, color: '#D4A843' },
              { key: 'slow', label: '🐌 Slow (60+ days)', count: slowStates.length, color: '#EF4444' },
            ].map(tier => (
              <button
                key={tier.key}
                onClick={() => setSelectedRegion(selectedRegion === tier.key as any ? null : tier.key as any)}
                style={{
                  flex: 1, background: selectedRegion === tier.key ? `${tier.color}20` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${selectedRegion === tier.key ? tier.color : '#1E2A3A'}`,
                  borderRadius: 12, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: tier.color }}>{tier.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: '#F1F5F9', lineHeight: 1, marginTop: 4 }}>{tier.count}</div>
                <div style={{ fontSize: 12, color: '#64748B' }}>states</div>
              </button>
            ))}
          </div>

          {/* Conditional state display */}
          {selectedRegion && (
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {(selectedRegion === 'fast' ? fastStates : selectedRegion === 'medium' ? mediumStates : slowStates).map(state => {
                  const color = selectedRegion === 'fast' ? '#22C55E' : selectedRegion === 'medium' ? '#D4A843' : '#EF4444';
                  return (
                    <Link key={state.code} href={`/legal/states/${state.code.toLowerCase()}`} style={{ textDecoration: 'none', background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 10, padding: '12px 16px', minWidth: 130 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#F1F5F9' }}>{state.name}</div>
                      <div style={{ fontSize: 13, color, fontWeight: 700, marginTop: 4 }}>{state.evictionTotalDays} days avg</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{state.evictionNoticeDays}d notice · {state.evictionFilingFee.split('–')[0]} fee</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Full timeline bar chart */}
          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, marginBottom: 20 }}>All States — Eviction Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[...STATE_LAWS].sort((a,b) => a.evictionTotalDays - b.evictionTotalDays).map((state) => {
                const maxDays = 120;
                const pct = Math.min((state.evictionTotalDays / maxDays) * 100, 100);
                let color = '#22C55E';
                if (state.evictionTotalDays > 60) color = '#EF4444';
                else if (state.evictionTotalDays > 30) color = '#D4A843';
                return (
                  <div key={state.code} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link href={`/legal/states/${state.code.toLowerCase()}`} style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', textDecoration: 'none', width: 36, textAlign: 'right', flexShrink: 0 }}>{state.code}</Link>
                    <div style={{ flex: 1, height: 20, background: '#1E2A3A', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${color}cc, ${color})`, borderRadius: 4, display: 'flex', alignItems: 'center', paddingLeft: 8, transition: 'width 0.6s ease' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#080D14', whiteSpace: 'nowrap' }}>{state.evictionTotalDays}d</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: '#475569', width: 80, flexShrink: 0 }}>{state.evictionNoticeDays}d notice</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* STEP BY STEP PROCESS */}
        <section style={{ padding: '40px 0', borderTop: '1px solid #1E2A3A' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
            The Eviction Process — Step by Step
          </h2>
          <p style={{ color: '#64748B', marginBottom: 32, fontSize: 15 }}>
            A universal overview — always verify your state's specific requirements.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {EVICTION_STEPS.map((step) => (
              <div key={step.step} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 16, right: 16, fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 700, color: 'rgba(255,255,255,0.04)', lineHeight: 1 }}>
                  {step.step}
                </div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{step.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#F1F5F9' }}>{step.title}</div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ILLEGAL ACTIONS */}
        <section style={{ padding: '40px 0', borderTop: '1px solid #1E2A3A' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
                ⛔ Never Do This
              </h2>
              <p style={{ color: '#64748B', marginBottom: 20, fontSize: 15 }}>Self-help eviction is illegal in all 50 states and exposes you to significant liability.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ILLEGAL_ACTIONS.map((action, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'start', gap: 12, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 8, padding: '10px 14px' }}>
                    <span style={{ color: '#EF4444', fontSize: 16, flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: 14, color: '#94A3B8' }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
                💡 Pro Tips
              </h2>
              <p style={{ color: '#64748B', marginBottom: 20, fontSize: 15 }}>Cash-for-keys and strong documentation can save months of time and thousands in legal fees.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { tip: 'Offer cash-for-keys', detail: 'Paying $500–$2,000 to leave voluntarily is almost always cheaper than a 90-day eviction.' },
                  { tip: 'File early, not late', detail: 'Every week you wait costs money. File immediately after the notice period expires.' },
                  { tip: 'Know your judge', detail: 'Attend local landlord association meetings — experienced landlords know which courts are efficient.' },
                  { tip: 'Use an attorney in bad states', detail: 'In CA, NY, NJ, OR, WA — an eviction attorney pays for itself in time saved.' },
                  { tip: 'Keep perfect records', detail: 'Judges rule on documentation. Photos, emails, texts, ledgers — all of it matters.' },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(45,212,191,0.04)', border: '1px solid rgba(45,212,191,0.15)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#2DD4BF', marginBottom: 4 }}>{item.tip}</div>
                    <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5 }}>{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TIPS BY CATEGORY */}
        <section style={{ padding: '40px 0', borderTop: '1px solid #1E2A3A' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
            Eviction Prevention Playbook
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {TIPS_BY_CATEGORY.map(cat => (
              <div key={cat.category} style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}25`, borderRadius: 16, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>{cat.icon}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: cat.color }}>{cat.category}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {cat.tips.map((tip, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'start', gap: 10 }}>
                      <span style={{ color: cat.color, fontSize: 14, flexShrink: 0, marginTop: 1 }}>→</span>
                      <span style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.5 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LOCAL COURT RESOURCES */}
        <section style={{ padding: '40px 0 80px', borderTop: '1px solid #1E2A3A' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
            Local Court Resources by State
          </h2>
          <p style={{ color: '#64748B', marginBottom: 32, fontSize: 15 }}>Direct links to eviction filing courts in all 50 states and DC.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {[...STATE_LAWS].sort((a,b) => a.name.localeCompare(b.name)).map(state => {
              const color = scoreToColor(state.landlordScore);
              return (
                <div key={state.code} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1E2A3A', borderRadius: 10, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#F1F5F9' }}>{state.name}</div>
                    <div style={{ fontSize: 11, color, fontWeight: 700, background: `${color}15`, padding: '2px 8px', borderRadius: 4 }}>{state.evictionTotalDays}d</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>Filing fee: {state.evictionFilingFee}</div>
                  {state.localCourts.map(court => (
                    <a key={court.name} href={court.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: 12, color: '#2DD4BF', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {court.name} →
                    </a>
                  ))}
                  <Link href={`/legal/states/${state.code.toLowerCase()}`} style={{ display: 'block', fontSize: 12, color: '#475569', textDecoration: 'none', marginTop: 6 }}>
                    Full {state.code} Laws →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

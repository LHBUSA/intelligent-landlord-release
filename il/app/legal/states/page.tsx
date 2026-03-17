import Link from 'next/link'
import type { Metadata } from 'next'
import { STATES } from '@/lib/state-data'

export const metadata: Metadata = {
  title: 'Landlord-Tenant Law by State — All 50 States',
  description: 'Find landlord-tenant laws for every U.S. state. Security deposit limits, eviction timelines, entry notice requirements, and rent control status.',
}

const FRIENDLY_COLOR: Record<string, string> = {
  high: 'var(--green)', medium: 'var(--gold)', low: 'var(--red)'
}

export default function StatesPage() {
  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,6vw,72px) var(--page-pad)' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 16 }}>All 50 States + DC</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, marginBottom: 14 }}>Landlord-Tenant Law by State</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '60ch', lineHeight: 1.65, marginBottom: 48 }}>Security deposit limits, eviction timelines, required notice periods, and rent control status — for every U.S. state. No signup required.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 1 }}>
        {STATES.map(s => (
          <Link key={s.abbr} href={`/legal/states/${s.abbr.toLowerCase()}`} style={{ display: 'block', background: 'var(--bg2)', border: '1px solid var(--border2)', padding: '16px 18px', transition: 'border-color 0.2s' }}  >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 700, color: 'var(--teal)' }}>{s.abbr}</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: FRIENDLY_COLOR[s.landlordFriendly], flexShrink: 0 }} />
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{s.name}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--muted)', marginTop: 6, letterSpacing: '0.06em' }}>Deposit: {s.depositLimit.split(' ')[0]} {s.depositLimit.split(' ')[1] || ''}</div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 32, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {[['var(--green)', 'Landlord-Favorable'], ['var(--gold)', 'Balanced'], ['var(--red)', 'Tenant-Protective']].map(([color, label]) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { STATES } from '@/lib/state-data'

const mono = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

const BG      = '#1A2130'
const BG2     = '#212A3A'
const BG3     = '#263044'
const BORDER  = 'rgba(255,255,255,0.09)'
const TEXT    = '#E8EDF4'
const MUTED   = '#8FA4B8'
const TEAL    = '#2DD4BF'
const BLUE    = '#60A5FA'
const GREEN   = '#4ADE80'
const GOLD    = '#FBBF24'
const RED     = '#F87171'

const RATING = {
  high:   { label: 'Landlord Friendly', color: GREEN,  bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)' },
  medium: { label: 'Balanced',          color: GOLD,   bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)' },
  low:    { label: 'Tenant Leaning',    color: RED,    bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
}

const REGIONS: Record<string, string[]> = {
  'Northeast':    ['CT','ME','MA','NH','NJ','NY','PA','RI','VT'],
  'Southeast':    ['AL','AR','FL','GA','KY','LA','MS','NC','SC','TN','VA','WV'],
  'Midwest':      ['IL','IN','IA','KS','MI','MN','MO','NE','ND','OH','SD','WI'],
  'Southwest':    ['AZ','NM','OK','TX'],
  'West':         ['AK','CA','CO','HI','ID','MT','NV','OR','UT','WA','WY'],
  'Mid-Atlantic': ['DE','MD','DC'],
}

function getRegion(abbr: string) {
  return Object.entries(REGIONS).find(([, states]) => states.includes(abbr))?.[0] || 'Other'
}

type SortKey = 'name' | 'rating' | 'region'
type FilterKey = 'all' | 'high' | 'medium' | 'low'

function StateCard({ s }: { s: typeof STATES[0] }) {
  const [hovered, setHovered] = useState(false)
  const rating = RATING[s.landlordFriendly as keyof typeof RATING] || RATING.medium
  return (
    <Link href={`/legal/states/${s.abbr.toLowerCase()}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: 'block', background: hovered ? BG3 : BG2, border: `1px solid ${hovered ? rating.color.replace(')', ', 0.4)').replace('rgb', 'rgba') : BORDER}`, padding: '18px 20px', textDecoration: 'none', transition: 'all 0.18s ease', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 2, background: rating.color, opacity: hovered ? 1 : 0, transition: 'opacity 0.18s ease' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <span style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: hovered ? rating.color : TEAL, lineHeight: 1, transition: 'color 0.18s' }}>{s.abbr}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: rating.bg, border: `1px solid ${rating.border}`, padding: '2px 7px' }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: rating.color, display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: '0.08em', color: rating.color }}>{rating.label}</span>
        </span>
      </div>
      <div style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 8 }}>{s.name}</div>
      <div style={{ fontFamily: mono, fontSize: 9, color: MUTED, letterSpacing: '0.06em', lineHeight: 1.6 }}>
        Deposit: {s.depositLimit.split(' ').slice(0, 2).join(' ')}
      </div>
    </Link>
  )
}

export default function StatesClient() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterKey>('all')
  const [sort, setSort] = useState<SortKey>('name')
  const [view, setView] = useState<'grid' | 'region'>('region')

  const filtered = useMemo(() => {
    return STATES
      .filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.abbr.toLowerCase().includes(search.toLowerCase())
        const matchFilter = filter === 'all' || s.landlordFriendly === filter
        return matchSearch && matchFilter
      })
      .sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name)
        if (sort === 'region') return getRegion(a.abbr).localeCompare(getRegion(b.abbr))
        const order = { high: 0, medium: 1, low: 2 }
        return (order[a.landlordFriendly as keyof typeof order] ?? 1) - (order[b.landlordFriendly as keyof typeof order] ?? 1)
      })
  }, [search, filter, sort])

  const byRegion = useMemo(() => {
    const map: Record<string, typeof STATES> = {}
    filtered.forEach(s => {
      const r = getRegion(s.abbr)
      if (!map[r]) map[r] = []
      map[r].push(s)
    })
    return map
  }, [filtered])

  const counts = useMemo(() => ({
    high:   STATES.filter(s => s.landlordFriendly === 'high').length,
    medium: STATES.filter(s => s.landlordFriendly === 'medium').length,
    low:    STATES.filter(s => s.landlordFriendly === 'low').length,
  }), [])

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: BG2, borderBottom: `1px solid ${BORDER}`, padding: 'clamp(56px,7vw,96px) var(--page-pad)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, right: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 28, height: 1, background: BLUE, display: 'block' }} />
            All 50 States + DC
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'end', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.6rem,5.5vw,5rem)', fontWeight: 600, lineHeight: 1.08, color: TEXT, marginBottom: 20, letterSpacing: '-0.01em' }}>
                Landlord laws.<br />
                <span style={{ color: BLUE }}>Every state.</span>
              </h1>
              <p style={{ color: MUTED, maxWidth: '54ch', lineHeight: 1.8, fontSize: 17 }}>
                Security deposit limits, eviction timelines, notice requirements, and rent control status for all 50 states and DC. Free. No signup.
              </p>
            </div>

            {/* Summary stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: BORDER, flexShrink: 0, minWidth: 260 }}>
              {([['high', counts.high], ['medium', counts.medium], ['low', counts.low]] as const).map(([key, count]) => (
                <div key={key} style={{ background: BG2, padding: '20px 16px', textAlign: 'center' }}>
                  <div style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: RATING[key].color, lineHeight: 1, marginBottom: 6 }}>{count}</div>
                  <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED, lineHeight: 1.4 }}>{RATING[key].label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(40px,5vw,64px) var(--page-pad)' }}>

        {/* Controls */}
        <div style={{ marginBottom: 40 }}>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontFamily: mono, fontSize: 14, color: MUTED, pointerEvents: 'none' }}>⌕</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search states... e.g. Texas, CA, New York" style={{ width: '100%', background: BG2, border: `1px solid ${BORDER}`, color: TEXT, fontFamily: mono, fontSize: 13, padding: '12px 16px 12px 42px', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s' }} />
          </div>

          {/* Filter + sort + view row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(['all', 'high', 'medium', 'low'] as FilterKey[]).map(f => {
                const active = filter === f
                const cfg = f === 'all' ? null : RATING[f]
                return (
                  <button key={f} onClick={() => setFilter(f)} style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 14px', background: active ? (cfg?.color || BLUE) : 'transparent', color: active ? '#080D14' : MUTED, border: `1px solid ${active ? (cfg?.color || BLUE) : BORDER}`, cursor: 'pointer', transition: 'all 0.15s ease' }}>
                    {f === 'all' ? `All (${STATES.length})` : f === 'high' ? `Landlord Friendly (${counts.high})` : f === 'medium' ? `Balanced (${counts.medium})` : `Tenant Leaning (${counts.low})`}
                  </button>
                )
              })}
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select value={sort} onChange={e => setSort(e.target.value as SortKey)} style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.06em', background: BG2, border: `1px solid ${BORDER}`, color: MUTED, padding: '8px 12px', cursor: 'pointer', outline: 'none' }}>
                <option value="name">Sort: A–Z</option>
                <option value="rating">Sort: Rating</option>
                <option value="region">Sort: Region</option>
              </select>
              <div style={{ display: 'flex', background: BG2, border: `1px solid ${BORDER}` }}>
                {(['region', 'grid'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)} style={{ fontFamily: mono, fontSize: 10, padding: '8px 12px', background: view === v ? BLUE : 'transparent', color: view === v ? '#080D14' : MUTED, border: 'none', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                    {v === 'region' ? '⊞ Region' : '⊟ Grid'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div style={{ fontFamily: mono, fontSize: 10, color: MUTED, marginBottom: 28, letterSpacing: '0.06em' }}>
          {filtered.length} {filtered.length === 1 ? 'state' : 'states'} shown
          {search && <span style={{ color: BLUE }}> · "{search}"</span>}
          {filter !== 'all' && <span style={{ color: RATING[filter].color }}> · {RATING[filter].label}</span>}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: MUTED, fontFamily: mono, fontSize: 13 }}>
            No states match your search.
            <button onClick={() => { setSearch(''); setFilter('all') }} style={{ display: 'block', margin: '16px auto 0', fontFamily: mono, fontSize: 11, color: BLUE, background: 'none', border: `1px solid ${BORDER}`, padding: '8px 16px', cursor: 'pointer', letterSpacing: '0.06em' }}>
              Clear filters
            </button>
          </div>
        )}

        {/* Region view */}
        {view === 'region' && filtered.length > 0 && (
          <div>
            {Object.entries(byRegion).sort(([a], [b]) => a.localeCompare(b)).map(([region, states]) => (
              <div key={region} style={{ marginBottom: 56 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: BLUE }}>{region}</span>
                  <span style={{ flex: 1, height: 1, background: BORDER }} />
                  <span style={{ fontFamily: mono, fontSize: 10, color: MUTED }}>{states.length} states</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
                  {states.map(s => <StateCard key={s.abbr} s={s} />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid view */}
        {view === 'grid' && filtered.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
            {filtered.map(s => <StateCard key={s.abbr} s={s} />)}
          </div>
        )}

        {/* Legend + bottom CTA */}
        {filtered.length > 0 && (
          <>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}` }}>
              {Object.entries(RATING).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: val.color, display: 'block', flexShrink: 0 }} />
                  <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, letterSpacing: '0.06em' }}>{val.label}</span>
                </div>
              ))}
              <span style={{ fontFamily: mono, fontSize: 10, color: MUTED, marginLeft: 'auto', letterSpacing: '0.06em', opacity: 0.6 }}>Ratings based on landlord score · Updated 2026</span>
            </div>

            {/* Bottom CTA */}
            <div style={{ marginTop: 64, background: BG2, border: `1px solid ${BORDER}`, padding: 'clamp(32px,5vw,52px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${BLUE}, transparent)` }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: BLUE, marginBottom: 14 }}>Need to file?</div>
                  <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 600, color: TEXT, marginBottom: 12, lineHeight: 1.2 }}>Understand the eviction process first</h2>
                  <p style={{ color: MUTED, maxWidth: '50ch', lineHeight: 1.75, fontSize: 15 }}>
                    Filing an eviction incorrectly can get your case dismissed and reset the clock. Know the process for your state before you start.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
                  <Link href="/eviction" style={{ background: BLUE, color: '#080D14', padding: '13px 28px', fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', textAlign: 'center' as const, whiteSpace: 'nowrap' }}>Eviction Guide →</Link>
                  <Link href="/tools" style={{ border: `1px solid ${BORDER}`, color: MUTED, padding: '13px 28px', fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center' as const, whiteSpace: 'nowrap' }}>Free Tools</Link>
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

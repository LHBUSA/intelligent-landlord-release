'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { STATE_LAWS, scoreToColor, scoreToLabel, StateLawData } from '@/lib/state-laws';

const REGIONS: Record<string, string[]> = {
  ALL: [],
  NORTHEAST: ['ME', 'VT', 'NH', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA', 'DE', 'MD', 'DC'],
  SOUTHEAST: ['VA', 'WV', 'NC', 'SC', 'GA', 'FL', 'AL', 'MS', 'TN', 'KY', 'AR', 'LA'],
  MIDWEST: ['OH', 'IN', 'IL', 'MI', 'WI', 'MN', 'IA', 'MO', 'ND', 'SD', 'NE', 'KS'],
  SOUTHWEST: ['TX', 'OK', 'NM', 'AZ'],
  MOUNTAIN: ['CO', 'WY', 'MT', 'ID', 'UT', 'NV'],
  WEST: ['CA', 'OR', 'WA', 'AK', 'HI'],
};

const SORT_OPTIONS = [
  { label: 'BEST', value: 'score_desc' },
  { label: 'WORST', value: 'score_asc' },
  { label: 'TOP %', value: 'eviction_asc' },
  { label: 'WORST %', value: 'eviction_desc' },
  { label: 'NAME A–Z', value: 'name_asc' },
];

const US_AVG_EVICTION = Math.round(STATE_LAWS.reduce((a, b) => a + b.evictionTotalDays, 0) / STATE_LAWS.length);
const LANDLORD_FRIENDLY_COUNT = STATE_LAWS.filter(s => s.landlordScore >= 7).length;
const RENT_CONTROL_COUNT = STATE_LAWS.filter(s => s.rentControl).length;
const AVG_SCORE = (STATE_LAWS.reduce((a, b) => a + b.landlordScore, 0) / STATE_LAWS.length).toFixed(1);

export default function StateLawsGridPage() {
  const [region, setRegion] = useState('ALL');
  const [sort, setSort] = useState('score_desc');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let states = [...STATE_LAWS];
    if (search) states = states.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
    );
    if (region !== 'ALL') states = states.filter(s => REGIONS[region].includes(s.code));
    switch (sort) {
      case 'score_desc': states.sort((a, b) => b.landlordScore - a.landlordScore); break;
      case 'score_asc': states.sort((a, b) => a.landlordScore - b.landlordScore); break;
      case 'eviction_asc': states.sort((a, b) => a.evictionTotalDays - b.evictionTotalDays); break;
      case 'eviction_desc': states.sort((a, b) => b.evictionTotalDays - a.evictionTotalDays); break;
      case 'name_asc': states.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return states;
  }, [region, sort, search]);

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: '#0A0E1A',
      minHeight: '100vh',
      color: '#E2E8F0',
    }}>

      {/* PAGE HEADER */}
      <div style={{
        background: '#0D1220',
        borderBottom: '1px solid #1E2A3A',
        padding: '32px 28px 24px',
      }}>
        {/* breadcrumb */}
        <div style={{ fontSize: 11, color: '#475569', marginBottom: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#2DD4BF', textDecoration: 'none' }}>home</Link>
          <span>›</span>
          <Link href="/legal" style={{ color: '#2DD4BF', textDecoration: 'none' }}>landlord laws</Link>
          <span>›</span>
          <span>all states</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          {/* Title block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'pulse 2s infinite', display: 'inline-block', boxShadow: '0 0 8px #EF4444' }} />
              <span style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>State Market Data</span>
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              margin: '0 0 8px',
              color: '#F1F5F9',
              lineHeight: 1.15,
            }}>
              All 50 States — Landlord Law Intelligence
            </h1>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0, maxWidth: 480 }}>
              Search, filter, and compare landlord laws across every US state. Sort by eviction speed, score, or rent control status.
            </p>
          </div>

          {/* Stats cards top-right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flexShrink: 0 }}>
            {[
              { label: 'TOTAL STATES', value: '51', color: '#94A3B8' },
              { label: 'LANDLORD FRIENDLY', value: LANDLORD_FRIENDLY_COUNT.toString(), color: '#22C55E' },
              { label: 'AVG EVICTION', value: `${US_AVG_EVICTION}d`, color: '#D4A843' },
              { label: 'RENT CONTROL', value: `+${RENT_CONTROL_COUNT}`, color: '#EF4444' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: '#141B2D',
                border: '1px solid #1E2A3A',
                borderRadius: 8,
                padding: '10px 14px',
                minWidth: 100,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, color: '#475569', letterSpacing: '0.08em', marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTERS BAR */}
      <div style={{
        background: '#0D1220',
        borderBottom: '1px solid #1E2A3A',
        padding: '16px 28px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
      }}>
        {/* Search */}
        <div style={{ marginBottom: 12 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search states..."
            style={{
              width: '100%',
              maxWidth: 480,
              background: '#141B2D',
              border: '1px solid #1E2A3A',
              borderRadius: 8,
              padding: '10px 16px',
              color: '#E2E8F0',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Region tabs */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {Object.keys(REGIONS).map(r => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              style={{
                background: region === r ? 'rgba(45,212,191,0.15)' : 'transparent',
                border: `1px solid ${region === r ? '#2DD4BF' : '#1E2A3A'}`,
                borderRadius: 6,
                padding: '5px 12px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                color: region === r ? '#2DD4BF' : '#64748B',
                transition: 'all 0.12s',
              }}
            >
              {r}
            </button>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: '#475569', letterSpacing: '0.06em' }}>SORT:</span>
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                style={{
                  background: sort === opt.value ? '#D4A843' : 'transparent',
                  border: `1px solid ${sort === opt.value ? '#D4A843' : '#1E2A3A'}`,
                  borderRadius: 4,
                  padding: '4px 10px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  color: sort === opt.value ? '#080D14' : '#64748B',
                  transition: 'all 0.12s',
                }}
              >
                {opt.label}
              </button>
            ))}
            <span style={{ fontSize: 11, color: '#475569', marginLeft: 8 }}>{filtered.length} states</span>
          </div>
        </div>
      </div>

      {/* STATE CARDS GRID */}
      <div style={{ padding: '24px 28px 60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 12,
        }}>
          {filtered.map(state => (
            <StateCard key={state.code} state={state} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#475569' }}>
            No states found matching "{search}"
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        input::placeholder { color: #475569; }
        input:focus { border-color: #2DD4BF !important; }
      `}</style>
    </div>
  );
}

function StateCard({ state }: { state: StateLawData }) {
  const color = scoreToColor(state.landlordScore);
  const label = scoreToLabel(state.landlordScore);
  const scorePct = (state.landlordScore / 10) * 100;

  // Badge colors
  const badgeConfig = state.landlordScore >= 7
    ? { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', text: '#22C55E', label: 'LANDLORD' }
    : state.landlordScore >= 5
    ? { bg: 'rgba(212,168,67,0.12)', border: 'rgba(212,168,67,0.35)', text: '#D4A843', label: 'BALANCED' }
    : state.rentControl
    ? { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', text: '#EF4444', label: 'RENT CTRL' }
    : { bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.35)', text: '#F97316', label: 'TENANT' };

  // Change indicator
  const evictionVsAvg = state.evictionTotalDays - US_AVG_EVICTION;
  const evictionColor = state.evictionTotalDays <= 30 ? '#22C55E' : state.evictionTotalDays <= 60 ? '#D4A843' : '#EF4444';

  return (
    <Link
      href={`/legal/states/${state.code.toLowerCase()}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: '#0D1220',
        border: '1px solid #1A2435',
        borderRadius: 10,
        padding: '14px 15px 12px',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = color;
        el.style.background = `${color}08`;
        el.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = '#1A2435';
        el.style.background = '#0D1220';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* TOP ROW: code + badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          color,
          background: `${color}18`,
          padding: '2px 7px',
          borderRadius: 4,
          letterSpacing: '0.05em',
        }}>
          {state.code}
        </span>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: badgeConfig.text,
          background: badgeConfig.bg,
          border: `1px solid ${badgeConfig.border}`,
          borderRadius: 4,
          padding: '2px 6px',
        }}>
          {badgeConfig.label}
        </span>
      </div>

      {/* STATE NAME */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 18,
        fontWeight: 700,
        color: '#F1F5F9',
        marginBottom: 12,
        lineHeight: 1.2,
      }}>
        {state.name}
      </div>

      {/* DATA GRID: 2x2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', marginBottom: 12 }}>
        {/* Eviction days */}
        <div>
          <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>EVICTION TIME</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 17,
              fontWeight: 700,
              color: evictionColor,
            }}>
              {state.evictionTotalDays}d
            </span>
            <span style={{
              fontSize: 11,
              color: evictionVsAvg < 0 ? '#22C55E' : '#EF4444',
              fontWeight: 700,
            }}>
              {evictionVsAvg < 0 ? `${evictionVsAvg}d` : `+${evictionVsAvg}d`}
            </span>
          </div>
        </div>

        {/* Score */}
        <div>
          <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>LL SCORE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 17,
              fontWeight: 700,
              color,
            }}>
              {state.landlordScore}/10
            </span>
          </div>
        </div>

        {/* Notice period */}
        <div>
          <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>NOTICE DAYS</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 700,
              color: '#94A3B8',
            }}>
              {state.evictionNoticeDays}d
            </span>
          </div>
        </div>

        {/* Entry notice */}
        <div>
          <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>ENTRY NOTICE</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 700,
              color: state.entryNoticeHours === 0 ? '#22C55E' : '#94A3B8',
            }}>
              {state.entryNoticeHours === 0 ? 'NONE' : `${state.entryNoticeHours}hr`}
            </span>
          </div>
        </div>
      </div>

      {/* Deposit & control row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.06em', textTransform: 'uppercase' }}>DEPOSIT CAP</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', marginTop: 1 }}>{state.securityDepositMax}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, color: '#475569', letterSpacing: '0.06em', textTransform: 'uppercase' }}>RENT CTRL</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: state.rentControl ? '#EF4444' : '#22C55E', marginTop: 1 }}>
            {state.rentControl ? 'YES' : 'NONE'}
          </div>
        </div>
      </div>

      {/* SCORE PROGRESS BAR */}
      <div>
        <div style={{ height: 4, background: '#1A2435', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            width: `${scorePct}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            borderRadius: 2,
            transition: 'width 0.6s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 9, color: '#EF4444' }}>TENANT</span>
          <span style={{ fontSize: 9, color, fontWeight: 700, letterSpacing: '0.04em' }}>{label.toUpperCase()}</span>
          <span style={{ fontSize: 9, color: '#22C55E' }}>LANDLORD</span>
        </div>
      </div>

      {/* Bottom: filing fee */}
      <div style={{
        marginTop: 10,
        paddingTop: 8,
        borderTop: '1px solid #1A2435',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 10, color: '#475569' }}>Filing fee</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#64748B', fontFamily: "'JetBrains Mono', monospace" }}>{state.evictionFilingFee}</span>
      </div>
    </Link>
  );
}

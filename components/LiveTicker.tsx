'use client'

import { useEffect, useState } from 'react'

const WORKER_URL = 'https://il-data-worker.sales-fd3.workers.dev'

interface Metric { value: number; label: string; suffix?: string; prefix?: string; source?: string; live?: boolean; date?: string }
interface MarketPulse { mortgage30: Metric; vacancy: Metric; cpi: Metric; fedFunds: Metric; medianRent: Metric; rentGrowth: Metric; avgCapRate: Metric; fetchedAt?: string }

const STATIC_DATA: MarketPulse = {
  mortgage30: { value: 6.11, label: '30-YR FIXED',      suffix: '%', source: 'Freddie Mac' },
  vacancy:    { value: 7.2,  label: 'RENTAL VACANCY',   suffix: '%', source: 'Census' },
  cpi:        { value: 2.4,  label: 'CPI YoY',          suffix: '%', source: 'BLS' },
  fedFunds:   { value: 3.64, label: 'FED FUNDS',        suffix: '%', source: 'Fed Reserve' },
  medianRent: { value: 1732, label: 'MEDIAN RENT',      suffix: '',  prefix: '$', source: 'RentCast' },
  rentGrowth: { value: -11.6,label: 'RENT GROWTH YoY', suffix: '%', source: 'RentCast' },
  avgCapRate: { value: 5.8,  label: 'AVG CAP RATE',     suffix: '%', source: 'CBRE' },
}

function fmt(v: number): string {
  const abs = Math.abs(v)
  const str = abs % 1 === 0 ? abs.toFixed(2) : abs.toFixed(2)
  return (v < 0 ? '-' : '') + str
}

function TickerItem({ metric, loading }: { metric: Metric; loading: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 20px', borderRight: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, minWidth: 120 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 700, color: loading ? 'rgba(45,212,191,0.4)' : 'var(--teal)', lineHeight: 1, marginBottom: 3, transition: 'color 0.4s' }}>
        {metric.prefix || ''}{fmt(metric.value)}{metric.suffix || ''}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>{metric.label}</div>
      {metric.source && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: 'rgba(139,149,163,0.5)', letterSpacing: '0.06em' }}>{metric.source}{metric.live ? ' · LIVE' : ''}</div>}
    </div>
  )
}

export function LiveTicker() {
  const [data, setData] = useState<MarketPulse>(STATIC_DATA)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [updatedTime, setUpdatedTime] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    let cancelled = false
    async function fetchData() {
      try {
        const res = await fetch(`${WORKER_URL}/market-pulse`)
        if (!res.ok) throw new Error('fail')
        const json = await res.json() as MarketPulse
        if (!cancelled) {
          setData(json)
          if (json.fetchedAt) setUpdatedTime(new Date(json.fetchedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }))
          setLoading(false)
        }
      } catch { if (!cancelled) setLoading(false) }
    }
    const t = setTimeout(fetchData, 800)
    return () => { cancelled = true; clearTimeout(t) }
  }, [])

  if (!mounted) return null

  return (
    <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border2)', borderBottom: '1px solid var(--border2)', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, transparent 60%)', opacity: 0.3 }} />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--page-pad)', display: 'flex', alignItems: 'stretch', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '10px 20px 10px 0', borderRight: '1px solid rgba(45,212,191,0.2)', flexShrink: 0, marginRight: 4 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 2 }}>Market Pulse</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: loading ? 'var(--muted)' : 'var(--green)', boxShadow: loading ? 'none' : '0 0 6px var(--green)', flexShrink: 0 }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: loading ? 'var(--muted)' : 'var(--green)', letterSpacing: '0.1em' }}>{loading ? 'LOADING' : 'LIVE'}</span>
          </div>
        </div>
        {[data.mortgage30, data.medianRent, data.vacancy, data.rentGrowth, data.avgCapRate, data.fedFunds, data.cpi].map((m, i) => (
          <TickerItem key={i} metric={m} loading={loading} />
        ))}
        {updatedTime && (
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 16, flexShrink: 0 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: 'rgba(139,149,163,0.4)', letterSpacing: '0.06em' }}>Updated {updatedTime}</span>
          </div>
        )}
      </div>
    </div>
  )
}

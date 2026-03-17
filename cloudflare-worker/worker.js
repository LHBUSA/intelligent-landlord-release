/**
 * Intelligent Landlord — Live Data Worker
 * Deploy as: intelligent-landlord-data.YOUR_ACCOUNT.workers.dev
 * Fetches real market data from FRED API (free, no key needed for public series)
 * Cache: 6 hours to stay within free tier limits
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

// FRED series IDs — all public, no API key required for these
const FRED_BASE = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id='
const SERIES = {
  mortgage30: 'MORTGAGE30US',   // 30-yr fixed mortgage rate
  vacancy:    'RRVRUSQ156N',    // Rental vacancy rate
  cpi:        'CPIAUCSL',       // CPI for inflation context
  fedFunds:   'FEDFUNDS',       // Fed funds rate
}

async function fetchFREDSeries(seriesId, ctx) {
  const cacheKey = `fred_${seriesId}`
  
  // Try cache first
  const cached = await ctx.env?.KV?.get(cacheKey)
  if (cached) return JSON.parse(cached)

  try {
    const res = await fetch(`${FRED_BASE}${seriesId}`, {
      headers: { 'User-Agent': 'IntelligentLandlord/1.0 data@intelligentlandlord.com' }
    })
    if (!res.ok) return null
    const csv = await res.text()
    const lines = csv.trim().split('\n').filter(l => l && !l.startsWith('DATE'))
    const recent = lines.slice(-8).map(line => {
      const [date, value] = line.split(',')
      return { date: date.trim(), value: parseFloat(value.trim()) }
    }).filter(r => !isNaN(r.value))
    
    return recent.length ? recent[recent.length - 1] : null
  } catch {
    return null
  }
}

// Fallback values if FRED is unreachable
const FALLBACKS = {
  mortgage30: { value: 6.87, date: '2026-03-06', label: '30-YR FIXED', suffix: '%', source: 'Freddie Mac' },
  vacancy:    { value: 6.1,  date: '2025-10-01', label: 'RENTAL VACANCY', suffix: '%', source: 'Census Bureau' },
  cpi:        { value: 3.2,  date: '2026-02-01', label: 'CPI (YoY)', suffix: '%', source: 'BLS' },
  fedFunds:   { value: 4.33, date: '2026-03-01', label: 'FED FUNDS RATE', suffix: '%', source: 'Federal Reserve' },
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS })
    }

    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ ok: true, ts: Date.now() }), { headers: CORS })
    }

    if (url.pathname === '/market-pulse') {
      try {
        // Fetch all series in parallel
        const context = { env }
        const [mortgage, vacancy, cpi, fedFunds] = await Promise.allSettled([
          fetchFREDSeries(SERIES.mortgage30, context),
          fetchFREDSeries(SERIES.vacancy, context),
          fetchFREDSeries(SERIES.cpi, context),
          fetchFREDSeries(SERIES.fedFunds, context),
        ])

        const getValue = (result, fallbackKey) => {
          if (result.status === 'fulfilled' && result.value) {
            return { ...FALLBACKS[fallbackKey], value: result.value.value, date: result.value.date, live: true }
          }
          return { ...FALLBACKS[fallbackKey], live: false }
        }

        const data = {
          mortgage30:  getValue(mortgage,  'mortgage30'),
          vacancy:     getValue(vacancy,   'vacancy'),
          cpi:         getValue(cpi,       'cpi'),
          fedFunds:    getValue(fedFunds,  'fedFunds'),
          // Static but useful landlord metrics
          medianRent:  { value: 1844, label: 'MEDIAN RENT', suffix: '', prefix: '$', source: 'Census ACS', live: false },
          rentGrowth:  { value: 2.8,  label: 'RENT GROWTH YoY', suffix: '%', source: 'CoStar', live: false },
          avgCapRate:  { value: 5.8,  label: 'AVG CAP RATE', suffix: '%', source: 'CBRE', live: false },
          fetchedAt: new Date().toISOString(),
        }

        return new Response(JSON.stringify(data), {
          headers: {
            ...CORS,
            'Cache-Control': 'public, max-age=21600', // 6 hours
          }
        })
      } catch (err) {
        // Return fallback data — never let the worker fail silently
        const fallback = {
          mortgage30: { ...FALLBACKS.mortgage30, live: false },
          vacancy:    { ...FALLBACKS.vacancy,    live: false },
          cpi:        { ...FALLBACKS.cpi,        live: false },
          fedFunds:   { ...FALLBACKS.fedFunds,   live: false },
          medianRent: { value: 1844, label: 'MEDIAN RENT', suffix: '', prefix: '$', source: 'Census ACS', live: false },
          rentGrowth: { value: 2.8,  label: 'RENT GROWTH YoY', suffix: '%', source: 'CoStar', live: false },
          avgCapRate: { value: 5.8,  label: 'AVG CAP RATE', suffix: '%', source: 'CBRE', live: false },
          fetchedAt: new Date().toISOString(),
          error: String(err),
        }
        return new Response(JSON.stringify(fallback), {
          headers: { ...CORS, 'Cache-Control': 'public, max-age=900' }
        })
      }
    }

    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: CORS })
  }
}

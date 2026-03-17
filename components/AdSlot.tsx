'use client'

interface AdSlotProps {
  size?: 'leaderboard' | 'rectangle' | 'sidebar'
  className?: string
}

const DIMS: Record<string, { w: number; h: number }> = {
  leaderboard: { w: 728, h: 90 },
  rectangle:   { w: 300, h: 250 },
  sidebar:     { w: 300, h: 600 },
}

export function AdSlot({ size = 'rectangle', className }: AdSlotProps) {
  const d = DIMS[size]
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 'fit-content' }}>
      <span style={{ fontSize: 8, fontFamily: 'monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', alignSelf: 'stretch', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 3, userSelect: 'none' }}>Advertisement</span>
      {/* Replace with <ins> AdSense tag when approved */}
      <div style={{ width: d.w, maxWidth: '100%', height: d.h, background: 'var(--bg3)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{d.w}×{d.h}</span>
      </div>
    </div>
  )
}

export default AdSlot

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV = [
  { label: 'Guides',        href: '/guides' },
  { label: 'Rental Market', href: '/market' },
  { label: 'State Laws',    href: '/legal/states' },
  { label: 'Eviction',       href: '/eviction' },
  { label: 'News',          href: '/news' },
  { label: 'Tools',         href: '/tools' },
  { label: 'Connect',       href: '/connect' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { mq.removeEventListener('change', handler); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: scrolled ? 'rgba(8,13,20,0.97)' : 'var(--bg)',
      borderBottom: `1px solid ${scrolled ? 'rgba(45,212,191,0.15)' : 'var(--border2)'}`,
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.25s ease',
    }}>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--page-pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontWeight: 700, color: '#080D14', lineHeight: 1 }}>IL</span>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, fontWeight: 600, letterSpacing: '0.02em', color: 'var(--text)', whiteSpace: 'nowrap' }}>
            Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span>
          </span>
        </Link>

        {/* Desktop nav */}
        {isDesktop && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--teal)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
                {n.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Hamburger */}
        {isDesktop === false && (
          <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', padding: 8, color: 'var(--muted)' }} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {open
                ? <><line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"/><line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5"/></>
                : <><line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5"/><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5"/><line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5"/></>
              }
            </svg>
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isDesktop === false && open && (
        <div style={{ borderTop: '1px solid var(--border2)', background: 'var(--bg2)', padding: '12px var(--page-pad) 20px' }}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '10px 0', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', borderBottom: '1px solid var(--border2)' }}>
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default SiteHeader

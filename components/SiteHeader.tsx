'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const mono = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

const NAV = [
  { label: 'Guides',        href: '/guides' },
  { label: 'Rental Market', href: '/market' },
  { label: 'State Laws',    href: '/legal/states' },
  { label: 'Eviction',      href: '/eviction' },
  { label: 'News',          href: '/news' },
  { label: 'Tools',         href: '/tools' },
  { label: 'Connect',       href: '/connect' },
]

function NavItem({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: hovered ? 'var(--teal)' : 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s ease', position: 'relative', paddingBottom: 3, display: 'inline-block' }}>
      {label}
      <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--teal)', display: 'block', transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.2s ease' }} />
    </Link>
  )
}

function MobileNavItem({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={href} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', fontFamily: mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: hovered ? 'var(--teal)' : 'var(--muted)', borderBottom: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', transition: 'color 0.2s ease' }}>
      <span style={{ width: 16, height: 1, background: 'var(--teal)', display: 'block', opacity: hovered ? 1 : 0, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'all 0.2s ease', flexShrink: 0 }} />
      {label}
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const onMq = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    const onScroll = () => setScrolled(window.scrollY > 20)
    mq.addEventListener('change', onMq)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { mq.removeEventListener('change', onMq); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: scrolled ? 'rgba(8,13,20,0.95)' : 'var(--bg)', borderBottom: `1px solid ${scrolled ? 'rgba(45,212,191,0.15)' : 'var(--border2)'}`, backdropFilter: scrolled ? 'blur(12px)' : 'none', transition: 'all 0.25s ease' }}>

      {/* Teal accent bar */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, rgba(45,212,191,0.3) 60%, transparent 100%)' }} />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--page-pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: '#080D14', lineHeight: 1 }}>IL</span>
          </div>
          <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, letterSpacing: '0.02em', color: 'var(--text)', whiteSpace: 'nowrap' }}>
            Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span>
          </span>
        </Link>

        {/* Desktop nav */}
        {isDesktop && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {NAV.map(n => <NavItem key={n.href} label={n.label} href={n.href} />)}
          </nav>
        )}

        {/* Desktop CTA */}
        {isDesktop && (
          <Link href="/legal/states" style={{ background: 'var(--teal)', color: '#080D14', padding: '7px 16px', fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Find My State
          </Link>
        )}

        {/* Hamburger */}
        {isDesktop === false && (
          <button onClick={() => setOpen(!open)} aria-label="Menu" style={{ background: 'none', border: 'none', padding: 8, color: 'var(--muted)', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {open
                ? <><line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" /><line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" /></>
                : <><line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" /><line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" /><line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" /></>
              }
            </svg>
          </button>
        )}

      </div>

      {/* Mobile menu */}
      {isDesktop === false && open && (
        <div style={{ borderTop: '1px solid var(--border2)', background: '#0D1220', padding: '8px var(--page-pad) 24px' }}>
          {NAV.map(n => <MobileNavItem key={n.href} label={n.label} href={n.href} onClick={() => setOpen(false)} />)}
          <Link href="/legal/states" onClick={() => setOpen(false)} style={{ display: 'inline-block', marginTop: 20, background: 'var(--teal)', color: '#080D14', padding: '10px 20px', fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
            Find My State
          </Link>
        </div>
      )}

    </header>
  )
}

export default SiteHeader

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const mono = "'JetBrains Mono', monospace"
const serif = "'Cormorant Garamond', Georgia, serif"

const NAV_LINKS = [
  { label: 'State Laws', href: '/legal' },
  { label: 'Guides', href: '/guides' },
  { label: 'Market Data', href: '/market' },
  { label: 'Tools', href: '/tools' },
  { label: 'News', href: '/news' },
]

function NavItem({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: hovered ? 'var(--teal)' : '#B8CDD9', textDecoration: 'none', transition: 'color 0.2s ease', position: 'relative', paddingBottom: 2 }}>
      {label}
      <span style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1, background: 'var(--teal)', transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.2s ease', display: 'block' }} />
    </Link>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: scrolled ? 'rgba(8,13,20,0.92)' : '#080D14', borderBottom: `1px solid ${scrolled ? 'rgba(45,212,191,0.15)' : 'rgba(255,255,255,0.06)'}`, backdropFilter: scrolled ? 'blur(12px)' : 'none', transition: 'all 0.3s ease' }}>

      {/* Teal accent bar */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, rgba(45,212,191,0.3) 60%, transparent 100%)' }} />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--page-pad)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: 28, height: 28, background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: serif, fontSize: 14, fontWeight: 700, color: '#080D14' }}>IL</span>
          </div>
          <span style={{ fontFamily: serif, fontSize: 19, fontWeight: 600, color: '#F0F4F8', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
            Intelligent<span style={{ color: 'var(--teal)' }}>Landlord</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} aria-label="Main navigation">
          {NAV_LINKS.map(l => <NavItem key={l.label} label={l.label} href={l.href} />)}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Link href="/legal" style={{ background: 'var(--teal)', color: '#080D14', padding: '8px 18px', fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Find My State
          </Link>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ display: 'block', width: 20, height: 1.5, background: menuOpen ? 'var(--teal)' : '#B8CDD9', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
            <span style={{ display: 'block', width: 20, height: 1.5, background: menuOpen ? 'var(--teal)' : '#B8CDD9', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 20, height: 1.5, background: menuOpen ? 'var(--teal)' : '#B8CDD9', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#0D1220', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px var(--page-pad) 28px' }}>
          {NAV_LINKS.map(l => (
            <div key={l.label} style={{ marginBottom: 16 }}>
              <Link href={l.href} onClick={() => setMenuOpen(false)} style={{ fontFamily: mono, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8CDD9', textDecoration: 'none', display: 'block' }}>
                {l.label}
              </Link>
            </div>
          ))}
          <Link href="/legal" onClick={() => setMenuOpen(false)} style={{ display: 'inline-block', marginTop: 8, background: 'var(--teal)', color: '#080D14', padding: '10px 20px', fontFamily: mono, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
            Find My State
          </Link>
        </div>
      )}

    </header>
  )
}

export default SiteHeader

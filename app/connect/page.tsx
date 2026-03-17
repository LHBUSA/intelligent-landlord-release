'use client'
import { useState } from 'react'

const WORKER_URL = 'https://il-connect-worker.sales-fd3.workers.dev'

const TYPES = [
  { value: 'seller', label: '🏠 I want to sell my property' },
  { value: 'landlord', label: '📋 I have a rental question' },
  { value: 'investor', label: '📈 I want to invest or partner' },
  { value: 'partnership', label: '🤝 Business partnership' },
  { value: 'media', label: '📰 Media or press inquiry' },
  { value: 'other', label: '💬 Something else' },
]

export default function ConnectPage() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState('idle')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const submit = async () => {
    if (!form.name || !form.email || !form.type || !form.message) return
    setStatus('sending')
    try {
      await fetch(WORKER_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, source: 'intelligentlandlord.com/connect' }) })
      setStatus('done')
    } catch { setStatus('error') }
  }
  const inp = { width: '100%', background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', padding: '14px 16px', fontSize: 15, fontFamily: "'DM Sans', system-ui, sans-serif", outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }
  const focus = e => e.currentTarget.style.borderColor = 'var(--teal)'
  const blur = e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'

  if (status === 'done') return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: 'clamp(48px,8vw,80px) var(--page-pad)', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 24 }}>✓</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 600, marginBottom: 16, color: 'var(--teal)' }}>Got it. We will be in touch.</h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: '48ch', margin: '0 auto' }}>Your message went directly to our team. We read everything and respond to every serious inquiry.</p>
    </div>
  )

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'clamp(48px,8vw,80px) var(--page-pad)' }}>
      <div style={{ maxWidth: 640, marginBottom: 64 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 20, height: 1, background: 'var(--teal)' }} />Direct Line
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: 20 }}>
          Let us talk.<br /><span style={{ color: 'var(--teal)' }}>No gatekeepers.</span>
        </h1>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: 16, maxWidth: '52ch' }}>Whether you are a landlord with a question, an investor looking to partner, or a seller who has been reading our research — your message goes directly to our team. We read everything.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'clamp(280px,40%,420px) 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Your Name</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="First and last name" style={inp} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Email Address</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" style={inp} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>What brings you here?</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TYPES.map(t => (
                <div key={t.value} onClick={() => set('type', t.value)} style={{ padding: '12px 16px', background: form.type === t.value ? 'rgba(45,212,191,0.08)' : 'var(--bg3)', border: `1px solid ${form.type === t.value ? 'var(--teal)' : 'var(--border2)'}`, cursor: 'pointer', fontSize: 14, color: form.type === t.value ? 'var(--text)' : 'var(--muted)', transition: 'all 0.15s' }}>{t.label}</div>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Your Message</label>
            <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us what is on your mind. The more context the better." rows={5} style={{ ...inp, resize: 'vertical', lineHeight: 1.65 }} onFocus={focus} onBlur={blur} />
          </div>
          <button onClick={submit} disabled={status === 'sending' || !form.name || !form.email || !form.type || !form.message} style={{ background: 'var(--teal)', color: '#080D14', border: 'none', padding: '16px 32px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, cursor: status === 'sending' ? 'wait' : 'pointer', opacity: (!form.name || !form.email || !form.type || !form.message) ? 0.4 : 1, width: '100%' }}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'error' && <p style={{ color: 'var(--red)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textAlign: 'center' }}>Something went wrong. Email us: hello@intelligentlandlord.com</p>}
        </div>
        <div style={{ paddingTop: 8 }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>Who we work with</div>
            {[
              { icon: '🏠', title: 'Sellers', body: 'If you own a property and want to explore your options — we buy homes nationwide in partnership with sellers. No commission, no nonsense.' },
              { icon: '📋', title: 'Landlords', body: 'Questions about the laws on our site, a correction to flag, or a topic you want us to cover — we want to hear it.' },
              { icon: '📈', title: 'Investors and Partners', body: 'Looking to co-invest, source deals, or build something together? We are open to serious conversations with serious people.' },
              { icon: '🤝', title: 'Business Inquiries', body: 'PropTech partnerships, media appearances, data licensing — reach out with a clear ask and we will respond.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 28, paddingBottom: 28, borderBottom: i < 3 ? '1px solid var(--border2)' : 'none' }}>
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 15 }}>{item.title}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.65 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: 28, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--teal) 0%, transparent 100%)' }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 12 }}>Want to sell your home?</div>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>Local Home Buyers USA works with sellers nationwide. No agents, no commissions, no lowball games. Just a transparent offer.</p>
            <a href="https://www.localhomebuyersusa.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--teal)', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none' }}>LocalHomeBuyersUSA.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default function ConnectPage() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 'clamp(48px,8vw,80px) var(--page-pad)' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>Get In Touch</div>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 600, marginBottom: 14 }}>Connect</h1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: 40 }}>Have a question, correction, or content suggestion? We read everything.</p>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', padding: 32 }}>
        <p style={{ color: 'var(--muted)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Contact form coming soon. For now, reach us at hello@intelligentlandlord.com</p>
      </div>
    </div>
  )
}

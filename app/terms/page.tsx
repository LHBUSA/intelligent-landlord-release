export default function Page() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(48px,8vw,80px) var(--page-pad)" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, marginBottom: 32 }}>Terms of Use</h1>
      <div className="prose"><p>Content is for informational purposes only. Not legal advice. Laws vary by jurisdiction. Consult a licensed attorney in your state before taking legal action.</p></div>
    </div>
  )
}
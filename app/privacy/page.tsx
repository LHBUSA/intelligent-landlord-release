export default function Page() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "clamp(48px,8vw,80px) var(--page-pad)" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, marginBottom: 32 }}>Privacy Policy</h1>
      <div className="prose"><p>IntelligentLandlord.com does not collect personal information. No signup required. No tracking cookies. Standard server logs only.</p></div>
    </div>
  )
}
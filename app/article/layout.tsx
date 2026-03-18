import type { Metadata } from "next"
export const metadata: Metadata = { title: "Intelligent Landlord" }
export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "white" }}>
        {children}
      </body>
    </html>
  )
}
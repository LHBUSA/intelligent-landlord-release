import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.intelligentlandlord.com'),
  title: { default: 'Intelligent Landlord — Free Rental Property Intelligence', template: '%s | Intelligent Landlord' },
  description: 'Landlord-tenant laws for all 50 states, rental market data, lease guides, and free property calculators. No signup. No paywall. Just answers.',
  keywords: ['landlord', 'rental property', 'landlord tenant law', 'eviction process', 'lease agreement', 'rental market'],
  openGraph: {
    siteName: 'Intelligent Landlord',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#080D14" />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

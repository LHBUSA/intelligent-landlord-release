'use client'
import dynamic from 'next/dynamic'
export const LiveTickerClient = dynamic(
  () => import('./LiveTicker').then(m => ({ default: m.LiveTicker })),
  { ssr: false }
)

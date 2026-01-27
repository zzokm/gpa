import type { Metadata, Viewport } from 'next'
// CSS loading order: Bootstrap → globals (font) → index (tokens + base styles) → responsive-fixes (overrides)
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import '../src/index.css'
import '../src/responsive-fixes.css'

export const metadata: Metadata = {
  title: 'GPA Calculator - FCAI Cairo University',
  description: 'GPA Calculator for Faculty of Computer and Artificial Intelligence students at Cairo University',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

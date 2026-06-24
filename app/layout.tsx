import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Rubik } from 'next/font/google'
// CSS: Bootstrap → GlobalStyles (tokens, reset, shared primitives — inlined in TSX)
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalStyles from '../src/components/GlobalStyles'
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const rubik = Rubik({
  subsets: ['latin', 'arabic'],
  variable: '--font-rubik',
  display: 'swap',
})

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
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${rubik.variable}`}>
      <body>
        <GlobalStyles />
        {children}
      </body>
    </html>
  )
}

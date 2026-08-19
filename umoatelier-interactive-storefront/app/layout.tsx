import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Syne, Manrope } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'UMO Atelier | Catálogo de luminarias',
  description:
    'Luminarias de líneas orgánicas, creadas para transformar la atmósfera cotidiana con una presencia serena. Colecciones Lumenis, Arcae y Nébula.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#F0EADC',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${syne.variable} ${manrope.variable} bg-background`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

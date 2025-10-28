import type {Metadata} from 'next'

import {Geist, Geist_Mono} from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'CumpleAI - Mensajes de Cumpleaños con IA',
  description:
    'Hace mensajes de cumpleaños para enviar, descubre eventos historicos que pasó en el dia de tu cumpleaños y encuentra que regalos gratis de tiendas para ese día',
  keywords: [
    'cumpleaños',
    'mensajes',
    'inteligencia artificial',
    'regalos',
    'descuentos',
    'hechos históricos'
  ],
  authors: [{name: 'Dmiante'}],
  metadataBase: new URL('https://cumple-ai.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://cumple-ai.vercel.app',
    title: 'CumpleAI - Mensajes de Cumpleaños con IA',
    description:
      'Comparte un mensaje de cumpleaños personalizado, descubre qué hecho histórico ocurrió ese día, y revisa qué tiendas tienen regalos o eventos gratis para ti.',
    siteName: 'CumpleAI',
    images: [
      {
        url: '/og-image.jpg', // 👈 La imagen que creaste
        width: 1200,
        height: 630,
        alt: 'CumpleAI - Mensajes de Cumpleaños'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CumpleAI - Mensajes de Cumpleaños con IA',
    description: 'Comparte un mensaje de cumpleaños personalizado con IA',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}

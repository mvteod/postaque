import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'POSTA QUE',
  description: 'Probá tu suerte en la ruleta oficial del Posta QUe.',
  openGraph: {
    title: 'RULETA POSTA QUE',
    description: '¿Quién te acosa hoy? Girala y fijate.',
    url: 'https://postaque.vercel.app', // Asegurate que este sea tu link real
    siteName: 'Posta Que',
    images: [
      {
        url: '/postaque.jpg', // Vercel la busca en la carpeta public automáticamente
        width: 1200,
        height: 630,
        alt: 'Preview Postaque',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

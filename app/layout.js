// app/layout.js
import { Inter, Playfair_Display } from 'next/font/google'
import TrackerProvider from '@/components/TrackerProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata = {
  title: 'Alex Chen | Product Designer & Creative Technologist',
  description: 'I help ambitious startups design products that users love. Transforming complex problems into intuitive experiences.',
  keywords: 'product designer, UX designer, portfolio, creative technologist',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <TrackerProvider>
          <main>{children}</main>
        </TrackerProvider>
      </body>
    </html>
  )
}
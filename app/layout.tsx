import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { Open_Sans, Merriweather } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
})
export const metadata = {
  title: 'Nalanda University',
  description: 'Reviving the world\'s oldest residential university — research, learning, and culture.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${merriweather.variable}`}>
      <body className={openSans.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

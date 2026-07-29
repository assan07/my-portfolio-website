import './globals.css'
import { Poppins } from 'next/font/google'
import { Providers } from './providers.jsx'
import { Navbar } from '@/components/site/Navbar'
import { Footer } from '@/components/site/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://achmadhasanudin.com'),
  title: {
    default: 'Achmad Hasanudin — Front-Stack Developer',
    template: '%s — Achmad Hasanudin',
  },
  description:
    'Personal branding website of Achmad Hasanudin — a front-stack developer building clean, fast, and reliable web & mobile experiences.',
  openGraph: {
    title: 'Achmad Hasanudin — Front-Stack Developer',
    description:
      'Front-stack developer building clean, fast, and reliable web & mobile experiences.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout

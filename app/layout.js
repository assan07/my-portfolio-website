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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://achmadhasanudin.com'
  ),

  title: {
    default: 'Achmad Hasanudin — Front-Stack Developer',
    template: '%s — Achmad Hasanudin',
  },

  description:
    'Personal branding website of Achmad Hasanudin — a front-stack developer building fast, accessible, and scalable web & mobile applications.',

  keywords: [
    'Achmad Hasanudin',
    'Hasanudin',
    'Front-End Developer',
    'Frontend Developer',
    'Front-Stack Developer',
    'Full Stack Developer',
    'Next.js Developer',
    'React Developer',
    'Flutter Developer',
    'JavaScript',
    'Portfolio',
    'Web Developer',
    'Mobile Developer',
  ],

  authors: [
    {
      name: 'Achmad Hasanudin',
      url: 'https://achmadhasanudin.com',
    },
  ],

  creator: 'Achmad Hasanudin',

  publisher: 'Achmad Hasanudin',

  category: 'Technology',

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/icon.png',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Achmad Hasanudin — Front-Stack Developer',

    description:
      'Personal branding website of Achmad Hasanudin — a front-stack developer building fast, accessible, and scalable web & mobile applications.',

    url: '/',

    siteName: 'Achmad Hasanudin',

    locale: 'en_US',

    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Achmad Hasanudin — Front-Stack Developer',

    description:
      'Personal branding website of Achmad Hasanudin — a front-stack developer building fast, accessible, and scalable web & mobile applications.',
  },
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

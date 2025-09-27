import type { Metadata } from 'next';
import { Open_Sans, Fredoka, Roboto } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import './globals.css';

// Font configurations
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const fredoka = Fredoka({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka',
});

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'PCCS - A New Approach to Study Of Kids Child Youth',
  description: 'We provide best solutions for a Clean Environment. PCCS offers innovative educational approaches for children and youth development with expert teachers, active learning, and safe environment.',
  keywords: [
    'kindergarten',
    'education',
    'children',
    'youth',
    'learning',
    'teachers',
    'school',
    'PCCS',
    'kids education',
    'early childhood',
    'academic development'
  ],
  authors: [{ name: 'PCCS Education' }],
  creator: 'PCCS Education',
  publisher: 'PCCS Education',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pccs.edu.do'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pccs.edu.do',
    title: 'PCCS - A New Approach to Study Of Kids Child Youth',
    description: 'We provide best solutions for a Clean Environment. PCCS offers innovative educational approaches for children and youth development.',
    siteName: 'PCCS Education',
    images: [
      {
        url: '/logos/logo_land.png',
        width: 1200,
        height: 630,
        alt: 'PCCS Education Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PCCS - A New Approach to Study Of Kids Child Youth',
    description: 'We provide best solutions for a Clean Environment. PCCS offers innovative educational approaches for children and youth development.',
    images: ['/logos/logo_land.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${fredoka.variable} ${roboto.variable}`}
    >
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color */}
        <meta name="theme-color" content="#3E64DE" />
        <meta name="msapplication-TileColor" content="#3E64DE" />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'PCCS Education',
              description: 'A New Approach to Study Of Kids Child Youth. We provide best solutions for a Clean Environment.',
              url: 'https://pccs.edu.do',
              logo: 'https://pccs.edu.do/logos/logo_land.png',
              image: 'https://pccs.edu.do/logos/logo_land.png',
              telephone: '+1-484-298-9317',
              email: 'info@pccs.edu.do',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'DO',
                addressRegion: 'Dominican Republic',
              },
              sameAs: [
                'https://facebook.com/pccs.education',
                'https://twitter.com/pccs_education',
                'https://instagram.com/pccs.education',
                'https://linkedin.com/company/pccs-education'
              ],
              areaServed: 'Dominican Republic',
              hasCredential: 'Educational Institution',
              audience: {
                '@type': 'Audience',
                audienceType: 'Children and Youth Education'
              }
            })
          }}
        />
      </body>
    </html>
  );
}
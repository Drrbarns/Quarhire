
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quarhire.com'),
  title: {
    default: 'Quarhire - Reliable Airport Pickup Services in Ghana',
    template: '%s | Quarhire'
  },
  description: 'Book your ride safely and conveniently with Quarhire. Professional airport pickup services in Ghana with reliable drivers, premium vehicles, and secure payments. Available 24/7 from Kotoka International Airport.',
  keywords: [
    'airport pickup Ghana',
    'Kotoka airport transfer',
    'Ghana airport taxi',
    'Accra airport pickup',
    'airport transfer service Ghana',
    'reliable airport taxi Accra',
    'professional drivers Ghana',
    'airport shuttle Ghana',
    'Quarhire',
    'Ghana transportation',
    'airport transfer Accra',
    'premium car service Ghana'
  ],
  authors: [{ name: 'Quarhire' }],
  creator: 'Quarhire',
  publisher: 'Quarhire',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/Quarhire.png', sizes: 'any' },
      { url: '/Quarhire.png', sizes: '32x32', type: 'image/png' },
      { url: '/Quarhire.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/Quarhire.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/Quarhire.png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://quarhire.com',
    siteName: 'Quarhire',
    title: 'Quarhire - Reliable Airport Pickup Services in Ghana',
    description: 'Book your ride safely and conveniently with Quarhire. Professional airport pickup services in Ghana with reliable drivers and secure payments.',
    images: [
      {
        url: '/Quarhire2.png',
        width: 1200,
        height: 630,
        alt: 'Quarhire - Airport Pickup Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quarhire - Reliable Airport Pickup Services in Ghana',
    description: 'Book your ride safely and conveniently with Quarhire. Professional airport pickup services in Ghana.',
    images: ['/Quarhire2.png'],
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
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased bg-white`}
      >
        {/* Paystack Inline Script */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="beforeInteractive"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

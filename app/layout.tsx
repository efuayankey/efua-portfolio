import type { Metadata } from 'next';
import { Bebas_Neue, Instrument_Serif, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Efua Yankey',
  description: 'CS + AI Researcher at Lehigh University. Building intelligent systems.',
  icons: { icon: '/efua.png', apple: '/efua.png' },
  openGraph: {
    title: 'Efua Yankey',
    description: 'CS + AI Researcher · Lehigh University · Class of 2028',
    url: 'https://efua-portfolio.vercel.app',
    siteName: 'Efua Yankey',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

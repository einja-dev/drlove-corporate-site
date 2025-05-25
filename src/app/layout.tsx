import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSerif = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dr.Love',
  description: '心にもうひとり味方がいる日常へ。Dr.Love',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

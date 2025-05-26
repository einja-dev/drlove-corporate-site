import type { Metadata } from 'next';
import { M_PLUS_1p, Noto_Serif_JP, Varela_Round } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';

const varelaRound = Varela_Round({
  variable: '--font-varela-round',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const notoSerif = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const mplus = M_PLUS_1p({
  variable: '--font-mplus',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
      <body className={`${mplus.variable} ${varelaRound.variable} ${notoSerif.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import { UserAgentEffect } from '@/app/components/util/UserAgentEffect';
import { Providers } from '@/app/Providers';
// Providerタグと競合していた。本格的な開発がスタートしたら直す
// import type { Metadata } from 'next';
import { M_PLUS_1p, Noto_Serif_JP, Varela_Round } from 'next/font/google';
import './globals.css';

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


// NOTE: ここに設定するとbodyにmetaタグが追加されてしまっていた
//       Providersと競合してるので本格的な開発がスタートしたら直す
// export const metadata: Metadata = {
//   metadataBase: new URL('https://corp.dr-love.ai'),
//   title: 'Dr.Love',
//   description: '心にもうひとり味方がいる日常へ。Dr.Love',

//   // OGP設定（SNSでのリンク表示用）
//   openGraph: {
//     title: 'Dr.Love',
//     description: '心にもうひとり味方がいる日常へ。Dr.Love',
//     url: 'https://corp.dr-love.ai/',
//     siteName: 'Dr.Love',
//     images: [
//       {
//         url: '/hero/main-image.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Dr.Love - 心にもうひとり味方がいる日常へ',
//       }
//     ],
//     locale: 'ja_JP',
//     type: 'website',
//   },

//   // faviconを宣言
//   icons: {
//     icon: '/favicon.svg',
//     shortcut: '/favicon.svg',
//     apple: '/apple-touch-icon.png',
//   },
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClass = `${mplus.variable} ${varelaRound.variable} ${notoSerif.variable}`;

  return (
    <html lang="ja">
      <head>
        {/* Note：Metadata使うとProviderと競合してうまく動かないので、手動で設定 */}
        {/* 基本メタタグ */}
        <title>Dr.Love</title>
        <meta name="description" content="心にもうひとり味方がいる日常へ。Dr.Love" />

        {/* OGP メタタグ */}
        <meta property="og:title" content="Dr.Love" />
        <meta property="og:description" content="心にもうひとり味方がいる日常へ。Dr.Love" />
        <meta property="og:url" content="https://corp.dr-love.ai/" />
        <meta property="og:site_name" content="Dr.Love" />
        <meta property="og:image" content="https://corp.dr-love.ai/images/ogp.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Dr.Love - 心にもうひとり味方がいる日常へ" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />

        {/* favicon */}
        <link rel="icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={bodyClass}>
        <UserAgentEffect />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

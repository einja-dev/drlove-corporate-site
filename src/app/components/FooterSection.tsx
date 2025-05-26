import { css } from '@/styled-system/css';
import Link from 'next/link';

const footerStyle = css({
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '32px 40px',
  background: '#fff',
  borderTop: '1px solid #DEDEDE',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

const logoStyle = css({
  fontFamily: 'Iwata Maru Gothic Std',
  fontWeight: '400',
  fontSize: '24px',
  color: '#FF749D',
  letterSpacing: '-3%',
});

const navStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '16px',
  fontSize: '14px',
  color: '#444444',
  fontFamily: 'M+ 1m',
  fontWeight: '400',
  marginBottom: '8px',
});

const copyrightStyle = css({
  fontFamily: 'M+ 1m',
  fontSize: '12px',
  color: '#888',
});

export default function FooterSection() {
  return (
    <footer className={footerStyle}>
      <div className={logoStyle}>Dr. Love AI</div>
      <nav className={navStyle}>
        <Link href="/">ミッション</Link>
        <Link href="/">サービス</Link>
        <Link href="/">メンバー紹介</Link>
        <Link href="/">ニュース</Link>
        <Link href="/">採用情報</Link>
        <Link href="/">会社概要</Link>
        <Link href="/">ギャラリー</Link>
      </nav>
      <div className={copyrightStyle}>©︎ 2025 Dr. Love AI .inc</div>
    </footer>
  );
}

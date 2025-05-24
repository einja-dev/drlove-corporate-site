'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';

const headerStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 100,
  transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)',
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(-24px)',
  background: '#fff !important',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 16px',
  md: {
    padding: '8px 40px',
  },
  '&.visible': {
    opacity: 1,
    pointerEvents: 'auto',
    transform: 'translateY(0)',
  },
});

const logoNavWrapStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  width: '100%',
  maxWidth: '1280px',
  md: {
    justifyContent: 'space-between',
    gap: '40px',
  },
});

const logoStyle = css({
  fontFamily: 'Iwata Maru Gothic Std',
  fontWeight: '400',
  fontSize: '24px',
  lineHeight: '1.5em',
  color: '#FF749D',
  letterSpacing: '-3%',
  flexShrink: 0,
  md: {
    fontSize: '32px',
  },
});

const navStyle = css({
  display: 'none',
  alignItems: 'center',
  gap: '16px',
  fontSize: '16px',
  color: '#444444',
  fontFamily: 'M+ 1m',
  fontWeight: '400',
  lineHeight: '1.8em',
  md: {
    display: 'flex',
  },
});

const mobileMenuButtonStyle = css({
  display: 'block',
  background: 'none',
  border: 'none',
  padding: '8px',
  cursor: 'pointer',
  color: '#444444',
  fontSize: '24px',
  md: {
    display: 'none',
  },
});

export default function HeaderSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${headerStyle} ${visible ? 'visible' : ''}`}>
      <div className={logoNavWrapStyle}>
        <div className={logoStyle}>Dr. Love</div>
        <nav className={navStyle}>
          <Link href="#service">サービス</Link>
          <Link href="#member">メンバー紹介</Link>
          <Link href="#news">ニュース</Link>
          <Link href="#recruit">採用情報</Link>
          <Link href="#company">会社概要</Link>
          <Link href="#gallery">ギャラリー</Link>
        </nav>
        <button type="button" className={mobileMenuButtonStyle}>
          ☰
        </button>
      </div>
    </header>
  );
}

'use client';
import { css } from '@/styled-system/css';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

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

const mobileMenuOverlayStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.32)',
  zIndex: 120,
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s',
  md: { display: 'none' },
  '&.open': {
    opacity: 1,
    pointerEvents: 'auto',
  },
});

const mobileMenuNavStyle = css({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '80vw',
  maxWidth: '320px',
  height: '100vh',
  background: '#fff',
  zIndex: 130,
  boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '32px 24px 24px 24px',
  transform: 'translateX(100%)',
  opacity: 0,
  transition: 'transform 0.3s, opacity 0.3s',
  md: { display: 'none' },
  '&.open': {
    transform: 'translateX(0)',
    opacity: 1,
  },
});

const closeButtonStyle = css({
  position: 'absolute',
  top: '16px',
  right: '16px',
  background: 'none',
  border: 'none',
  fontSize: '28px',
  color: '#444',
  cursor: 'pointer',
  zIndex: 2,
});

export default function HeaderSection() {
  const [visible, setVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

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
        <button
          type="button"
          className={mobileMenuButtonStyle}
          aria-label="メニューを開く"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      <div
        className={`${mobileMenuOverlayStyle} ${isMenuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') closeMenu();
        }}
        aria-hidden={!isMenuOpen}
      />
      <nav
        className={`${mobileMenuNavStyle} ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className={closeButtonStyle}
          onClick={closeMenu}
          aria-label="メニューを閉じる"
        >
          ×
        </button>
        <Link
          href="#service"
          onClick={closeMenu}
          style={{ margin: '24px 0 0 0', fontSize: '18px', color: '#444', textDecoration: 'none' }}
        >
          サービス
        </Link>
        <Link
          href="#member"
          onClick={closeMenu}
          style={{ margin: '24px 0 0 0', fontSize: '18px', color: '#444', textDecoration: 'none' }}
        >
          メンバー紹介
        </Link>
        <Link
          href="#news"
          onClick={closeMenu}
          style={{ margin: '24px 0 0 0', fontSize: '18px', color: '#444', textDecoration: 'none' }}
        >
          ニュース
        </Link>
        <Link
          href="#recruit"
          onClick={closeMenu}
          style={{ margin: '24px 0 0 0', fontSize: '18px', color: '#444', textDecoration: 'none' }}
        >
          採用情報
        </Link>
        <Link
          href="#company"
          onClick={closeMenu}
          style={{ margin: '24px 0 0 0', fontSize: '18px', color: '#444', textDecoration: 'none' }}
        >
          会社概要
        </Link>
        <Link
          href="#gallery"
          onClick={closeMenu}
          style={{ margin: '24px 0 0 0', fontSize: '18px', color: '#444', textDecoration: 'none' }}
        >
          ギャラリー
        </Link>
      </nav>
    </header>
  );
}

'use client';
import { PrimaryButton } from '@/app/components/ui/PrimaryButton';
import { css } from '@/styled-system/css';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const headerStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 100,
  transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)',
  opacity: 1,
  pointerEvents: 'auto',
  transform: 'translateY(0)',
  background: '#fff !important',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 16px',
  height: '60px',
  md: {
    padding: '8px 40px',
  },

  lg: {
    height: '72px',
  },
});

const headerShadowStyle = css({
  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
});

const logoNavWrapStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  width: '100%',
  md: {
    justifyContent: 'space-between',
    gap: '40px',
  },
});

const navStyle = css({
  display: 'none',
  alignItems: 'center',
  gap: '16px',
  fontSize: '16px',
  color: '#444444',
  fontWeight: '400',
  lineHeight: '1.8em',
  lg: {
    display: 'flex',
  },
});

const mobileMenuButtonStyle = css({
  display: 'flex',
  background: '#fff',
  border: 'none',
  borderRadius: '50%',
  padding: '8px',
  cursor: 'pointer',
  color: '#444444',
  width: '40px',
  height: '40px',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  fontSize: '24px',
  lg: {
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
  lg: { display: 'none' },
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
  lg: { display: 'none' },
  '&.open': {
    transform: 'translateX(0)',
    opacity: 1,
  },
});

const closeButtonStyle = css({
  position: 'absolute',
  top: '16px',
  right: '16px',
  zIndex: 2,
  background: '#fff',
  md: {
    right: '24px',
  },
});

type IconButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
  icon: any;
  className?: string;
};

function IconButton({ onClick, ariaLabel, icon, className }: IconButtonProps) {
  return (
    <button
      type="button"
      className={[mobileMenuButtonStyle, className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size="sm" />
    </button>
  );
}

export default function HeaderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const messageSection = document.getElementById('message-section');
      const header = document.querySelector('header');
      if (!messageSection || !header) return;
      const headerRect = header.getBoundingClientRect();
      const messageRect = messageSection.getBoundingClientRect();
      // messageSectionの上端がヘッダーの下端に到達したら影を出す
      setIsScrolled(messageRect.top <= headerRect.bottom);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header
      className={[headerStyle, isScrolled ? headerShadowStyle : ''].filter(Boolean).join(' ')}
    >
      <div className={logoNavWrapStyle}>
        <Link href="/">
          <Image
            src="/assets/header/logo-header.png"
            alt="Dr.Loveロゴ（装飾込み）"
            width={311}
            height={87}
            style={{ height: '40px', width: 'auto' }}
          />
        </Link>
        <nav className={navStyle}>
          <Link href="#service">サービス</Link>
          <Link href="#member">メンバー紹介</Link>
          <Link href="#news">ニュース</Link>
          <Link href="#recruit">採用情報</Link>
          <Link href="#company">会社概要</Link>
          <div className={css({ display: 'none', lg: { display: 'block' } })}>
            <Link href="/inquiry" style={{ textDecoration: 'none' }}>
              <PrimaryButton>お問い合わせ</PrimaryButton>
            </Link>
          </div>
        </nav>
        <IconButton onClick={() => setIsMenuOpen(true)} icon={faBars} ariaLabel="メニューを開く" />
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
        <IconButton
          onClick={closeMenu}
          icon={faXmark}
          ariaLabel="メニューを閉じる"
          className={closeButtonStyle}
        />
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
        <div
          style={{ marginTop: '32px', width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Link href="/inquiry" style={{ textDecoration: 'none' }}>
            <PrimaryButton size="default">お問い合わせ</PrimaryButton>
          </Link>
        </div>
      </nav>
    </header>
  );
}

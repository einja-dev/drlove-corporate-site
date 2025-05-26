'use client';
import { css } from '@/styled-system/css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import { PrimaryButton } from './PrimaryButton';

const sectionStyle = css({
  width: '100%',
  background: 'background',
  padding: '32px 16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  flexDirection: 'column',
  md: {
    padding: '40px 32px',
  },

  lg: {
    padding: '48px 80px',
  },
});

const cardStyle = css({
  position: 'relative',
  width: '100%',
  aspectRatio: '224/144',
  borderRadius: '16px',
  padding: '40px 32px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
});

const bgImgStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
  pointerEvents: 'none',
});

// 画像フェード用スタイル
const fadeImgStyle = css({
  transition: 'opacity 1s ease, transform 2.4s ease',
  opacity: 0,
  willChange: 'opacity, transform',
});

const overlayStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(255,215,181,0.2)',
  zIndex: 1,
  pointerEvents: 'none',
});

const titleStyle = css({
  fontFamily: 'M+ 1m',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '1.8',
  color: '#FF8A5C',
  textAlign: 'center',
  marginBottom: '16px',
  zIndex: 2,
  md: {
    fontSize: '28px',
    marginBottom: '32px',
  },
});

const descStyle = css({
  fontFamily: 'M+ 1m',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '1.9',
  color: '#444444',
  textAlign: 'center',
  zIndex: 2,
  md: {
    fontSize: '18px',
  },
});

const recruitTextWrapMobileStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  zIndex: 2,
  position: 'static',
  marginBottom: '24px',
  md: { display: 'none' },
});

const recruitTextWrapDesktopStyle = css({
  display: 'none',
  md: { display: 'flex' },
  width: '100%',
  zIndex: 2,
  position: 'absolute',
  top: 48,
  left: 0,
  marginBottom: 0,
  gap: 0,
  alignItems: 'unset',
  flexDirection: 'column',
});

const recruitButtonWrapDesktopStyle = css({
  display: 'none',
  md: { display: 'flex' },
  position: 'absolute',
  bottom: 64,
  left: 0,
  width: '100%',
  zIndex: 2,
  justifyContent: 'center',
  alignItems: 'center',
});

export default function RecruitSection() {
  const { sizeType } = useWindowSize();
  const isMobile = sizeType === 'xs' || sizeType === 'sm';
  const [isHover, setIsHover] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Switch image on mobile when card is roughly centered
  useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    const el = cardRef.current;
    const observer = new IntersectionObserver(([entry]) => setIsHover(entry.isIntersecting), {
      root: null,
      threshold: 0,
      rootMargin: '0px 0px -55% 0px',
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);
  return (
    <section className={sectionStyle} id="recruit">
      {/* md未満: 画像の上にタイトル・説明、画像の下にボタン */}
      <div className={recruitTextWrapMobileStyle}>
        <div className={titleStyle}>本気で向き合う仲間を募集します</div>
        <div className={descStyle}>
          Dr.Loveでは、孤独や不安を抱える人に寄り添える社会をつくる。
          <br />
          その想いに共感し、行動できる方をお待ちしています。
        </div>
      </div>
      <div
        className={cardStyle}
        ref={cardRef}
        onMouseEnter={() => !isMobile && setIsHover(true)}
        onMouseLeave={() => !isMobile && setIsHover(false)}
      >
        {/* default background */}
        <Image
          src="/top/recruit/recruit_bg_only_old.png"
          alt=""
          fill
          className={`${bgImgStyle} ${fadeImgStyle}`}
          style={{ opacity: isHover ? 0 : 1 }}
          priority
        />
        {/* hover background */}
        <Image
          src="/top/recruit/recruit_bg_hover_old.png"
          alt=""
          fill
          className={`${bgImgStyle} ${fadeImgStyle}`}
          style={{ opacity: isHover ? 1 : 0 }}
          priority
        />
        <div className={overlayStyle} />
        {/* md以上でのみ絶対配置で重ねる */}
        <div className={recruitTextWrapDesktopStyle}>
          <div className={titleStyle}>本気で向き合う仲間を募集します</div>
          <div className={descStyle}>
            Dr.Loveでは、孤独や不安を抱える人に寄り添える社会をつくる。
            <br />
            その想いに共感し、行動できる方をお待ちしています。
          </div>
        </div>
        <div className={recruitButtonWrapDesktopStyle}>
          <Link href="/recruit" style={{ textDecoration: 'none' }}>
            <PrimaryButton variant="secondary" gradText borderRadiusType="special" size="large">
              募集職種をみる
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

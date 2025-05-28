'use client';
import { Container } from '@/app/components/ui/Container';
import { PrimaryButton } from '@/app/components/ui/PrimaryButton';
import { SectionTitle } from '@/app/components/ui/SectionTitle';
import { Spacer } from '@/app/components/ui/Spacer';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { useWindowSize } from '@/app/hooks/useWindowSize';
import { css, cx } from '@/styled-system/css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
  padding: '24px 32px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  md: {
    padding: '40px 32px',
  },
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
  background: 'rgba(255,215,181,0.2)', // #FFD7B5, 20%透明度
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
  xs: {
    fontSize: '24px',
  },
  md: {
    fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
    marginBottom: '32px',
  },
  lg: { marginTop: '16px' },
});

const descStyle = css({
  fontWeight: 500,
  lineHeight: '1.9',
  color: '#444444',
  textAlign: 'center',
  zIndex: 2,
  marginTop: '-24px',
  fontSize: 'clamp(11px, 3vw, 1.2rem)',
  xs: {
    marginTop: '-10px',
  },
  md: {
    fontSize: 'clamp(0.9em, 1.5vw, 2rem)',
  },
  lg: {
    marginTop: '-24px',
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
  display: 'flex',
  position: 'absolute',
  bottom: 24,
  left: 0,
  width: '100%',
  zIndex: 2,
  justifyContent: 'center',
  alignItems: 'center',
  md: {
    bottom: 64,
  },
});

export default function RecruitSection() {
  const { sizeType } = useWindowSize();
  const isMobile = sizeType === 'xs' || sizeType === 'sm';
  const [isHover, setIsHover] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const fadeTitleRef = useFadeInOnScroll(0.15);
  const fadeDescRef = useFadeInOnScroll(0.18);
  const fadeCardRef = useFadeInOnScroll(0.22);

  // IntersectionObserver用のラッパーdivを用意
  // カード本体にはfadeCardRefのみ、ラッパーdivにcardRefを付与

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
      <Container noPadding>
        <div ref={fadeTitleRef}>
          <SectionTitle en="Recruit" jp="採用情報" />
        </div>
        <Spacer size="32px" />
        {/* md未満: 画像の上にタイトル・説明、画像の下にボタン */}
        <div className={recruitTextWrapMobileStyle} ref={fadeDescRef}>
          <div className={titleStyle}>本気で向き合う仲間を募集します</div>
        </div>
        {/* IntersectionObserver用ラッパーdivを追加 */}
        <div ref={cardRef} style={{ width: '100%' }}>
          <div
            className={cardStyle}
            ref={fadeCardRef}
            onMouseEnter={() => !isMobile && setIsHover(true)}
            onMouseLeave={() => !isMobile && setIsHover(false)}
          >
            {/* default background */}
            <Image
              src="/top/recruit/recruit_bg.jpg"
              alt=""
              fill
              className={`${bgImgStyle} ${fadeImgStyle}`}
              style={{ opacity: isHover ? 0 : 1 }}
              priority
            />
            {/* hover background */}
            <Image
              src="/top/recruit/recruit_bg_hover.jpg"
              alt=""
              fill
              className={`${bgImgStyle} ${fadeImgStyle}`}
              style={{ opacity: isHover ? 1 : 0 }}
              priority
            />
            {/* #FFD7B5 20%透過オーバーレイ */}
            <div className={overlayStyle} />
            {/* md以上でのみ絶対配置で重ねる */}
            <div className={recruitTextWrapDesktopStyle}>
              <div
                className={cx(
                  titleStyle,
                  css({
                    display: 'none',
                    md: {
                      display: 'block',
                    },
                  })
                )}
              >
                本気で向き合う仲間を募集します
              </div>
              <div className={descStyle}>
                Dr.Loveでは、孤独や不安を抱える人に寄り添える社会をつくる。
                <br />
                その想いに共感し、行動できる方をお待ちしています。
              </div>
            </div>
            <div className={recruitButtonWrapDesktopStyle}>
              <Link href="/inquiry" style={{ textDecoration: 'none' }}>
                <PrimaryButton size="large">応募する</PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

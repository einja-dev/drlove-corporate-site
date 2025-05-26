'use client';
import { css, cx } from '@/styled-system/css';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import { SectionTitle } from './SectionTitle';
import { Spacer } from './Spacer';

const sectionStyle = css({
  width: '100%',
  padding: '64px 48px 64px', // mobile
  background: 'background',
  zIndex: 1,
  position: 'relative',

  md: {
    gap: '32px',
    padding: '64px 80px', // medium+
  },
  lg: {
    padding: '80px 80px 96px', // large+
  },
  xl: {
    padding: '80px 160px',
  },
});

const cardStyle = css({
  position: 'relative',
  width: '100%',
  height: '260px',
  borderRadius: '32px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  background: '#fff',
  transform: 'skewX(-5deg)',
  margin: '0 auto',
  padding: '24px 16px',

  xs: {
    padding: '40px 64px',
    height: '360px',
  },
  md: {
    height: '360px',
    padding: '40px 16px',
  },
  lg: {
    height: '500px',
  },
});

const cardMarginTopStyle = css({
  md: {
    marginTop: '60px',
    marginLeft: '-5px',
  },
});

const labelStyle = (color: string) =>
  css({
    transform: 'skewX(5deg)',
    fontWeight: 500,
    fontSize: 'clamp(0.9rem,6vw, 2rem)',
    lineHeight: '1.8',
    color: color || '#4EE06A',
    zIndex: 4,
    whiteSpace: 'nowrap',

    md: {
      fontSize: 'clamp(0.9rem, 3vw, 2.8rem)',
    },
  });

const items = [
  {
    label: 'サービス',
    labelColor: '#FF8A5C',
    bg: '/top/contents/orange-bg.png',
    person: '/top/contents/service.png',
    href: '#service',
    aspectRatio: '516/772',
    imageWrapClass: css({
      top: '60px',
      width: '55%',
      transform: 'skewX(5deg)',
      xs: {
        top: '80px',
        width: '48%',
      },
      md: {
        top: '100px',
        width: '80%',
      },
    }),
  },
  {
    label: 'メンバー紹介',
    labelColor: '#4EE06A',
    bg: '/top/contents/green-bg.png',
    person: '/top/contents/member.png',
    href: '#member',
    aspectRatio: '741/606',
    imageWrapClass: css({
      top: '70px',
      width: '80%',
      transform: 'skewX(5deg)',
      md: {
        top: '120px',
        width: '120%',
      },
    }),
  },
  {
    label: 'ニュース',
    labelColor: '#618BFF',
    bg: '/top/contents/blue-bg.png',
    person: '/top/contents/news.png',
    href: '#news',
    aspectRatio: '358/820',
    imageWrapClass: css({
      top: '55px',
      width: '40%',
      transform: 'skewX(5deg)',
      md: {
        top: '100px',
        width: '55%',
      },
    }),
  },
];

export default function ContentLinkSection() {
  // タイトルもフェードイン
  const setTitleRef = useFadeInOnScroll(0.15);
  const setCardRef = useFadeInOnScroll(0.35);

  return (
    <section className={sectionStyle}>
      <div
        ref={setTitleRef}
        style={{ opacity: 0, willChange: 'opacity, transform', transition: 'none' }}
      >
        <SectionTitle en="CONTENTS" jp="コンテンツ" />
        <Spacer size={48} />
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px',
          md: {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        })}
      >
        {items.map((item, idx) => {
          const cardRef = useRef<HTMLDivElement>(null);
          const imageRef = useRef<HTMLDivElement>(null);
          const handleMouseEnter = () => {
            gsap.to(cardRef.current, { y: -8, scale: 1.04, duration: 0.25, ease: 'power1.out' });
            gsap.to(imageRef.current, { y: -8, scale: 1.04, duration: 0.25, ease: 'power1.out' });
          };
          const handleMouseLeave = () => {
            gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.25, ease: 'power1.out' });
            gsap.to(imageRef.current, { y: 0, scale: 1, duration: 0.25, ease: 'power1.out' });
          };
          return (
            <Link
              href={item.href}
              key={item.label}
              style={{ textDecoration: 'none' }}
              scroll={true}
            >
              <div
                ref={(el) => {
                  setCardRef(el);
                  cardRef.current = el;
                }}
                className={`${cardStyle} ${idx === 1 ? ` ${cardMarginTopStyle}` : ''}`}
                style={{
                  backgroundImage: `url(${item.bg})`,
                  backgroundSize: '115% 115%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#fff',
                  opacity: 0,
                  transform: 'skewX(-5deg)',
                  willChange: 'opacity, transform',
                  transition: 'none',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className={labelStyle(item.labelColor)}>{item.label}</span>
                <div
                  ref={imageRef}
                  className={cx(css({ position: 'absolute' }), item.imageWrapClass)}
                  style={{ aspectRatio: item.aspectRatio }}
                >
                  <Image
                    src={item.person}
                    alt={item.label}
                    fill
                    priority
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

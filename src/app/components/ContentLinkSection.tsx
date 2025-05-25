'use client';
import { css } from '@/styled-system/css';
import Image from 'next/image';
import Link from 'next/link';
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll';
import { SectionTitle } from './SectionTitle';
import { Spacer } from './Spacer';

const sectionStyle = css({
  width: '100%',
  padding: '32px 24px',
  background: 'background',
  zIndex: 1,
  position: 'relative',

  md: {
    gap: '32px',
    padding: '64px 24px',
  },
  lg: {
    padding: '80px',
  },
  xl: {
    padding: '80px 160px',
  },
});

const cardStyle = css({
  position: 'relative',
  width: '100%',
  height: '120px',
  borderRadius: '32px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  background: '#fff',
  transform: 'skewX(-8deg)',
  margin: '0 auto',
  padding: '24px 16px',
  transition:
    'transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)',
  _hover: {
    transform: 'skewX(-8deg) scale(1.04) translateY(-8px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
    zIndex: 10,
  },
  xs: {
    padding: '40px 64px',
    height: '200px',
  },
  md: {
    flexDirection: 'column',
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
    marginLeft: '-10px',
  },
});

const memberImgStyle = css({
  position: 'absolute',
  right: '-200px',
  bottom: '-240px',
  width: '320px',
  height: 'auto',
  transform: 'translateX(-50%) skewX(8deg)',
  zIndex: 3,
  pointerEvents: 'none',
  xs: {
    bottom: '-170px',
  },

  sm: {
    right: '-160px',
    bottom: '-160px',
    width: '320px',
  },
  md: {
    left: '50%',
    bottom: '-60px',
  },
  lg: {
    left: '50%',
    bottom: '0',
  },
});

const labelStyle = (color: string) =>
  css({
    transform: 'skewX(12deg)',
    fontFamily: 'M+ 1m, sans-serif',
    fontWeight: 500,
    fontSize: 'clamp(0.9rem,5.5vw, 2.8rem)',
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
    bg: '/images/service-bg.png',
    person: '/images/service-person-mask.png',
    href: '#service',
  },
  {
    label: 'メンバー紹介',
    labelColor: '#618BFF',
    bg: '/images/member-bg.png',
    person: '/images/member-person-mask.png',
    href: '#member',
  },
  {
    label: 'ニュース',
    labelColor: '#4EE06A',
    bg: '/images/news-bg.png',
    person: '/images/news-person-mask.png',
    href: '#news',
  },
];

export default function ContentLinkSection() {
  const setCardRef = useFadeInOnScroll(0.35);

  return (
    <section className={sectionStyle}>
      <SectionTitle en="CONTENTS" jp="コンテンツ" />
      <Spacer size={64} />
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
        {items.map((item, idx) => (
          <Link href={item.href} key={item.label} style={{ textDecoration: 'none' }} scroll={true}>
            <div
              ref={(el) => setCardRef(el, idx)}
              className={`${cardStyle}${idx === 1 ? ` ${cardMarginTopStyle}` : ''}`}
              style={{
                backgroundImage: `url(${item.bg})`,
                backgroundSize: '120% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#fff',
                opacity: 0,
                transform: 'skewX(-8deg) translateY(40px)',
                willChange: 'opacity, transform',
              }}
            >
              <span className={labelStyle(item.labelColor)}>{item.label}</span>
              <Image
                src={item.person}
                alt="マスク"
                width={320}
                height={400}
                className={memberImgStyle}
                priority
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

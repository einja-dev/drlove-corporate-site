'use client';
import { css } from '@/styled-system/css';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // refを安定化させるためのコールバック
  const setCardRef = useCallback((el: HTMLDivElement | null, idx: number) => {
    cardRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    let detach: (() => void) | null = null;
    const handler = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height;
      const scrolled = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / total));
      // progress 0.0〜1.0
      // 0.2で1枚目、0.45で2枚目、0.7で3枚目
      const thresholds = [0.2, 0.45, 0.7];
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        if (progress > thresholds[i]) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.05,
            ease: 'power2.out',
            transform: 'skewX(-8deg) translateY(0px)',
          });
        } else {
          gsap.to(el, {
            opacity: 0,
            y: 40,
            duration: 0.4,
            ease: 'power2.in',
            transform: 'skewX(-8deg) translateY(40px)',
          });
        }
      });
    };
    // Lenis対応
    type LenisType = {
      on?: (event: string, fn: () => void) => void;
      off?: (event: string, fn: () => void) => void;
    };
    const win = window as unknown as { lenis?: LenisType };
    const lenis = win.lenis;
    if (lenis && typeof lenis.on === 'function' && typeof lenis.off === 'function') {
      lenis.on('scroll', handler);
      detach = () => {
        lenis.off?.('scroll', handler);
      };
    } else {
      window.addEventListener('scroll', handler);
      window.addEventListener('resize', handler);
      detach = () => {
        window.removeEventListener('scroll', handler);
        window.removeEventListener('resize', handler);
      };
    }
    handler();
    return () => {
      if (detach) detach();
    };
  }, []);

  return (
    <section className={sectionStyle} ref={sectionRef}>
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

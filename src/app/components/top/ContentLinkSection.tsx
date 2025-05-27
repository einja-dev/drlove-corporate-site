'use client';
import { Container } from '@/app/components/ui/Container';
import { SectionTitle } from '@/app/components/ui/SectionTitle';
import { Spacer } from '@/app/components/ui/Spacer';
import { useFadeInOnScroll } from '@/app/hooks/useFadeInOnScroll';
import { css, cx } from '@/styled-system/css';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const items = [
  {
    label: 'サービス',
    labelColor: '#FF8A5C',
    bg: '/top/contents/orange-bg.png',
    person: '/top/contents/service.png',
    href: '#service',
    aspectRatio: '516/772',
    imageWrapClass: css({
      top: '19%',
      width: '70%',
      left: 'calc(50% - 8px)',
      transform: 'skewX(5deg) translateX(-50%)',
      xs: {
        left: 'calc(50% - 15px)',
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
      top: '25%',
      width: '100%',
      left: 'calc(50% + 3px)',
      transform: 'skewX(5deg) translateX(-50%)',
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
      top: '19%',
      width: '45%',
      left: 'calc(50% + 5px)',
      transform: 'skewX(5deg) translateX(-50%)',
      xs: {
        left: 'calc(50% + 10px)',
      },
    }),
  },
];

export default function ContentLinkSection() {
  // タイトルもフェードイン
  const setTitleRef = useFadeInOnScroll(0.15);
  const setCardRef = useFadeInOnScroll(0.35);

  return (
    <section
      className={css({
        width: '100%',
        margin: '0 auto',
        padding: '64px 0 64px', // mobile
        background: 'background',
        zIndex: 1,
        position: 'relative',
        sm: {
          padding: '64px 32px 64px',
        },
        md: {
          gap: '32px',
          padding: '64px 48px', // medium+
        },
        lg: {
          padding: '80px 48px 96px', // large+
        },
        xl: {
          padding: '80px 48px',
        },
      })}
    >
      <Container>
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
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            xs: {
              gap: '16px',
            },
            sm: {
              padding: '0',
              gap: '24px',
              gridTemplateColumns: 'repeat(3, 1fr)',
            },
          })}
        >
          {items.map((item, idx) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const imageRef = useRef<HTMLImageElement>(null);
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
                  className={css({
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '373 / 480',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    background: '#fff',
                    transform: 'skewX(-5deg)',
                    xs: {
                      borderRadius: '32px',
                    },
                    ...(idx === 1
                      ? {
                          marginTop: '30px',
                          marginLeft: '-5px',
                          md: {
                            marginTop: '60px',
                            marginLeft: '-5px',
                          },
                        }
                      : {}),
                  })}
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
                  <span
                    className={css({
                      position: 'absolute',
                      top: '6%',
                      left: '50%',
                      transform: 'skewX(5deg) translateX(-50%)',
                      fontWeight: 500,
                      fontSize: 'clamp(0.9rem, 3vw, 2.2rem)',
                      lineHeight: '1.8',
                      color: item.labelColor || '#4EE06A',
                      zIndex: 4,
                      whiteSpace: 'nowrap',
                      sm: {
                        fontSize: 'clamp(0.9rem, 3vw, 2.2rem)',
                      },
                    })}
                  >
                    {item.label}
                  </span>
                  <div
                    className={cx(css({ position: 'absolute' }), item.imageWrapClass)}
                    style={{ aspectRatio: item.aspectRatio }}
                  >
                    <Image
                      ref={imageRef}
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
      </Container>
    </section>
  );
}

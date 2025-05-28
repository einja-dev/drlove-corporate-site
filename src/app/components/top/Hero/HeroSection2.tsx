'use client';
import { HeroMessageSVG } from '@/app/components/top/Hero/HeroMessageSVG';
import { css } from '@/styled-system/css';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSplashCompleted } from './SplashContext';

const heroSection = css({
  w: '100%',
  maxWidth: '100vw',
  mx: 'auto',
  p: '0 16px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  bg: '#fff',

  position: 'sticky',
  top: '60px',
  md: {
    p: '0 24px',
  },
  lg: {
    top: '72px',
  },
});

const heroContainer = css({
  w: '100%',
  height: 'calc(100svh - 76px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  position: 'relative',
  md: {
    height: 'calc(100svh - 96px)',
  },
});

const heroImageWrap = css({
  w: '100%',
  zIndex: 0,
  aspectRatio: '21 / 9',
});

const heroImage = css({
  objectFit: 'cover',
  w: '100%',
  h: '100%',
  opacity: 1,
});

const IMAGE_RATIO = 21 / 9; // 画像の縦横比（例: 21:9）
const MAX_SHIFT = 0.65; // 最大シフト率（例: 0.5 = 50%まで）
const BASE = 130; // 100より大きいほど下が基準

const heroTextContainer = css({
  position: 'absolute',
  top: '4svh',
  right: '4%',
  margin: '0 auto',
  width: '70%',
  textAlign: 'right',
  zIndex: 2,
  pointerEvents: 'none',
  boxSizing: 'border-box',

  // アスペクト比 0 〜 1/2（超縦長）
  '@media (max-aspect-ratio: 1/2)': {
    width: '80%',
    top: '20svh',
    md: {
      top: '28svh',
    },
  },

  // アスペクト比 1/2 〜 2/3
  '@media (min-aspect-ratio: 1/2) and (max-aspect-ratio: 2/3)': {
    width: '75%',
    top: '14svh',
    md: {
      top: '18svh',
    },
  },

  // アスペクト比 2/3 〜 3/4
  '@media  (min-aspect-ratio: 2/3) and (max-aspect-ratio: 3/4)': {
    width: '75%',
    top: '10svh',
    right: '2%',
  },

  // 画面のアスペクト比（横÷縦）が7:5（=1.4）以上横長のとき
  '@media (min-aspect-ratio: 7/5)': {
    top: '5svh',
    right: '2%',
    width: '45%',
  },
  md: {
    top: '7svh',
    right: '2%',
    width: '65%',
    transform: 'none',
  },
  lg: {
    top: '10svh',
    right: '4%',
    width: '55%',
  },
  xl: {
    width: '65%',
  },
});

export default function HeroSection2() {
  const { splashCompleted } = useSplashCompleted();
  const [objectPosition, setObjectPosition] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  useLayoutEffect(() => {
    const updateObjectPosition = () => {
      const vpRatio = window.innerHeight / window.innerWidth;
      if (vpRatio > 1.2) {
        setObjectPosition('bottom');
      } else {
        const diff = Math.max(0, IMAGE_RATIO - vpRatio);
        const offsetRate = Math.min(diff / IMAGE_RATIO, MAX_SHIFT);
        const percent = BASE - offsetRate * 100;
        setObjectPosition(`center ${percent}%`);
      }
    };
    updateObjectPosition();
    window.addEventListener('resize', updateObjectPosition);
    return () => window.removeEventListener('resize', updateObjectPosition);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 1.1;
      setIsHidden(window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      className={heroSection}
      style={{
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? 'none' : 'auto',
        transition: 'opacity 0.4s',
      }}
    >
      <div className={heroContainer}>
        <div className={heroImageWrap}>
          <Image
            src="/hero/main-image.jpg"
            alt="Dr. Love AI メインビジュアル"
            fill
            className={heroImage}
            style={{ objectPosition, visibility: objectPosition ? 'visible' : 'hidden' }}
            priority
          />
        </div>
        <div className={heroTextContainer}>{splashCompleted && <HeroMessageSVG animate />}</div>
      </div>
    </section>
  );
}

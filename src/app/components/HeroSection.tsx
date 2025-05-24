'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';
import { HeroMessageSVG } from './HeroMessageSVG';

const heroSection = css({
  w: '100%',
  mx: 'auto',
  p: '0 16px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'sticky',
  top: '64px',
  bg: '#fff',
  md: {
    p: '0 40px',
  },
});

const heroContainer = css({
  w: '100%',
  height: 'calc(100vh - 100px)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  position: 'relative',
});

const heroImageWrap = css({
  w: '100%',
  zIndex: 0,
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
  top: '4vh',
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
    top: '20vh',
    md: {
      top: '28vh',
    },
  },

  // アスペクト比 1/2 〜 2/3
  '@media (min-aspect-ratio: 1/2) and (max-aspect-ratio: 2/3)': {
    top: '14vh',
    md: {
      top: '18vh',
    },
  },

  // アスペクト比 2/3 〜 3/4
  '@media (max-aspect-ratio: 3/4)': {
    right: '50%',
    transform: 'translateX(50%)',
  },

  // 画面のアスペクト比（横÷縦）が7:5（=1.4）以上横長のとき
  '@media (min-aspect-ratio: 7/5)': {
    top: '5vh',
    right: '2%',
    width: '45%',
  },
  md: {
    top: '7vh',
    right: '2%',
    width: '65%',
    transform: 'none',
  },
  lg: {
    top: '10vh',
    right: '4%',
    width: '55%',
  },
  xl: {
    width: '65%',
  },
});

export default function HeroSection() {
  const [objectPosition, setObjectPosition] = useState('bottom');

  useEffect(() => {
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

  return (
    <section className={heroSection}>
      <div className={heroContainer}>
        <div className={heroImageWrap}>
          <Image
            src="/hero/main-image.jpg"
            alt="Dr. Love AI メインビジュアル"
            fill
            className={heroImage}
            style={{ objectPosition }}
            priority
          />
        </div>
        <div className={heroTextContainer}>
          <HeroMessageSVG />
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { css } from '../../../styled-system/css';
import { HeroMessageSVG } from './HeroMessageSVG';

const heroSection = css({
  w: '100%',
  maxW: '1536px',
  mx: 'auto',
  p: '0 16px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  bg: '#fff',
  md: {
    p: '0 40px',
  },
});

const heroContainer = css({
  w: '100%',
  maxW: '1536px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

const heroImageWrap = css({
  w: '100%',
  aspectRatio: '16 / 9',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '16px',
  mx: 'auto',
  boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
});

const heroImage = css({
  objectFit: 'cover',
  w: '100%',
  h: '100%',
  opacity: 1,
});

const heroTextContainer = css({
  position: 'absolute',
  left: -2,
  bottom: 5,
  width: '50%',
  textAlign: 'left',
  zIndex: 2,
  pointerEvents: 'none',
  transform: 'none',
  boxSizing: 'border-box',
  md: {
    bottom: 10,
    left: -8,
  },
});

export default function HeroSection() {
  return (
    <section className={heroSection}>
      <div className={heroContainer}>
        <div className={heroImageWrap}>
          <Image
            src="/images/hero-main-visual.png"
            alt="Dr. Love AI メインビジュアル"
            fill
            className={heroImage}
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

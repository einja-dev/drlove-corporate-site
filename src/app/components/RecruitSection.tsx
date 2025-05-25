'use client';
import { css } from '@/styled-system/css';
import Image from 'next/image';
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
  md: {
    padding: '40px 32px',
  },

  lg: {
    padding: '48px 80px',
  },
});

const cardStyle = css({
  position: 'relative',
  width: '1536px',
  height: '480px',
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

const titleStyle = css({
  fontFamily: 'M+ 1m',
  fontWeight: 500,
  fontSize: 'clamp(1.2rem, 5vw, 2.5rem)',
  lineHeight: '1.8',
  color: '#fff',
  textAlign: 'center',
  textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  marginBottom: '32px',
  zIndex: 2,
});

const descStyle = css({
  fontFamily: 'M+ 1m',
  fontWeight: 500,
  fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
  lineHeight: '1.8',
  color: '#fff',
  textAlign: 'center',
  textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  zIndex: 2,
});

export default function RecruitSection() {
  const { sizeType } = useWindowSize();
  const isMobile = sizeType === 'xs' || sizeType === 'sm';
  return (
    <section className={sectionStyle} id="recruit">
      <div className={cardStyle}>
        <Image src="/figma-assets/recruit_bg.png" alt="recruit bg" fill className={bgImgStyle} />
        <div className={titleStyle}>私たちと一緒に働きませんか？</div>
        <div className={descStyle}>
          <span>Dr. Love AIでは一緒に働くメンバーを募集しています</span>
          <br />
          私たちと〜的な文章が3行程度で入ります。Dr. Love AIでは一緒に働くメンバーを募集しています
          <br />
          私たちと〜的な文章が3行程度で入ります。
        </div>
        <div style={{ zIndex: 2, marginTop: '40px' }}>
          <PrimaryButton
            variant="secondary"
            gradText
            borderRadiusType="special"
            size={isMobile ? 'small' : 'default'}
          >
            募集要項はこちらから
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

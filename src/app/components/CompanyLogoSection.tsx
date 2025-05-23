'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';
import { PrimaryButton } from './PrimaryButton';

const sectionStyle = css({
  width: '100%',
  margin: '0 auto',
  padding: '80px 16px 0 16px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#fff',
  md: {
    padding: '120px 0 0 0',
  },
});

const bgStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
  pointerEvents: 'none',
});

const titleStyle = css({
  fontFamily: 'M+ 1m',
  fontWeight: 500,
  fontSize: '32px',
  color: '#444',
  textAlign: 'center',
  lineHeight: '1.8',
  marginBottom: '48px',
  zIndex: 1,
  md: {
    fontSize: '36px',
    marginBottom: '56px',
  },
});

const rowScrollStyle = css({
  width: '100%',
  overflowX: 'auto',
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
  marginBottom: '32px',
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#eee',
    borderRadius: '4px',
  },
});

const logoCardStyle = css({
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 0 24px 0 rgba(0,0,0,0.06)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  width: '204px',
  height: '80px',
  overflow: 'hidden',
});

const logos = Array.from({ length: 14 }, (_, i) => ({
  src: `/figma-assets/logo-${(i + 1).toString().padStart(2, '0')}.png`,
  alt: `logo-${i + 1}`,
}));

const buttonWrapperStyle = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '40px',
  zIndex: 2,
});

export default function CompanyLogoSection() {
  // ロゴを3行に分割
  const rowCount = 3;
  const logosPerRow = Math.ceil(logos.length / rowCount);
  const logoRows = Array.from({ length: rowCount }, (_, i) =>
    logos.slice(i * logosPerRow, (i + 1) * logosPerRow)
  );

  // 各行のアニメーション用state
  const [offsets, setOffsets] = useState(Array(rowCount).fill(0));
  const rowLengths = logoRows.map((row) => row.length);
  const cardWidth = 204 + 24; // カード幅+gap

  useEffect(() => {
    const baseSpeed = 1.2; // px/frame
    let rafId: number;
    const animate = () => {
      setOffsets((prev) =>
        prev.map((offset, i) => {
          const totalWidth = rowLengths[i] * cardWidth;
          let next = offset;
          if (i === 0) {
            // 1行目: 右→左
            next -= baseSpeed;
            if (Math.abs(next) >= totalWidth) next = 0;
          } else if (i === 1) {
            // 2行目: 左→右
            next += baseSpeed;
            if (next > 0) next = -totalWidth;
          } else if (i === 2) {
            // 3行目: 右→左（通常速度）
            next -= baseSpeed;
            if (Math.abs(next) >= totalWidth) next = 0;
          }
          return next;
        })
      );
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [rowLengths]);

  return (
    <section className={sectionStyle}>
      <Image src="/figma-assets/company-bg.png" alt="背景" fill className={bgStyle} priority />
      <h2 className={titleStyle}>想いを共にする企業と、ともに歩んでいます。</h2>
      {/* 横スクロール3行（無限ループ） */}
      {logoRows.map((row, idx) => {
        const style = {
          display: 'flex',
          flexDirection: 'row' as const,
          gap: '24px',
          width: 'max-content',
          transform: `translateX(${offsets[idx]}px)`,
          transition: 'none',
        };
        return (
          <div
            className={rowScrollStyle}
            key={row.map((logo) => logo.alt).join('-')}
            style={{ overflow: 'hidden' }}
          >
            <div style={style}>
              {[...row, ...row].map((logo, i) => (
                <div key={`${logo.alt}-${i}`} className={logoCardStyle}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={40}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className={buttonWrapperStyle}>
        <PrimaryButton variant="secondary" gradText borderRadiusType="special">
          提携をご検討の方はこちら
        </PrimaryButton>
      </div>
    </section>
  );
}

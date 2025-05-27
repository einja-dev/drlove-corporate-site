'use client';
import { css } from '@/styled-system/css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PrimaryButton } from './PrimaryButton';

const sectionStyle = css({
  width: '100%',
  margin: '0 auto',
  padding: '96px 16px 96px 16px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'background',
  zIndex: 1,
  md: {
    padding: '120px 16px 120px 16px',
  },
});

const bgStyle = css({
  position: 'absolute',
  top: '15%',
  left: '15%',
  width: '70%',
  height: '70%',
  objectFit: 'contain',
  zIndex: 0,
  pointerEvents: 'none',
});

const titleStyle = css({
  fontSize: 'clamp(0.9rem, 3vw, 2rem)',
  fontWeight: '500',
  color: '#444',
  textAlign: 'center',
  lineHeight: '1.8',
  marginBottom: '48px',
  zIndex: 1,
  xs: {
    fontSize: 'clamp(0.9rem, 4vw, 2rem)',
  },
  md: {
    fontSize: 'clamp(0.9rem, 3.2vw, 2.4rem)',
    marginBottom: '56px',
  },
});

const rowScrollStyle = css({
  width: '100%',
  overflow: 'hidden', // hide scrollbar and prevent manual scroll
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
  marginBottom: '32px',
  pointerEvents: 'none', // disable user interaction (no manual scrolling)
});

const logoCardStyle = css({
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px',
  width: '168px',
  height: '56px',
  overflow: 'hidden',
});

export const logoFilenames: string[] = [
  'WAVE_RHINOPLASTY_CLINIC.png',
  'エッジ.png',
  '0EBEB123-592C-4189-B471-04DE43F170B4.jpg',
  '494858411_1198789771396397_6950388020160594109_n-2.jpg',
  // '[CROP]KakaoTalk_20210915_160227559_0.png',
  'IMG_4359.JPG',
  'IMG_5560.PNG',
  'KakaoTalk_20230615_092939793.jpg',
  // 'KakaoTalk_20241119_130522441_01.jpeg',
  'KakaoTalk_20250415_141658932_01.png',
  'KakaoTalk_20250521_151936300_01.png',
  'lorraine_browroko.png',
  'rogo.png',
  'Web.png',
  'エレーブクリニック.png',
  'ジェナベル.jpeg',
  'MANO.jpg',
  'ファクト整形外科 (1).jpg',
  'プラネット美容整形外科.png',
  '武内製薬.jpeg',
  '癒し〜ぷブランドロゴ.png',
  'HUGO.png',
  'DayBeauClinic.svg',
  'NATURIA.svg',
];
const logos = logoFilenames.map((filename) => ({
  src: `/top/company/${filename}`,
  alt: filename.replace(/\.[^/.]+$/, ''),
}));

const buttonWrapperStyle = css({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px',
  zIndex: 2,
});

const descriptionStyle = css({
  fontWeight: 400,
  fontSize: '13px',
  color: '#444444',
  lineHeight: '1.8',
  textAlign: 'center',
  marginTop: '24px',
  position: 'relative',
  zIndex: 2,
  xs: {
    fontSize: '14px',
  },
  sm: {
    fontSize: '16px',
  },
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
      <Image src="/top/company/company-bg-moyamoya.png" alt="背景" fill className={bgStyle} />
      <h2 className={titleStyle}>想いを共にする企業様と一緒に歩んでおります</h2>
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
          <div className={rowScrollStyle} key={row.map((logo) => logo.alt).join('-')}>
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
      {/* ロゴ下の説明文 */}
      <div className={descriptionStyle}>
        共に歩んでくださるパートナーを随時募集しております
        <br />
        まずはお気軽にご相談ください
      </div>
      <div className={buttonWrapperStyle}>
        <Link href="/inquiry" style={{ textDecoration: 'none' }}>
          <PrimaryButton variant="secondary" gradText borderRadiusType="special" size="large">
            お問い合わせ
          </PrimaryButton>
        </Link>
      </div>
    </section>
  );
}

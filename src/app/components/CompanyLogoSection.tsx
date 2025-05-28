'use client';
import { PrimaryButton } from '@/app/components/ui/PrimaryButton';
import { css } from '@/styled-system/css';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

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

  // 各行のref
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timelines: (gsap.core.Timeline | gsap.core.Tween)[] = [];

    logoRows.forEach((row, rowIndex) => {
      const rowElement = rowRefs.current[rowIndex];
      if (!rowElement) return;

      // 方向を決定（1行目: 右→左、2行目: 左→右、3行目: 右→左）
      const direction = rowIndex === 1 ? 1 : -1;

      // 行全体のコンテナを取得
      const container = rowElement.querySelector('.logo-container') as HTMLElement;
      if (!container) return;

      // 無限スクロールアニメーション
      const animation = gsap.fromTo(
        container,
        {
          xPercent: direction === 1 ? -50 : 0, // 左→右の場合は-50%から開始
        },
        {
          xPercent: direction === 1 ? 0 : -50, // 右→左の場合は-50%まで移動
          duration: 15, // 15秒で1サイクル
          ease: 'none',
          repeat: -1,
        }
      );

      timelines.push(animation);
    });

    // クリーンアップ
    return () => {
      timelines.forEach((tl) => tl.kill());
    };
  }, [logoRows]);

  return (
    <section className={sectionStyle}>
      <Image src="/top/company/company-bg-moyamoya.png" alt="背景" fill className={bgStyle} />
      <h2 className={titleStyle}>想いを共にする企業様と一緒に歩んでおります</h2>
      {/* 横スクロール3行（無限ループ） */}
      {logoRows.map((row, idx) => (
        <div
          className={rowScrollStyle}
          key={row.map((logo) => logo.alt).join('-')}
          ref={(el) => {
            rowRefs.current[idx] = el;
          }}
        >
          <div className="logo-container" style={{ display: 'flex', gap: '24px', width: 'max-content' }}>
            {[...row, ...row].map((logo, i) => (
              <div key={`${logo.alt}-${i}`} className={`${logoCardStyle} logo-card`}>
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
      ))}
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

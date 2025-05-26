'use client';
import { css } from '@/styled-system/css';
import Image from 'next/image';
import Link from 'next/link';
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
  fontSize: 'clamp(0.9rem,5vw, 3rem)',
  fontWeight: '500',
  color: '#444',
  textAlign: 'center',
  lineHeight: '1.8',
  marginBottom: '48px',
  zIndex: 1,
  md: {
    fontSize: 'clamp(0.9rem,4vw, 2.5rem)',
    marginBottom: '56px',
  },
});

const rowScrollStyle = css({
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '32px',
  pointerEvents: 'none',
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
  flexShrink: 0,
});

const animatedRowStyle = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
  width: 'max-content',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
});

const logos = Array.from({ length: 30 }, (_, i) => ({
  src: `/top/company/logo-${(i + 1).toString().padStart(2, '0')}.png`,
  alt: `logo-${i + 1}`,
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
  fontSize: '14px',
  color: '#444444',
  lineHeight: '1.8',
  textAlign: 'center',
  marginTop: '24px',
  position: 'relative',
  zIndex: 2,
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

  // 各行のアニメーション設定を改善
  const getRowAnimation = (rowIndex: number, rowLength: number) => {
    const cardWidth = 168 + 24; // カード幅 + gap
    const totalWidth = rowLength * cardWidth;

    const pixelsPerSecond = 50; // 1秒間に移動するピクセル数
    const duration = totalWidth / pixelsPerSecond; // 秒単位
    // より正確なスピード計算

    if (rowIndex === 1) {
      // 2行目は右向き
      return {
        animation: `scrollRight ${duration}s linear infinite`,
      };
    } else {
      // 1行目と3行目は左向き
      return {
        animation: `scrollLeft ${duration}s linear infinite`,
      };
    }
  };

  return (
    <section className={sectionStyle}>
      <Image src="/top/company/company-bg-moyamoya.png" alt="背景" fill className={bgStyle} />
      <h2 className={titleStyle}>想いを共にする企業と、ともに歩んでいます。</h2>

      {/* 横スクロール3行（無限ループ） */}
      {logoRows.map((row, idx) => {
        const animationProps = getRowAnimation(idx, row.length);

        return (
          <div className={rowScrollStyle} key={`row-${idx}`}>
            <div
              className={animatedRowStyle}
              style={animationProps}
            >
              {/* 2セット分のロゴを配置（より正確な位置調整） */}
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

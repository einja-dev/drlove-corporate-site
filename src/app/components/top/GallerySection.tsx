import { css } from '@/styled-system/css';
import Image from 'next/image';

const sectionStyle = css({
  width: '100%',
  background: 'background',
  position: 'relative',
  overflow: 'hidden',
  minHeight: 'clamp(480px, 70vw, 800px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0',
  zIndex: 1,
});

const galleryWrap = css({
  position: 'relative',
  width: 'clamp(340px, 80vw, 1100px)',
  height: 'auto',
  maxWidth: '1100px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'clamp(16px, 3vw, 32px)',
  padding: 'clamp(20px, 4vw, 40px)',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  }
});

const cardBaseStyle = css({
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  background: '#fff',
  aspectRatio: '3/2',
  position: 'relative',
  marginTop: 'var(--card-offset)',
  '@media (max-width: 768px)': {
    marginTop: 'var(--card-offset-tablet)',
  }
});

// ギャラリー画像・説明・色などをオブジェクト配列で管理
const galleryImages = [
  {
    src: '/figma-assets/gallery1.png',
    alt: 'チーム会議',
    description: 'チームでの会議の様子',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery2.png',
    alt: '外で笑顔',
    description: '外で笑顔の女性',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery3.png',
    alt: '女性の笑顔',
    description: '女性の笑顔のアップ',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery4.png',
    alt: 'PC作業',
    description: 'PC作業の様子',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery5.png',
    alt: 'パーティー',
    description: 'パーティーの様子',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery6.png',
    alt: '手を重ねる',
    description: '手を重ねるシーン',
    bgColor: '#fff',
  },
];

export default function GallerySection() {
  const getCardOffset = (index: number) => {
    // CSS変数として設定する値を計算
    const desktopOffset = (index % 3) * 20; // 3列: 0, 20, 40
    const tabletOffset = (index % 2) * 20; // 2列: 0, 20
    const mobileOffset = 0; // 1列: 0

    return {
      '--card-offset': `${desktopOffset}px`,
      '--card-offset-tablet': `${tabletOffset}px`,
      '--card-offset-mobile': `${mobileOffset}px`,
    } as React.CSSProperties;
  };

  return (
    <section className={sectionStyle} id="gallery">
      <div className={galleryWrap}>
        {/* 装飾（もやもや） */}
        {decorations.map((dec) => (
          <Image
            key={dec.src}
            src={dec.src}
            alt={dec.alt}
            style={dec.style}
            width={300}
            height={150}
            priority
          />
        ))}
        {/* 画像カード */}
        {galleryImages.map((img, index) => (
          <div
            key={img.src}
            className={cardBaseStyle}
            style={{
              ...getCardOffset(index),
              background: img.bgColor,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              width={400}
              height={220}
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}

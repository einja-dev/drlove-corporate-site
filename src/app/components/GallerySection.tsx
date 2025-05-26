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
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'clamp(16px, 3vw, 32px)',
  padding: 'clamp(20px, 4vw, 40px)',
});

const cardCommon = {
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  background: '#fff',
  aspectRatio: '3/2',
  position: 'relative' as const,
};

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

const decorations = [
  {
    src: '/figma-assets/gallery-moyamoya1.png',
    style: {
      position: 'absolute' as const,
      top: '-20px',
      left: '-20px',
      width: 'clamp(120px, 30vw, 300px)',
      height: 'clamp(60px, 12vw, 150px)',
      zIndex: 0,
      opacity: 0.3,
      pointerEvents: 'none' as const,
    },
    alt: 'もやもや1',
  },
  {
    src: '/figma-assets/gallery-moyamoya2.png',
    style: {
      position: 'absolute' as const,
      bottom: '-20px',
      right: '-20px',
      width: 'clamp(120px, 30vw, 300px)',
      height: 'clamp(60px, 12vw, 150px)',
      zIndex: 0,
      opacity: 0.3,
      pointerEvents: 'none' as const,
    },
    alt: 'もやもや2',
  },
];

export default function GallerySection() {
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
        {galleryImages.map((img) => (
          <div key={img.src} style={{ ...cardCommon, background: img.bgColor }}>
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

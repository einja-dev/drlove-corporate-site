import Image from 'next/image';
import { css } from '../../../styled-system/css';

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
  height: 'clamp(400px, 60vw, 600px)',
  maxWidth: '1100px',
  maxHeight: '700px',
  minHeight: '400px',
  margin: '0 auto',
});

const cardCommon = {
  position: 'absolute' as const,
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
  background: '#fff',
};

// ギャラリー画像・説明・色などをオブジェクト配列で管理
const galleryImages = [
  {
    src: '/figma-assets/gallery1.png',
    alt: 'チーム会議',
    style: {
      top: 'clamp(10px, 5vw, 40px)',
      left: 'clamp(0px, 5vw, 60px)',
      width: 'clamp(160px, 28vw, 340px)',
      height: 'clamp(90px, 18vw, 220px)',
      zIndex: 2,
    },
    description: 'チームでの会議の様子',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery2.png',
    alt: '外で笑顔',
    style: {
      top: 'clamp(0px, 2vw, 20px)',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'clamp(160px, 28vw, 340px)',
      height: 'clamp(90px, 18vw, 220px)',
      zIndex: 3,
    },
    description: '外で笑顔の女性',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery3.png',
    alt: '女性の笑顔',
    style: {
      top: 'clamp(30px, 7vw, 80px)',
      right: 'clamp(0px, 5vw, 60px)',
      width: 'clamp(120px, 20vw, 260px)',
      height: 'clamp(120px, 20vw, 260px)',
      zIndex: 2,
    },
    description: '女性の笑顔のアップ',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery4.png',
    alt: 'PC作業',
    style: {
      bottom: 'clamp(30px, 7vw, 80px)',
      left: 'clamp(0px, 5vw, 60px)',
      width: 'clamp(160px, 28vw, 340px)',
      height: 'clamp(90px, 18vw, 220px)',
      zIndex: 2,
    },
    description: 'PC作業の様子',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery5.png',
    alt: 'パーティー',
    style: {
      bottom: 'clamp(0px, 2vw, 20px)',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'clamp(180px, 32vw, 400px)',
      height: 'clamp(90px, 18vw, 220px)',
      zIndex: 4,
    },
    description: 'パーティーの様子',
    bgColor: '#fff',
  },
  {
    src: '/figma-assets/gallery6.png',
    alt: '手を重ねる',
    style: {
      bottom: 'clamp(30px, 7vw, 80px)',
      right: 'clamp(0px, 5vw, 60px)',
      width: 'clamp(100px, 16vw, 220px)',
      height: 'clamp(70px, 12vw, 180px)',
      zIndex: 2,
    },
    description: '手を重ねるシーン',
    bgColor: '#fff',
  },
];

const decorations = [
  {
    src: '/figma-assets/gallery-moyamoya1.png',
    style: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: 'clamp(120px, 30vw, 500px)',
      height: 'clamp(60px, 12vw, 180px)',
      zIndex: 1,
      opacity: 0.5,
      pointerEvents: 'none' as const,
    },
    alt: 'もやもや1',
  },
  {
    src: '/figma-assets/gallery-moyamoya2.png',
    style: {
      position: 'absolute' as const,
      bottom: 0,
      right: 0,
      width: 'clamp(120px, 30vw, 500px)',
      height: 'clamp(60px, 12vw, 180px)',
      zIndex: 1,
      opacity: 0.5,
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
            width={500}
            height={180}
            priority
          />
        ))}
        {/* 画像カード */}
        {galleryImages.map((img) => (
          <div key={img.src} style={{ ...cardCommon, ...img.style, background: img.bgColor }}>
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

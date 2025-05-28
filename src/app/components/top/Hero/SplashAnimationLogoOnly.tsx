import gsap from 'gsap';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

interface SplashAnimationLogoOnlyProps {
  onFinish?: () => void;
}

export default function SplashAnimationLogoOnly({ onFinish }: SplashAnimationLogoOnlyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [animStarted, setAnimStarted] = useState(false);

  useLayoutEffect(() => {
    if (!logoLoaded || animStarted) return;
    setAnimStarted(true);
    const tl = gsap.timeline();
    if (!logoRef.current || !bgRef.current) return;
    // 初期状態
    gsap.set(logoRef.current, { opacity: 0 });
    gsap.set(bgRef.current, { opacity: 1 });
    // ロゴフェードイン
    tl.to(logoRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    // ロゴと背景を同時にフェードアウト
    tl.to([logoRef.current, bgRef.current], {
      opacity: 0,
      duration: 1.2,
      delay: 0.7,
      ease: 'power2.inOut',
      onComplete: () => {
        if (onFinish) onFinish();
      },
    });
  }, [logoLoaded, animStarted, onFinish]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 白背景 */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          zIndex: 1,
        }}
      />
      {/* ロゴ */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          opacity: logoLoaded ? undefined : 0,
        }}
      >
        <Image
          src="/assets/header/logo-header.png"
          alt="ロゴ"
          width={180}
          height={60}
          style={{ objectFit: 'contain' }}
          priority
          onLoadingComplete={() => setLogoLoaded(true)}
        />
      </div>
    </div>
  );
}

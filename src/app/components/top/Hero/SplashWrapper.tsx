'use client';
import Image from 'next/image';
import React, { type ReactNode, useEffect, useState } from 'react';
import SplashAnimation from './SplashAnimation';

interface SplashWrapperProps {
  children: ReactNode;
}

// パスは実際の Hero 画像に合わせて調整してね☆
const HERO_IMAGE_SRC = '/hero/main-image.jpg';

export default function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 初回ロード時かつスクロール位置0のみ表示
    if (typeof window !== 'undefined') {
      if (window.scrollY > 0) {
        setShowSplash(false);
      }
    }
  }, []);

  // GSAP 側の onFinish が何らかの理由で呼ばれなくても、
  // 4 秒経ったら強制的に Splash を閉じるフェイルセーフ☆
  useEffect(() => {
    if (!showSplash) return;
    const fallback = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(fallback);
  }, [showSplash]);

  // HeroSectionにsplashActiveを渡す
  const enhancedChildren = Array.isArray(children)
    ? children.map((child, idx) =>
        React.isValidElement(child) && child.type && (child.type as any).name === 'HeroSection'
          ? React.cloneElement(child as any, {
              ...(child.props ?? {}),
              splashActive: showSplash,
              key: child.key ?? idx,
            })
          : React.isValidElement(child)
            ? React.cloneElement(child, { key: child.key ?? idx })
            : child
      )
    : React.isValidElement(children) &&
        children.type &&
        (children.type as any).name === 'HeroSection'
      ? React.cloneElement(children as any, { ...(children.props ?? {}), splashActive: showSplash })
      : children;

  return (
    <>
      {showSplash && (
        <>
          <SplashAnimation onFinish={() => setShowSplash(false)} />
          {/* Hero 画像を事前プリロードして白チラ防止 */}
          <Image
            src={HERO_IMAGE_SRC}
            alt=""
            width={1}
            height={1}
            priority
            style={{ display: 'none' }}
            fetchPriority="high"
          />
        </>
      )}
      {!showSplash && enhancedChildren}
    </>
  );
}

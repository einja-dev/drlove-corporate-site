'use client';
import type { ReactElement } from 'react';
import React, { type ReactNode, useEffect, useState } from 'react';
import type { default as HeroSection2Type } from './HeroSection2';
import SplashAnimationLogoOnly from './SplashAnimationLogoOnly';
import { SplashContext } from './SplashContext';

interface SplashWrapper2Props {
  children: ReactNode;
}

export default function SplashWrapper2({ children }: SplashWrapper2Props) {
  const [showSplash, setShowSplash] = useState(true);
  const [splashCompleted, setSplashCompleted] = useState(false);

  // フェイルセーフ: 10秒で強制的にスプラッシュを閉じる
  useEffect(() => {
    if (!showSplash) return;
    const fallback = setTimeout(() => setShowSplash(false), 10000);
    return () => clearTimeout(fallback);
  }, [showSplash]);

  // スプラッシュ終了時にsplashCompletedをtrueに
  const handleSplashFinish = () => {
    setShowSplash(false);
    setSplashCompleted(true);
  };

  // childrenのうちHeroSection2にanimateを渡す
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && (child.type as any).name === 'HeroSection2') {
      return React.cloneElement(child as ReactElement<any, typeof HeroSection2Type>, {
        ...(child.props ?? {}),
      });
    }
    return child;
  });

  return (
    <SplashContext.Provider value={{ splashCompleted, setSplashCompleted }}>
      {/* スプラッシュは常に最前面 */}
      {showSplash && <SplashAnimationLogoOnly onFinish={handleSplashFinish} />}
      {/* childrenは常にDOMに載せておき、スプラッシュ中は非表示 */}
      <div
        style={{
          width: '100%',
          visibility: showSplash ? 'hidden' : 'visible',
          pointerEvents: showSplash ? 'none' : 'auto',
        }}
      >
        {enhancedChildren}
      </div>
    </SplashContext.Provider>
  );
}

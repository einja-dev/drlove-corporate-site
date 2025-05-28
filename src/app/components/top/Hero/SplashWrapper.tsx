'use client';
import { type ReactNode, useEffect, useState } from 'react';
import SplashAnimation from './SplashAnimation';
import { SplashContext } from './SplashContext';

interface SplashWrapperProps {
  children: ReactNode;
}

export default function SplashWrapper({ children }: SplashWrapperProps) {
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

  return (
    <SplashContext.Provider value={{ splashCompleted, setSplashCompleted }}>
      {/* スプラッシュは常に最前面 */}
      {showSplash && <SplashAnimation onFinish={handleSplashFinish} />}
      {/* childrenは常にDOMに載せておく（非表示制御しない） */}
      <div
        style={{
          width: '100%',
          visibility: showSplash ? 'hidden' : 'visible',
          pointerEvents: showSplash ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </SplashContext.Provider>
  );
}

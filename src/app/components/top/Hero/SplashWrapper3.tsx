'use client';
import SplashAnimation3 from '@/app/components/top/Hero/SplashAnimation3';
import { type ReactNode, useEffect, useState } from 'react';
import { SplashContext } from './SplashContext';

interface SplashWrapperProps {
  children: ReactNode;
}

export default function SplashWrapper3({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [splashCompleted, setSplashCompleted] = useState(false);

  // フェイルセーフ: 10秒で強制的にスプラッシュを閉じる
  useEffect(() => {
    if (!showSplash) return;
    const fallback = setTimeout(() => setShowSplash(false), 100000);
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
      {showSplash && <SplashAnimation3 onFinish={handleSplashFinish} />}
      {/* childrenは常にDOMに載せておく（非表示制御しない） */}
      <div
        style={{
          width: '100%',
        }}
      >
        {children}
      </div>
    </SplashContext.Provider>
  );
}

'use client';
import { type ReactNode, useEffect, useState } from 'react';
import SplashAnimation from './SplashAnimation';
import { SplashContext } from './SplashContext';

interface SplashWrapperProps {
  children?: ReactNode;
}

export default function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [splashCompleted, setSplashCompleted] = useState(false);

  // フェイルセーフ: 10秒で強制的にスプラッシュを閉じる
  useEffect(() => {
    if (!showSplash) return;
    const fallback = setTimeout(() => handleSplashFinish(), 100000);
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

      {children}
    </SplashContext.Provider>
  );
}

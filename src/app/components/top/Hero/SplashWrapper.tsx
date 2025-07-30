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

  // 初回マウント時にアニメーションをスキップするかどうかを判定
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    const hasAnchorHash = window.location.hash && window.location.hash.length > 1;

    if (hasSeenSplash || hasAnchorHash) {
      setShowSplash(false);
      setSplashCompleted(true);
    }
  }, []);

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
    // アニメーションを見たことをセッションに記録する（アニメーションは初回のみトリガーさせるようにする）
    sessionStorage.setItem('hasSeenSplash', 'true');
  };

  return (
    <SplashContext.Provider value={{ splashCompleted, setSplashCompleted }}>
      {/* スプラッシュは常に最前面 */}
      {showSplash && <SplashAnimation onFinish={handleSplashFinish} />}

      {children}
    </SplashContext.Provider>
  );
}

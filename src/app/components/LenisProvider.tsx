'use client';
import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';

// ここを書き換えるだけでON/OFF切り替え
const LENIS_ENABLED = true;

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenis = useRef<InstanceType<typeof Lenis> | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (LENIS_ENABLED) {
      lenis.current = new Lenis({
        lerp: 0.1,
        duration: 1.1,
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.current?.raf(time);
        lenis.current && requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // mainタグのサイズ変化を監視して自動でresize
      observerRef.current = new ResizeObserver(() => {
        lenis.current?.resize();
      });
      const el = document.querySelector('main');
      if (el) observerRef.current.observe(el);
    } else {
      // OFF時はLenisを破棄し、observerも解除
      observerRef.current?.disconnect();
      observerRef.current = null;
      lenis.current?.destroy();
      lenis.current = null;
    }
    // クリーンアップ
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  useEffect(() => {
    if (!LENIS_ENABLED) return;

    function handleClick(e: MouseEvent) {
      let target = e.target as HTMLElement | null;
      // aタグでなくても親にaがある場合を考慮
      while (target && target.tagName !== 'A') {
        target = target?.parentElement;
      }
      if (target && target.tagName === 'A') {
        const href = (target as HTMLAnchorElement).getAttribute('href');
        if (href?.startsWith('#')) {
          const el = document.getElementById(href.slice(1));
          if (el && lenis.current) {
            e.preventDefault();
            lenis.current.scrollTo(el, { offset: -80 }); // ヘッダー分オフセット
          }
        }
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <>{children}</>;
}

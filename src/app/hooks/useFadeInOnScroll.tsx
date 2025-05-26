'use client';
import gsap from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

/* ------------------------------------------------------------------
   useFadeInOnScroll
   ビューポートに入った要素をふわっと表示させる共通フック✨
   threshold : 交差率 (0〜1) デフォ 0.35
   fromY     : 初期 translateY(px) デフォ 40
------------------------------------------------------------------- */
type LenisWindow = Window & { lenis?: { wrapper?: Element } };
const getObserverRoot = (): Element | null => {
  if (typeof window === 'undefined') return null;
  return (window as LenisWindow).lenis?.wrapper ?? null;
};

export function useFadeInOnScroll(threshold = 0.35, fromY = 40, rootMargin = '0px') {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 各要素がマウントされた瞬間に observer に登録
  const setItemRef = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;

      // 初期状態
      gsap.set(el, { opacity: 0, y: fromY });

      // transition を一時的に無効化
      el.dataset.origTransition = el.style.transition;
      el.style.transition = 'none';

      // Observer が準備済みなら即 observe
      if (observerRef.current) {
        observerRef.current.observe(el);
      } else {
        // まだ observer が無い場合はキューに入れる
        itemRefs.current.push(el);
      }
    },
    [fromY]
  );

  useEffect(() => {
    /** 交差後に元の transition を戻すヘルパ */
    const restoreTransition = (el: HTMLElement) => {
      const orig = el.dataset.origTransition ?? '';
      if (orig) {
        el.style.transition = orig;
      } else {
        el.style.removeProperty('transition');
      }
      delete el.dataset.origTransition;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => restoreTransition(el),
          });

          observer.unobserve(el);
        });
      },
      {
        root: getObserverRoot(),
        threshold,
        rootMargin,
      }
    );

    observerRef.current = observer;

    // 遅れて登録された要素を observe
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    itemRefs.current = [];

    return () => observer.disconnect();
  }, [threshold, fromY, rootMargin]);

  return setItemRef;
}

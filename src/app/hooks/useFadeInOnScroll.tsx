import gsap from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

// --- IntersectionObserver helper ----------------------------
type MaybeLenisWindow = Window & { lenis?: { wrapper?: Element } };
const getObserverRoot = () => {
  if (typeof window === 'undefined') return null;
  const maybeWrapper = (window as MaybeLenisWindow).lenis?.wrapper;
  return maybeWrapper ?? null;
};
// -----------------------------------------------------------

/**
 * useFadeInOnScroll
 * threshold で指定した割合だけビューポートに入ったら
 * opacity と translateY をアニメしてふわっと表示する♪
 */
export function useFadeInOnScroll(threshold = 0.35) {
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const setItemRef = useCallback((el: HTMLElement | null, idx: number) => {
    if (el) itemRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            });
            observer.unobserve(entry.target);
          }
        }
      },
      { root: getObserverRoot(), threshold }
    );

    for (const el of itemRefs.current) {
      if (el) {
        gsap.set(el, { opacity: 0, y: 40 });
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [threshold]);

  return setItemRef;
}

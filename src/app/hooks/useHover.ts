import { useCallback, useRef, useState } from 'react';

/**
 * 任意の要素にhover検知を付与する汎用フック
 * @returns [ref, isHover]
 */
export function useHover<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => setIsHover(false), []);

  // refをラップしてイベントを付与
  const callbackRef = useCallback(
    (node: T | null) => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseEnter);
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
      }
      ref.current = node;
    },
    [handleMouseEnter, handleMouseLeave]
  );

  return [callbackRef, isHover] as const;
}

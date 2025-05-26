'use client';
import { useUserAgent } from '@/app/hooks/useUserAgent';
import { useEffect } from 'react';

export function UserAgentEffect() {
  const { isIosSafari } = useUserAgent();

  useEffect(() => {
    if (typeof window !== 'undefined' && isIosSafari) {
      if (!document.body.classList.contains('ios-safari')) {
        document.body.classList.add('ios-safari');
      }
      if (!document.getElementById('ios-safari-wordbreak')) {
        const style = document.createElement('style');
        style.id = 'ios-safari-wordbreak';
        style.innerHTML = '.ios-safari .wbrText { word-break: break-all !important; }';
        document.head.appendChild(style);
      }
    }
  }, [isIosSafari]);

  return null;
}

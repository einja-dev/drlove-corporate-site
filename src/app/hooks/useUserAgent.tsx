'use client';
import { useEffect, useState } from 'react';

export const useUserAgent = () => {
  const [isIosSafari, setIsIosSafari] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent;
      const isIOS = /iP(hone|ad|od)/.test(ua);
      const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS/.test(ua);
      setIsIosSafari(isIOS && isSafari);
    }
  }, []);

  return { isIosSafari };
};

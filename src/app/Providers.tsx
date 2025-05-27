import LenisProvider from '@/app/components/util/LenisProvider';
import { WindowSizeProvider } from '@/app/hooks/useWindowSize';
import type { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <LenisProvider>
      <WindowSizeProvider>{children}</WindowSizeProvider>
    </LenisProvider>
  );
}
